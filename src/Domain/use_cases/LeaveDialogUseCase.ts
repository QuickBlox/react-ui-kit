import { IUseCase } from './base/IUseCase';
import { DialogEntity } from '../entity/DialogEntity';
import DialogsRepository from '../../Data/repository/DialogsRepository';
import { RemoteMessageDTO } from '../../Data/dto/message/RemoteMessageDTO';
import { stringifyError } from '../../utils/parse';
import { NotificationTypes } from '../entity/NotificationTypes';
import { DialogType } from '../entity/DialogTypes';
import { GroupDialogEntity } from '../entity/GroupDialogEntity';
import { PrivateDialogEntity } from '../entity/PrivateDialogEntity';
import EventMessagesRepository from '../../Data/repository/EventMessagesRepository';
import EventMessageType from '../entity/EventMessageType';

export const DialogLeaveType = {
  delete: 'delete',
  deleteForce: 'deleteForce',
  leave: 'leave',
} as const;

export type DialogLeaveTypeArcheType = keyof typeof DialogLeaveType;

export class LeaveDialogUseCase implements IUseCase<void, boolean> {
  private dialogRepository: DialogsRepository;

  private eventMessagesRepository: EventMessagesRepository;

  private dialogToLeave: DialogEntity;

  private leaveType: DialogLeaveTypeArcheType;

  constructor(
    eventMessagesRepository: EventMessagesRepository,
    dialogRepository: DialogsRepository,
    dialog: DialogEntity,
    leaveType: DialogLeaveTypeArcheType,
  ) {
    console.log('CONSTRUCTOR LeaveDialogUseCase');
    this.eventMessagesRepository = eventMessagesRepository;
    this.dialogRepository = dialogRepository;
    this.dialogToLeave = dialog;
    this.leaveType = leaveType;
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
      .deleteDialogFromRemote(this.dialogToLeave.id)
      .then(() => {
        resultOperation = true;
        console.log('dialog was deleted successes');

        return resultOperation;
      })
      .catch((reason) => {
        console.log(
          'have exception in deleteDialogFromRemote: ',
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
