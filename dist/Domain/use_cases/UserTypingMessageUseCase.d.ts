import { IUseCase } from './base/IUseCase';
import MessagesRepository from '../../Data/repository/MessagesRepository';
import { DialogEntity } from '../entity/DialogEntity';
export declare class UserTypingMessageUseCase implements IUseCase<void, void> {
    private messagesRepository;
    private readonly senderId;
    private readonly dialog;
    private typingTimeout;
    private _typingTimer;
    private _typingTime;
    constructor(messagesRepository: MessagesRepository, dialog: DialogEntity, senderId: number);
    execute(): Promise<void>;
}
