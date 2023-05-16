import React from 'react';
import { ProviderProps } from '../ProviderProps';
import { LocalDataSource } from '../../../../Data/source/local/LocalDataSource';
import { LoginData, RemoteDataSource } from '../../../../Data/source/remote/RemoteDataSource';
import { BaseUseCase } from '../../../../Domain/use_cases/base/BaseUseCase';
import ConnectionRepository from '../../../../Data/repository/ConnectionRepository';
import EventMessagesRepository from '../../../../Data/repository/EventMessagesRepository';
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
    qbConfig?: QBConfig;
    loginData?: LoginData;
};
type QuickBloxProviderProps = ProviderProps & InitParams;
type QBDataStorage = {
    LOCAL_DATA_SOURCE: LocalDataSource;
    REMOTE_DATA_SOURCE: RemoteDataSource;
    SYNC_DIALOGS_USE_CASE: BaseUseCase<boolean, boolean>;
    CONNECTION_REPOSITORY: ConnectionRepository;
    EVENT_MESSAGE_REPOSITORY: EventMessagesRepository;
};
export type QBReactUIKitVersionInfo = {
    version: string;
    build: string;
};
export type QBDataContextType = {
    storage: QBDataStorage;
    InitParams: InitParams;
    updateStorage: (storage: QBDataStorage) => void;
    updateQBInitParams: (InitParams: InitParams) => void;
};
export declare const qbDataContext: React.Context<QBDataContextType>;
declare function QuickBloxUIKitProvider({ children, accountData, qbConfig, loginData, maxFileSize, }: QuickBloxProviderProps): JSX.Element;
export default QuickBloxUIKitProvider;
