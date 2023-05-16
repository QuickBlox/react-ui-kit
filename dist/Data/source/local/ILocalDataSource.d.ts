import { LocalDialogDTO } from '../../dto/dialog/LocalDialogDTO';
import { LocalDialogsDTO } from '../../dto/dialog/LocalDialogsDTO';
import { LocalUserDTO } from '../../dto/user/LocalUserDTO';
import { LocalMessageDTO } from '../../dto/message/LocalMessageDTO';
import { LocalMessagesDTO } from '../../dto/message/LocalMessagesDTO';
import { FunctionTypeVoidToVoid } from '../../../Presentation/Views/Base/BaseViewModel';
import { Pagination } from '../../../Domain/repository/Pagination';
export interface ILocalDataSource {
    subscribe(subscriber: FunctionTypeVoidToVoid): void;
    release(): void;
    isLocalSynced(): Promise<boolean>;
    setLocalSynced(synced: boolean): void;
    saveDialog(dtoDialog: LocalDialogDTO): Promise<boolean>;
    deleteDialog(dtoDialog: LocalDialogDTO): Promise<boolean>;
    getDialogs(pagination?: Pagination): Promise<LocalDialogsDTO>;
    getDialog(dtoDialog: LocalDialogDTO): Promise<LocalDialogDTO>;
    updateDialog(dtoDialog: LocalDialogDTO): Promise<boolean>;
    getUser(dtoUser: LocalUserDTO): Promise<LocalUserDTO>;
    saveUser(user: LocalUserDTO): Promise<boolean>;
    getMessages(dtoMessages: LocalMessagesDTO): Promise<LocalMessagesDTO>;
    saveMessage(dtoMessage: LocalMessageDTO): Promise<boolean>;
    updateMessage(dtoMessage: LocalMessageDTO): Promise<boolean>;
    deleteMessage(dtoMessage: LocalMessageDTO): Promise<boolean>;
    clearAll(): Promise<void>;
}
