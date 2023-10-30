import { DialogEntity } from '../entity/DialogEntity';
import DialogsRepository from '../../Data/repository/DialogsRepository';
import { IUseCase } from './base/IUseCase';
import { GroupDialogEntity } from '../entity/GroupDialogEntity';
import { RemoteMessageDTO } from '../../Data/dto/message/RemoteMessageDTO';
import { NotificationTypes } from '../entity/NotificationTypes';
import EventMessagesRepository from '../../Data/repository/EventMessagesRepository';
import EventMessageType from '../entity/EventMessageType';

export class UpdateDialogUseCase implements IUseCase<void, DialogEntity> {
  private dialogRepository: DialogsRepository;

  private eventMessagesRepository: EventMessagesRepository;

  private updateDialog: GroupDialogEntity;

  private textInformationMessage: string;

  constructor(
    eventMessagesRepository: EventMessagesRepository,
    dialogRepository: DialogsRepository,
    updateDialog: GroupDialogEntity,
    textInformationMessage: string,
  ) {
    console.log('CONSTRUCTOR UpdateDialogUseCase');
    this.dialogRepository = dialogRepository;
    this.updateDialog = updateDialog;
    this.eventMessagesRepository = eventMessagesRepository;
    this.textInformationMessage = textInformationMessage;
  }

  async execute(): Promise<DialogEntity> {
    console.log('execute UpdateDialogUseCase');
    const result: DialogEntity =
      await this.dialogRepository.updateDialogInRemote(this.updateDialog);

    await this.dialogRepository.updateDialogInLocal(result);

    const remoteMessageDTO: RemoteMessageDTO = new RemoteMessageDTO();

    remoteMessageDTO.dialogId = result.id;
    remoteMessageDTO.notification_type = NotificationTypes.UPDATE_DIALOG;
    remoteMessageDTO.date_sent = Date.now();
    remoteMessageDTO.message =
      this.textInformationMessage && this.textInformationMessage.length > 0
        ? this.textInformationMessage
        : `User ${this.updateDialog.ownerId} has updated dialog ${this.updateDialog.name}`;

    this.eventMessagesRepository.dispatchEvent<RemoteMessageDTO>(
      EventMessageType.RegularMessage,
      remoteMessageDTO,
      [],
    );

    remoteMessageDTO.dialogId = result.id;
    remoteMessageDTO.notification_type = NotificationTypes.UPDATE_DIALOG;

    this.eventMessagesRepository.dispatchEvent<RemoteMessageDTO>(
      EventMessageType.SystemMessage,
      remoteMessageDTO,
      [...this.updateDialog.participantIds],
    );

    this.eventMessagesRepository.dispatchEvent<DialogEntity>(
      EventMessageType.LocalMessage,
      result,
      [],
    );

    return Promise.resolve(result);
  }
}
