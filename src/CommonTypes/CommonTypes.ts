import {
  QBSystemMessage,
  QBUser,
  ChatMessageAttachment,
  QBChatDialog,
  QBChatNewMessage,
  QBConfig,
  QBCustomField,
} from 'quickblox';
import { Tone } from '../Presentation/Views/Dialog/AIWidgets/Tone';
import { AIMessageWidget } from '../Presentation/Views/Dialog/AIWidgets/AIMessageWidget';
import UiKitTheme from '../Presentation/themes/UiKitTheme';

export type ProxyConfig = {
  api: string;
  servername: string;
  port: string;
};
export interface WidgetConfig {
  smartChatAssistantId: string; // This field will be deprecated in a future release. Please avoid using it.
  /**
   * @deprecated This field will be deprecated in a future release. Please avoid using it.
   */
  organizationName: string; // This field will be deprecated in a future release. Please avoid using it.
  /**
   * @deprecated This field will be deprecated in a future release. Please avoid using it.
   */
  openAIModel: string; // This field will be deprecated in a future release. Please avoid using it.
  /**
   * @deprecated This field will be deprecated in a future release. Please avoid using it.
   */
  apiKey: string; // This field will be deprecated in a future release. Please avoid using it.
  /**
   * @deprecated This field will be deprecated in a future release. Please avoid using it.
   */
  maxTokens: number; // This field will be deprecated in a future release. Please avoid using it.
  /**
   * @deprecated This field will be deprecated in a future release. Please avoid using it.
   */
  useDefault: boolean; // This field will be deprecated in a future release. Please avoid using it.
  /**
   * @deprecated This field will be deprecated in a future release. Please avoid using it.
   */
  proxyConfig: ProxyConfig; // This field will be deprecated in a future release. Please avoid using it.
}

export interface AITranslateWidgetConfig extends WidgetConfig {
  /**
   * @deprecated This field will be deprecated in a future release. Please avoid using it.
   */
  defaultLanguage: string; // This field will be deprecated in a future release. Please avoid using it.
  /**
   * @deprecated This field will be deprecated in a future release. Please avoid using it.
   */
  languages: string[]; // This field will be deprecated in a future release. Please avoid using it.
}

export interface AIRephraseWidgetConfig extends WidgetConfig {
  /**
   * @deprecated This field will be deprecated in a future release. Please avoid using it.
   */
  defaultTone: string; // This field will be deprecated in a future release. Please avoid using it.
  /**
   * @deprecated This field will be deprecated in a future release. Please avoid using it.
   */
  Tones: Tone[]; // This field will be deprecated in a future release. Please avoid using it.
}

export interface QBUIKitConfig extends QBConfig {
  credentials: {
    appId: number;
    accountKey: string;
    authKey: string;
    authSecret: string;
    sessionToken: string;
  };
  configAIApi: {
    AIAnswerAssistWidgetConfig: WidgetConfig;
    AITranslateWidgetConfig: AITranslateWidgetConfig;
    AIRephraseWidgetConfig: AIRephraseWidgetConfig;
  };
  appConfig: {
    maxFileSize: number;
    sessionTimeOut: number;
    chatProtocol: {
      active: number;
    };
    debug: boolean;
    enableForwarding: boolean;
    enableReplying: boolean;
    regexUserName?: string;
    endpoints: {
      api: string;
      chat: string;
    };
    // on: {
    //   sessionExpired: (handleResponse: any, retry: any) => Promise<void>;
    // };
    streamManagement: {
      enable: boolean;
    };
  };
}

interface QBSystemMessageExtension {
  [key: string]: string | undefined;
  notification_type: string;
  action?: 'read' | 'delete';
}

export interface QBUIKitSystemMessage extends QBSystemMessage {
  // id: string;
  // userId: QBUser['id'];
  // body: null | string;
  extension?: QBSystemMessageExtension | Dictionary<any> | undefined;
}

export enum QBChatDialogType {
  PUBLIC_GROUP = 1,
  GROUP = 2,
  PRIVATE = 3,
}

export interface QBUIKitChatDialog extends QBChatDialog {
  /** ID of the dialog. Generated automatically by the server after dialog creation. */
  _id: string;
  /** ID of dialog's owner. */
  user_id: QBUser['id'];
  /** Date & time when a record was created, filled automatically. */
  created_at: string;
  /** Date & time when a record was created, filled automatically. */
  updated_at: string;
  /**
   * Type of dialog. Possible values are:
   * - type=1 (`PUBLIC_GROUP`)
   * - type=2 (`GROUP`)
   * - type=3 (`PRIVATE`)
   */
  type: QBChatDialogType;
  /**
   * Name of a group chat. Makes sense if type=1 (`PUBLIC_GROUP`) or type=2 (`GROUP`).
   * The maximum length for the dialog name is 200 symbols.
   */
  name: string;
  /**
   * Photo of a group chat. Makes sense if type=1 (`PUBLIC_GROUP`) or type=2 (`GROUP`).
   * Can contain a link to a file in Content module, Custom Objects module or just a web link.
   */
  photo: null | string;
  /**
   * JID of XMPP room for group chat to connect. Nil if type=3 (PRIVATE).
   * Generated automatically by the server after dialog creation.
   */
  xmpp_room_jid: string | null;
  /** Array of users' IDs - dialog occupants. Does not make sense if type=1 (PUBLIC_GROUP). */
  occupants_ids: number[];
  /** Last sent message in this dialog. */
  last_message: string | null;
  /** Timestamp of last sent message in this dialog. */
  last_message_date_sent: number | null;
  /** ID of the user who sent last message in this dialog. */
  last_message_user_id: QBUser['id'] | null;
  /** ID of last message in this dialog. */
  last_message_id: string | null;
  /** Number of unread messages in this dialog for a current user. */
  unread_messages_count: number | null;
  /**
   * - Information about class and fields in Custom Objects.
   * - Any dialog can be extended using Custom Objects to store additional parameters.
   */
  data?: {
    /** Class name in Custom Objects. */
    class_name: string;
    /** Field name of class in Custom Objects. Can be many: 1..N. */
    [field_name_N: string]: QBCustomField;
  };
  new_occupants_ids?: number[]; // TODO: EXTENDS TYPE AND SWITCH TO THIS NEW TYPE
  joined?: boolean; // TODO: EXTENDS TYPE AND SWITCH TO THIS NEW TYPE
}

export interface QBUIKitChatNewMessage extends QBChatNewMessage {
  type: 'chat' | 'groupchat';
  body: string;
  notification_type?: string; // TODO: NED ADD TO TYPE
  dialog_id: QBChatDialog['_id']; // TODO: NED ADD TO TYPE
  extension: {
    attachments?: ChatMessageAttachment[];
    save_to_history: 0 | 1;
    dialog_id: QBChatDialog['_id'];
    notification_type?: string; // TODO: NED ADD TO TYPE
    sender_id?: QBUser['id']; // TODO: NED ADD TO TYPE
    qb_message_action?: 'forward' | 'reply'; // TODO: NED ADD TO TYPE
    origin_sender_name?: string; // TODO: NED ADD TO TYPE
    qb_original_messages?: string; // TODO: NED ADD TO TYPE
  };
  markable: 0 | 1;
}

export interface AIWidgetPlaceHolder {
  enabled: boolean;
  default: boolean;
  AIWidget?: AIMessageWidget;
}

export interface QuickBloxUIKitProps {
  AIRephrase?: AIWidgetPlaceHolder;
  AITranslate?: AIWidgetPlaceHolder;
  AIAssist?: AIWidgetPlaceHolder;
  uikitHeightOffset?: string;
}

export interface QuickBloxUIKitDesktopLayoutProps extends QuickBloxUIKitProps {
  theme?: UiKitTheme;
}
