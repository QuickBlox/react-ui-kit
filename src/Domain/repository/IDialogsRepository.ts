import { DialogEntity } from '../entity/DialogEntity';
import { FunctionTypeVoidToVoid } from '../../Presentation/Views/Base/BaseViewModel';
import { PaginatedResult, Pagination } from './Pagination';

export interface IDialogsRepository {
  saveDialogToLocal(dialog: DialogEntity): Promise<boolean>;

  createDialogInRemote(dialog: DialogEntity): Promise<DialogEntity>;

  updateDialogInLocal(dialog: DialogEntity): Promise<DialogEntity>;

  updateDialogInRemote(dialog: DialogEntity): Promise<DialogEntity>;

  getDialogFromLocal(dialogId: string): Promise<DialogEntity>;

  getDialogFromRemote(dialogId: string): Promise<DialogEntity>;

  getDialogsFromLocal(pagination?: Pagination): Promise<Array<DialogEntity>>;

  getDialogsFromRemote(
    pagination?: Pagination,
  ): Promise<PaginatedResult<DialogEntity>>;

  deleteDialogFromLocal(dialogId: string): Promise<boolean>;

  deleteDialogFromRemote(dialogId: string): Promise<boolean>;

  deleteUsersFromDialogFromRemote(
    dialogId: string,
    userIds: Array<number>,
  ): Promise<boolean>;

  subscribeLocalSync(subscriber: FunctionTypeVoidToVoid): void;

  unsubscribeLocalSync(): void;

  isLocalSynced(): Promise<boolean>;

  setLocalSynced(synced: boolean): void;
}
