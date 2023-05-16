import { ILocalDataSource } from '../source/local/ILocalDataSource';
import { IRemoteDataSource } from '../source/remote/IRemoteDataSource';
import { DialogEntity } from '../../Domain/entity/DialogEntity';
import { IDialogsRepository } from '../../Domain/repository/IDialogsRepository';
import { FunctionTypeVoidToVoid } from '../../Presentation/Views/Base/BaseViewModel';
import { PaginatedResult, Pagination } from '../../Domain/repository/Pagination';
export default class DialogsRepository implements IDialogsRepository {
    private localDataStorage;
    private remoteDataSource;
    private dialogRemoteDTOMapper;
    private dialogLocalDTOMapper;
    constructor(localDataStorage: ILocalDataSource, remoteDataSource: IRemoteDataSource);
    subscribeLocalSync(subscriber: FunctionTypeVoidToVoid): void;
    unsubscribeLocalSync(): void;
    isLocalSynced(): Promise<boolean>;
    setLocalSynced(synced: boolean): void;
    saveDialogToLocal(entity: DialogEntity): Promise<boolean>;
    createDialogInRemote(entity: DialogEntity): Promise<DialogEntity>;
    updateDialogInLocal(entity: DialogEntity): Promise<DialogEntity>;
    updateDialogInRemote(entity: DialogEntity): Promise<DialogEntity>;
    getDialogFromLocal(dialogId: string): Promise<DialogEntity>;
    getDialogFromRemote(dialogId: string): Promise<DialogEntity>;
    getDialogsFromLocal(pagination?: Pagination): Promise<Array<DialogEntity>>;
    getDialogsFromRemote(pagination?: Pagination): Promise<PaginatedResult<DialogEntity>>;
    deleteDialogFromLocal(dialogId: string): Promise<boolean>;
    deleteDialogFromRemote(dialogId: string): Promise<boolean>;
    deleteUsersFromDialogFromRemote(dialogId: string, usersIds: Array<number>): Promise<boolean>;
}
