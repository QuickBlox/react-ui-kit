import ChatMessageAttachmentEntity from '../../../Domain/entity/ChatMessageAttachmentEntity';
import { DialogType } from '../../../Domain/entity/DialogTypes';

export class RemoteMessageDTO {
  public id: string;

  public dialogId: string;

  public message: string;

  public created_at: string;

  public date_sent: number;

  public delivered_ids: Array<number>;

  public read_ids: Array<number>;

  public read: 0 | 1;

  public recipient_id: number;

  public sender_id: number;

  public updated_at: string;

  // todo: pay attention on those field, we haven't it before
  public notification_type?: string;

  public dialog_type?: DialogType;

  public markable?: string;

  public attachments: ChatMessageAttachmentEntity[];

  public qb_message_action?: 'forward' | 'reply';

  public origin_sender_name?: string;

  // eslint-disable-next-line no-use-before-define
  public qb_original_messages?: RemoteMessageDTO[];

  constructor() {
    this.id = new Date().getTime().toString();
    this.dialogId = '';
    this.message = '';
    this.created_at = new Date().toString();
    this.date_sent = new Date().getTime();
    this.delivered_ids = new Array<number>();
    this.read_ids = new Array<number>();
    this.recipient_id = 0;
    this.read = 0;
    this.sender_id = 0;
    this.updated_at = new Date().toString();
    this.notification_type = '';
    this.attachments = [];
  }
}
