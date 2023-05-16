import { DialogEntity } from './DialogEntity';
import { CustomDataEntity } from './CustomDataEntity';
import { LastMessageEntity } from './LastMessageEntity';
import { DialogType } from './DialogTypes';

export class PrivateDialogEntity implements DialogEntity {
  customData: CustomDataEntity;

  id: string;

  name: string;

  lastMessage: LastMessageEntity;

  readonly ownerId: string;

  type: DialogType;

  unreadMessageCount: number;

  updatedAt: string;

  participantId: number;

  constructor(
    customData: CustomDataEntity,
    id: string,
    name: string,
    lastMessage: LastMessageEntity,
    ownerId: string,
    type: DialogType,
    unreadMessageCount: number,
    updatedAt: string,
    participantId: number,
  ) {
    this.customData = customData;
    this.id = id;
    this.name = name;
    this.lastMessage = lastMessage;
    this.ownerId = ownerId;
    this.type = type;
    this.unreadMessageCount = unreadMessageCount;
    this.updatedAt = updatedAt;
    this.participantId = participantId;
  }
}
