import { DialogEntity } from '../entity/DialogEntity';
import DialogsRepository from '../../Data/repository/DialogsRepository';
import { IUseCase } from './base/IUseCase';
import { GroupDialogEntity } from '../entity/GroupDialogEntity';
import { stringifyError } from '../../utils/parse';
import { RemoteMessageDTO } from '../../Data/dto/message/RemoteMessageDTO';
import { NotificationTypes } from '../entity/NotificationTypes';
import EventMessagesRepository from '../../Data/repository/EventMessagesRepository';
import EventMessageType from '../entity/EventMessageType';

export class CreateDialogUseCase implements IUseCase<void, DialogEntity> {
  private dialogRepository: DialogsRepository;

  private eventMessagesRepository: EventMessagesRepository;

  private newDialog: GroupDialogEntity;

  private textInformationMessage: string;

  constructor(
    eventMessagesRepository: EventMessagesRepository,
    dialogRepository: DialogsRepository,
    newDialog: GroupDialogEntity,
    textInformationMessage: string,
  ) {
    this.dialogRepository = dialogRepository;
    this.newDialog = newDialog;
    this.eventMessagesRepository = eventMessagesRepository;
    this.textInformationMessage = textInformationMessage;
  }

  async execute(): Promise<DialogEntity> {
    console.log('execute CreateDialogUseCase', JSON.stringify(this.newDialog));
    const result: DialogEntity = await this.dialogRepository
      .createDialogInRemote(this.newDialog)
      .catch((e) => {
        const message = stringifyError(e);

        console.log('EXCEPTION IN CREATE DIALOG USE CASE', message);
        throw Error(message);
      });

    // добавляю локально
    await this.dialogRepository.saveDialogToLocal(result);
    // уведомляю
    this.eventMessagesRepository.dispatchEvent<DialogEntity>(
      EventMessageType.LocalMessage,
      result,
      [],
    );
    const remoteMessageDTO: RemoteMessageDTO = new RemoteMessageDTO();

    remoteMessageDTO.dialogId = result.id;
    remoteMessageDTO.notification_type = NotificationTypes.NEW_DIALOG;

    this.eventMessagesRepository.dispatchEvent<RemoteMessageDTO>(
      EventMessageType.SystemMessage,
      remoteMessageDTO,
      [...this.newDialog.participantIds],
    );

    remoteMessageDTO.dialogId = result.id;
    remoteMessageDTO.notification_type = NotificationTypes.NEW_DIALOG;
    remoteMessageDTO.date_sent = Date.now() / 1000;
    remoteMessageDTO.message =
      this.textInformationMessage && this.textInformationMessage.length > 0
        ? this.textInformationMessage
        : `User ${this.newDialog.ownerId} create new dialog ${this.newDialog.name}`;

    this.eventMessagesRepository.dispatchEvent<RemoteMessageDTO>(
      EventMessageType.RegularMessage,
      remoteMessageDTO,
      [...this.newDialog.participantIds],
    );

    return Promise.resolve(result);
  }
}
