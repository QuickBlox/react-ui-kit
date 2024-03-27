import React, { useEffect } from 'react';
import './App.scss';
import { Route, Routes, useNavigate } from 'react-router-dom';
import useQBConnection from './Presentation/providers/QuickBloxUIKitProvider/useQBConnection';
import { LocalDataSource } from './Data/source/local/LocalDataSource';
import Login from './Presentation/layouts/TestStage/LoginView/Login';
import QuickBloxUIKitProvider from './Presentation/providers/QuickBloxUIKitProvider/QuickBloxUIKitProvider';
import { Stubs } from './Data/Stubs';
import {
  LoginData,
  RemoteDataSource,
} from './Data/source/remote/RemoteDataSource';
import QuickBloxUIKitDesktopLayout from './Presentation/layouts/Desktop/QuickBloxUIKitDesktopLayout';
import DefaultTheme from './Presentation/themes/DefaultThemes/DefaultTheme';
import useQbUIKitDataContext from './Presentation/providers/QuickBloxUIKitProvider/useQbUIKitDataContext';
import { QBConfig } from './QBconfig';

function App() {
  // const currentContext = React.useContext(qbDataContext);
  const currentContext = useQbUIKitDataContext();

  const remoteDataSource: RemoteDataSource =
    currentContext.storage.REMOTE_DATA_SOURCE;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const localDataSource: LocalDataSource =
    currentContext.storage.LOCAL_DATA_SOURCE;
  const { connectionRepository } = useQBConnection();

  const initLoginData: LoginData = {
    login: 'artik', // vit1 380990579507
    password: 'quickblox',
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
    await remoteDataSource.disconnectAndLogoutUser();
    console.log('call disconnectAndLogoutUser...');
    await currentContext.storage.LOCAL_DATA_SOURCE.clearAll();
    console.log('call clearAll...');
    setCurrentUser({ login: '', password: '' });
    navigate('/');
  };

  const prepareSDK = async (authData: LoginData): Promise<void> => {
    console.log('call prepareSDK with data:', authData);
    if (remoteDataSource.needInit) {
      console.log('start prepareSDK actions with data:', authData);
      await remoteDataSource.initSDKWithUser(
        {
          appIdOrToken: currentContext.InitParams.accountData.appId,
          authKeyOrAppId: currentContext.InitParams.accountData.authKey,
          authSecret: currentContext.InitParams.accountData.authSecret,
          accountKey: currentContext.InitParams.accountData.accountKey,
          config: QBConfig,
        },
        authData,
      );
      // await prepareMockData();
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
    console.log('call reloginSDK with data:', JSON.stringify(authData));
    currentContext.storage.SYNC_DIALOGS_USE_CASE.release();
    connectionRepository.stopKeepAlive();
    await remoteDataSource.disconnectAndLogoutUser();
    await currentContext.storage.LOCAL_DATA_SOURCE.clearAll();

    await remoteDataSource.loginWithUser(authData);
    //
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
    console.log('ADD REAL DATA TO DIALOG MOCK DATA ');
  };

  const loginHandler = async (data: LoginData): Promise<void> => {
    setCurrentUser(data);
    console.log(`call login actions: ${JSON.stringify(data)}`);
    if (remoteDataSource.authInformation) {
      console.log(
        `authInformation: ${JSON.stringify(
          remoteDataSource?.authInformation.userName,
        )}`,
      );
      if (data.login !== remoteDataSource.authInformation.userName) {
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
      if (remoteDataSource.needInit) {
        console.log('start prepareSDK actions with data:', data);
        await remoteDataSource.initSDKWithUser(
          {
            appIdOrToken: currentContext.InitParams.accountData.appId,
            authKeyOrAppId: currentContext.InitParams.accountData.authKey,
            authSecret: currentContext.InitParams.accountData.authSecret,
            accountKey: currentContext.InitParams.accountData.accountKey,
            config: QBConfig,
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
    prepareSDK(currentUser).catch((er) => {
      console.log(er);
    });
  }, []);
  //
  // const { proxyConfig } = QBConfig.configAIApi.AIAnswerAssistWidgetConfig;
  //
  // const defaultAIAnswer = UseDefaultAIAssistAnswerWidget({
  //   ...proxyConfig,
  // });

  return (
    <QuickBloxUIKitProvider
      maxFileSize={QBConfig.appConfig.maxFileSize}
      // SDK={QB} //init SDK
      accountData={{ ...QBConfig.credentials, sessionToken: '' }}
      qbConfig={{ ...QBConfig }}
      loginData={{
        login: currentUser.login,
        password: currentUser.password,
      }}
    >
      <div className="App">
        <Routes>
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <Route path="/" element={<Login loginHandler={loginHandler} />} />
          <Route
            path="/desktop-test-mock"
            element={
              <div>
                <div style={{ height: '56px' }}>Q-communicate</div>
                <QuickBloxUIKitDesktopLayout
                  theme={new DefaultTheme()}
                  uikitHeightOffset="56px"
                  // AIAssist={{
                  //   enabled: true,
                  //   default: true,
                  //   AIWidget: defaultAIAnswer,
                  // }}
                />
              </div>
            }
          />
        </Routes>
      </div>
    </QuickBloxUIKitProvider>
  );
}

export default App;
