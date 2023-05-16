import { IUseCase } from './base/IUseCase';
import DialogsRepository from '../../Data/repository/DialogsRepository';
import EventMessagesRepository from '../../Data/repository/EventMessagesRepository';
import { DialogEntity } from '../entity/DialogEntity';
import { RemoteMessageDTO } from '../../Data/dto/message/RemoteMessageDTO';
import { DialogType } from '../entity/DialogTypes';
import { GroupDialogEntity } from '../entity/GroupDialogEntity';
import { PrivateDialogEntity } from '../entity/PrivateDialogEntity';
import { NotificationTypes } from '../entity/NotificationTypes';
import EventMessageType from '../entity/EventMessageType';
import { stringifyError } from '../../utils/parse';

export class RemoveUsersFromTheDialogUseCase
  implements IUseCase<void, boolean>
{
  private dialogRepository: DialogsRepository;

  private eventMessagesRepository: EventMessagesRepository;

  private dialogToLeave: DialogEntity;

  private usersIds: Array<number>;

  constructor(
    eventMessagesRepository: EventMessagesRepository,
    dialogRepository: DialogsRepository,
    dialog: DialogEntity,
    usersIds: Array<number>,
  ) {
    console.log('CONSTRUCTOR LeaveDialogUseCase');
    this.eventMessagesRepository = eventMessagesRepository;
    this.dialogRepository = dialogRepository;
    this.dialogToLeave = dialog;
    this.usersIds = usersIds;
  }

  async execute(): Promise<boolean> {
    console.log('execute LeaveDialogUseCase');
    let resultOperation = false;

    //
    const remoteMessageDTO: RemoteMessageDTO = new RemoteMessageDTO();
    let receivers: number[] = [];

    if (this.dialogToLeave.type === DialogType.group) {
      receivers = [...(this.dialogToLeave as GroupDialogEntity).participantIds];
    }

    if (this.dialogToLeave.type === DialogType.private) {
      receivers = [(this.dialogToLeave as PrivateDialogEntity).participantId];
    }

    remoteMessageDTO.dialogId = this.dialogToLeave.id;
    remoteMessageDTO.notification_type = NotificationTypes.DELETE_LEAVE_DIALOG;
    remoteMessageDTO.date_sent = Date.now();
    remoteMessageDTO.message = `User ${this.dialogToLeave.ownerId} has left dialog.`;

    this.eventMessagesRepository.dispatchEvent<RemoteMessageDTO>(
      EventMessageType.RegularMessage,
      remoteMessageDTO,
      receivers,
    );
    //

    await this.dialogRepository
      .deleteUsersFromDialogFromRemote(this.dialogToLeave.id, this.usersIds)
      .then(() => {
        resultOperation = true;
        console.log('dialog was deleted users from Dialog successes');

        return resultOperation;
      })
      .catch((reason) => {
        console.log(
          'have exception in delete users from Dialog : ',
          stringifyError(reason),
        );
        resultOperation = false;
      });
    if (resultOperation) {
      console.log('try to delete dialog in local');

      remoteMessageDTO.dialogId = this.dialogToLeave.id;
      remoteMessageDTO.notification_type =
        NotificationTypes.DELETE_LEAVE_DIALOG;

      await this.dialogRepository.deleteDialogFromLocal(this.dialogToLeave.id);
      this.eventMessagesRepository.dispatchEvent<RemoteMessageDTO>(
        EventMessageType.LocalMessage,
        remoteMessageDTO,
        [],
      );

      this.eventMessagesRepository.dispatchEvent<RemoteMessageDTO>(
        EventMessageType.SystemMessage,
        remoteMessageDTO,
        receivers,
      );
    }

    return resultOperation;
  }
}
