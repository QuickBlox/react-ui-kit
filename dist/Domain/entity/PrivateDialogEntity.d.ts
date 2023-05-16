import { DialogEntity } from './DialogEntity';
import { CustomDataEntity } from './CustomDataEntity';
import { LastMessageEntity } from './LastMessageEntity';
import { DialogType } from './DialogTypes';
export declare class PrivateDialogEntity implements DialogEntity {
    customData: CustomDataEntity;
    id: string;
    name: string;
    lastMessage: LastMessageEntity;
    readonly ownerId: string;
    type: DialogType;
    unreadMessageCount: number;
    updatedAt: string;
    participantId: number;
    constructor(customData: CustomDataEntity, id: string, name: string, lastMessage: LastMessageEntity, ownerId: string, type: DialogType, unreadMessageCount: number, updatedAt: string, participantId: number);
}
