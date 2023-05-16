import { DialogType } from '../../../Domain/entity/DialogTypes';
export declare class LocalDialogDTO {
    id: string;
    type: DialogType;
    ownerId: string;
    participantId: string;
    participantsIds: Array<number>;
    updatedAt: string;
    lastMessageText: string;
    lastMessageDateSent: string;
    lastMessageUserId: string;
    unreadMessageCount: number;
    name: string;
    photo: string;
    constructor();
}
