import React from 'react';
import { ProviderProps } from '../ProviderProps';
import { LocalDataSource } from '../../../Data/source/local/LocalDataSource';
import {
  AuthorizationData,
  LoginData,
  RemoteDataSource,
} from '../../../Data/source/remote/RemoteDataSource';
import DialogsRepository from '../../../Data/repository/DialogsRepository';
import { SyncDialogsUseCase } from '../../../Domain/use_cases/SyncDialogsUseCase';
import { BaseUseCase } from '../../../Domain/use_cases/base/BaseUseCase';
import ConnectionRepository from '../../../Data/repository/ConnectionRepository';
import EventMessagesRepository from '../../../Data/repository/EventMessagesRepository';
import { CallBackFunction } from '../../../Domain/use_cases/base/IUseCase';
import { DefaultConfigurations } from '../../../Data/DefaultConfigurations';

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

const initialSync = {
  SYNC_DIALOGS_USE_CASE: new SyncDialogsUseCase(
    new DialogsRepository(
      initialValues.LOCAL_DATA_SOURCE,
      initialValues.REMOTE_DATA_SOURCE,
    ),
    initialValues.CONNECTION_REPOSITORY,
    initialEvent.EVENT_MESSAGE_REPOSITORY,
  ),
};

type AccountData = {
  appId: number;
  accountKey: string;
  authSecret?: string;
  authKey: string;
  sessionToken?: string;
};

export type InitParams = {
  maxFileSize: number;
  accountData: AccountData;
  qbConfig: QBConfig;
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
  release: () => void;
  authorize: (authorizationData: AuthorizationData) => Promise<void>;
  setSubscribeOnSessionExpiredListener: (
    callback: CallBackFunction<boolean>,
  ) => void;
};
const initDataContext: QBDataContextType = {
  // authProcessed: false,
  storage: {
    LOCAL_DATA_SOURCE: initialValues.LOCAL_DATA_SOURCE, // localstorage or session storage
    REMOTE_DATA_SOURCE: initialValues.REMOTE_DATA_SOURCE, // QB instances
    CONNECTION_REPOSITORY: initialValues.CONNECTION_REPOSITORY,
    EVENT_MESSAGE_REPOSITORY: initialEvent.EVENT_MESSAGE_REPOSITORY,
    SYNC_DIALOGS_USE_CASE: initialSync.SYNC_DIALOGS_USE_CASE,
    // SYNC_DIALOGS_USE_CASE: new SyncDialogsUseCase(
    //   new DialogsRepository(
    //     initialValues.LOCAL_DATA_SOURCE,
    //     initialValues.REMOTE_DATA_SOURCE,
    //   ),
    //   initialValues.CONNECTION_REPOSITORY,
    //   initialEvent.EVENT_MESSAGE_REPOSITORY,
    // ),
  },
  InitParams: {
    accountData: DefaultConfigurations.getDefaultQBConfig().credentials,
    maxFileSize:
      DefaultConfigurations.getDefaultQBConfig().appConfig.maxFileSize,
    qbConfig: DefaultConfigurations.getDefaultQBConfig(),
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
  release: (): void => {
    console.log(`function release start`);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    initialSync.SYNC_DIALOGS_USE_CASE.release();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    initialValues.CONNECTION_REPOSITORY.stopKeepAlive();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    initialValues.REMOTE_DATA_SOURCE.disconnectAndLogoutUser().catch();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    initialValues.LOCAL_DATA_SOURCE.clearAll().catch();
    console.log(`function release end`);
  },
  authorize: async (authorizationData: AuthorizationData): Promise<void> => {
    console.log('UI Kit authorize');
    initialValues.REMOTE_DATA_SOURCE.authInformation = authorizationData;
    initialValues.REMOTE_DATA_SOURCE.setAuthProcessedSuccessed();
    //
    initialValues.REMOTE_DATA_SOURCE.initEventsHandlers();
    //
    console.log('UI Kit authorize event handler has initialized');
    //
    await initialValues.CONNECTION_REPOSITORY.initializeStates();
    if (!initialValues.CONNECTION_REPOSITORY.needInit) {
      initialValues.CONNECTION_REPOSITORY.keepALiveChatConnection();
    }
    await initialSync.SYNC_DIALOGS_USE_CASE.execute(() => {
      console.log('sync dialogs has started');
    }).catch(() => {
      console.log('sync dialogs has exception');
    });
    //
    console.log(`function authorize end`);
    //
  },
  setSubscribeOnSessionExpiredListener: (
    callback: CallBackFunction<boolean>,
  ): void => {
    initialValues.REMOTE_DATA_SOURCE.subscribeOnSessionExpiredListener(
      callback,
    );
  },
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
    SYNC_DIALOGS_USE_CASE: initialSync.SYNC_DIALOGS_USE_CASE,
    // SYNC_DIALOGS_USE_CASE: new SyncDialogsUseCase(
    //   new DialogsRepository(
    //     initialValues.LOCAL_DATA_SOURCE,
    //     initialValues.REMOTE_DATA_SOURCE,
    //   ),
    //   initialValues.CONNECTION_REPOSITORY,
    //   initialEvent.EVENT_MESSAGE_REPOSITORY,
    // ),
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
      login: loginData?.login || '',
      password: loginData?.password || '',
    },
    maxFileSize,
    qbConfig,
  });

  console.log('have InitParams useState completed');
  const updateQBInitParams = (initParams: InitParams) => {
    console.log(`log updateQBInitParams ${JSON.stringify(initParams)}`);
    setInitParams(initParams);
  };

  const release = (): void => {
    console.log(`function release start`);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    initialSync.SYNC_DIALOGS_USE_CASE.release();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    initialValues.CONNECTION_REPOSITORY.stopKeepAlive();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    initialValues.REMOTE_DATA_SOURCE.disconnectAndLogoutUser().catch();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    initialValues.LOCAL_DATA_SOURCE.clearAll().catch();
    console.log(`function release end`);
  };
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const authorize = (authorizationData: AuthorizationData): Promise<void> => {
    initialValues.REMOTE_DATA_SOURCE.authInformation = authorizationData;
    initialValues.REMOTE_DATA_SOURCE.setAuthProcessedSuccessed();
  };

  const setSubscribeOnSessionExpiredListener = (
    callback: CallBackFunction<boolean>,
  ): void => {
    initialValues.REMOTE_DATA_SOURCE.subscribeOnSessionExpiredListener(
      callback,
    );
  };

  // todo: temporary off, must turn on
  // todo: cause of recycle v1
  // storage.CONNECTION_REPOSITORY.keepALiveChatConnection();
  // todo: temporary off, must turn on
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  // storage.SYNC_DIALOGS_USE_CASE.execute(() => {});

  // todo: MUST use apiKeyOrSessionToken or login/pass to re-init
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
        release,
        authorize,
        setSubscribeOnSessionExpiredListener,
        storage,
        updateStorage,
      }}
    >
      {children}
    </Provider>
  );
}

export default QuickBloxUIKitProvider;
