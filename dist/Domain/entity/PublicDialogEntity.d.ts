import { DialogEntity } from './DialogEntity';
import { CustomDataEntity } from './CustomDataEntity';
import { LastMessageEntity } from './LastMessageEntity';
import { DialogType } from './DialogTypes';
export declare class PublicDialogEntity implements DialogEntity {
    customData: CustomDataEntity;
    id: string;
    lastMessage: LastMessageEntity;
    readonly ownerId: string;
    type: DialogType;
    unreadMessageCount: number;
    updatedAt: string;
    name: string;
    photo: string;
    constructor(customData: CustomDataEntity, id: string, lastMessage: LastMessageEntity, ownerId: string, type: DialogType, unreadMessageCount: number, updatedAt: string, name: string, photo: string);
    static getParticipants: (d: DialogEntity) => number[];
    static getNewParticipants: (d: DialogEntity) => number[];
}
