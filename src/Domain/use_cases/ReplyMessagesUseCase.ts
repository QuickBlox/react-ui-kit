import { IUseCase } from './base/IUseCase';
import { MessageEntity } from '../entity/MessageEntity';
import MessagesRepository from '../../Data/repository/MessagesRepository';

export class ReplyMessagesUseCase implements IUseCase<void, MessageEntity> {
  private messagesRepository: MessagesRepository;

  private messagesToReply: MessageEntity[];

  private relatedMessage: MessageEntity;

  constructor(
    messagesRepository: MessagesRepository,
    messagesToReply: MessageEntity[],
    relatedMessage: MessageEntity,
  ) {
    this.messagesRepository = messagesRepository;
    this.relatedMessage = relatedMessage;
    this.messagesToReply = messagesToReply;
  }

  async execute(): Promise<MessageEntity> {
    this.relatedMessage.qb_original_messages = this.messagesToReply;
    this.relatedMessage.qb_message_action = 'reply';
    this.relatedMessage.origin_sender_name =
      this.messagesToReply[0].origin_sender_name;

    const sentMessage: MessageEntity =
      await this.messagesRepository.sendMessageToRemote(this.relatedMessage);

    return Promise.resolve(sentMessage);
  }
}
