import { ILocalDataSource } from './ILocalDataSource';
import { LocalDialogDTO } from '../../dto/dialog/LocalDialogDTO';
import { LocalMessageDTO } from '../../dto/message/LocalMessageDTO';
import { LocalDialogsDTO } from '../../dto/dialog/LocalDialogsDTO';
import { LocalMessagesDTO } from '../../dto/message/LocalMessagesDTO';
import { LocalUserDTO } from '../../dto/user/LocalUserDTO';
import { Pagination } from '../../../Domain/repository/Pagination';
import { SubscriptionPerformer } from '../../../Domain/use_cases/base/Subscribable/SubscriptionPerformer';
export declare class LocalDataSource extends SubscriptionPerformer<boolean> implements ILocalDataSource {
    private localSynced;
    isLocalSynced(): Promise<boolean>;
    setLocalSynced(synced: boolean): void;
    private dialogs;
    private users;
    private messages;
    clearAll(): Promise<void>;
    deleteDialog(dtoDialog: LocalDialogDTO): Promise<boolean>;
    deleteMessage(dtoMessage: LocalMessageDTO): Promise<boolean>;
    getDialog(dtoDialog: LocalDialogDTO): Promise<LocalDialogDTO>;
    getDialogs(pagination?: Pagination): Promise<LocalDialogsDTO>;
    getMessages(dtoMessages: LocalMessagesDTO): Promise<LocalMessagesDTO>;
    getUser(dtoUser: LocalUserDTO): Promise<LocalUserDTO>;
    saveDialog(dtoDialog: LocalDialogDTO): Promise<boolean>;
    saveMessage(dtoMessage: LocalMessageDTO): Promise<boolean>;
    saveUser(dtoUser: LocalUserDTO): Promise<boolean>;
    updateDialog(dtoDialog: LocalDialogDTO): Promise<boolean>;
    updateMessage(dtoMessage: LocalMessageDTO): Promise<boolean>;
}
