import ChatMessageAttachmentEntity from './ChatMessageAttachmentEntity';
import { UserEntity } from './UserEntity';
import { DialogType } from './DialogTypes';
export interface MessageEntity {
    id: number;
    dialogId: string;
    dialogType?: DialogType;
    attachments?: ChatMessageAttachmentEntity[];
    notification_type?: string;
    markable?: string;
    created_at: string;
    date_sent: number;
    delivered_ids: Array<number>;
    message: string;
    read_ids: Array<number>;
    read: number;
    recipient_id: number;
    sender_id: number;
    sender?: UserEntity;
    updated_at: string;
}
