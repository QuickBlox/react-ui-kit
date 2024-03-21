import EventMessageType from './EventMessageType';
import { NotificationTypes } from './NotificationTypes';
import { MessageEntity } from './MessageEntity';
import { DialogEntity } from './DialogEntity';

export type MessageStatus = {
  deliveryStatus: 'delivered' | 'read' | 'sent' | 'sending';
  isTyping: boolean;
  userId: number;
  dialogId: string;
  messageId: string;
};
export type DialogEventInfo = {
  eventMessageType: EventMessageType;
  notificationTypes: NotificationTypes | undefined;
  dialogInfo?: DialogEntity | undefined;
  messageInfo: MessageEntity | undefined;
  messageStatus: MessageStatus | undefined;
};
