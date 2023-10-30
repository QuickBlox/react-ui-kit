import { MessageEntity } from '../entity/MessageEntity';
import { PaginatedResult, Pagination } from './Pagination';
import { DialogEntity } from '../entity/DialogEntity'

export interface IMessagesRepository {
  saveMessageToLocal(message: MessageEntity): Promise<MessageEntity>;

  sendMessageToRemote(message: MessageEntity): Promise<MessageEntity>;

  getMessagesFromLocal(dialogId: string): Promise<Array<MessageEntity>>;

  getMessagesFromRemote(
    dialogId: string,
    pagination: Pagination,
  ): Promise<PaginatedResult<MessageEntity>>;

  updateMessageInLocal(message: MessageEntity): Promise<boolean>;

  updateMessageInRemote(message: MessageEntity): Promise<boolean>;

  deleteMessageInLocal(message: MessageEntity): Promise<boolean>;

  deleteMessageInRemote(message: MessageEntity): Promise<boolean>;

  typingMessageStart(dialog: DialogEntity, senderId: number): Promise<void>;

  typingMessageStop(dialog: DialogEntity, senderId: number): Promise<void>;
}
