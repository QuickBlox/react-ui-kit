import React from 'react';
import { ProviderProps } from '../ProviderProps';
import ModalContextProvider from '../ModalContextProvider/ModalContextProvider';
import { LocalDataSource } from '../../../../Data/source/local/LocalDataSource';
import {
  LoginData,
  RemoteDataSource,
} from '../../../../Data/source/remote/RemoteDataSource';
import DialogsRepository from '../../../../Data/repository/DialogsRepository';
import { SyncDialogsUseCase } from '../../../../Domain/use_cases/SyncDialogsUseCase';
import { BaseUseCase } from '../../../../Domain/use_cases/base/BaseUseCase';
import { QBConfig } from '../../../../QBconfig';
import ConnectionRepository from '../../../../Data/repository/ConnectionRepository';
import EventMessagesRepository from '../../../../Data/repository/EventMessagesRepository';

// import packageInfo from '../../../../../package.json';

const initialValues = {
  LOCAL_DATA_SOURCE: new LocalDataSource(), // localstorage or session storage
  REMOTE_DATA_SOURCE: new RemoteDataSource(), // QB instances
  CONNECTION_REPOSITORY: new ConnectionRepository(),
};

const initialEvent = {
  EVENT_MESSAGE_REPOSITORY: new EventMessagesRepository(
    initialValues.REMOTE_DATA_SOURCE,
    initialValues.LOCAL_DATA_SOURCE,
    initialValues.CONNECTION_REPOSITORY,
  ),
};

type AccountData = {
  appId: number;
  accountKey: string;
  authSecret?: string;
  authKey: string;
  sessionToken?: string;
};

/*
{ username: string; password: string }
 */

export type InitParams = {
  maxFileSize: number;
  accountData: AccountData;
  qbConfig?: QBConfig;
  loginData?: LoginData;
};

type QuickBloxProviderProps = ProviderProps & InitParams;

type QBDataStorage = {
  LOCAL_DATA_SOURCE: LocalDataSource;
  REMOTE_DATA_SOURCE: RemoteDataSource;
  SYNC_DIALOGS_USE_CASE: BaseUseCase<boolean, boolean>; // need Factory pattern
  CONNECTION_REPOSITORY: ConnectionRepository;
  EVENT_MESSAGE_REPOSITORY: EventMessagesRepository;
};

export type QBReactUIKitVersionInfo = {
  version: string;
  build: string;
};

export type QBDataContextType = {
  // authProcessed: boolean;
  storage: QBDataStorage;
  InitParams: InitParams;
  updateStorage: (storage: QBDataStorage) => void;
  updateQBInitParams: (InitParams: InitParams) => void;
  // getQBReactUIKitVersionInfo: () => QBReactUIKitVersionInfo;
};
const initDataContext: QBDataContextType = {
  // authProcessed: false,
  storage: {
    LOCAL_DATA_SOURCE: initialValues.LOCAL_DATA_SOURCE, // localstorage or session storage
    REMOTE_DATA_SOURCE: initialValues.REMOTE_DATA_SOURCE, // QB instances
    CONNECTION_REPOSITORY: initialValues.CONNECTION_REPOSITORY,
    EVENT_MESSAGE_REPOSITORY: initialEvent.EVENT_MESSAGE_REPOSITORY,
    SYNC_DIALOGS_USE_CASE: new SyncDialogsUseCase(
      new DialogsRepository(
        initialValues.LOCAL_DATA_SOURCE,
        initialValues.REMOTE_DATA_SOURCE,
      ),
      initialValues.CONNECTION_REPOSITORY,
      initialEvent.EVENT_MESSAGE_REPOSITORY,
    ),
  },
  InitParams: {
    accountData: QBConfig.credentials,
    maxFileSize: QBConfig.appConfig.maxFileSize,
  },
  updateQBInitParams: (InitParams: InitParams) => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    console.log(
      `call function updateQBInitParams with param ${JSON.stringify(
        InitParams,
      )}`,
    );
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.InitParams = InitParams;
  },
  updateStorage: (storage: QBDataStorage) => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    console.log(`empty function with param ${storage}`);
  },
  // getQBReactUIKitVersionInfo: (): QBReactUIKitVersionInfo => {
  //   const qbReactUIKitVersionInfo: QBReactUIKitVersionInfo = {
  //     version: packageInfo.version,
  //     build: packageInfo.version,
  //   };
  //
  //   return qbReactUIKitVersionInfo;
  // },
};

export const qbDataContext =
  React.createContext<QBDataContextType>(initDataContext);

const { Provider } = qbDataContext;

function QuickBloxUIKitProvider({
  children,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  accountData,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  qbConfig,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  loginData,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  maxFileSize,
}: QuickBloxProviderProps) {
  console.log(
    'QuickBloxUIKitProvider with account data: ',
    JSON.stringify(accountData),
  );
  console.log(
    'QuickBloxUIKitProvider with login data: ',
    JSON.stringify(loginData),
  );
  const initStorageState = {
    LOCAL_DATA_SOURCE: initialValues.LOCAL_DATA_SOURCE, // localstorage or session storage
    REMOTE_DATA_SOURCE: initialValues.REMOTE_DATA_SOURCE, // QB instances
    CONNECTION_REPOSITORY: initialValues.CONNECTION_REPOSITORY,
    EVENT_MESSAGE_REPOSITORY: initialEvent.EVENT_MESSAGE_REPOSITORY,
    SYNC_DIALOGS_USE_CASE: new SyncDialogsUseCase(
      new DialogsRepository(
        initialValues.LOCAL_DATA_SOURCE,
        initialValues.REMOTE_DATA_SOURCE,
      ),
      initialValues.CONNECTION_REPOSITORY,
      initialEvent.EVENT_MESSAGE_REPOSITORY,
    ),
  };

  console.log(
    'QuickBloxUIKitProvider with storage init data: ',
    JSON.stringify(initStorageState),
  );
  const [storage, setStorage] = React.useState<QBDataStorage>(initStorageState);

  console.log('have storage useState completed');
  const updateStorage = (dataStorage: QBDataStorage) => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    setStorage(dataStorage);
  };
  // todo: must use accountData if we haves
  const [InitParams, setInitParams] = React.useState<InitParams>({
    accountData: {
      appId: accountData.appId,
      accountKey: accountData.accountKey,
      authKey: accountData.authKey,
      authSecret: accountData.authSecret,
      sessionToken: accountData.sessionToken,
    },
    loginData: {
      userName: loginData?.userName || '',
      password: loginData?.password || '',
    },
    maxFileSize,
  });

  console.log('have InitParams useState completed');
  const updateQBInitParams = (initParams: InitParams) => {
    console.log(`log updateQBInitParams ${JSON.stringify(initParams)}`);
    setInitParams(initParams);
  };

  // const getQBReactUIKitVersionInfo = (): QBReactUIKitVersionInfo => {
  //   const qbReactUIKitVersionInfo: QBReactUIKitVersionInfo = {
  //     version: packageInfo.version,
  //     build: packageInfo.version,
  //   };
  //
  //   return qbReactUIKitVersionInfo;
  // };

  // todo: temporary off, must turn on
  // todo: cause of recycle v1
  // storage.CONNECTION_REPOSITORY.keepALiveChatConnection();
  // todo: temporary off, must turn on
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  // storage.SYNC_DIALOGS_USE_CASE.execute(() => {});

  // todo: MUST use sessionToken or login/pass to re-init
  // const remoteDataSourceMock: RemoteDataSource =
  //   storage.REMOTE_DATA_SOURCE as RemoteDataSource;
  // // remoteDataSourceMock
  //   .initSDK({
  //     appIdOrToken: QBInitParams.accountData.appId,
  //     authKeyOrAppId: QBInitParams.accountData.authKey,
  //     authSecret: QBInitParams.accountData.authSecret,
  //     accountKey: QBInitParams.accountData.accountKey,
  //   })
  //   .catch(() => {
  //     console.log('EXCEPTION remoteDataSourceMock.initSDK');
  //   });
  // console.log('!!!-3-after initSDK');
  // // todo: temporary off, must turn on and reorganize code rows
  // storage.CONNECTION_REPOSITORY.initializeStates();
  // // todo: must delete it
  // remoteDataSourceMock.setUpMockStorage();
  // // START SYNC MOCK
  // storage.SYNC_DIALOGS_USE_CASE.execute(() => {
  //   console.log('SYNC_DIALOGS_USE_CASE_MOCK.execute');
  // }).catch(() => {
  //   console.log('EXCEPTION SYNC_DIALOGS_USE_CASE_MOCK.execute');
  // });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [authProcessed, setAuthProcessed] = React.useState(false);
  // const updateAuthProcessedStatus = (status: boolean) => {
  //   console.log('updateAuthProcessedStatus, set ', status);
  //   setAuthProcessed(status);
  // };

  return (
    <Provider
      value={{
        InitParams,
        updateQBInitParams,
        // authProcessed,
        // getQBReactUIKitVersionInfo,
        storage,
        updateStorage,
      }}
    >
      <ModalContextProvider>{children}</ModalContextProvider>
    </Provider>
  );
}

export default QuickBloxUIKitProvider;
