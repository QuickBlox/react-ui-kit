import { IUseCase } from './base/IUseCase';
import { MessageEntity } from '../entity/MessageEntity';
import { IMessagesRepository } from '../repository/IMessagesRepository';
import { Pagination } from '../repository/Pagination';
export declare class GetAllMessagesForDialogMock implements IUseCase<void, Array<MessageEntity>> {
    private messagesRepository;
    private readonly dialogId;
    private currentPagination;
    constructor(messagesRepository: IMessagesRepository, dialogId: string, currentPagination: Pagination);
    execute(): Promise<Array<MessageEntity>>;
}
