import { DialogEntity } from './DialogEntity';
import { CustomDataEntity } from './CustomDataEntity';
import { LastMessageEntity } from './LastMessageEntity';
import { DialogType } from './DialogTypes';
export declare class GroupDialogEntity implements DialogEntity {
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
    constructor(customData: CustomDataEntity, id: string, lastMessage: LastMessageEntity, ownerId: string, type: DialogType, unreadMessageCount: number, updatedAt: string, participantIds: Array<number>, name: string, photo: string);
}
