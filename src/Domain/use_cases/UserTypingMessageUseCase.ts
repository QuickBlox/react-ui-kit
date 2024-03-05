import { IUseCase } from './base/IUseCase';
import MessagesRepository from '../../Data/repository/MessagesRepository';
import { DialogEntity } from '../entity/DialogEntity';

export class UserTypingMessageUseCase implements IUseCase<void, void> {
  private messagesRepository: MessagesRepository;

  private readonly senderId: number;

  private readonly dialog: DialogEntity;

  private typingTimeout = 3;

  private _typingTimer: NodeJS.Timer | undefined;

  private _typingTime = 0;

  constructor(
    messagesRepository: MessagesRepository,
    dialog: DialogEntity,
    senderId: number,
  ) {
    console.log('CONSTRUCTOR SendUserIsTypingMessageUseCase');
    this.messagesRepository = messagesRepository;
    this.dialog = dialog;
    this.senderId = senderId;
  }

  async execute(): Promise<void> {
    console.log('execute SendUserIsTypingMessageUseCase');
    this._typingTime = Date.now();
    if (!this._typingTimer) {
      await this.messagesRepository.typingMessageStart(
        this.dialog,
        this.senderId,
      );
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      this._typingTimer = setInterval(() => {
        if ((Date.now() - this._typingTime) / 1000 >= this.typingTimeout) {
          this.messagesRepository.typingMessageStop(this.dialog, this.senderId);
          clearInterval(this._typingTimer);
          this._typingTimer = undefined;
          this._typingTime = 0;
        }
      }, 500);
    }

    return Promise.resolve();
  }
}
