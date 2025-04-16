import { IUseCase } from './base/IUseCase';
import { MessageEntity } from '../entity/MessageEntity';
import MessagesRepository from '../../Data/repository/MessagesRepository';

export class SendTextMessageUseCase implements IUseCase<void, MessageEntity> {
  private messagesRepository: MessagesRepository;

  private messageToSend: MessageEntity;

  constructor(
    messagesRepository: MessagesRepository,
    messageToSend: MessageEntity,
  ) {
    this.messagesRepository = messagesRepository;
    this.messageToSend = messageToSend;
  }

  async execute(): Promise<MessageEntity> {
    const sentMessage: MessageEntity =
      await this.messagesRepository.sendMessageToRemote(this.messageToSend);

    return Promise.resolve(sentMessage);
  }
}
