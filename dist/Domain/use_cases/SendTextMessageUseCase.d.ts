import { IUseCase } from './base/IUseCase';
import { MessageEntity } from '../entity/MessageEntity';
import MessagesRepository from '../../Data/repository/MessagesRepository';
export declare class SendTextMessageUseCase implements IUseCase<void, MessageEntity> {
    private messagesRepository;
    private messageToSend;
    constructor(messagesRepository: MessagesRepository, messageToSend: MessageEntity);
    execute(): Promise<MessageEntity>;
}
