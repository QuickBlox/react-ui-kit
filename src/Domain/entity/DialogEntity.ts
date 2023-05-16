import { DialogType } from './DialogTypes';
import { LastMessageEntity } from './LastMessageEntity';
import { CustomDataEntity } from './CustomDataEntity';

export interface DialogEntity {
  id: string;
  name: string;
  type: DialogType;
  ownerId: string;
  updatedAt: string;

  lastMessage: LastMessageEntity;
  unreadMessageCount: number;
  customData: CustomDataEntity;
}
