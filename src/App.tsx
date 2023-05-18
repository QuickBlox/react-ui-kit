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

function App() {
  const currentContext = React.useContext(qbDataContext);
  const remoteDataSourceMock: RemoteDataSource =
    currentContext.storage.REMOTE_DATA_SOURCE;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const localDataSource: LocalDataSource =
    currentContext.storage.LOCAL_DATA_SOURCE;
  const { connectionRepository } = useQBConnection();

  const initLoginData: LoginData = {
    userName: 'artimed',
    password: 'quickblox',
  };
  /*
  artik1  134885168
  artimed 134804147
  artem   131103326
  anruaav 134769917
  kolart  136066102
  koltunov1 135062587
  koltunov2 137171800
  safariM11 134728539
   */
  const [currentUser, setCurrentUser] = React.useState(initLoginData);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async function prepareMockData() {
    await Stubs.initializeWithUsersMockData(localDataSource);
    //
    await Stubs.initializeWithMessagesMockData(localDataSource);
    //
    await Stubs.initializeWithDialogsMockData(localDataSource);
  }

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
      // START SYNC MOCK - слушает коннекшн репозиторий и после восстановления инета
      // загружает новые данные, а при первом запуске - грузит предустановленные значения (если они есть)
      // и мок версия может запускать дополнение по таймеру новых диалогов
      //
      await currentContext.storage.SYNC_DIALOGS_USE_CASE.execute(() => {
        console.log('SYNC_DIALOGS_USE_CASE_MOCK.execute');
      }).catch(() => {
        console.log('EXCEPTION SYNC_DIALOGS_USE_CASE_MOCK.execute');
      });
      //
    }
    // else {
    //   //
    //   // TODO: 1. disconnect 2. setup new user
    //   console.log('login data in prepareSDK:', authData);
    //   await remoteDataSourceMock.disconnectAndLogoutUser();
    //
    //   await remoteDataSourceMock.loginWithUser(authData);
    //   //
    //   // todo: temporary off, must turn on and reorganize code rows
    //   await connectionRepository.initializeStates();
    //   console.log(
    //     // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    //     `3. after repo initialize in prepareSDK, need init ${connectionRepository.needInit}`,
    //   );
    //   if (!connectionRepository.needInit) {
    //     connectionRepository.keepALiveChatConnection();
    //   }
    //   //
    // }
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
    // или во все юзкейсы 2) Get/Sync execute(completed/callback):Promise<Entity[]>
    // await prepareMockData();
    console.log('ADD REAL DATA TO DIALOG MOCK DATA ');
    // await remoteDataSourceMock.getDialogsFirstPage();
    // await remoteDataSourceMock.setUpMockStorage();
    //
    //
  };

  const navigate = useNavigate();

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
        {/* <Navbar /> */}

        <div className="App">
          <Routes>
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
            <Route path="/" element={<Login loginHandler={loginHandler} />} />
            <Route
              path="/desktop-test-mock"
              element={<QuickBloxUIKitDesktopLayout />}
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
