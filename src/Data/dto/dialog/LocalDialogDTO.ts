import { DialogType } from '../../../Domain/entity/DialogTypes';

export class LocalDialogDTO {
  public id: string;

  public type: DialogType;

  public ownerId: string;

  public participantId: string;

  public participantsIds: Array<number>;

  public updatedAt: string;

  public lastMessageText: string;

  public lastMessageDateSent: string;

  public lastMessageUserId: string;

  public unreadMessageCount: number;

  public name: string;

  public photo: string;

  constructor() {
    this.id = '';
    this.type = 0;
    this.ownerId = '';
    this.participantId = '';
    this.participantsIds = [];
    this.updatedAt = '';
    this.lastMessageText = '';
    this.lastMessageDateSent = '';
    this.lastMessageUserId = '';
    this.unreadMessageCount = 0;
    this.name = '';
    this.photo = '';
  }
}
