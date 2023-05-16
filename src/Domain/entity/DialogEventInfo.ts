import EventMessageType from './EventMessageType';
import { NotificationTypes } from './NotificationTypes';
import { MessageEntity } from './MessageEntity';

export type MessageStatus = {
  isTyping: boolean;
  userId: number;
  dialogId: string;
};
export type DialogEventInfo = {
  eventMessageType: EventMessageType;
  notificationTypes: NotificationTypes | undefined;
  messageInfo: MessageEntity | undefined;
  messageStatus: MessageStatus | undefined;
};
