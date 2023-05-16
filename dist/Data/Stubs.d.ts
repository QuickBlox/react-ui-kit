import { DialogEntity } from '../Domain/entity/DialogEntity';
import { DialogType } from '../Domain/entity/DialogTypes';
import { RemoteDialogDTO } from './dto/dialog/RemoteDialogDTO';
import { UserEntity } from '../Domain/entity/UserEntity';
import { MessageEntity } from '../Domain/entity/MessageEntity';
import ChatMessageAttachmentEntity from '../Domain/entity/ChatMessageAttachmentEntity';
import { LocalDataSource } from './source/local/LocalDataSource';
import { FileEntity } from '../Domain/entity/FileEntity';
export declare class Stubs {
    static initializeWithUsersMockData(ds: LocalDataSource): Promise<void>;
    static initializeWithDialogsMockData(ds: LocalDataSource): Promise<void>;
    static initializeWithMessagesMockData(ds: LocalDataSource): Promise<void>;
    static createDialogEntityByTypeWithEmptyValues(dialogType: DialogType): DialogEntity;
    static createDialogEntityWithError(): DialogEntity;
    static createDialogEntityByTypeWithDefaultValues(dialogType: DialogType): DialogEntity;
    static createDialogDTOByTypeWithDefaultValues(dialogType: DialogType): RemoteDialogDTO;
    static createArrayDialogDTOByTypeWithDefaultValues(count: number, dialogType: DialogType): RemoteDialogDTO[];
    static createArrayPublicDialogDTO(): RemoteDialogDTO[];
    static createPublicDialogQBWithEmptyValues(): QBChatDialog;
    static createPrivateDialogQBWithEmptyValues(): QBChatDialog;
    static createGroupDialogQBWithEmptyValues(): QBChatDialog;
    static createDialogEntityWithParams(dialogType: DialogType, id: string, name: string, dateSentLastMessage: string, textLastMessage: string, userIdLastMessage: number, ownerId: string, unreadMessageCount: number, updatedAt: string, participantId: number, photo?: string, participantIds?: number[]): DialogEntity;
    static createUserEntityWithParams(id: number, full_name: string, email: string, login: string, created_at: string, updated_at: string, last_request_at: string, custom_data?: string | null, user_tags?: string | null, blob_id?: string): UserEntity;
    static createMessageEntityWithParams(id: number, dialogId: string, message: string, created_at: string, date_sent: number, updated_at: string, delivered_ids: Array<number>, read_ids: Array<number>, read: number, sender_id: number, recipient_id: number, attachments?: ChatMessageAttachmentEntity[], notification_type?: string, dialog_type?: DialogType): MessageEntity;
    static createDialogsForTest(): Array<DialogEntity>;
    static createUsersForTest(): Array<UserEntity>;
    static createMessagesForTest(): Array<MessageEntity>;
    static createFileEntityWithDefaultValues(): FileEntity;
}
