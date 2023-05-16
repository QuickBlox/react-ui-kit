import { DialogEntity } from './DialogEntity';
import { CustomDataEntity } from './CustomDataEntity';
import { LastMessageEntity } from './LastMessageEntity';
import { DialogType } from './DialogTypes';

export class GroupDialogEntity implements DialogEntity {
  customData: CustomDataEntity;

  id: string;

  lastMessage: LastMessageEntity;

  readonly ownerId: string;

  type: DialogType;

  unreadMessageCount: number;

  updatedAt: string;

  participantIds: Array<number>;

  newParticipantIds?: Array<number>;

  participantsToRemoveIds?: Array<number>;

  name: string;

  photo: string | null;

  constructor(
    customData: CustomDataEntity,
    id: string,
    lastMessage: LastMessageEntity,
    ownerId: string,
    type: DialogType,
    unreadMessageCount: number,
    updatedAt: string,
    participantIds: Array<number>,
    name: string,
    photo: string,
  ) {
    this.customData = customData;
    this.id = id;
    this.lastMessage = lastMessage;
    this.ownerId = ownerId;
    this.type = type;
    this.unreadMessageCount = unreadMessageCount;
    this.updatedAt = updatedAt;
    this.participantIds = participantIds;
    this.name = name;
    this.photo = photo;
  }
}
