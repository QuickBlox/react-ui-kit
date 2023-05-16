import { LocalDataSource } from '../source/local/LocalDataSource';
import { RemoteDataSource } from '../source/remote/RemoteDataSource';
import { IMessagesRepository } from '../../Domain/repository/IMessagesRepository';
import { MessageEntity } from '../../Domain/entity/MessageEntity';
import { PaginatedResult, Pagination } from '../../Domain/repository/Pagination';
import { DialogEntity } from '../../Domain/entity/DialogEntity';
export default class MessagesRepository implements IMessagesRepository {
    private localDataStorage;
    private remoteDataSource;
    private messageRemoteDTOMapper;
    private messageLocalDTOMapper;
    private dialogRemoteDTOMapper;
    constructor(localDataStorage: LocalDataSource, remoteDataSource: RemoteDataSource);
    deleteMessageInLocal(entity: MessageEntity): Promise<boolean>;
    deleteMessageInRemote(entity: MessageEntity): Promise<boolean>;
    getMessagesFromLocal(dialogId: string): Promise<Array<MessageEntity>>;
    getMessagesFromRemote(dialogId: string, pagination: Pagination): Promise<PaginatedResult<MessageEntity>>;
    typingMessageStart(dialog: DialogEntity, senderId: number): Promise<void>;
    typingMessageStop(dialog: DialogEntity, senderId: number): Promise<void>;
    saveMessageToLocal(entity: MessageEntity): Promise<boolean>;
    sendMessageToRemote(entity: MessageEntity): Promise<boolean>;
    updateMessageInLocal(entity: MessageEntity): Promise<boolean>;
    updateMessageInRemote(entity: MessageEntity): Promise<boolean>;
}
