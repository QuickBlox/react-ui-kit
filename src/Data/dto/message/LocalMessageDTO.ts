import ChatMessageAttachmentEntity from '../../../Domain/entity/ChatMessageAttachmentEntity';
import { DialogType } from '../../../Domain/entity/DialogTypes';

export class LocalMessageDTO {
  public id: string;

  public dialogId: string;

  public dialog_type?: DialogType;

  public message: string;

  public created_at: string;

  public date_sent: number;

  public delivered_ids: Array<number>;

  public read_ids: Array<number>;

  public read: 0 | 1;

  public recipient_id: number;

  public sender_id: number;

  public updated_at: string;

  public attachments: ChatMessageAttachmentEntity[];

  public notification_type?: string;

  public markable?: string;

  constructor() {
    this.id = '';
    this.dialogId = '';
    this.message = '';
    this.created_at = '';
    this.date_sent = 0;
    this.delivered_ids = new Array<number>();
    this.read_ids = new Array<number>();
    this.recipient_id = 0;
    this.read = 0;
    this.sender_id = 0;
    this.updated_at = '';
    this.attachments = [];
  }
}
