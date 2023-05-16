import { DialogEntity } from './DialogEntity';
import { CustomDataEntity } from './CustomDataEntity';
import { LastMessageEntity } from './LastMessageEntity';
import { DialogType } from './DialogTypes';
import { GroupDialogEntity } from './GroupDialogEntity';

export class PublicDialogEntity implements DialogEntity {
  customData: CustomDataEntity;

  id: string;

  lastMessage: LastMessageEntity;

  readonly ownerId: string;

  type: DialogType;

  unreadMessageCount: number;

  updatedAt: string;

  name: string;

  photo: string;

  constructor(
    customData: CustomDataEntity,
    id: string,
    lastMessage: LastMessageEntity,
    ownerId: string,
    type: DialogType,
    unreadMessageCount: number,
    updatedAt: string,
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
    this.name = name;
    this.photo = photo;
  }

  public static getParticipants = (d: DialogEntity) => {
    if (d.type === DialogType.group) {
      return (d as GroupDialogEntity).participantIds;
    }
    if (
      d.type === DialogType.private &&
      (d as GroupDialogEntity).participantIds.length > 0
    ) {
      // return [(d as PrivateDialogEntity).participantId];
      return [(d as GroupDialogEntity).participantIds[0]];
    }

    return [];
  };

  public static getNewParticipants = (d: DialogEntity) => {
    if (d.type === DialogType.group) {
      const newParticipants = (d as GroupDialogEntity).newParticipantIds;

      return newParticipants || [];
    }

    return [];
  };
}
