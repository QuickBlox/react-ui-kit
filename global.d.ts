interface Tone {
  name: string;
  description: string;
  iconEmoji: string;
}

// type Dictionary<T> = Record<string, T>; from SDK

type Primitive = string | number | boolean | undefined | null | Date | File;

type SetTails<T, R extends Primitive> = T extends Array<unknown>
  ? Array<T[number] extends Primitive ? R : SetTails<T[number], R>>
  : {
      [K in keyof T]: T[K] extends Primitive ? R : SetTails<T[K], R>;
    };

type ProxyConfig = {
  api: string;
  servername: string;
  port: string;
};
interface WidgetConfig {
  apiKey: string;
  useDefault: boolean;
  maxTokens: number;
  proxyConfig: ProxyConfig;
}

interface AITranslateWidgetConfig extends WidgetConfig {
  defaultLanguage: string;
  languages: string[];
}

interface AIRephraseWidgetConfig extends WidgetConfig {
  defaultTone: string;
  Tones: Tone[];
}

interface QBConfig {
  credentials: {
    appId: number;
    accountKey: string;
    authKey: string;
    authSecret: string;
    sessionToken: string; // ??? ui-kit
  };
  configAIApi: {
    // ui-kit
    AIAnswerAssistWidgetConfig: WidgetConfig;
    AITranslateWidgetConfig: AITranslateWidgetConfig;
    AIRephraseWidgetConfig: AIRephraseWidgetConfig;
  };
  appConfig: {
    maxFileSize: number; // ui-kit
    sessionTimeOut: number; // ?? webRTc -> ui-kit
    chatProtocol: {
      active: number;
    };
    debug: boolean;
    enableForwarding: boolean; // ui-kit
    enableReplying: boolean; // ui-kit
    regexUserName?: string; // ui-kit
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

/*
    * QuickBlox Types - start

 */

type Dictionary<T> = Record<string, T>;

type RequiredProps<T, K extends keyof T> = T & Required<Pick<T, K>>;

declare enum QBChatProtocol {
  BOSH = 1,
  WebSockets = 2,
}

interface ICEServer {
  urls: string;
  username: string;
  credential: string;
}

// QBConfig in UI KIt should rename to QbUIKItConfig

//  declare interface QBConfig {
//   /** [Custom endpoints](https://docs.quickblox.com/docs/js-setup#section-custom-endpoints) configuration. */
//   endpoints?: {
//     /** API endpoint. */
//     api?: string;
//     /** Chat endpoint. */
//     chat?: string;
//   };
//   /** [WebRTC](https://docs.quickblox.com/docs/js-video-calling-advanced#section-video-calling-settings) configuration. */
//   webrtc?: {
//     /**
//      * Maximum answer time for the QB.webrtc.onUserNotAnswerListener callback to be fired.
//      * The answer time interval shows how much time an opponent has to answer your call.
//      */
//     answerTimeInterval?: number;
//     /**
//      * If there is at least one active (recurring) call session and the autoReject is true,
//      * the call gets rejected.
//      */
//     autoReject?: boolean;
//     /**
//      * If the number of active (recurring) call sessions
//      * is more than it is defined by incomingLimit, the call gets rejected.
//      */
//     incomingLimit?: number;
//     /**
//      * The interval between call requests produced by the session.call() method.
//      * Dialing time interval indicates how often to notify your opponents about your call.
//      */
//     dialingTimeInterval?: number;
//     /**
//      * If an opponent has lost the connection then, after this time,
//      * the caller will know about it via the QB.webrtc.onSessionConnectionStateChangedListener callback.
//      */
//     disconnectTimeInterval?: number;
//     /**
//      * Allows access to the statistical information about peer connection state (connected, failed, disconnected, etc).
//      * Set the number of seconds for the statistical information to be received.
//      */
//     statsReportTimeInterval?: boolean;
//     /**
//      * You can customize a list of ICE servers. By default,
//      * WebRTC module will use internal ICE servers that are usually enough,
//      * but you can always set your own.
//      */
//     iceServers?: ICEServer[];
//   };
//   /** Chat protocol configuration. */
//   chatProtocol?: {
//     /** Set 1 to use BOSH, set 2 to use WebSockets. Default: WebSocket. */
//     active: QBChatProtocol;
//   };
//   /** [Stream management](https://docs.quickblox.com/docs/js-setup#section-stream-management) configuration. */
//   streamManagement?: {
//     enable: boolean;
//   };
//   /** [Debug mode](https://docs.quickblox.com/docs/js-setup#enable-logging) configuration. */
//   debug?: boolean | { mode: 1 } | { mode: 2; file: string };
//   on?: {
//     sessionExpired?: (
//       response: any,
//       retry: (session: QBSession) => void,
//     ) => void;
//   };
// }

declare interface QBError {
  code?: number;
  status?: string;
  detail?: string | string[] | Dictionary<string | string[]>;
  message: string | string[] | Dictionary<string | string[]>;
}

interface QBCallback<T> {
  (error: null | undefined, result: T): void;
  (error: QBError, result: null | undefined): void;
}

declare interface QBUser {
  /** ID of the user. Generated automatically by the server after user creation. */
  id: number;
  /** User's full name. */
  full_name: string;
  /** User's email. */
  email: string;
  /** User's login. */
  login: string;
  /** User's phone number. */
  phone: string;
  /** User's website url. */
  website: string | null;
  /** Date & time when record was created, filled automatically. */
  created_at: string;
  /** Date & time when record was created, filled automatically. */
  updated_at: string;
  /** Date & time when a user sent the last request, filled automatically. */
  last_request_at: number;
  /** ID of the user in the external system. */
  external_user_id: number | null;
  /** ID of the user's Facebook account. */
  facebook_id: string | null;
  /** ID of the file/blob. Generated automatically by the server after file/blob creation. */
  blob_id: number | null;
  /** User's additional info. */
  custom_data: string | null;
  /** User's tags. Comma separated array of tags. */
  user_tags: string | null;
  /** @deprecated Marketing info. */
  allow_sales_activities: boolean | null;
  /** @deprecated Marketing info. */
  allow_statistics_analysis: boolean | null;
  /** @deprecated GDPR info. */
  age_over16: boolean | null;
  /** @deprecated GDPR info. */
  parents_contacts: string | null;
}

declare interface QBUserCreate
  extends Partial<
    Omit<
      QBUser,
      'id' | 'created_at' | 'updated_at' | 'last_request_at' | 'user_tags'
    >
  > {
  /** User's password. */
  password: string;
  /** User's tags. */
  tag_list?: string | string[];
}

declare type QBUserCreateParams =
  | RequiredProps<QBUserCreate, 'email'>
  | RequiredProps<QBUserCreate, 'phone'>
  | RequiredProps<QBUserCreate, 'login'>;

declare interface QBUserUpdate
  extends Partial<
    Omit<
      QBUser,
      'id' | 'created_at' | 'updated_at' | 'last_request_at' | 'user_tags'
    >
  > {
  /** User's new password. */
  password?: string;
  /** User's old password. */
  old_password?: string;
  /** User's tags. */
  tag_list?: string | string[];
}

declare interface ListUserResponse {
  current_page: number;
  per_page: number;
  total_entries: number;
  items: Array<{ user: QBUser }>;
}

declare interface QBSession {
  /** ID of the session. Generated automatically by the server after session creation. */
  id: number;
  /** ID of the user's application. */
  application_id: number;
  /** ID of the session's owner. */
  user_id: QBUser['id'];
  /** Date & time when a record was created, filled automatically. */
  created_at: string;
  /** Date & time when a record was created, filled automatically. */
  updated_at: string;
  /** Unique Random Value. Parameter from a session creating request is used. */
  nonce: number;
  /** Session identifier. Each API request should contain this parameter in QB-Token header. */
  token: string;
  /** Unix Timestamp. Parameter from session creating request is used. */
  ts: number;
  /**
   * ID of the session. Generated automatically by the server after session creation.
   * Date & time when a record was updated, filled automatically.
   */
  _id: string;
}

type ChatConnectParams =
  | {
      /** Connect to the chat by user id */
      userId: QBUser['id'];
      /** The user's password or session token */
      password: string;
    }
  | {
      /** Connect to the chat by user jid */
      jid: string;
      /** The user's password or session token */
      password: string;
    }
  | {
      /** Connect to the chat by user's email */
      email: string;
      /** The user's password or session token */
      password: string;
    };

type QBCustomField =
  | string
  | string[]
  | number
  | number[]
  | boolean
  | boolean[]
  | null
  | undefined;

declare interface ChatMessageAttachment {
  /** ID of the file on QuickBlox server. */
  id: string | number;
  /** Type of attachment. Example: `audio`, `video`, `image` or other */
  type: string;
  /** Link to a file in Internet. */
  url?: string;
  /** UID of file from `QB.content.createAndUpload` */
  uid?: string;
  /** Name of attachment. */
  name?: string;
  /** Size of attachment. */
  size?: number;
  [key: string]: QBCustomField;
}

declare enum QBChatDialogType {
  PUBLIC_GROUP = 1,
  GROUP = 2,
  PRIVATE = 3,
}

declare interface QBChatDialog {
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
  last_message_date_sent: number | null | string; // todo: switch type to number
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

declare interface QBChatMessage {
  /** ID of the message. Generated automatically by the server after message creation. */
  _id: string;
  /** Date & time when a record was created, filled automatically. */
  created_at: string;
  /** Date & time when a record was created, filled automatically. */
  updated_at: string;
  /** ID of dialog to which current message is connected. Generated automatically by the server after message creation. */
  chat_dialog_id: QBChatDialog['_id'];
  /** Message body. */
  message: string | null;
  /** Message date sent. */
  date_sent: number;
  /** Message sender ID. */
  sender_id: QBUser['id'];
  /** Message recipient ID. */
  recipient_id: QBUser['id'];
  /**
   * @deprecated
   * Read message status. Diplayed as read=1 after retiriving by the opponent.
   * Works only for type=3 (`PRIVATE`) dialog.
   * Remains as read=0 after retiriving for type=2 (`GROUP`) and type=1 (`PUBLIC_GROUP`) dialogs.
   * */
  read: 0 | 1;
  /** Array of users' IDs who read messages. Works only for type=2 (GROUP) dialog. */
  read_ids: Array<QBUser['id']>;
  /** Array of users' IDs who received the messages. */
  delivered_ids: Array<QBUser['id']>;
  /**
   * Each attachment object contains 3 required keys:
   * - `id` - link to file ID in QuickBlox,
   * - `type` - audio/video/image,
   * - `url` - link to file in Internet.
   */
  attachments: ChatMessageAttachment[];
  /**
   * Name of the custom field.
   * Chat message can be extended with additional fields and contain any other user key-value custom parameters.
   * Can be many 1..N.
   */
  [custom_field_N: string]: any;
}

declare interface QBMessageStatusParams {
  /** ID of the message. */
  messageId: QBChatMessage['_id'];
  /** ID of the dialog. */
  dialogId: QBChatDialog['_id'];
  /** ID of the user. */
  userId: QBUser['id'];
}

declare interface QBChatNewMessage {
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

declare interface QBChatXMPPMessage {
  id: string;
  dialog_id: QBChatDialog['_id'];
  recipient_id: null;
  type: 'chat' | 'groupchat';
  body: string;
  delay: null;
  markable: 0 | 1;
  extension: {
    attachments?: ChatMessageAttachment[];
    date_sent: string;
    [custom_field_N: string]: any;
  };
}

// declare interface QBSystemMessage {
//   id: string;
//   userId: QBUser['id'];
//   body?: null | string;
//   extension?: Dictionary<any>;
// }

interface QBSystemMessageExtension {
  [key: string]: string | undefined;
  notification_type: string;
  action?: 'read' | 'delete';
}

declare interface QBSystemMessage {
  // todo extended type
  id: string;
  userId: QBUser['id'];
  body: null | string;
  extension: QBSystemMessageExtension;
}

declare interface QBGetDialogResult {
  items: QBChatDialog[];
  limit: number;
  skip: number;
  total_entries: number;
}

declare type GetMessagesResult = {
  items: QBChatMessage[];
  limit: number;
  skip: number;
};

interface QBChatModule {
  isConnected: boolean;
  /**
   * Connect to the Chat
   * ([read more](https://docs.quickblox.com/docs/js-chat-connection#connect-to-chat-server-with-quickblox-session-token))
   */
  connect(params: ChatConnectParams, callback: QBCallback<any>): void;
  reconnect(): void;
  /** Disconnect from the Chat ([read more](https://docs.quickblox.com/docs/js-chat-connection#disconnect-from-chat-server)). */
  disconnect(): void;
  /**
   * Send query to get last user activity by `QB.chat.onLastUserActivityListener(userId, seconds)`
   * ([read more](https://xmpp.org/extensions/xep-0012.html)).
   */
  getLastUserActivity(jidOrUserId: QBUser['id'] | string): void;
  /** Receive confirm request ([read more](https://docs.quickblox.com/docs/js-chat-contact-list#confirm-the-contact-request)). */
  onConfirmSubscribeListener?: (userId: QBUser['id']) => void;
  /** Receive user status (online/offline)([read more](https://docs.quickblox.com/docs/js-chat-contact-list#contact-list-updates)). */
  onContactListListener?: (userId: QBUser['id'], type: string) => void;
  /** Receive delivery confirmations ([read more](https://docs.quickblox.com/docs/js-chat-messaging#mark-message-as-delivered)). */
  onDeliveredStatusListener?: (
    messageId: string,
    dialogId: QBChatDialog['_id'],
    userId: QBUser['id'],
  ) => void;
  /** Run after disconnect from chat. */
  onDisconnectedListener?: () => void;
  /** You will receive this callback when some user joined group chat dialog you are in. */
  onJoinOccupant?: (
    dialogId: QBChatDialog['_id'],
    userId: QBUser['id'],
  ) => void;
  /**
   * You will receive this callback when you are in group chat dialog(joined)
   * and other user (chat dialog's creator) removed you from occupants.
   */
  onKickOccupant?: (
    dialogId: QBChatDialog['_id'],
    initiatorUserId: QBUser['id'],
  ) => void;
  /** Receive user's last activity (time ago). */
  onLastUserActivityListener?: (userId: QBUser['id'], seconds: number) => void;
  /** You will receive this callback when some user left group chat dialog you are in. */
  onLeaveOccupant?: (
    dialogId: QBChatDialog['_id'],
    userId: QBUser['id'],
  ) => void;
  /** Blocked entities receive an error when try to chat with a user in a 1-1 chat and receivie nothing in a group chat. */
  onMessageErrorListener?: (
    messageId: QBChatMessage['_id'],
    error: any,
  ) => void;
  /**
   * You need to set onMessageListener function, to get messages
   * ([read more](https://docs.quickblox.com/docs/js-chat-messaging#subscribe-message-events)).
   */
  onMessageListener?: (
    userId: QBUser['id'],
    message: QBChatXMPPMessage,
  ) => void;
  /**
   * Show typing status in chat or groupchat
   * ([read more](https://docs.quickblox.com/docs/js-chat-messaging#send-typing-indicators)).
   */
  onMessageTypingListener?: (
    isTyping: boolean,
    userId: QBUser['id'],
    dialogId: QBChatDialog['_id'],
  ) => void;
  /**
   * You can manage 'read' notifications in chat
   * ([read more](https://docs.quickblox.com/docs/js-chat-messaging#mark-message-as-read)).
   */
  onReadStatusListener?: (
    messageId: QBChatMessage['_id'],
    dialogId: QBChatDialog['_id'],
    userId: QBUser['id'],
  ) => void;
  /**
   * By default Javascript SDK reconnects automatically when connection to server is lost
   * ([read more](https://docs.quickblox.com/docs/js-chat-connection#reconnection)).
   */
  onReconnectListener?: () => void;
  onReconnectFailedListener?: (error: any) => void;
  onSessionExpiredListener?: (error?: QBError) => void;
  /**
   * Receive reject request
   * ([read more](https://docs.quickblox.com/docs/js-chat-contact-list#reject-the-contact-request)).
   */
  onRejectSubscribeListener?: (userId: QBUser['id']) => void;
  /**
   * This feature defines an approach for ensuring is the message delivered to the server.
   * This feature is unabled by default
   * ([read more](https://docs.quickblox.com/docs/js-chat-messaging#check-if-a-message-is-sent)).
   */
  onSentMessageCallback?: (
    messageLost: QBChatMessage,
    messageSent: QBChatMessage,
  ) => void;
  /**
   * Receive subscription request
   * ([read more](https://docs.quickblox.com/docs/js-chat-contact-list#add-user-to-your-contact-list)).
   */
  onSubscribeListener?: (userId: QBUser['id']) => void;
  /**
   * These messages work over separated channel and won't be mixed with the regular chat messages
   * ([read more](https://docs.quickblox.com/docs/js-chat-messaging#send-system-messages)).
   */
  onSystemMessageListener?: (message: QBSystemMessage) => void;
  /**
   * Send message to 1 to 1 or group dialog
   * ([read more](https://docs.quickblox.com/docs/js-chat-messaging#send-text-message)).
   */
  send<T extends QBChatNewMessage>(
    jidOrUserId: QBUser['id'] | string,
    message: T,
  ): string;
  /**
   * Send is stop typing status
   * ([read more](https://docs.quickblox.com/docs/js-chat-messaging#send-typing-indicators)).
   */
  sendIsStopTypingStatus(jidOrUserId: QBUser['id'] | string): void;
  /**
   * Send is typing status
   * ([read more](https://docs.quickblox.com/docs/js-chat-messaging#send-typing-indicators)).
   */
  sendIsTypingStatus(jidOrUserId: QBUser['id'] | string): void;
  /**
   * Send is read status
   * ([read more](https://docs.quickblox.com/docs/js-chat-messaging#mark-message-as-read)).
   */
  sendReadStatus(params: QBMessageStatusParams): void;
  /**
   * Send system message (system notification) to 1 to 1 or group dialog
   * ([read more](https://docs.quickblox.com/docs/js-chat-messaging#send-system-messages)).
   */
  sendSystemMessage(
    jidOrUserId: QBUser['id'] | string,
    // TODO: change type
    message: { extension: QBSystemMessage['extension'] },
  ): string;
  /** Send is delivered status. */
  sendDeliveredStatus(params: QBMessageStatusParams): void;
  ping(jidOrUserId: string | number, callback: QBCallback<any>): string;
  ping(callback: QBCallback<any>): string;

  dialog: {
    /**
     * Create new dialog
     * ([read more](https://docs.quickblox.com/docs/js-chat-dialogs#create-dialog)).
     */
    create(params: Dictionary<any>, callback: QBCallback<QBChatDialog>): void;
    /**
     * Delete a dialog or dialogs
     * ([read more](https://docs.quickblox.com/docs/js-chat-dialogs#delete-dialog)).
     */
    delete(
      id: QBChatDialog['_id'] | Array<QBChatDialog['_id']>,
      params: { force: 1 },
      callback: QBCallback<any>,
    );
    /**
     * Delete a dialog or dialogs
     * ([read more](https://docs.quickblox.com/docs/js-chat-dialogs#delete-dialog)).
     */
    delete(
      id: QBChatDialog['_id'] | Array<QBChatDialog['_id']>,
      callback: QBCallback<any>,
    );
    /**
     * Retrieve list of dialogs
     * ([read more](https://docs.quickblox.com/docs/js-chat-dialogs#retrieve-list-of-dialogs)).
     */
    list(
      params: {
        limit?: number;
        skip?: number;
        sort_asc?: string;
        sort_desc?: string;
        [field: string]: any;
      },
      callback: QBCallback<QBGetDialogResult>,
    ): void;
    /**
     * Update group dialog
     * ([read more](https://docs.quickblox.com/docs/js-chat-dialogs#update-dialog)).
     */
    update(
      id: QBChatDialog['_id'],
      data: Dictionary<any>,
      callback: QBCallback<QBChatDialog>,
    ): void;
  };

  message: {
    /** Create message. */
    create(params: Dictionary<any>, callback: QBCallback<QBChatMessage>): void;
    /**
     * Delete message
     * ([read more](https://docs.quickblox.com/docs/js-chat-messaging#delete-message)).
     */
    delete(
      id: QBChatMessage['_id'],
      params: { force: 1 },
      callback: QBCallback<{
        SuccessfullyDeleted: {
          ids: string[];
        };
        NotFound: {
          ids: string[];
        };
      }>,
    ): void;
    /**
     * Delete message
     * ([read more](https://docs.quickblox.com/docs/js-chat-messaging#delete-message)).
     */
    delete(
      id: QBChatMessage['_id'],
      callback: QBCallback<{
        SuccessfullyDeleted: {
          ids: string[];
        };
        NotFound: {
          ids: string[];
        };
      }>,
    ): void;
    /**
     * Get a chat history
     * ([read more](https://docs.quickblox.com/docs/js-chat-messaging#retrieve-chat-history)).
     */
    list(
      params: {
        limit?: number;
        skip?: number;
        sort_asc?: string;
        sort_desc?: string;
        mark_as_read?: number;
        [field: string]: any;
      },
      callback: QBCallback<GetMessagesResult>,
    ): void;
    /**
     * Get unread messages counter for one or group of dialogs
     * ([read more](https://docs.quickblox.com/docs/js-chat-dialogs#get-number-of-unread-messages)).
     */
    unreadCount(
      params: { chat_dialog_ids: string | string[] },
      callback: QBCallback<{ total: number }>,
    ): void;
    /**
     * Update message
     * ([read more](https://docs.quickblox.com/docs/js-chat-messaging#update-message)).
     */
    update(
      id: QBChatMessage['_id'],
      params: Dictionary<any>,
      callback: QBCallback<QBChatMessage>,
    ): void;
  };

  muc: {
    /**
     * Join to the group dialog
     * ([read more](https://docs.quickblox.com/docs/js-chat-dialogs#join-dialog)).
     */
    join(dialogJid: string, callback: QBCallback<any>): void;
    /**
     * Leave group chat dialog
     * ([read more](https://docs.quickblox.com/docs/js-chat-dialogs#leave-dialog)).
     */
    leave(dialogJid: string, callback: QBCallback<any>): void;
    /**
     * Leave group chat dialog
     * ([read more](https://docs.quickblox.com/docs/js-chat-dialogs#retrieve-online-users)).
     */
    listOnlineUsers(dialogJid: string, callback: QBCallback<any>): void;
  };

  roster: {
    /**
     * Add users to contact list
     * ([read more](https://docs.quickblox.com/docs/js-chat-contact-list#add-user-to-your-contact-list)).
     */
    add(jidOrUserId: string | QBUser['id'], callback: QBCallback<any>): void;
    /**
     * Confirm subscription with some user
     * ([read more](https://docs.quickblox.com/docs/js-chat-contact-list#confirm-the-contact-request)).
     */
    confirm(
      jidOrUserId: string | QBUser['id'],
      callback: QBCallback<any>,
    ): void;
    /**
     * Receive contact list
     * ([read more](https://docs.quickblox.com/docs/js-chat-contact-list#access-contact-list)).
     */
    get(callback: QBCallback<any>): void;
    /**
     * Reject subscription with some user
     * ([read more](https://docs.quickblox.com/docs/js-chat-contact-list#reject-the-contact-request)).
     */
    reject(jidOrUserId: string | QBUser['id'], callback: QBCallback<any>): void;
    /**
     * Remove subscription with some user from your contact list
     * ([read more](https://docs.quickblox.com/docs/js-chat-contact-list#remove-user-from-the-contact-list)).
     */
    remove(jidOrUserId: string | QBUser['id'], callback: QBCallback<any>): void;
  };

  helpers: {
    /** Get unique id. */
    getUniqueId(suffix: string | number): string;
    /** Generate BSON ObjectId. */
    getBsonObjectId(): string;
    /** Get the dialog id from jid. */
    getDialogIdFromNode(jid: string): QBChatDialog['_id'];
    /** Get the User id from jid. */
    getIdFromNode(jid: string): QBUser['id'];
    /** Get user id from dialog's full jid. */
    getIdFromResource(jid: string): QBUser['id'];
    /** Get the recipient id. */
    getRecipientId(
      occupantsIds: Array<QBUser['id']>,
      userId: QBUser['id'],
    ): QBUser['id'];
    /** Get the full room jid from room bare jid & user jid. */
    getRoomJid(jid: string, userJid: string): string;
    /** Get the room jid from dialog id. */
    getRoomJidFromDialogId(dialogId: QBChatDialog['_id']): string;
    /** Get bare dialog's jid from dialog's full jid. */
    getRoomJidFromRoomFullJid(jid: string): string;
    /** Get the user id from the room jid. */
    getUserIdFromRoomJid(jid: string): string;
    /** Get the User jid id. */
    getUserJid(userId: QBUser['id'], appId?: string | number): string;
    /** Get the User nick with the muc domain. */
    getUserNickWithMucDomain(userId: QBUser['id']): string;
    /** Get unique id. */
    jidOrUserId(jidOrUserId: QBUser['id'] | string): string;
    /** Get the chat type. */
    typeChat(jidOrUserId: QBUser['id'] | string): 'chat' | 'groupchat';
    /** Get the dialog jid from dialog id. */
    getDialogJid(dialogId: QBChatDialog['_id']): string;
    /** Get user jid from current user. */
    getUserCurrentJid(): string;
  };
}
// interface QBChatModule {
//   isConnected: boolean;
//   /**
//    * Connect to the Chat
//    * ([read more](https://docs.quickblox.com/docs/js-chat-connection#connect-to-chat-server-with-quickblox-session-token))
//    */
//   connect(params: ChatConnectParams, callback: QBCallback<any>): void;
//   reconnect(): void;
//   /** Disconnect from the Chat ([read more](https://docs.quickblox.com/docs/js-chat-connection#disconnect-from-chat-server)). */
//   disconnect(): void;
//   /**
//    * Send query to get last user activity by `QB.chat.onLastUserActivityListener(userId, seconds)`
//    * ([read more](https://xmpp.org/extensions/xep-0012.html)).
//    */
//   getLastUserActivity(jidOrUserId: QBUser['id'] | string): void;
//   /** Receive confirm request ([read more](https://docs.quickblox.com/docs/js-chat-contact-list#confirm-the-contact-request)). */
//   onConfirmSubscribeListener(userId: QBUser['id']): void;
//   /** Receive user status (online/offline)([read more](https://docs.quickblox.com/docs/js-chat-contact-list#contact-list-updates)). */
//   onContactListListener(userId: QBUser['id'], type: string): void;
//   /** Receive delivery confirmations ([read more](https://docs.quickblox.com/docs/js-chat-messaging#mark-message-as-delivered)). */
//   onDeliveredStatusListener(
//     messageId: string,
//     dialogId: QBChatDialog['_id'],
//     userId: QBUser['id'],
//   ): void;
//   /** Run after disconnect from chat. */
//   onDisconnectedListener(): void;
//   /** You will receive this callback when some user joined group chat dialog you are in. */
//   onJoinOccupant(dialogId: QBChatDialog['_id'], userId: QBUser['id']): void;
//   /**
//    * You will receive this callback when you are in group chat dialog(joined)
//    * and other user (chat dialog's creator) removed you from occupants.
//    */
//   onKickOccupant(
//     dialogId: QBChatDialog['_id'],
//     initiatorUserId: QBUser['id'],
//   ): void;
//   /** Receive user's last activity (time ago). */
//   onLastUserActivityListener(userId: QBUser['id'], seconds: number): void;
//   /** You will receive this callback when some user left group chat dialog you are in. */
//   onLeaveOccupant(dialogId: QBChatDialog['_id'], userId: QBUser['id']): void;
//   /** Blocked entities receive an error when try to chat with a user in a 1-1 chat and receivie nothing in a group chat. */
//   onMessageErrorListener(messageId: QBChatMessage['_id'], error: any): void;
//   /**
//    * You need to set onMessageListener function, to get messages
//    * ([read more](https://docs.quickblox.com/docs/js-chat-messaging#subscribe-message-events)).
//    */
//   onMessageListener(userId: QBUser['id'], message: QBChatXMPPMessage): void;
//   /**
//    * Show typing status in chat or groupchat
//    * ([read more](https://docs.quickblox.com/docs/js-chat-messaging#send-typing-indicators)).
//    */
//   onMessageTypingListener(
//     isTyping: boolean,
//     userId: QBUser['id'],
//     dialogId: QBChatDialog['_id'],
//   ): void;
//   /**
//    * You can manage 'read' notifications in chat
//    * ([read more](https://docs.quickblox.com/docs/js-chat-messaging#mark-message-as-read)).
//    */
//   onReadStatusListener(
//     messageId: QBChatMessage['_id'],
//     dialogId: QBChatDialog['_id'],
//     userId: QBUser['id'],
//   ): void;
//   /**
//    * By default Javascript SDK reconnects automatically when connection to server is lost
//    * ([read more](https://docs.quickblox.com/docs/js-chat-connection#reconnection)).
//    */
//   onReconnectListener(): void;
//   onReconnectFailedListener(error: any): void;
//   onSessionExpiredListener(error?: QBError): void;
//   /**
//    * Receive reject request
//    * ([read more](https://docs.quickblox.com/docs/js-chat-contact-list#reject-the-contact-request)).
//    */
//   onRejectSubscribeListener(userId: QBUser['id']): void;
//   /**
//    * This feature defines an approach for ensuring is the message delivered to the server.
//    * This feature is unabled by default
//    * ([read more](https://docs.quickblox.com/docs/js-chat-messaging#check-if-a-message-is-sent)).
//    */
//   onSentMessageCallback(
//     messageLost: QBChatMessage,
//     messageSent: QBChatMessage,
//   ): void;
//   /**
//    * Receive subscription request
//    * ([read more](https://docs.quickblox.com/docs/js-chat-contact-list#add-user-to-your-contact-list)).
//    */
//   onSubscribeListener(userId: QBUser['id']): void;
//   /**
//    * These messages work over separated channel and won't be mixed with the regular chat messages
//    * ([read more](https://docs.quickblox.com/docs/js-chat-messaging#send-system-messages)).
//    */
//   onSystemMessageListener(message: QBSystemMessage): void;
//   /**
//    * Send message to 1 to 1 or group dialog
//    * ([read more](https://docs.quickblox.com/docs/js-chat-messaging#send-text-message)).
//    */
//   send<T extends QBChatNewMessage>(
//     jidOrUserId: QBUser['id'] | string,
//     message: T,
//   ): string;
//   /**
//    * Send is stop typing status
//    * ([read more](https://docs.quickblox.com/docs/js-chat-messaging#send-typing-indicators)).
//    */
//   sendIsStopTypingStatus(jidOrUserId: QBUser['id'] | string): void;
//   /**
//    * Send is typing status
//    * ([read more](https://docs.quickblox.com/docs/js-chat-messaging#send-typing-indicators)).
//    */
//   sendIsTypingStatus(jidOrUserId: QBUser['id'] | string): void;
//   /**
//    * Send is read status
//    * ([read more](https://docs.quickblox.com/docs/js-chat-messaging#mark-message-as-read)).
//    */
//   sendReadStatus(params: QBMessageStatusParams): void;
//   /**
//    * Send system message (system notification) to 1 to 1 or group dialog
//    * ([read more](https://docs.quickblox.com/docs/js-chat-messaging#send-system-messages)).
//    */
//   sendSystemMessage(
//     jidOrUserId: QBUser['id'] | string,
//     // TODO: change type
//     message: { extension: QBSystemMessage['extension'] },
//   ): string;
//   /** Send is delivered status. */
//   sendDeliveredStatus(params: QBMessageStatusParams): void;
//   ping(jidOrUserId: string | number, callback: QBCallback<any>): string;
//   ping(callback: QBCallback<any>): string;
//
//   dialog: {
//     /**
//      * Create new dialog
//      * ([read more](https://docs.quickblox.com/docs/js-chat-dialogs#create-dialog)).
//      */
//     create(params: Dictionary<any>, callback: QBCallback<QBChatDialog>): void;
//     /**
//      * Delete a dialog or dialogs
//      * ([read more](https://docs.quickblox.com/docs/js-chat-dialogs#delete-dialog)).
//      */
//     delete(
//       id: QBChatDialog['_id'] | Array<QBChatDialog['_id']>,
//       params: { force: 1 },
//       callback: QBCallback<any>,
//     );
//     /**
//      * Delete a dialog or dialogs
//      * ([read more](https://docs.quickblox.com/docs/js-chat-dialogs#delete-dialog)).
//      */
//     delete(
//       id: QBChatDialog['_id'] | Array<QBChatDialog['_id']>,
//       callback: QBCallback<any>,
//     );
//     /**
//      * Retrieve list of dialogs
//      * ([read more](https://docs.quickblox.com/docs/js-chat-dialogs#retrieve-list-of-dialogs)).
//      */
//     list(
//       params: {
//         limit?: number;
//         skip?: number;
//         sort_asc?: string;
//         sort_desc?: string;
//         [field: string]: any;
//       },
//       callback: QBCallback<QBGetDialogResult>,
//     ): void;
//     /**
//      * Update group dialog
//      * ([read more](https://docs.quickblox.com/docs/js-chat-dialogs#update-dialog)).
//      */
//     update(
//       id: QBChatDialog['_id'],
//       data: Dictionary<any>,
//       callback: QBCallback<QBChatDialog>,
//     ): void;
//   };
//
//   message: {
//     /** Create message. */
//     create(params: Dictionary<any>, callback: QBCallback<QBChatMessage>): void;
//     /**
//      * Delete message
//      * ([read more](https://docs.quickblox.com/docs/js-chat-messaging#delete-message)).
//      */
//     delete(
//       id: QBChatMessage['_id'],
//       params: { force: 1 },
//       callback: QBCallback<{
//         SuccessfullyDeleted: {
//           ids: string[];
//         };
//         NotFound: {
//           ids: string[];
//         };
//       }>,
//     ): void;
//     /**
//      * Delete message
//      * ([read more](https://docs.quickblox.com/docs/js-chat-messaging#delete-message)).
//      */
//     delete(
//       id: QBChatMessage['_id'],
//       callback: QBCallback<{
//         SuccessfullyDeleted: {
//           ids: string[];
//         };
//         NotFound: {
//           ids: string[];
//         };
//       }>,
//     ): void;
//     /**
//      * Get a chat history
//      * ([read more](https://docs.quickblox.com/docs/js-chat-messaging#retrieve-chat-history)).
//      */
//     list(
//       params: {
//         limit?: number;
//         skip?: number;
//         sort_asc?: string;
//         sort_desc?: string;
//         mark_as_read?: number;
//         [field: string]: any;
//       },
//       callback: QBCallback<GetMessagesResult>,
//     ): void;
//     /**
//      * Get unread messages counter for one or group of dialogs
//      * ([read more](https://docs.quickblox.com/docs/js-chat-dialogs#get-number-of-unread-messages)).
//      */
//     unreadCount(
//       params: { chat_dialog_ids: string | string[] },
//       callback: QBCallback<{ total: number }>,
//     ): void;
//     /**
//      * Update message
//      * ([read more](https://docs.quickblox.com/docs/js-chat-messaging#update-message)).
//      */
//     update(
//       id: QBChatMessage['_id'],
//       params: Dictionary<any>,
//       callback: QBCallback<QBChatMessage>,
//     ): void;
//   };
//
//   muc: {
//     /**
//      * Join to the group dialog
//      * ([read more](https://docs.quickblox.com/docs/js-chat-dialogs#join-dialog)).
//      */
//     join(dialogJid: string, callback: QBCallback<any>): void;
//     /**
//      * Leave group chat dialog
//      * ([read more](https://docs.quickblox.com/docs/js-chat-dialogs#leave-dialog)).
//      */
//     leave(dialogJid: string, callback: QBCallback<any>): void;
//     /**
//      * Leave group chat dialog
//      * ([read more](https://docs.quickblox.com/docs/js-chat-dialogs#retrieve-online-users)).
//      */
//     listOnlineUsers(dialogJid: string, callback: QBCallback<any>): void;
//   };
//
//   roster: {
//     /**
//      * Add users to contact list
//      * ([read more](https://docs.quickblox.com/docs/js-chat-contact-list#add-user-to-your-contact-list)).
//      */
//     add(jidOrUserId: string | QBUser['id'], callback: QBCallback<any>): void;
//     /**
//      * Confirm subscription with some user
//      * ([read more](https://docs.quickblox.com/docs/js-chat-contact-list#confirm-the-contact-request)).
//      */
//     confirm(
//       jidOrUserId: string | QBUser['id'],
//       callback: QBCallback<any>,
//     ): void;
//     /**
//      * Receive contact list
//      * ([read more](https://docs.quickblox.com/docs/js-chat-contact-list#access-contact-list)).
//      */
//     get(callback: QBCallback<any>): void;
//     /**
//      * Reject subscription with some user
//      * ([read more](https://docs.quickblox.com/docs/js-chat-contact-list#reject-the-contact-request)).
//      */
//     reject(jidOrUserId: string | QBUser['id'], callback: QBCallback<any>): void;
//     /**
//      * Remove subscription with some user from your contact list
//      * ([read more](https://docs.quickblox.com/docs/js-chat-contact-list#remove-user-from-the-contact-list)).
//      */
//     remove(jidOrUserId: string | QBUser['id'], callback: QBCallback<any>): void;
//   };
//
//   helpers: {
//     /** Get unique id. */
//     getUniqueId(suffix: string | number): string;
//     /** Generate BSON ObjectId. */
//     getBsonObjectId(): string;
//     /** Get the dialog id from jid. */
//     getDialogIdFromNode(jid: string): QBChatDialog['_id'];
//     /** Get the User id from jid. */
//     getIdFromNode(jid: string): QBUser['id'];
//     /** Get user id from dialog's full jid. */
//     getIdFromResource(jid: string): QBUser['id'];
//     /** Get the recipient id. */
//     getRecipientId(
//       occupantsIds: Array<QBUser['id']>,
//       userId: QBUser['id'],
//     ): QBUser['id'];
//     /** Get the full room jid from room bare jid & user jid. */
//     getRoomJid(jid: string, userJid: string): string;
//     /** Get the room jid from dialog id. */
//     getRoomJidFromDialogId(dialogId: QBChatDialog['_id']): string;
//     /** Get bare dialog's jid from dialog's full jid. */
//     getRoomJidFromRoomFullJid(jid: string): string;
//     /** Get the user id from the room jid. */
//     getUserIdFromRoomJid(jid: string): string;
//     /** Get the User jid id. */
//     getUserJid(userId: QBUser['id'], appId?: string | number): string;
//     /** Get the User nick with the muc domain. */
//     getUserNickWithMucDomain(userId: QBUser['id']): string;
//     /** Get unique id. */
//     jidOrUserId(jidOrUserId: QBUser['id'] | string): string;
//     /** Get the chat type. */
//     typeChat(jidOrUserId: QBUser['id'] | string): 'chat' | 'groupchat';
//     /** Get the dialog jid from dialog id. */
//     getDialogJid(dialogId: QBChatDialog['_id']): string;
//     /** Get user jid from current user. */
//     getUserCurrentJid(): string;
//   };
// }

declare interface QBDataFile {
  content_type: string;
  file_id: string;
  name: string;
  size: number;
}

declare interface QBBlob {
  id: number;
  uid: string;
  content_type: string;
  name: string;
  size: number;
  created_at: string;
  updated_at: string;
  blob_status: string;
  set_completed_at: number;
  public: boolean;
}

declare interface QBBlobCreate extends QBBlob {
  account_id: number;
  app_id: number;
  blob_object_access: {
    id: number;
    blob_id: number;
    expires: string;
    object_access_type: string;
    params: string;
  };
}

interface QBBlobCreateUploadParams {
  name: string;
  file: File;
  type: string;
  size: number;
  public?: boolean; // optional, "false" by default
}

interface QBContentModule {
  /** Create new file object. */
  create(
    params: { name: string; content_type: string; public?: boolean },
    callback: QBCallback<QBBlobCreate>,
  ): void;
  /**
   * Create file > upload file > mark file as uploaded > return result
   * ([read more](https://docs.quickblox.com/docs/js-content#upload-file)).
   */
  createAndUpload(
    params: QBBlobCreateUploadParams,
    callback: QBCallback<QBBlob>,
  ): void;
  /**
   * Delete file by id
   * ([read more](https://docs.quickblox.com/docs/js-content#delete-file)).
   */
  delete(id: number, callback: QBCallback<any>): void;
  /**
   * Download file by UID.
   * If the file is public then it's possible to download it without a session token
   * ([read more](https://docs.quickblox.com/docs/js-content#download-file-by-uid)).
   */
  getFile(uid: string, callback: QBCallback<{ blob: QBBlob }>): void;
  /**
   * Retrieve file object info by id
   * ([read more](https://docs.quickblox.com/docs/js-content#get-file-info)).
   */
  getInfo(id: number, callback: QBCallback<{ blob: QBBlob }>): void;
  /**
   * Get a list of files for current user
   * ([read more](https://docs.quickblox.com/docs/js-content#retrieve-files)).
   */
  list(
    params: { page?: number; per_page?: number },
    callback: QBCallback<{
      current_page: number;
      per_page: number;
      total_entries: number;
      items: Array<{
        blob: QBBlob;
      }>;
    }>,
  ): void;
  /** Declare file uploaded. The file's 'status' field will be set to 'complete'. */
  markUploaded(
    params: { id: number; size: number },
    callback: QBCallback<{ blob: { size: number } }>,
  ): void;
  /**
   * Edit a file by ID
   * ([read more](https://docs.quickblox.com/docs/js-content#update-file)).
   */
  update(
    params: {
      id: QBBlob['id'];
      name?: QBBlob['name'];
    },
    callback: QBCallback<{ blob: QBBlob }>,
  ): void;
  /** Upload a file to cloud storage. */
  upload(
    params: {
      url: string;
      data: Dictionary<any>;
    },
    callback: QBCallback<any>,
  ): void;
  /**
   * Get private URL for file download by file_uid (blob_uid)
   * ([read more](https://docs.quickblox.com/docs/js-content#get-private-url)).
   */
  privateUrl(fileUID: string): string;
  /**
   * Get public URL for file download by file_uid (blob_uid)
   * ([read more](https://docs.quickblox.com/docs/js-content#get-public-url)).
   */
  publicUrl(fileUID: string): string;
}

declare interface QBCustomObjectAccess {
  access: 'open' | 'owner' | 'open_for_users_ids' | 'open_for_groups';
  ids?: string[];
  groups?: string[];
}

declare interface QBCustomObjectPermissions {
  create?: QBCustomObjectAccess;
  read?: QBCustomObjectAccess;
  update?: QBCustomObjectAccess;
  delete?: QBCustomObjectAccess;
}

declare interface QBCustomObject {
  /**
   * ID of the record
   * Generated automatically by the server after record creation
   */
  _id: string;
  /** ID of the user who created the record */
  user_id: QBUser['id'];
  /** ID of parent object (Relations) */
  _parent_id: string | null;
  /** Date & time when a record was created, filled automatically */
  created_at: number;
  /** Date & time when record was updated, filled automatically */
  updated_at: number;
  // permissions?: Required<QBCustomObjectPermissions>;
}

declare interface QBDataDeletedResponse {
  deleted: Array<QBCustomObject['_id']>;
  deletedCount: number;
}

interface QBDataModule {
  /**
   * Create new custom object
   * ([read more](https://docs.quickblox.com/docs/js-custom-objects#create-records)).
   */
  create<T extends QBCustomObject>(
    className: string,
    data: { permissions?: QBCustomObjectPermissions } & Dictionary<any>,
    callback: QBCallback<T>,
  ): void;
  /**
   * Delete record/records by ID, IDs or criteria (filters) of particular class
   * ([read more](https://docs.quickblox.com/docs/js-custom-objects#delete-records)).
   */
  delete(
    className: string,
    ids: QBCustomObject['_id'] | Array<QBCustomObject['_id']>,
    callback: QBCallback<QBDataDeletedResponse>,
  ): void;
  /**
   * Delete record/records by ID, IDs or criteria (filters) of particular class
   * ([read more](https://docs.quickblox.com/docs/js-custom-objects#delete-records)).
   */
  delete(
    className: string,
    criteria: Dictionary<any>,
    callback: QBCallback<{ total_deleted: number }>,
  ): void;
  /**
   * Delete file from file field by ID
   * ([read more](https://docs.quickblox.com/docs/js-custom-objects#delete-file)).
   */
  deleteFile(
    className: string,
    params: { id: string; field_name: string },
    callback: QBCallback<any>,
  ): void;
  /**
   * Download file from file field by ID
   * ([read more](https://docs.quickblox.com/docs/js-custom-objects#download-file)).
   */
  downloadFile(
    className: string,
    params: { id: string; field_name: string },
    callback: QBCallback<any>,
  ): void;
  /** Return file's URL from file field by ID. */
  fileUrl(
    className: string,
    params: { id: string; field_name: string },
  ): string;
  /**
   * Search for records of particular class
   * ([read more](https://docs.quickblox.com/docs/js-custom-objects#retrieve-records)).
   */
  list<T extends QBCustomObject>(
    className: string,
    filters: {
      limit?: number;
      skip?: number;
      sort_asc?: string;
      sort_desc?: string;
      group_by?: string;
      [field: string]: any;
    },
    callback: QBCallback<{
      class_name: string;
      items: T[];
      limit: number;
      skip: number;
    }>,
  ): void;
  /**
   * Update record by ID of particular class
   * ([read more](https://docs.quickblox.com/docs/js-custom-objects#update-records)).
   */
  update<T extends QBCustomObject>(
    className: string,
    data: {
      _id: string;
      permissions?: QBCustomObjectPermissions;
    } & Dictionary<any>,
    callback: QBCallback<T>,
  ): void;
  /**
   * Upload file to file field
   * ([read more](https://docs.quickblox.com/docs/js-custom-objects#files)).
   */
  uploadFile(
    className: string,
    params: { id: string; field_name: string; file: File; name: string },
    callback: QBCallback<QBDataFile>,
  ): void;
}

declare type ListUserParams = {
  page?: number;
  per_page?: number;
  filter?: Dictionary<any>;
  order?: string;
};

declare type GetUserParams =
  | { login: string }
  | { full_name: string; page?: number; per_page?: number }
  | { facebook_id: string }
  | { phone: string }
  | { email: string }
  | { tags: string | string[]; page?: number; per_page?: number }
  | Omit<ListUserParams, 'filter'>
  | { external: string };

interface QBUsersModule {
  /**
   * Registers a new app user.
   * Call this API to register a user for the app.
   * You must provide either a user login or email address along with their password,
   * passing both email address and login is permitted but not required
   * ([read more](https://docs.quickblox.com/docs/js-users#create-user)).
   */
  create(
    params:
      | RequiredProps<QBUserCreate, 'email'>
      | RequiredProps<QBUserCreate, 'phone'>
      | RequiredProps<QBUserCreate, 'login'>,
    callback: QBCallback<QBUser>,
  ): void;
  /**
   * Remove a user from the app, by user's id that represents the user in an external user registry.
   * ([read more](https://docs.quickblox.com/docs/js-users#delete-user)).
   */
  delete(userId: QBUser['id'], callback: QBCallback<any>): void;
  /**
   * Remove a user from the app, by user's external id that represents the user in an external user registry.
   * ([read more](https://docs.quickblox.com/docs/js-users#delete-user)).
   */
  delete(params: { external: number }, callback: QBCallback<any>): void;
  /**
   * Retrieve the user by id.
   */
  get(userId: QBUser['id'], callback: QBCallback<QBUser>): void;
  /**
   * Retrieve a specific users.
   */
  get(params: GetUserParams, callback: QBCallback<ListUserResponse>): void;
  /**
   * Call this API to get a list of current users of you app.
   * By default it returns upto 10 users, but you can change this by adding pagination parameters.
   * You can filter the list of users by supplying a filter string. You can sort results by ask/desc
   * ([read more](https://docs.quickblox.com/docs/js-users#retrieve-users)).
   */
  listUsers(
    params: ListUserParams,
    callback: QBCallback<ListUserResponse>,
  ): void;
  /**
   * You can initiate password resets for users who have emails associated with their account.
   * Password reset instruction will be sent to this email address
   * ([read more](https://docs.quickblox.com/docs/js-users#reset-user-password)).
   */
  resetPassword(email: string, callback: QBCallback<any>): void;
  /**
   * Update current user. In normal usage,
   * nobody except the user is allowed to modify their own data.
   * Any fields you don’t specify will remain unchanged,
   * so you can update just a subset of the user’s data.
   * login/email and password may be changed,
   * but the new login/email must not already be in use
   * ([read more](https://docs.quickblox.com/docs/js-users#update-user)).
   */
  update(
    userId: number,
    user: QBUserUpdate,
    callback: QBCallback<QBUser>,
  ): void;
}

declare interface QBMediaParams {
  audio: MediaStreamConstraints['audio'];
  video: MediaStreamConstraints['video'];
  /** Id attribute of HTMLVideoElement */
  elemId?: string;
  options?: {
    muted?: boolean;
    mirror?: boolean;
  };
}

declare enum QBWebRTCSessionState {
  NEW = 1,
  ACTIVE = 2,
  HUNGUP = 3,
  REJECTED = 4,
  CLOSED = 5,
}

declare enum QBWebRTCCallType {
  VIDEO = 1,
  AUDIO = 2,
}

declare interface QBWebRTCSession {
  State: {
    NEW: 1;
    ACTIVE: 2;
    HUNGUP: 3;
    REJECTED: 4;
    CLOSED: 5;
  };
  ID: string;
  /**
   * One of
   * - state=1 (`NEW`)
   * - state=2 (`ACTIVE`)
   * - state=3 (`HUNGUP`)
   * - state=4 (`REJECTED`)
   * - state=5 (`CLOSED`)
   */
  state: QBWebRTCSessionState;
  initiatorID: QBUser['id'];
  currentUserID: QBUser['id'];
  opponentsIDs: Array<QBUser['id']>;
  peerConnections: { [userId: QBUser['id']]: RTCPeerConnection };
  acceptCallTime: string;
  bandwidth: number;
  /**
   * One of
   * - callType=1 (`VIDEO`)
   * - callType=2 (`AUDIO`)
   */
  callType: QBWebRTCCallType;
  startCallTime?: Date;
  localStream?: MediaStream;
  mediaParams: QBMediaParams | null;
  /**
   * Get the user media stream
   * ([read more](https://docs.quickblox.com/docs/js-video-calling#access-local-media-stream)).
   */
  getUserMedia(params: QBMediaParams, callback: QBCallback<MediaStream>): void;
  /**
   * Attach media stream to audio/video element
   * ([read more](https://docs.quickblox.com/docs/js-video-calling#attach-local-media-stream)).
   */
  attachMediaStream(
    videoElemId: string,
    stream: MediaStream,
    options?: QBMediaParams['options'],
  ): void;
  /** Detach media stream from audio/video element */
  detachMediaStream(videoElemId: string): void;
  /**
   * Mutes the stream
   * ([read more](https://docs.quickblox.com/docs/js-video-calling-advanced#mute-audio)).
   */
  mute(type: 'audio' | 'video'): void;
  /**
   * Unmutes the stream
   * ([read more](https://docs.quickblox.com/docs/js-video-calling-advanced#mute-audio)).
   */
  unmute(type: 'audio' | 'video'): void;
  /**
   * Initiate a call
   * ([read more](https://docs.quickblox.com/docs/js-video-calling#make-a-call)).
   */
  call(extension: Dictionary<any>, callback: (error: null) => void): void;
  /**
   * Accept a call
   * ([read more](https://docs.quickblox.com/docs/js-video-calling#accept-a-call)).
   */
  accept(extension: Dictionary<any>): void;
  /**
   * Reject a call
   * ([read more](https://docs.quickblox.com/docs/js-video-calling#reject-a-call)).
   */
  reject(extension: Dictionary<any>): void;
  /**
   * Stop a call
   * ([read more](https://docs.quickblox.com/docs/js-video-calling#end-a-call)).
   */
  stop(extension: Dictionary<any>): void;
  /** Update a call. */
  update(extension: Dictionary<any>, userID?: QBUser['id']): void;
  /**
   * Switch media tracks in audio/video HTML's element and replace its in peers
   * ([read more](https://docs.quickblox.com/docs/js-video-calling-advanced#switch-camera)).
   */
  switchMediaTracks(
    deviceIds: { audio?: { exact: string }; video?: { exact: string } },
    callback: QBCallback<MediaStream>,
  ): void;
  /** Add tracks from provided stream to local stream (and replace in peers) */
  _replaceTracks(stream: MediaStream): void;
}

declare interface QBWebRTCModule {
  CallType: {
    VIDEO: 1;
    AUDIO: 2;
  };
  sessions: {
    [sessionId]: QBWebRTCSession;
  };
  /** Return data or all active devices. */
  getMediaDevices(kind?: MediaDeviceKind): Promise<MediaDeviceInfo[]>;
  /**
   * Creates the new session
   * ([read more](https://docs.quickblox.com/docs/js-video-calling#create-session)).
   */
  createNewSession(
    opponentsIds: number[],
    callType?: QBWebRTCCallType,
    initiatorID?: QBUser['id'],
    opts?: { bandwidth: number },
  ): QBWebRTCSession;
  /** Deletes a session. */
  clearSession(sessionId: QBWebRTCSession['ID']): void;
  /** Check all session and find session with status 'NEW' or 'ACTIVE' which ID != provided. */
  isExistLiveSessionExceptSessionID(sessionId: QBWebRTCSession['ID']): boolean;
  /** Get new sessions count */
  getNewSessionsCount(exceptSessionId?: QBWebRTCSession['ID']): number;

  onAcceptCallListener?: (
    session: QBWebRTCSession,
    userId: QBUser['id'],
    userInfo: Dictionary<any>,
  ) => void;
  onCallListener?: (
    session: QBWebRTCSession,
    userInfo: Dictionary<any>,
  ) => void;
  onCallStatsReport?: (
    session: QBWebRTCSession,
    userId: QBUser['id'],
    stats: string[],
  ) => void;
  onRejectCallListener?: (
    session: QBWebRTCSession,
    userId: QBUser['id'],
    userInfo: Dictionary<any>,
  ) => void;
  onRemoteStreamListener?: (
    sesion: QBWebRTCSession,
    userId: QBUser['id'],
    stream: MediaStream,
  ) => void;
  onSessionCloseListener?: (session: QBWebRTCSession) => void;
  onSessionConnectionStateChangedListener?: (
    sesion: QBWebRTCSession,
    userId: QBUser['id'],
    state: any,
  ) => void;
  onStopCallListener?: (
    session: QBWebRTCSession,
    userId: QBUser['id'],
    userInfo: Dictionary<any>,
  ) => void;
  onUpdateCallListener?: (
    session: QBWebRTCSession,
    userId: number,
    userInfo: Dictionary<any>,
  ) => void;
  onUserNotAnswerListener?: (session: QBWebRTCSession, userId: number) => void;
  onReconnectListener?: (
    session: QBWebRTCSession,
    userId: number,
    state: any,
  ) => void;
}

declare interface QBPushNotificationsEventsCreate {
  /**
   * Type of notification.
   * Allowed values: push or email.
   */
  notification_type: 'push' | 'email';
  /**
   * An environment of the notification.
   * Allowed values: development or production.
   */
  environment: 'development' | 'production';
  /**
   * A payload of event. For push notifications:
   * if event[push_type] not present - should be Base64 encoded text.
   */
  message: string;
  /**
   * Push Notification type.
   * Used only if event[notification_type] = push, ignored in other cases.
   * If not present - Notification will be delivered to all possible devices for specified users.
   * Each platform has their own standard format.
   * If specified - Notification will be delivered to the specified platform only.
   * Allowed values: apns, apns_voip, gcm, mpns or bbps.
   */
  push_type?: 'apns' | 'apns_voip' | 'gcm' | 'mpns' | 'bbps';
  /**
   * Allowed values: one_shot, fixed_date or period_date. one_shot - a one-time event,
   * which causes by an external object (the value is only valid if the 'date' is not specified).
   * fixed_date - a one-time event, which occurs at a specified 'date' (the value is valid only if the 'date' is given).
   * period_date - reusable event that occurs within a given 'period' from the initial 'date'
   * (the value is only valid if the 'period' specified).
   * By default: fixed_date, if 'date' is specified. period_date, if 'period' is specified.
   * one_shot, if 'date' is not specified.
   */
  event_type?: 'one_shot' | 'fixed_date' | 'period_date';
  /**
   * The name of the event. Service information.
   * Only for your own usage.
   */
  name?: string;
  /**
   * The period of the event in seconds.
   * Required if the event[event_type] = period_date.
   * Possible values: 86400 (1 day). 604800 (1 week). 2592000 (1 month). 31557600 (1 year).
   */
  period?: number;
  /**
   * The date of the event to send on.
   * Required if event[event_type] = fixed_date or period_date.
   * If event[event_type] = fixed_date, the date can not be in the pas.
   */
  date?: number;
  user?: {
    /** Notification's recipients - should contain a string of users' ids divided by commas. */
    ids?: Array<QBUser['id']>;
    tags?: {
      /**
       * Notification's recipients - should contain a string of tags divided by commas.
       * Recipients (users) must have at least one tag that specified in the list.
       */
      any?: string[];
      /**
       * Notification's recipients - should contain a string of tags divided by commas.
       * Recipients (users) must exactly have only all tags that specified in list.
       */
      all?: string[];
      /**
       * Notification's recipients - should contain a string of tags divided by commas.
       * Recipients (users) mustn't have tags that specified in list.
       */
      exclude?: string[];
    };
  };
}

declare interface QBPushNotificationsSubscriptionsCreate {
  /**
   * Declare which notification channels could be used to notify user about events.
   * Allowed values: apns, apns_voip, gcm, mpns, bbps and email.
   */
  notification_channel:
    | 'apns'
    | 'apns_voip'
    | 'gcm'
    | 'mpns'
    | 'bbps'
    | 'email';
  push_token: {
    /**
     * Determine application mode.
     * It allows conveniently separate development and production modes.
     * Allowed values: development or production.
     */
    environment: 'development' | 'production';
    /**
     * A unique identifier for client's application.
     * In iOS, this is the Bundle Identifier.
     * In Android - package id.
     */
    bundle_identifier?: string;
    /**
     * Identifies client device in 3-rd party service like APNS, GCM/FCM, BBPS or MPNS.
     * Initially retrieved from 3-rd service and should be send to QuickBlox to let it send push notifications to the client.
     */
    client_identification_sequence: string;
  };
  device: {
    /**
     * Platform of device, which is the source of application running.
     * Allowed values: ios, android, windows_phone, blackberry.
     */
    platform: 'ios' | 'android' | 'windows_phone' | 'blackberry';
    /**
     * UDID (Unique Device identifier) of device, which is the source of application running.
     * This must be anything sequence which uniquely identify particular device.
     * This is needed to support schema: 1 User - Multiple devices.
     */
    udid: string;
  };
}

declare interface QBPushNotificationsModule {
  events: {
    /**
     * Create notification event.
     * This request will immediately produce notification delivery
     * (push notification or email)
     * ([read more](https://docs.quickblox.com/docs/js-push-notifications#send-push-notifications)).
     */
    create(
      params: QBPushNotificationsEventsCreate,
      callback: QBCallback<any>,
    ): void;
    /** Delete an event by ID. */
    delete(id, callback: QBCallback<any>): void;
    /** Retrieve an event by ID. */
    get(id, callback: QBCallback<any>): void;
    /** Get list of events which were created by current user. */
    list(params, callback: QBCallback<any>): void;
    /** Retrieve an event's status by ID. */
    status(id, callback: QBCallback<any>): void;
  };
  subscriptions: {
    /** Create device based subscription. */
    create(
      params: QBPushNotificationsSubscriptionsCreate,
      callback: QBCallback<any>,
    ): void;
    /** Remove a subscription by its identifier. */
    delete(id: number, callback: QBCallback<any>): void;
    /** Retrieve subscriptions for the user which is specified in the session token. */
    list(callback: QBCallback<any>): void;
  };
  base64Encode(payload: any): string;
}

declare interface QBAddressBookModule {
  /**
   * Upload address book
   * ([read more](https://docs.quickblox.com/docs/js-address-book#upload-address-book)).
   */
  uploadAddressBook(
    contacts: any[],
    options: { udid?: string; force?: 1 },
    callback: QBCallback<any>,
  ): void;
  /**
   * Upload address book
   * ([read more](https://docs.quickblox.com/docs/js-address-book#upload-address-book)).
   */
  uploadAddressBook(contacts: any[], callback: QBCallback<any>): void;
  /**
   * Retrieve address book
   * ([read more](https://docs.quickblox.com/docs/js-address-book#retrieve-address-book)).
   */
  get(UDID: string, callback: QBCallback<any>): void;
  /**
   * Retrieve address book
   * ([read more](https://docs.quickblox.com/docs/js-address-book#retrieve-address-book)).
   */
  get(callback: QBCallback<any>): void;
  /**
   * Retrieve registered users
   * ([read more](https://docs.quickblox.com/docs/js-address-book#retrieve-registered-users)).
   */
  getRegisteredUsers(isCompact: boolean, callback: QBCallback<any>): void;
  /**
   * Retrieve registered users
   * ([read more](https://docs.quickblox.com/docs/js-address-book#retrieve-registered-users)).
   */
  getRegisteredUsers(callback: QBCallback<any>): void;
}

declare type QBLoginParams =
  | {
      login: string;
      password: string;
    }
  | {
      email: string;
      password: string;
    }
  | {
      provider: 'firebase_phone';
      firebase_phone: { access_token: string; project_id: string };
    }
  | {
      provider: 'facebook';
      keys: { token: string; secret: string | null };
    };

class QuickBlox {
  version: string;

  buildNumber: string;

  chat: QBChatModule;

  content: QBContentModule;

  data: QBDataModule;

  users: QBUsersModule;

  webrtc: QBWebRTCModule;

  pushnotifications: QBPushNotificationsModule;

  addressbook: QBAddressBookModule;

  /**
   * Create new session
   * ([read more](https://docs.quickblox.com/docs/js-authentication#create-session)).
   */
  createSession: {
    (callback: QBCallback<QBSession>): void;
    (params: QBLoginParams, callback: QBCallback<QBSession>): void;
  };

  startSessionWithToken(
    token: string,
    callback: QBCallback<{ session: QBSession }>,
  );

  /**
   * Destroy current session
   * ([read more](https://docs.quickblox.com/docs/js-authentication#destroy-session-token)).
   */
  destroySession(callback: QBCallback<any>): void;

  /**
   * Return current session
   * ([read more](https://docs.quickblox.com/docs/js-authentication#get-session)).
   */
  getSession(callback: QBCallback<{ session: QBSession }>): void;

  /**
   * Init QuickBlox SDK
   *  ([read more](https://docs.quickblox.com/docs/js-setup#initialize-quickblox-sdk))
   */
  init(
    appIdOrToken: string | number,
    authKeyOrAppId: string | number,
    authSecret: string | null | undefined,
    accountKey: string,
    config?: QBConfig,
  ): void;

  /**
   * Init QuickBlox SDK with User Account data to start session with token
   * ([read more](https://docs.quickblox.com/docs/js-setup#initialize-quickblox-sdk-without-authorization-key-and-secret)).
   */
  initWithAppId(appId: number, accountKey: string, config?: QBConfig): void;

  /**
   * Login to QuickBlox application
   * ([read more](https://docs.quickblox.com/docs/js-authentication#log-in-user)).
   */
  login(params: QBLoginParams, callback: QBCallback<QBUser>): void;

  /**
   * Remove user from current session, but doesn't destroy it
   * ([read more](https://docs.quickblox.com/docs/js-authentication#log-out-user)).
   */
  logout(callback: QBCallback<any>): void;

  service: {
    qbInst: {
      session: QBSession | null;
      config: {
        endpoints: Required<Required<QBConfig>['endpoints']>;
        webrtc: Required<Required<QBConfig>['webrtc']>;
        chatProtocol: Required<Required<QBConfig>['chatProtocol']>;
        on: Required<Required<QBConfig>['on']>;
        streamManagement: Required<Required<QBConfig>['streamManagement']>;
        debug: QBConfig['debug'];
        version: string;
        buildNumber: string;
        creds: {
          appId: number;
          authKey: string;
          authSecret: string;
          accountKey: string;
        };
        urls: {
          account: 'account_settings';
          session: 'session';
          login: 'login';
          users: 'users';
          chat: 'chat';
          blobs: 'blobs';
          subscriptions: 'subscriptions';
          events: 'events';
          data: 'data';
          addressbook: 'address_book';
          addressbookRegistered: 'address_book/registered_users';
          type: '.json';
        };
        qbTokenExpirationDate: Date | null;
      };
    };
  };
}

interface QuickBloxConstructor {
  prototype: QuickBlox;
  new (): QuickBlox;
}

interface QB extends QuickBlox {
  QuickBlox: QuickBloxConstructor;
}

declare const SDK: QB;

//
declare const QB: QB; // should leave for backward compatibility

/*
    * QuickBlox Types - end

 */
//
// interface QBError {
//   code?: number;
//   status?: string;
//   detail?: string | string[] | Dictionary<string | string[]>;
//   message: string | string[] | Dictionary<string | string[]>;
// }
//
// interface QBUser {
//   id: number;
//   full_name: string;
//   email: string;
//   login: string;
//   phone: string;
//   website: string;
//   /** Date ISO string */
//   created_at: string;
//   /** Date ISO string */
//   updated_at: string;
//   /** Date ISO string */
//   last_request_at: string;
//   external_user_id: null;
//   facebook_id: string | null;
//   blob_id: number | string | null;
//   custom_data: string | null;
//   age_over16: boolean;
//   allow_statistics_analysis: boolean;
//   allow_sales_activities: boolean;
//   parents_contacts: string;
//   user_tags: string | null;
//   password?: string;
//   old_password?: string;
// }
//
// type QBUserCustomData = Partial<{
//   full_name: string;
//   address: string;
//   birthdate: string;
//   description: string;
//   gender: string;
//   language: string;
//   avatar: {
//     id: number;
//     uid: string;
//   };
// }>;
//
// interface QBUserWithCustomData extends Omit<QBUser, 'custom_data'> {
//   custom_data: QBUserCustomData;
// }
//
// interface QBSession {
//   _id: string;
//   application_id: number;
//   /** Date ISO string */
//   created_at: string;
//   id: number;
//   nonce: number;
//   token: string;
//   ts: number;
//   /** Date ISO string */
//   updated_at: string;
//   user_id: QBUser['id'];
// }
//
// type ChatConnectParams =
//   | {
//       userId: number;
//       /** user's password or session token */
//       password: string;
//     }
//   | {
//       jid: string;
//       /** user's password or session token */
//       password: string;
//     }
//   | {
//       email: string;
//       /** user's password or session token */
//       password: string;
//     };
//
// interface ChatMessageAttachment {
//   /** ID of the file on QuickBlox server (UID of file from QB.content.createAndUpload) */
//   id: string | number;
//   uid?: string;
//   /** Type of attachment. Example: audio, video, image or other */
//   type: string;
//   /** Link to a file in Internet */
//   url?: string;
//   name?: string;
//   size?: number;
//   [key: string]: unknown;
// }
//
// enum QBChatDialogType {
//   PUBLIC = 1,
//   GROUP = 2,
//   PRIVATE = 3,
// }
//
// interface QBChatDialog {
//   _id: string;
//   /** Date ISO string */
//   created_at: string;
//   data?: { [key: string]: string };
//   last_message: string | null;
//   /** Date ISO string */
//   last_message_date_sent: string | null;
//   last_message_id: string | null;
//   last_message_user_id: QBUser['id'] | null;
//   name: string;
//   occupants_ids: number[];
//   new_occupants_ids: number[];
//   photo: null | string;
//   type: typeof QBChatDialogType | number;
//   /** Date ISO string */
//   updated_at: string;
//   user_id: QBUser['id'];
//   xmpp_room_jid: string | null;
//   unread_messages_count: number | null;
//   joined?: boolean;
// }
//
// interface QBChatNewMessage {
//   type: 'chat' | 'groupchat';
//   body: string;
//   notification_type?: string;
//   dialog_id?: QBChatDialog['_id'];
//   extension: {
//     attachments?: ChatMessageAttachment[];
//     save_to_history: 0 | 1;
//     dialog_id: QBChatDialog['_id'];
//     notification_type?: string;
//     sender_id?: QBUser['id'];
//     qb_message_action?: 'forward' | 'reply';
//     origin_sender_name?: string;
//     qb_original_messages?: string;
//   };
//   markable: 0 | 1;
// }
//
// interface QBChatMessage {
//   _id: string;
//   attachments: ChatMessageAttachment[];
//   chat_dialog_id: QBChatDialog['_id'];
//   /** Date ISO string */
//   created_at: string;
//   /** Date timestamp */
//   date_sent: number;
//   delivered_ids?: Array<QBUser['id']>;
//   message: string;
//   read_ids?: Array<QBUser['id']>;
//   read: 0 | 1;
//   recipient_id: QBUser['id'] | null;
//   sender_id: QBUser['id'];
//   /** Date ISO string */
//   updated_at: string;
//   notification_type?: string;
//   qb_message_action?: 'forward' | 'reply';
//   origin_sender_name?: string;
//   qb_original_messages?: string;
// }
//
// interface QBMessageStatusParams {
//   messageId: QBChatMessage['_id'];
//   dialogId: QBChatDialog['_id'];
//   userId: QBUser['id'];
// }
//
// interface QBChatXMPPMessage {
//   id: string;
//   dialog_id: QBChatDialog['_id'];
//   recipient_id: null;
//   type: 'chat' | 'groupchat';
//   notification_type?: string;
//   body: string;
//   delay: null;
//   markable: 0 | 1;
//   extension: {
//     attachments?: ChatMessageAttachment[];
//     date_sent: string;
//     notification_type?: string;
//     save_to_history?: 0 | 1;
//     dialog_id?: QBChatDialog['_id'];
//     sender_id?: QBUser['id'];
//   };
// }
//

//
// interface QBGetDialogResult {
//   items: QBChatDialog[];
//   limit: number;
//   skip: number;
//   total_entries: number;
// }
//
// type GetMessagesResult = {
//   items: QBChatMessage[];
//   limit: number;
//   skip: number;
// };
//
// interface QBChatModule {
//   dialog: {
//     create(
//       params: Dictionary<unknown>,
//       callback: (error?: QBError, result: QBChatDialog) => void,
//     ): void;
//     list(
//       params: Dictionary<unknown>,
//       callback: (error?: QBError, result: QBGetDialogResult) => void,
//     ): void;
//     update(
//       id: string,
//       data: Dictionary<unknown>,
//       callback: (error?: QBError, result: QBChatDialog) => void,
//     ): void;
//     delete(
//       dialogIds: Array<QBChatDialog['_id']>,
//       callback: (error?: QBError) => void,
//     ): void;
//   };
//   message: {
//     list(
//       params: Dictionary<unknown>,
//       callback: (error?: QBError, result: GetMessagesResult) => void,
//     ): void;
//   };
//   isConnected: boolean;
//   send<T extends QBChatNewMessage>(
//     jidOrUserId: QBUser['id'] | string,
//     message: T,
//   ): string;
//   sendSystemMessage(
//     jidOrUserId: QBUser['id'] | string,
//     message: { extension: QBSystemMessage['extension'] },
//   ): string;
//   sendDeliveredStatus(params: QBMessageStatusParams): void;
//   sendReadStatus(params: QBMessageStatusParams): void;
//   sendIsTypingStatus(jidOrUserId: QBUser['id'] | string): void;
//   sendIsStopTypingStatus(jidOrUserId: QBUser['id'] | string): void;
//   connect: (
//     params: ChatConnectParams,
//     callback: (error?: QBError, result: unknown) => void,
//   ) => void;
//   disconnect: () => void;
//   ping(jidOrUserId: string | number, callback: (error: unknown) => void): void;
//   ping(callback: (error?: QBError) => void): void;
//   muc: {
//     join(
//       dialogJid: string,
//       callback: (error?: QBError, result: unknown) => void,
//     ): void;
//     leave(
//       dialogJid: string,
//       callback: (error?: QBError, result: unknown) => void,
//     ): void;
//   };
//   helpers: {
//     getDialogJid(dialogId: QBChatDialog['_id']): string;
//     getUserCurrentJid(): string;
//     getUserJid(userId: QBUser['id'], appId?: string | number): string;
//     getRoomJidFromDialogId(dialogId: QBChatDialog['_id']): string;
//     getRecipientId(
//       occupantsIds: Array<QBUser['id']>,
//       userId: QBUser['id'],
//     ): number;
//   };
//   onMessageListener?: (
//     senderId: QBUser['id'],
//     message: QBChatXMPPMessage,
//   ) => void;
//   onMessageErrorListener?: (messageId: string, error: unknown) => void;
//   onMessageTypingListener?: (
//     isTyping: boolean,
//     userId: QBUser['id'],
//     dialogId: QBChatDialog['_id'],
//   ) => void;
//   onDeliveredStatusListener?: (
//     messageId: string,
//     dialogId: QBChatDialog['_id'],
//     userId: QBUser['id'],
//   ) => void;
//   onReadStatusListener?: (
//     messageId: string,
//     dialogId: QBChatDialog['_id'],
//     userId: QBUser['id'],
//   ) => void;
//   onSystemMessageListener?: (message: QBSystemMessage) => void;
//   onReconnectFailedListener?: (error: unknown) => void;
//   onDisconnectedListener?: VoidFunction;
//   onReconnectListener?: VoidFunction;
//   onSessionExpiredListener?: (error?: QBError) => void;
// }
// interface QBContentParam {
//   name: string;
//   file: any;
//   type: string;
//   size: number;
//   public: boolean; // optional, "false" by default
// }
//
// interface QBContentObject {
//   account_id: number;
//   app_id: number;
//   content_type: string;
//   created_at: string;
//   id: number;
//   name: string;
//   public: boolean;
//   size: number;
//   uid: string;
//   updated_at: string;
// }
//
// interface QBCustomObject {
//   /**
//    * ID of the record
//    * Generated automatically by the server after record creation
//    */
//   _id: string;
//   /** ID of the user who created the record */
//   user_id: QBUser['id'];
//   /** ID of parent object (Relations) */
//   _parent_id: string | null;
//   /** Date & time when a record was created, filled automatically */
//   created_at: number;
//   /** Date & time when record was updated, filled automatically */
//   updated_at: number;
// }
//
// interface QBAppointment extends QBCustomObject {
//   priority: number;
//   client_id: QBUser['id'];
//   provider_id: QBUser['id'];
//   dialog_id: QBChatDialog['_id'];
//   description: string;
//   notes: string;
//   conclusion?: string;
//   date_start?: string;
//   date_end?: string;
//   language?: string;
//   records?: Array<QBContentObject['id']>;
// }
//
// interface QBSchedule extends QBCustomObject {
//   provider_id: QBUser['id'];
//   duration: number;
//   timezone: string;
//   holidays: string[] | null;
//   sunday: string[] | null;
//   monday: string[] | null;
//   tuesday: string[] | null;
//   wednesday: string[] | null;
//   thursday: string[] | null;
//   friday: string[] | null;
//   saturday: string[] | null;
// }
//
// interface QBCalendarEvent extends QBCustomObject {
//   date: string;
//   duration: number;
//   provider_id: QBUser['id'];
//   client_id: QBUser['id'];
//   appointment_id: QBAppointment['_id'];
// }
//
// type CreateAndUploadParams = {
//   file: File;
//   name: File['name'];
//   type: File['type'];
//   size: File['size'];
//   public?: boolean;
// };
//
// interface QBContentModule {
//   privateUrl(fileUID: string): string;
//   publicUrl(fileUID: string): string;
//   getInfo(
//     id: number,
//     callback: (error?: QBError, file: { blob: QBContentObject }) => void,
//   );
//   delete(id: number, callback: (error?: QBError, file: unknown) => void);
//   createAndUpload(
//     param: QBContentParam,
//     callback: (error?: QBError, file: { blob: QBContentObject }) => void,
//   );
// }
//
// interface QBDataDeletedResponse {
//   deleted: Array<QBCustomObject['_id']>;
//   deletedCount: number;
// }
//
// interface QBDataModule {
//   create<T extends QBCustomObject>(
//     className: string,
//     data: Dictionary<unknown>,
//     callback: (error?: QBError, customObject: T) => void,
//   ): void;
//   delete<T extends QBCustomObject['_id'] | Array<QBCustomObject['_id']>>(
//     className: string,
//     ids: T,
//     callback: (error?: QBError, res: QBDataDeletedResponse) => void,
//   ): void;
//   list<T extends QBCustomObject>(
//     className: string,
//     filters: Dictionary<unknown>,
//     callback: (
//       error?: QBError,
//       result: {
//         class_name: string;
//         items: T[];
//         limit: number;
//         skip: number;
//       },
//     ) => void,
//   ): void;
//   update<
//     D extends { _id: string } & Dictionary<unknown>,
//     T extends QBCustomObject,
//   >(
//     className: string,
//     data: D,
//     callback: (error?: QBError, result: T) => void,
//   ): void;
// }
//
// interface QBCreateUserWithLogin {
//   login: string;
//   password: string;
//   blob_id?: number;
//   custom_data?: string;
//   email?: string;
//   external_user_id?: string | number;
//   facebook_id?: string;
//   full_name?: string;
//   phone?: string;
//   tag_list?: string | string[];
//   twitter_id?: string;
//   website?: string;
// }
//
// interface QBCreateUserWithEmail {
//   email: string;
//   password: string;
//   blob_id?: number;
//   custom_data?: string;
//   external_user_id?: string | number;
//   facebook_id?: string;
//   full_name?: string;
//   login?: string;
//   phone?: string;
//   tag_list?: string | string[];
//   twitter_id?: string;
//   website?: string;
// }
//
// type QBCreateUserParams = QBCreateUserWithLogin | QBCreateUserWithEmail;
//
// type GetUserParam =
//   | { login: string }
//   | { full_name: string }
//   | { facebook_id: string }
//   | { twitter_id: string }
//   | { phone: string }
//   | { email: string }
//   | { tags: string }
//   | { external: string };
//
// type GetUserParams =
//   | GetUserParam
//   | {
//       page?: number;
//       per_page?: number;
//     };
//
// type ListUserParams = {
//   page?: number;
//   per_page?: number;
//   filter?: Dictionary<unknown>;
//   order?: string;
// };
//
// interface ListUserResponse {
//   current_page: number;
//   per_page: number;
//   total_entries: number;
//   items: Array<{ user: QBUser }>;
// }
//
// interface QBUsersModule {
//   get(
//     params: number,
//     callback: (error?: QBError, response?: QBUser) => void,
//   ): void;
//   get(
//     params: GetUserParams,
//     callback: (error?: QBError, response: ListUserResponse) => void,
//   ): void;
//   listUsers(
//     params: ListUserParams,
//     callback: (error?: QBError, response: ListUserResponse) => void,
//   ): void;
//   create(
//     params: QBCreateUserParams,
//     callback: (error?: QBError, user: QBUser) => void,
//   ): void;
//   update(
//     userId: number,
//     user: Partial<QBUser>,
//     callback: (error?: QBError, user: QBUser) => void,
//   ): void;
// }
//
// interface QBGetUserMediaParams {
//   audio: MediaStreamConstraints['audio'];
//   video: MediaStreamConstraints['video'];
//   /** id attribute of HTMLVideoElement */
//   elemId?: string;
//   options?: {
//     muted?: boolean;
//     mirror?: boolean;
//   };
// }
//
// interface QBWebRTCSession {
//   State: {
//     NEW: 1;
//     ACTIVE: 2;
//     HUNGUP: 3;
//     REJECTED: 4;
//     CLOSED: 5;
//   };
//   ID: string;
//   /**
//    * One of {@link QBWebRTCSession#State}
//    */
//   state: number;
//   initiatorID: number;
//   opponentsIDs: number[];
//   peerConnections: { [userId: number]: RTCPeerConnection };
//   callType: 1 | 2;
//   startCallTime?: Date;
//   localStream?: MediaStream;
//   mediaParams: QBGetUserMediaParams | null;
//   getUserMedia(
//     params: QBGetUserMediaParams,
//     callback: (error?: QBError, stream?: MediaStream) => void,
//   ): void;
//   /** Attach media stream to audio/video element */
//   attachMediaStream(
//     videoElemId: string,
//     stream: MediaStream,
//     options?: QBGetUserMediaParams['options'],
//   ): void;
//   /** Detach media stream from audio/video element */
//   detachMediaStream(videoElemId: string): void;
//   mute(type: 'audio' | 'video'): void;
//   unmute(type: 'audio' | 'video'): void;
//   /** Innitiate a call */
//   call(params: Dictionary<unknown>): void;
//   /** Accept call */
//   accept(params: Dictionary<unknown>): void;
//   /** Reject call */
//   reject(params: Dictionary<unknown>): void;
//   /** Stop call (Hang up) */
//   stop(params: Dictionary<unknown>): void;
//   switchMediaTracks(
//     deviceIds: { audio?: { exact: string }; video?: { exact: string } },
//     callback: (error?: QBError, stream?: MediaStream) => void,
//   ): void;
//   /** Add tracks from provided stream to local stream (and replace in peers) */
//   _replaceTracks(stream: MediaStream): void;
// }
//
// interface QBWebRTCModule {
//   CallType: {
//     VIDEO: 1;
//     AUDIO: 2;
//   };
//   getMediaDevices(kind?: MediaDeviceKind): Promise<MediaDeviceInfo[]>;
//   createNewSession(opponentsIds: number[], callType: 1 | 2): QBWebRTCSession;
//   onAcceptCallListener?: (
//     session: QBWebRTCSession,
//     userId: number,
//     userInfo: Dictionary<unknown>,
//   ) => void;
//   onCallListener?: (
//     session: QBWebRTCSession,
//     userInfo: Dictionary<unknown>,
//   ) => void;
//   onCallStatsReport?: (
//     session: QBWebRTCSession,
//     userId: number,
//     stats: string[],
//   ) => void;
//   onRejectCallListener?: (
//     session: QBWebRTCSession,
//     userId: number,
//     userInfo: Dictionary<unknown>,
//   ) => void;
//   onRemoteStreamListener?: (
//     sesion: QBWebRTCSession,
//     userId: number,
//     stream: MediaStream,
//   ) => void;
//   onSessionCloseListener?: (session: QBWebRTCSession) => void;
//   onSessionConnectionStateChangedListener?: (
//     sesion: QBWebRTCSession,
//     userId: number,
//     state: unknown,
//   ) => void;
//   onStopCallListener?: (
//     session: QBWebRTCSession,
//     userId: number,
//     userInfo: Dictionary<unknown>,
//   ) => void;
//   onUpdateCallListener?: (
//     session: QBWebRTCSession,
//     userId: number,
//     userInfo: Dictionary<unknown>,
//   ) => void;
//   onUserNotAnswerListener?: (session: QBWebRTCSession, userId: number) => void;
// }
//
// type QBLoginParams =
//   | {
//       login: string;
//       password: string;
//     }
//   | {
//       email: string;
//       password: string;
//     }
//   | {
//       provider: 'firebase_phone';
//       firebase_phone: { access_token: string; project_id: string };
//     };
//
// interface Quickblox {
//   auth: {
//     createSession: VoidFunction;
//   };
//   buildNumber: string;
//   chat: QBChatModule;
//   content: QBContentModule;
//   createSession(
//     params?: QBLoginParams,
//     callback: (error?: QBError, session: QBSession) => void,
//   ): void;
//   data: QBDataModule;
//   destroySession(callback: (error?: QBError, res: unknown) => void): void;
//   getSession(
//     callback: (error?: QBError, response?: { session: QBSession }) => void,
//   ): void;
//   init(
//     appIdOrToken: string | number,
//     authKeyOrAppId: string | number,
//     authSecret?: string,
//     accountKey: string,
//     config?: QBConfig,
//   ): void;
//   login(
//     params: QBLoginParams,
//     callback: (error: unknown, user: QBUser) => void,
//   ): void;
//   logout(callback: (error: unknown, res: unknown) => void): void;
//   service: {
//     qbInst: {
//       config: {
//         webrtc: {
//           answerTimeInterval: number;
//         };
//         endpoints: {
//           api: string;
//         };
//         urls: {
//           blobs: string;
//           type: string;
//           data: string;
//         };
//       };
//     };
//   };
//   users: QBUsersModule;
//   webrtc: QBWebRTCModule;
//   version: string;
// }
//
// interface QuickbloxConstructor {
//   prototype: Quickblox;
//   new (): Quickblox;
// }
//
// interface QB extends Quickblox {
//   QuickBlox: QuickbloxConstructor;
// }
//
// declare const QB: QB;
//
// interface QBMediaRecorderConstructorProps {
//   /** Preferred MIME type */
//   mimeType?: string;
//   workerPath?: string;
//   /**
//    * The minimum number of milliseconds of data to return
//    * in a single Blob, fire 'ondataavaible' callback
//    * (isn't need to use with 'audio/wav' of 'audio/mp3')
//    *
//    * @default 1000
//    */
//   timeslice?: number;
//   /**
//    * What to do with a muted input MediaStreamTrack,
//    * e.g. insert black frames/zero audio volume in the recording
//    * or ignore altogether
//    *
//    * @default true
//    */
//   ignoreMutedMedia?: boolean;
//   /** Recording start event handler */
//   onstart?: VoidFunction;
//   /** Recording stop event handler */
//   onstop?: (file: Blob) => void;
//   /** Recording pause event handler */
//   onpause?: VoidFunction;
//   /** Recording resume event handler */
//   onresume?: VoidFunction;
//   /** Error event handler */
//   onerror?: (error: unknown) => void;
//   /**
//    * `dataavailable` event handler.
//    * The Blob of recorded data is contained in this event (callback
//    * isn't supported if use 'audio/wav' of 'audio/mp3' for recording)
//    */
//   ondataavailable?: (event: { data: Blob }) => void;
// }
//
// interface QBMediaRecorder {
//   /**
//    * Switch recording Blob objects to the specified
//    * MIME type if `MediaRecorder` support it.
//    */
//   toggleMimeType(mimeType: string): void;
//   /**
//    * Returns current `MediaRecorder` state
//    */
//   getState(): 'inactive' | 'recording' | 'paused';
//   /**
//    * Starts recording a stream.
//    * Fires `onstart` callback.
//    */
//   start(stream: MediaStream): void;
//   /**
//    * Stops recording a stream
//    *
//    * @fires `onstop` callback and passing there Blob recorded
//    */
//   stop(): void;
//   /** Pausing stream recording */
//   pause(): void;
//   /** Resumes stream recording */
//   resume(): void;
//   /**
//    * Change record source
//    */
//   change(stream: MediaStream): void;
//   /**
//    * Create a file from blob and download as file.
//    * This method will call `stop` if recording is in progress.
//    *
//    * @param {string} filename Name of video file to be downloaded
//    * (default to `Date.now()`)
//    */
//   download(filename?: string): void;
//   _getBlobRecorded(): Blob;
//   callbacks: Pick<
//     QBMediaRecorderConstructorProps,
//     | 'onstart'
//     | 'onstop'
//     | 'onpause'
//     | 'onresume'
//     | 'ondataavailable'
//     | 'onerror'
//   >;
// }
//
// declare const QBMediaRecorder: {
//   /**
//    * Checks capability of recording in the environment.
//    * Checks `MediaRecorder`, `MediaRecorder.isTypeSupported` and `Blob`.
//    */
//   isAvailable(): boolean;
//   /**
//    * Checks if AudioContext API is available.
//    * Checks `window.AudioContext` or `window.webkitAudioContext`.
//    */
//   isAudioContext(): boolean;
//   /**
//    * The `QBMediaRecorder.isTypeSupported()` static method returns
//    * a Boolean which is true if the MIME type specified is one
//    * the user agent should be able to successfully record.
//    * @param mimeType The MIME media type to check.
//    *
//    * @returns true if the `MediaRecorder` implementation is capable of
//    * recording `Blob` objects for the specified MIME type. Recording may
//    * still fail if there are insufficient resources to support the
//    * recording and encoding process. If the value is false, the user
//    * agent is incapable of recording the specified format.
//    */
//   isTypeSupported(mimeType: string): boolean;
//   /**
//    * Return supported mime types
//    * @param type video or audio (dafault to 'video')
//    */
//   getSupportedMimeTypes(type: 'audio' | 'video' = 'video'): string[];
//   new (config: QBMediaRecorderConstructorProps): QBMediaRecorder;
// };
