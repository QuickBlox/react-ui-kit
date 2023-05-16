import { DialogType } from '../../../Domain/entity/DialogTypes';
export declare class RemoteDialogDTO {
    id: string;
    type: DialogType;
    ownerId: string;
    participantId: string;
    participantsIds: Array<number>;
    newParticipantsIds?: Array<number>;
    updatedAt: string;
    lastMessageText: string;
    lastMessageUserId: string;
    lastMessageDateSent: string;
    lastMessageId: string;
    unreadMessageCount: number;
    name: string;
    photo: string;
    constructor();
}
