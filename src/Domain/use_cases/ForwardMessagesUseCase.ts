import { IUseCase } from './base/IUseCase';
import { MessageEntity } from '../entity/MessageEntity';
import MessagesRepository from '../../Data/repository/MessagesRepository';
import { DialogEntity } from '../entity/DialogEntity';
import { DialogType } from '../entity/DialogTypes';
import { PrivateDialogEntity } from '../entity/PrivateDialogEntity';

export class ForwardMessagesUseCase implements IUseCase<void, boolean> {
  private messagesRepository: MessagesRepository;

  private targetDialogs: DialogEntity[];

  private messagesToForward: MessageEntity[];

  private relatedMessage: MessageEntity;

  private userName: string;

  constructor(
    messagesRepository: MessagesRepository,
    targetDialogs: DialogEntity[],
    messagesToForward: MessageEntity[],
    relatedMessage: MessageEntity,
    userName: string,
  ) {
    console.log('CONSTRUCTOR ForwardMessagesUseCase');
    this.messagesRepository = messagesRepository;
    this.relatedMessage = relatedMessage;
    this.targetDialogs = targetDialogs;
    this.messagesToForward = messagesToForward;
    this.userName = userName;
  }

  async execute(): Promise<boolean> {
    console.log('execute ForwardMessagesUseCase');

    const promises = this.targetDialogs.map(async (targetDialog) => {
      const dialogId = targetDialog.id;

      const messageToSend: MessageEntity = {
        ...this.relatedMessage,
        dialogId,
        dialogType: targetDialog.type, // added by artik 2024-01-18
        qb_original_messages: this.messagesToForward,
        qb_message_action: 'forward',
        origin_sender_name:
          this.relatedMessage.sender?.full_name || this.userName,
      };

      // added by artik 2024-01-18
      if (targetDialog.type === DialogType.private) {
        messageToSend.recipient_id = (
          targetDialog as PrivateDialogEntity
        ).participantId;
      }
      const sentMessage = await this.messagesRepository.sendMessageToRemote(
        messageToSend,
      );

      return sentMessage;
    });

    const sentMessages: Awaited<MessageEntity | undefined>[] =
      await Promise.all(promises); // all - нужно, чтобы все промисы выполнились, а
    // Promise.allSettled(promises);// any - чтобы хотя бы один выполнился

    const allMessagesSent = sentMessages?.every(
      (message) => message && message.id && message.id.length > 0,
    );

    return Promise.resolve(allMessagesSent || false);
  }
}
