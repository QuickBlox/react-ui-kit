import ChatMessageAttachmentEntity from '../../../Domain/entity/ChatMessageAttachmentEntity';
import { DialogType } from '../../../Domain/entity/DialogTypes';
export declare class LocalMessageDTO {
    id: string;
    dialogId: string;
    dialog_type?: DialogType;
    message: string;
    created_at: string;
    date_sent: number;
    delivered_ids: Array<number>;
    read_ids: Array<number>;
    read: 0 | 1;
    recipient_id: number;
    sender_id: number;
    updated_at: string;
    attachments: ChatMessageAttachmentEntity[];
    notification_type?: string;
    markable?: string;
    constructor();
}
