import { RemoteDialogDTO } from '../../dto/dialog/RemoteDialogDTO';
import { RemoteDialogsDTO } from '../../dto/dialog/RemoteDialogsDTO';
import { RemoteUserDTO } from '../../dto/user/RemoteUserDTO';
import { RemoteUsersDTO } from '../../dto/user/RemoteUsersDTO';
import { RemoteMessagesDTO } from '../../dto/message/RemoteMessagesDTO';
import { RemoteMessageDTO } from '../../dto/message/RemoteMessageDTO';
import { RemoteFileDTO } from '../../dto/file/RemoteFileDTO';
import { Pagination } from '../../../Domain/repository/Pagination';
import { CallBackFunction } from '../../../Domain/use_cases/base/IUseCase';
import { NotificationTypes } from '../../../Domain/entity/NotificationTypes';
export interface IRemoteMessaging<TArg> {
    subscribeOnSystemMessaging(notificationType: NotificationTypes, callback: CallBackFunction<TArg>): void;
    subscribeOnMessaging(callback: CallBackFunction<TArg>): void;
    releaseSubscriptions(): void;
}
export interface IRemoteDataSource extends IRemoteMessaging<RemoteMessageDTO> {
    createDialog(dto: RemoteDialogDTO): Promise<RemoteDialogDTO>;
    updateDialog(dto: RemoteDialogDTO): Promise<RemoteDialogDTO>;
    getDialog(dto: RemoteDialogDTO): Promise<RemoteDialogDTO>;
    getDialogs(pagination?: Pagination): Promise<RemoteDialogsDTO>;
    deleteDialog(dto: RemoteDialogDTO): Promise<void>;
    deleteUsersFromDialog(dialogDto: RemoteDialogDTO, usersDTO: Array<RemoteUserDTO>): Promise<void>;
    getUser(dto: RemoteUserDTO): Promise<RemoteUserDTO>;
    getUsers(dto: RemoteUsersDTO): Promise<RemoteUsersDTO>;
    getMessages(dialogId: string, pagination: Pagination): Promise<RemoteMessagesDTO>;
    typingMessageStart(dialogDTO: RemoteDialogDTO, senderId: number): Promise<void>;
    typingMessageStop(dialogDTO: RemoteDialogDTO, senderId: number): Promise<void>;
    sendMessage(dto: RemoteMessageDTO): Promise<RemoteMessageDTO>;
    sendSystemMessage(dto: RemoteMessageDTO): Promise<boolean>;
    updateMessage(dto: RemoteMessageDTO): Promise<RemoteMessageDTO>;
    deleteMessage(dto: RemoteMessageDTO): Promise<void>;
    createFile(dto: RemoteFileDTO): Promise<RemoteFileDTO>;
    getFile(dto: RemoteFileDTO): Promise<RemoteFileDTO>;
    deleteFile(dto: RemoteFileDTO): Promise<void>;
    subscribeToChatConnectionEvents(fileId: string): Promise<void>;
}
