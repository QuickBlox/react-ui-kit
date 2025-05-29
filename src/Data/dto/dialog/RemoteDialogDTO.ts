import { DialogType } from '../../../Domain/entity/DialogTypes';

export class RemoteDialogDTO {
  public id: string;

  public type: DialogType;

  public ownerId: string;

  public participantId: string;

  public participantsIds: Array<number>;

  public newParticipantsIds?: Array<number>;

  public updatedAt: string;

  public lastMessageText: string;

  public lastMessageUserId: number;

  public lastMessageDateSent: number;

  public lastMessageId: string;

  public unreadMessageCount: number;

  public name: string;

  public photo: string;

  public is_join_required: number | undefined | null;

  constructor() {
    this.id = '';
    this.type = 0;

    this.ownerId = '';

    this.participantId = '';

    this.participantsIds = [];

    this.updatedAt = '';

    this.lastMessageText = '';

    this.lastMessageUserId = 0;

    this.lastMessageDateSent = 0;

    this.lastMessageId = '';

    this.unreadMessageCount = 0;

    this.name = '';

    this.photo = '';

    this.is_join_required = undefined;
  }
}
