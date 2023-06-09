import React, { useEffect } from 'react';
import './App.scss';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { QBConfig } from './QBconfig';
import useQBConnection from './Presentation/components/providers/QuickBloxUIKitProvider/useQBConnection';
import { LocalDataSource } from './Data/source/local/LocalDataSource';
import Login from './Presentation/components/layouts/TestStage/LoginView/Login';
import QuickBloxUIKitProvider, {
  qbDataContext,
} from './Presentation/components/providers/QuickBloxUIKitProvider/QuickBloxUIKitProvider';
import TestStageMarkup from './Presentation/components/layouts/TestStage/TestStageMarkup';
import { Stubs } from './Data/Stubs';
import {
  LoginData,
  RemoteDataSource,
} from './Data/source/remote/RemoteDataSource';
import QuickBloxUIKitDesktopLayout from './Presentation/components/layouts/Desktop/QuickBloxUIKitDesktopLayout';
import DefaultTheme from './Presentation/assets/DefaultThemes/DefaultTheme';

function App() {
  const currentContext = React.useContext(qbDataContext);
  const remoteDataSourceMock: RemoteDataSource =
    currentContext.storage.REMOTE_DATA_SOURCE;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const localDataSource: LocalDataSource =
    currentContext.storage.LOCAL_DATA_SOURCE;
  const { connectionRepository } = useQBConnection();

  const initLoginData: LoginData = {
    userName: '',
    password: '',
  };

  const [currentUser, setCurrentUser] = React.useState(initLoginData);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async function prepareMockData() {
    await Stubs.initializeWithUsersMockData(localDataSource);
    //
    await Stubs.initializeWithMessagesMockData(localDataSource);
    //
    await Stubs.initializeWithDialogsMockData(localDataSource);
  }

  const navigate = useNavigate();

  const logoutHandler = async () => {
    console.log('call logout...');
    currentContext.storage.SYNC_DIALOGS_USE_CASE.release();
    console.log('call release...');
    connectionRepository.stopKeepAlive();
    console.log('call stopKeepAlive...');
    await remoteDataSourceMock.disconnectAndLogoutUser();
    console.log('call disconnectAndLogoutUser...');
    await currentContext.storage.LOCAL_DATA_SOURCE.clearAll();
    console.log('call clearAll...');
    setCurrentUser({ userName: '', password: '' });
    navigate('/');
  };

  const prepareSDK = async (authData: LoginData): Promise<void> => {
    console.log('call prepareSDK with data:', authData);
    // todo: must be real remote datasource
    if (remoteDataSourceMock.needInit) {
      console.log('start prepareSDK actions with data:', authData);
      await remoteDataSourceMock.initSDKWithUser(
        {
          appIdOrToken: currentContext.InitParams.accountData.appId,
          authKeyOrAppId: currentContext.InitParams.accountData.authKey,
          authSecret: currentContext.InitParams.accountData.authSecret,
          accountKey: currentContext.InitParams.accountData.accountKey,
          config: QBConfig.appConfig,
        },
        authData,
      );
      // await prepareMockData();
      // todo: temporary off, must turn on and reorganize code rows
      await connectionRepository.initializeStates();
      console.log(
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        `3. after repo initialize, need init ${connectionRepository.needInit}`,
      );
      if (!connectionRepository.needInit) {
        connectionRepository.keepALiveChatConnection();
      }
      //
      await currentContext.storage.SYNC_DIALOGS_USE_CASE.execute(() => {
        console.log('SYNC_DIALOGS_USE_CASE_MOCK.execute');
      }).catch(() => {
        console.log('EXCEPTION SYNC_DIALOGS_USE_CASE_MOCK.execute');
      });
      currentContext.storage.REMOTE_DATA_SOURCE.subscribeOnSessionExpiredListener(
        () => {
          console.log('call subscribeOnSessionExpiredListener');
          console.timeLog('subscribeOnSessionExpiredListener');
          logoutHandler();
        },
      );
      //
      QB.chat.onSessionExpiredListener = function (error) {
        if (error) {
          console.log('onSessionExpiredListener - error: ', error);
        } else {
          console.log('Hello from client app SessionExpiredListener');
        }
      };
      //
    }
  };

  const reloginSDK = async (authData: LoginData): Promise<void> => {
    //
    // TODO: 1. disconnect 2. setup new user
    console.log('call reloginSDK with data:', JSON.stringify(authData));
    currentContext.storage.SYNC_DIALOGS_USE_CASE.release();
    connectionRepository.stopKeepAlive();
    await remoteDataSourceMock.disconnectAndLogoutUser();
    await currentContext.storage.LOCAL_DATA_SOURCE.clearAll();

    await remoteDataSourceMock.loginWithUser(authData);
    //
    // todo: temporary off, must turn on and reorganize code rows
    await connectionRepository.initializeStates();
    console.log(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `3. after repo initialize in reloginSDK, need init ${connectionRepository.needInit}`,
    );
    if (!connectionRepository.needInit) {
      connectionRepository.keepALiveChatConnection();
    }
    //
  };

  // eslint-disable-next-line @typescript-eslint/require-await
  const prepareContent = async (): Promise<void> => {
    console.log('PREPARE CONTENT');
    // todo: must delete it and ADD Preload data (read first page everywhere)
    console.log('ADD REAL DATA TO DIALOG MOCK DATA ');
    //
  };

  const loginHandler = async (data: LoginData): Promise<void> => {
    setCurrentUser(data);
    console.log(`call login actions: ${JSON.stringify(data)}`);
    if (remoteDataSourceMock.authInformation) {
      console.log(
        `authInformation: ${JSON.stringify(
          remoteDataSourceMock?.authInformation.userName,
        )}`,
      );
      if (data.userName !== remoteDataSourceMock.authInformation.userName) {
        await reloginSDK(data).catch((e) => {
          console.log(
            `exception in reloginSDK ${(e as unknown as Error).message}`,
          );
        });
        await prepareContent().catch();
        navigate('/desktop-test-mock');
      } else {
        navigate('/desktop-test-mock');
      }
    } else {
      console.log('need prepare SDK with data:', data);
      if (remoteDataSourceMock.needInit) {
        console.log('start prepareSDK actions with data:', data);
        await remoteDataSourceMock.initSDKWithUser(
          {
            appIdOrToken: currentContext.InitParams.accountData.appId,
            authKeyOrAppId: currentContext.InitParams.accountData.authKey,
            authSecret: currentContext.InitParams.accountData.authSecret,
            accountKey: currentContext.InitParams.accountData.accountKey,
            config: QBConfig.appConfig,
          },
          data,
        );
        await prepareContent().catch();
        navigate('/desktop-test-mock');
      }
    }
  };

  useEffect(() => {
    console.log('HEAVE USER: ', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    console.log('0. APP INIT');
    prepareSDK(currentUser).catch();
  }, []);

  // todo: uncomment authSecret
  return (
    <QuickBloxUIKitProvider
      maxFileSize={QBConfig.appConfig.maxFileSize}
      // SDK={QB} //init SDK
      accountData={{ ...QBConfig.credentials, sessionToken: '' }}
      // qbConfig={{
      //   debug: true,
      //   endpoints: {
      //     api: 'apilpsgdev.quickblox.com',
      //     chat: 'chatlpsgdev.quickblox.com',
      //   },
      //   webrtc: {},
      // }}
      loginData={{
        userName: currentUser.userName,
        password: currentUser.password,
      }}
    >
      <div className="App">
        <div className="App">
          <Routes>
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
            <Route path="/" element={<Login loginHandler={loginHandler} />} />
            <Route
              path="/desktop-test-mock"
              element={
                // <QuickBloxUIKitDesktopLayout theme={new CustomTheme()} InputWidgetLeftPlaceHolder={CustomWidgetVoiceToText('','')} />

                // <QuickBloxUIKitDesktopLayout theme={new CustomTheme()} />

                <QuickBloxUIKitDesktopLayout theme={new DefaultTheme()} />
              }
            />

            <Route path="/test-stage" element={<TestStageMarkup />} />
          </Routes>
        </div>
        <br />
        <br />
      </div>
    </QuickBloxUIKitProvider>
  );
}

export default App;
