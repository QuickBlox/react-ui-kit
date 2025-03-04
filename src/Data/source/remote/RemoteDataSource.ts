import {
  ChatMessageAttachment,
  GetMessagesResult,
  GetUserParams,
  ListUserResponse,
  QBBlobCreate,
  QBBlobCreateUploadParams,
  QBChatDialog,
  QBChatMessage,
  QBChatXMPPMessage,
  QBGetDialogResult,
  QBLoginParams,
  QBSession,
  QBSystemMessage,
  QBUser,
  QBMessageStatusParams,
  AIChatHistory,
  AIAnswerResponse,
} from 'quickblox/quickblox';
import { RemoteDialogDTO } from '../../dto/dialog/RemoteDialogDTO';
import {
  INCORRECT_REMOTE_DATASOURCE_DATA_EXCEPTION_CODE,
  INCORRECT_REMOTE_DATASOURCE_DATA_EXCEPTION_MESSAGE,
  NOT_FOUND_REMOTE_DATASOURCE_EXCEPTION_CODE,
  NOT_FOUND_REMOTE_DATASOURCE_EXCEPTION_MESSAGE,
  RemoteDataSourceException,
} from '../exception/RemoteDataSourceException';
import { RemoteDialogsDTO } from '../../dto/dialog/RemoteDialogsDTO';
import { RemoteMessageDTO } from '../../dto/message/RemoteMessageDTO';
import { RemoteUserDTO } from '../../dto/user/RemoteUserDTO';
import { RemoteUsersDTO } from '../../dto/user/RemoteUsersDTO';
import { RemoteMessagesDTO } from '../../dto/message/RemoteMessagesDTO';
import { RemoteFileDTO } from '../../dto/file/RemoteFileDTO';
import { Pagination } from '../../../Domain/repository/Pagination';
import { DialogDTOMapper } from './Mapper/DialogDTOMapper';
import { IDTOMapper } from './Mapper/IDTOMapper';
import { Stubs } from '../../Stubs';
import {
  QBAnswerAssist,
  QBChatConnect,
  QBChatDisconnect,
  qbChatGetMessagesExtended,
  QBChatMarkMessageDelivered,
  QBChatMarkMessageRead,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // QBChatMarkMessageRead,
  QBChatSendMessage,
  QBChatSendSystemMessage,
  QBCreateAndUploadContent,
  QBCreateGroupDialog,
  QBCreatePrivateDialog,
  QBCreateSession,
  QBDeleteDialog,
  QBGetDialogById,
  QBGetDialogs,
  QBInit,
  QBInitParams,
  QBJoinGroupDialog,
  QBLogout,
  QBSendIsStopTypingStatus,
  QBSendIsTypingStatus,
  QBTranslate,
  QBUpdateDialog,
  QBUsersGet,
  QBUsersGetById,
  setQB,
  getQB,
} from '../../../qb-api-calls';
import { UserDTOMapper } from './Mapper/UserDTOMapper';
import { MessageDTOMapper } from './Mapper/MessageDTOMapper';
import { IMapper } from '../../mapper/IMapper';
import { DialogRemoteDTOMapper } from '../../mapper/DialogRemoteDTOMapper';
import { DialogEntity } from '../../../Domain/entity/DialogEntity';
import RepositoryException from '../exception/RepositoryException';
import { MapperDTOException } from '../exception/MapperDTOException';
import { stringifyError } from '../../../utils/parse';
import { DialogType } from '../../../Domain/entity/DialogTypes';
import { NotificationTypes } from '../../../Domain/entity/NotificationTypes';
import EventMessageType from '../../../Domain/entity/EventMessageType';
import { SubscriptionPerformer } from '../../../Domain/use_cases/base/Subscribable/SubscriptionPerformer';
import { CallBackFunction } from '../../../Domain/use_cases/base/IUseCase';
import { FileDTOMapper } from './Mapper/FileDTOMapper';
import { DialogEventInfo } from '../../../Domain/entity/DialogEventInfo';
import { IRemoteDataSource } from './IRemoteDataSource';
import { QBConfig } from '../../../QBconfig';
import {
  QBUIKitChatDialog,
  QBUIKitChatNewMessage,
  QBUIKitConfig,
  QBUIKitSystemMessage,
} from '../../../CommonTypes/CommonTypes';

export type PaginatedDTOResult = {
  PaginationResult: Pagination;
  ResultData: RemoteUserDTO[];
};

export type LoginData = {
  login: string;
  password: string;
};
export type AuthorizationData = {
  sessionToken: string;
  userId: number;
  password: string;
  userName: string;
};

export class RemoteDataSource implements IRemoteDataSource {
  private userDTOMapper: IDTOMapper;

  private messageDTOMapper: IDTOMapper;

  private fileDTOMapper: IDTOMapper;

  private _needInit: boolean;

  private _authProcessed: boolean;

  get authProcessed(): boolean {
    const QB = getQB();
    const auth = this._authProcessed;
    const chatConnection = QB && QB.chat && QB.chat.isConnected;

    if (chatConnection) return true;

    return auth || chatConnection;
  }

  set authProcessed(value: boolean) {
    this._authProcessed = value;
  }

  get needInit(): boolean {
    const QB = getQB();
    const needed = this._needInit;
    const chatConnection = QB && QB.chat && QB.chat.isConnected;

    if (chatConnection) return false;

    return needed;
  }

  public setAuthProcessedSuccessed() {
    this.authProcessed = true;
    this.setInitSDKSuccessed();
  }

  public setInitSDKSuccessed() {
    this._needInit = false;
  }

  private _authInformation: AuthorizationData | undefined;

  get authInformation(): AuthorizationData | undefined {
    return this._authInformation;
  }

  set authInformation(value: AuthorizationData | undefined) {
    this._authInformation = value;
  }

  private currentDialog: RemoteDialogDTO | undefined;

  //
  getCurrentDialogDTOMapper(): IDTOMapper {
    const currentUserId: number = this._authInformation?.userId || -1;
    const dialogDTOMapper: IDTOMapper = new DialogDTOMapper(currentUserId);

    return dialogDTOMapper;
  }

  //
  constructor() {
    console.log('CONSTRUCTOR RemoteDataSourceMock');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    console.log('QB inside RemoteDataSource:', window.QB);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (typeof window !== 'undefined' && window.QB) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setQB(window.QB); // Устанавливаем ссылку на QuickBlox SDK
    }
    this.userDTOMapper = new UserDTOMapper();
    this.messageDTOMapper = new MessageDTOMapper();
    this.fileDTOMapper = new FileDTOMapper();
    this._needInit = true;
    this._authProcessed = false;
    this.subscriptionOnSystemMessages[NotificationTypes.REMOVE_USER] =
      new SubscriptionPerformer<RemoteMessageDTO>();
    this.subscriptionOnSystemMessages[NotificationTypes.UPDATE_DIALOG] =
      new SubscriptionPerformer<RemoteMessageDTO>();
    this.subscriptionOnSystemMessages[NotificationTypes.DELETE_LEAVE_DIALOG] =
      new SubscriptionPerformer<RemoteMessageDTO>();
    this.subscriptionOnSystemMessages[NotificationTypes.NEW_DIALOG] =
      new SubscriptionPerformer<RemoteMessageDTO>();
  }

  // eslint-disable-next-line class-methods-use-this
  createAnswer(
    text: string,
    messages: AIChatHistory,
    smartChatAssistantId: string,
  ): Promise<AIAnswerResponse> {
    return QBAnswerAssist(smartChatAssistantId, text, messages);
  }

  // eslint-disable-next-line class-methods-use-this
  translate(
    text: string,
    languageCode: string,
    smartChatAssistantId: string,
  ): Promise<AIAnswerResponse> {
    return QBTranslate(smartChatAssistantId, text, languageCode);
  }

  // async updateCurrentDialog(dto: RemoteDialogDTO, qbConfig: QBUIKitConfig): Promise<void> {
  //   this.currentDialog = dto;
  //   //
  //   //
  //   const dialogsDTOtoEntityMapper: IMapper = new DialogRemoteDTOMapper();
  //
  //   const dialogEntity: DialogEntity = await dialogsDTOtoEntityMapper.toEntity(
  //     this.currentDialog,
  //   );
  //   const userId = this._authInformation?.userId || -1;
  //   const dialogId = this.currentDialog.id;
  //   const messageId = this.currentDialog.lastMessageId;
  //   //
  //   //
  //   const resultMessage: DialogEventInfo = {
  //     eventMessageType: EventMessageType.LocalMessage,
  //     dialogInfo: dialogEntity,
  //     messageInfo: undefined,
  //     messageStatus: {
  //       isTyping: false,
  //       userId,
  //       dialogId,
  //       messageId,
  //       deliveryStatus: 'delivered',
  //     },
  //     notificationTypes: undefined,
  //   };
  //
  //   this.subscriptionOnMessageStatus.informSubscribers(
  //     resultMessage,
  //     EventMessageType.LocalMessage,
  //   );
  //   //
  //
  //   //
  // }
  async updateCurrentDialog(
    dto: RemoteDialogDTO,
    qbConfig: QBUIKitConfig,
  ): Promise<void> {
    this.currentDialog = dto;

    const dialogsDTOtoEntityMapper: IMapper = new DialogRemoteDTOMapper();
    const dialogEntity: DialogEntity = await dialogsDTOtoEntityMapper.toEntity(
      this.currentDialog,
    );

    const userId = this._authInformation?.userId || -1;
    const dialogId = this.currentDialog.id;
    const messageId = this.currentDialog.lastMessageId;

    const resultMessage: DialogEventInfo = {
      eventMessageType: EventMessageType.LocalMessage,
      dialogInfo: dialogEntity,
      messageInfo: undefined,
      messageStatus: {
        isTyping: false,
        userId,
        dialogId,
        messageId,
        deliveryStatus: 'delivered',
      },
      notificationTypes: undefined,
    };

    this.subscriptionOnMessageStatus.informSubscribers(
      resultMessage,
      EventMessageType.LocalMessage,
    );

    // Mark all messages in the dialog as read
    await this.markAllMessagesAsRead(dialogId, qbConfig);
  }

  /**
   * Marks all messages in the specified dialog as read.
   * Uses the QuickBlox API endpoint provided in qbConfig, or defaults to api.quickblox.com.
   */
  // eslint-disable-next-line class-methods-use-this
  private async markAllMessagesAsRead(
    dialogId: string,
    qbConfig: QBUIKitConfig,
  ): Promise<void> {
    try {
      const apiEndpoint =
        qbConfig.appConfig.endpoints.api || 'api.quickblox.com';
      const qbToken = qbConfig.credentials.sessionToken;

      if (!qbToken) {
        console.warn(
          'QuickBlox session token is missing. Cannot mark messages as read.',
        );

        return;
      }

      const response = await fetch(`https://${apiEndpoint}/chat/Message.json`, {
        method: 'PUT',
        headers: {
          'QB-Token': qbToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_dialog_id: dialogId,
          read: '1',
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to mark messages as read. HTTP status: ${response.status}`,
        );
      }

      console.log(`All messages in dialog ${dialogId} marked as read.`);
    } catch (error) {
      console.error(
        `Error marking messages as read in dialog ${dialogId}:`,
        error,
      );
    }
  }

  public async setUpMockStorage(): Promise<void> {
    const dialogsDTOtoEntityMapper: IMapper = new DialogRemoteDTOMapper();
    const dialogsEntities = Stubs.createDialogsForTest();

    // eslint-disable-next-line no-restricted-syntax
    for (const item of dialogsEntities) {
      const dialogDTO: RemoteDialogDTO =
        // eslint-disable-next-line no-await-in-loop
        await dialogsDTOtoEntityMapper.fromEntity<
          DialogEntity,
          RemoteDialogDTO
        >(item);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars,promise/catch-or-return,promise/always-return
      this.createDialog(dialogDTO)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars,promise/always-return
        .then((_) => {
          console.log(`added mock item ${JSON.stringify(dialogDTO)}`);
        })
        .catch((e) => {
          console.log('EXCEPTION:', (e as RepositoryException).message);
        });
    }
  }

  // eslint-disable-next-line class-methods-use-this
  private async createUserSession(loginData: QBLoginParams) {
    const session: QBSession = await QBCreateSession(loginData);

    return session;
  }

  // eslint-disable-next-line class-methods-use-this
  public static initSDK(sdkParams: QBInitParams): boolean {
    console.log('2. call initSDK in RemoteDataSourceMock');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (!window.QB) {
      throw new Error('HAVE NO SDK');
    } else {
      console.log('2. start init actions');
      QBInit({
        appIdOrToken: sdkParams.appIdOrToken,
        authKeyOrAppId: sdkParams.authKeyOrAppId,
        authSecret: sdkParams.authSecret,
        accountKey: sdkParams.accountKey,
        config: sdkParams.config,
      });
      const QB = getQB();
      const QuickBloxVersion = `CALL initData: Init SDK was success: version ${QB.version} build ${QB.buildNumber}`;

      console.log(QuickBloxVersion);

      return true;
    }
  }

  public async initSDKWithUser(
    sdkParams: QBInitParams,
    authData: LoginData,
  ): Promise<void> {
    console.log('2. call initSDK in RemoteDataSourceMock');
    if (this.needInit) {
      console.log('2. start init actions');
      QBInit({
        appIdOrToken: sdkParams.appIdOrToken,
        authKeyOrAppId: sdkParams.authKeyOrAppId,
        authSecret: sdkParams.authSecret,
        accountKey: sdkParams.accountKey,
        config: sdkParams.config,
      });
      const QB = getQB();
      const QuickBloxVersion = `CALL initData: Init SDK was success: version ${QB.version} build ${QB.buildNumber}`;

      console.log(QuickBloxVersion);
      //
      this._needInit = false;
      await this.loginWithUser(authData);
    }
  }

  public async disconnectAndLogoutUser() {
    if (this.authProcessed) {
      QBChatDisconnect();
      await QBLogout();
      this.authProcessed = false;
      this.releaseSubscriptions();
      this.releaseEventsHandlers();
    }
  }

  releaseSubscriptions(): void {
    Object.entries(this.subscriptionOnSystemMessages).map((x) => {
      const eventName = x[0];

      return this.subscriptionOnSystemMessages[eventName].release();
    });
  }

  subscribeOnSystemMessaging(
    notificationType: NotificationTypes,
    callback: CallBackFunction<RemoteMessageDTO>,
  ): void {
    let SystemMessageType: string = NotificationTypes.NEW_DIALOG;

    switch (notificationType) {
      case NotificationTypes.REMOVE_USER:
        SystemMessageType = NotificationTypes.REMOVE_USER;
        break;
      case NotificationTypes.DELETE_LEAVE_DIALOG:
        SystemMessageType = NotificationTypes.DELETE_LEAVE_DIALOG;
        break;
      case NotificationTypes.UPDATE_DIALOG:
        SystemMessageType = NotificationTypes.UPDATE_DIALOG;
        break;
      default:
        SystemMessageType = NotificationTypes.NEW_DIALOG;
        break;
    }

    this.subscriptionOnSystemMessages[SystemMessageType].subscribe(
      callback,
      EventMessageType.SystemMessage,
    );
  }

  protected subscriptionOnSystemMessages: Dictionary<
    SubscriptionPerformer<RemoteMessageDTO>
  > = {};

  subscribeOnMessaging(callback: CallBackFunction<RemoteMessageDTO>): void {
    this.subscriptionOnChatMessages.subscribe(
      callback,
      EventMessageType.RegularMessage,
    );
  }

  protected subscriptionOnChatMessages: SubscriptionPerformer<RemoteMessageDTO> =
    new SubscriptionPerformer<RemoteMessageDTO>();

  protected subscriptionOnMessageStatus: SubscriptionPerformer<DialogEventInfo> =
    new SubscriptionPerformer<DialogEventInfo>();

  protected subscriptionOnSessionExpiredListener: SubscriptionPerformer<boolean> =
    new SubscriptionPerformer<boolean>();

  subscribeOnSessionExpiredListener(callback: CallBackFunction<boolean>): void {
    console.log('subscribe On Session Expired Event');
    this.subscriptionOnSessionExpiredListener.subscribe(
      callback,
      EventMessageType.LocalMessage,
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const sessionTimeOut = QBConfig.appConfig.sessionTimeOut || 122;

    setTimeout(() => {
      console.log('NEED LOGOUT');
      if (this.authProcessed) {
        this.subscriptionOnSessionExpiredListener.informSubscribers(
          true,
          EventMessageType.LocalMessage,
        );
      }
    }, sessionTimeOut * 60 * 1000);
  }

  subscribeOnUpdateMessageStatus(
    callback: CallBackFunction<DialogEventInfo>,
  ): void {
    this.subscriptionOnMessageStatus.subscribe(
      callback,
      EventMessageType.LocalMessage,
    );
  }

  public initEventsHandlers() {
    console.log('CALL--initEventsHandlers--CALL');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    console.log('QB inside library:', window.QB);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (typeof window !== 'undefined' && window.QB) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setQB(window.QB); // Устанавливаем ссылку на QuickBlox SDK
    }
    const QB = getQB();

    QB.chat.onSystemMessageListener = (message: QBUIKitSystemMessage) => {
      console.log(`EVENT: receive system message: ${JSON.stringify(message)}`);
      const resultMessage = new RemoteMessageDTO();

      resultMessage.sender_id = message.userId;
      resultMessage.message = message.body || 'system message';
      resultMessage.notification_type =
        message.extension?.notification_type || NotificationTypes.UPDATE_DIALOG;
      resultMessage.dialogId = message?.extension?.dialog_id || '';

      this.subscriptionOnSystemMessages[
        resultMessage.notification_type!
      ].informSubscribers(resultMessage, EventMessageType.SystemMessage);
    };

    QB.chat.onMessageListener = (
      userId: number,
      message: QBChatXMPPMessage,
    ) => {
      console.log(
        `EVENT: receive  message for userid: ${userId}, message: ${stringifyError(
          message,
        )}`,
      );
      const dialogId: QBChatDialog['_id'] =
        message.dialog_id || message.extension.dialog_id || '-1';

      //
      qbChatGetMessagesExtended(dialogId, {
        _id: message.id,
        mark_as_read: 0,
      })
        // eslint-disable-next-line promise/always-return
        .then((qbMessages: GetMessagesResult) => {
          ///
          qbMessages.items.map(async (currentItem) => {
            const dtoMessage: RemoteMessageDTO =
              await this.messageDTOMapper.toTDO<
                QBChatMessage,
                RemoteMessageDTO
              >(currentItem);

            dtoMessage.dialogId = dialogId;
            this.subscriptionOnChatMessages.informSubscribers(
              dtoMessage,
              EventMessageType.RegularMessage,
            );
            //
            if (this.currentDialog?.id === dialogId) {
              QBChatMarkMessageRead({
                messageId: message.id,
                dialogId,
                userId: dtoMessage.sender_id,
              });
            }

            ///
            return dtoMessage;
          });
        })
        .catch();
      //
      QBGetDialogById(dialogId)
        .then(async (result) => {
          //
          const dialogs: QBChatDialog[] | undefined = result?.items.filter(
            (v) => v._id === dialogId,
          );
          const current =
            dialogs && dialogs.length > 0 ? dialogs[0] : undefined;
          //
          const dialogDTO: RemoteDialogDTO =
            await this.getCurrentDialogDTOMapper().toTDO(current);
          const dialogsDTOtoEntityMapper: IMapper = new DialogRemoteDTOMapper();

          const dialogEntity: DialogEntity =
            await dialogsDTOtoEntityMapper.toEntity(dialogDTO);
          //
          //
          const resultEvent: DialogEventInfo = {
            eventMessageType: EventMessageType.LocalMessage,
            dialogInfo: dialogEntity,
            messageInfo: undefined,
            messageStatus: {
              isTyping: false,
              userId,
              dialogId,
              messageId: message.id,
              deliveryStatus: 'read',
            },
            notificationTypes: undefined,
          };

          this.subscriptionOnMessageStatus.informSubscribers(
            resultEvent,
            EventMessageType.LocalMessage,
          );

          return resultEvent;
        })
        .catch();
      //
    };
    QB.chat.onDeliveredStatusListener = (messageId, dialogId, userId) => {
      console.log(
        `EVENT: receive delivered message id: ${messageId}, dialogid: ${dialogId} userid: ${userId}`,
      );

      QBGetDialogById(dialogId)
        .then(async (result) => {
          //
          // eslint-disable-next-line @typescript-eslint/no-unused-vars

          const dialogs: QBChatDialog[] | undefined = result?.items.filter(
            (v) => v._id === dialogId,
          );
          const current =
            dialogs && dialogs.length > 0 ? dialogs[0] : undefined;
          //
          const dialogDTO: RemoteDialogDTO =
            await this.getCurrentDialogDTOMapper().toTDO(current);
          const dialogsDTOtoEntityMapper: IMapper = new DialogRemoteDTOMapper();

          const dialogEntity: DialogEntity =
            await dialogsDTOtoEntityMapper.toEntity(dialogDTO);
          //
          //
          const resultMessage: DialogEventInfo = {
            eventMessageType: EventMessageType.LocalMessage,
            dialogInfo: dialogEntity,
            messageInfo: undefined,
            messageStatus: {
              isTyping: false,
              userId,
              dialogId,
              messageId,
              deliveryStatus: 'delivered',
            },
            notificationTypes: undefined,
          };

          this.subscriptionOnMessageStatus.informSubscribers(
            resultMessage,
            EventMessageType.LocalMessage,
          );
          //
          //
          // eslint-disable-next-line promise/always-return
          if (current && current.type === DialogType.private) {
            qbChatGetMessagesExtended(dialogId, {
              _id: messageId,
              mark_as_read: 0,
            })
              // eslint-disable-next-line promise/always-return
              .then((qbMessages: GetMessagesResult) => {
                ///
                qbMessages.items.map(async (currentItem) => {
                  const dtoMessage: RemoteMessageDTO =
                    await this.messageDTOMapper.toTDO<
                      QBChatMessage,
                      RemoteMessageDTO
                    >(currentItem);

                  dtoMessage.dialogId = dialogId;
                  this.subscriptionOnChatMessages.informSubscribers(
                    dtoMessage,
                    EventMessageType.RegularMessage,
                  );
                  //
                  if (this.currentDialog?.id === dialogId) {
                    QBChatMarkMessageRead({
                      messageId,
                      dialogId,
                      userId: dtoMessage.sender_id,
                    });
                  }

                  return dtoMessage;
                });

                ///
              })
              .catch();
            //
          }
        })
        .catch();
    };
    QB.chat.onMessageTypingListener = (isTyping, userId, dialogId) => {
      console.log(
        `EVENT: receive typing: ${
          isTyping ? 'true' : 'false'
        }, dialog id: ${dialogId} userid: ${userId}`,
      );
      if (this.authProcessed && this.authInformation?.userId === userId) return;

      const resultMessage: DialogEventInfo = {
        eventMessageType: EventMessageType.LocalMessage,
        messageInfo: undefined,
        dialogInfo: undefined,
        messageStatus: {
          isTyping,
          userId,
          dialogId,
          messageId: '',
          deliveryStatus: 'sending',
        },
        notificationTypes: undefined,
      };

      this.subscriptionOnMessageStatus.informSubscribers(
        resultMessage,
        EventMessageType.LocalMessage,
      );
    };
    QB.chat.onSessionExpiredListener = (error) => {
      console.log('call  onSessionExpiredListener');
      console.timeLog('onSessionExpiredListener');
      let result = true;

      if (error) {
        console.log(
          'EVENT:onSessionExpiredListener - error: ',
          stringifyError(error),
        );
        result = false;
      } else {
        console.log(
          'EVENT: Hello from SessionExpiredListener. session is expired.',
        );
        result = true;
      }
      this.subscriptionOnSessionExpiredListener.informSubscribers(
        result,
        EventMessageType.LocalMessage,
      );
    };
    QB.chat.onDisconnectedListener = () => {
      console.log('EVENT: disconnect');
    };
    QB.chat.onReconnectListener = () => {
      console.log('EVENT: reconnect');
    };
    QB.chat.onMessageErrorListener = (messageId: string, error: unknown) => {
      console.log(
        `EVENT: receive error message id: ${messageId}, error: ${stringifyError(
          error,
        )}, current auth status is: ${this.authProcessed ? 'true' : 'false'}`,
      );
      this.subscriptionOnSessionExpiredListener.informSubscribers(
        true,
        EventMessageType.LocalMessage,
      );
    };

    QB.chat.onReadStatusListener = (messageId, dialogId, userId) => {
      console.log(
        `EVENT: receive read message id: ${messageId}, dialogid: ${dialogId} userid: ${userId}`,
      );
      const resultMessage: DialogEventInfo = {
        eventMessageType: EventMessageType.LocalMessage,
        messageInfo: undefined,
        dialogInfo: undefined,
        messageStatus: {
          isTyping: false,
          userId,
          dialogId,
          messageId,
          deliveryStatus: 'read',
        },
        notificationTypes: undefined,
      };

      this.subscriptionOnMessageStatus.informSubscribers(
        resultMessage,
        EventMessageType.LocalMessage,
      );
    };

    //
  }

  // eslint-disable-next-line class-methods-use-this
  public releaseEventsHandlers() {
    const QB = getQB();

    QB.chat.onSessionExpiredListener = undefined;
    QB.chat.onReconnectListener = undefined;
    QB.chat.onDisconnectedListener = undefined;
    QB.chat.onSystemMessageListener = undefined;
    QB.chat.onMessageListener = undefined;
    QB.chat.onMessageErrorListener = undefined;
    QB.chat.onDeliveredStatusListener = undefined;
    QB.chat.onReadStatusListener = undefined;
    QB.chat.onMessageTypingListener = undefined;
  }

  public async loginWithUser(authParams: LoginData) {
    if (this.needInit) return;
    if (this.authProcessed) return;
    //
    console.log('CALL createUserSession....');
    const userRequiredParams = {
      login: authParams.login,
      password: authParams.password,
    };
    const sessionResult = await this.createUserSession(
      userRequiredParams,
    ).catch((e) => {
      this._needInit = true;
      this.authProcessed = false;
      console.log(
        `EXCEPTION IN CREATE USER SESSION (${
          userRequiredParams.login
        }) : ${stringifyError(e)}`,
      );
    });

    if (!sessionResult) return;
    //
    //
    this.initEventsHandlers();
    //
    //
    console.log('USER DATA :  ', userRequiredParams);
    console.log('USER SESSION DATA :  ', sessionResult);
    console.log('Session token :  ', sessionResult.token);

    const session = sessionResult;
    const sessionDataTmp = JSON.stringify(session);

    const sessionData = JSON.parse(sessionDataTmp);

    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    console.log(`user_id = ${sessionData.user_id}`);
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    console.log(`session token to chat init = ${sessionData.token}`);
    const authInformation = {
      userName: authParams.login,
      userId: sessionData.user_id,
      sessionToken: sessionData.token,
      password: sessionData.token,
    };

    const paramsConnect = {
      userId: authInformation.userId,
      password: authInformation.password,
    };

    console.log(paramsConnect);
    //
    const connectResult = await QBChatConnect(paramsConnect);

    if (connectResult) {
      //
      this._authInformation = authInformation;
      this.setAuthProcessedSuccessed();
      console.log('CHAT CONNECTED. CAN WORK!');
      console.log('CONNECTION DATA: ', JSON.stringify(authInformation));
      // //
      // this.initEventsHandlers();
      // //
    } else {
      console.log('could not connect to chat');
    }

    //
  }

  async getDialogs(pagination?: Pagination): Promise<RemoteDialogsDTO> {
    let currentPagination: Pagination = pagination || new Pagination();

    console.log(
      'call getDialogs in RemoteDataSourceMock param pagination: ',
      JSON.stringify(pagination),
    );
    console.log(
      'call getDialogs in RemoteDataSourceMock with result pagination: ',
      JSON.stringify(currentPagination),
    );
    const pageNumber = currentPagination.getCurrentPage() || 1;

    console.log('pageNumber: ', pageNumber);
    const perPage = currentPagination.perPage || 100;

    console.log('perPage: ', perPage);
    const params = {
      created_at: {
        lt: Date.now() / 1000,
      },
      // sort_desc: 'created_at',// artan 19.0.2024
      sort_desc: 'updated_at',
      page: pageNumber,
      // per_page: perPage,
      limit: perPage,
      type: {
        in: [2, 3],
      },
    };
    // filter['type[in]'] = [3, 2].join(',');

    console.log(
      'call getDialogs in RemoteDataSourceMock with params: ',
      JSON.stringify(params),
    );
    const dialogsDTO: Array<RemoteDialogDTO> = [];
    const qbDialogs: QBGetDialogResult | undefined = await QBGetDialogs(params);

    if (qbDialogs) {
      console.log(
        `request completed. have: total_entries ${
          qbDialogs.total_entries
        }, limit: ${qbDialogs.limit}, skip: ${
          qbDialogs.skip
        } items: ${JSON.stringify(qbDialogs.items)}`,
      );
      currentPagination = new Pagination(0, perPage);
      currentPagination.totalPages = qbDialogs.total_entries / perPage;
      currentPagination.setCurrentPage(pageNumber);

      // eslint-disable-next-line no-restricted-syntax
      for (const item of qbDialogs.items) {
        const qbEntity: QBChatDialog = item;

        const newDTO: RemoteDialogDTO =
          // eslint-disable-next-line no-await-in-loop
          await this.getCurrentDialogDTOMapper().toTDO(qbEntity);

        // artan 27/06/23
        if (newDTO.type === DialogType.group) {
          // eslint-disable-next-line no-await-in-loop
          await QBJoinGroupDialog(newDTO.id).catch((reason) => {
            console.log('getDialogs. QBJoinGroupDialog error', reason);
            throw new RemoteDataSourceException(
              INCORRECT_REMOTE_DATASOURCE_DATA_EXCEPTION_MESSAGE,
              INCORRECT_REMOTE_DATASOURCE_DATA_EXCEPTION_CODE,
            );
          });
        }

        //
        const currentUserId = this._authInformation?.userId || 0;
        const statusMessageParams: QBMessageStatusParams = {
          userId: newDTO.lastMessageUserId || currentUserId,
          dialogId: newDTO.id,
          messageId: newDTO.lastMessageId,
        };

        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        QBChatMarkMessageDelivered(statusMessageParams);

        dialogsDTO.push(newDTO);
      }
    }

    return Promise.resolve(new RemoteDialogsDTO(dialogsDTO, currentPagination));
  }

  // eslint-disable-next-line class-methods-use-this
  async createDialog(dto: RemoteDialogDTO): Promise<RemoteDialogDTO> {
    console.log(
      'call createDialog in remote with params: ',
      JSON.stringify(dto),
    );
    const qbEntity: QBChatDialog =
      await this.getCurrentDialogDTOMapper().fromDTO(dto);

    let qbDialog: QBChatDialog | undefined | null;

    if (qbEntity.type === DialogType.private) {
      const participantId = qbEntity.occupants_ids[0];

      qbDialog = await QBCreatePrivateDialog(participantId, qbEntity.name);
    } else if (qbEntity.type === DialogType.group) {
      const participants = qbEntity.occupants_ids;

      const data = { photo: qbEntity.photo };

      qbDialog = await QBCreateGroupDialog(participants, qbEntity.name, data);
    }

    if (qbDialog === null || qbDialog === undefined) {
      return Promise.reject(
        new RemoteDataSourceException(
          INCORRECT_REMOTE_DATASOURCE_DATA_EXCEPTION_MESSAGE,
          INCORRECT_REMOTE_DATASOURCE_DATA_EXCEPTION_CODE,
        ),
      );
    }

    const newDTO: RemoteDialogDTO =
      await this.getCurrentDialogDTOMapper().toTDO(qbDialog);

    console.log(
      'have result in createDialog in remote ds: ',
      JSON.stringify(newDTO),
    );

    return Promise.resolve(newDTO);
  }

  async updateDialog(dto: RemoteDialogDTO): Promise<RemoteDialogDTO> {
    const qbEntity: QBUIKitChatDialog =
      await this.getCurrentDialogDTOMapper().fromDTO(dto);

    let data = {};

    if (qbEntity.name && qbEntity.name.length > 0) {
      data = {
        name: qbEntity.name,
        // photo: qbEntity.photo,
        // photo: 'null',
        ...data,
      };
    }
    if (qbEntity.photo) {
      data = {
        ...data,
        photo: qbEntity.photo,
      };
    }
    if (qbEntity.new_occupants_ids && qbEntity.new_occupants_ids.length > 0) {
      data = {
        ...data,
        push_all: { occupants_ids: qbEntity.new_occupants_ids },
      };
    }

    const qbDialogs: QBUIKitChatDialog = await QBUpdateDialog(
      qbEntity._id,
      data,
    );

    if (qbDialogs === null || qbDialogs === undefined) {
      return Promise.reject(
        new RemoteDataSourceException(
          INCORRECT_REMOTE_DATASOURCE_DATA_EXCEPTION_MESSAGE,
          INCORRECT_REMOTE_DATASOURCE_DATA_EXCEPTION_CODE,
        ),
      );
    }

    const newDTO: RemoteDialogDTO =
      await this.getCurrentDialogDTOMapper().toTDO(qbDialogs);

    return Promise.resolve(newDTO);
  }

  // eslint-disable-next-line class-methods-use-this
  async getDialog(dto: RemoteDialogDTO): Promise<RemoteDialogDTO> {
    const qbEntity: QBChatDialog =
      await this.getCurrentDialogDTOMapper().fromDTO(dto);

    const qbDialog: QBGetDialogResult | undefined = await QBGetDialogById(
      qbEntity._id,
    );

    if (qbDialog === null || qbDialog === undefined) {
      return Promise.reject(
        new RemoteDataSourceException(
          INCORRECT_REMOTE_DATASOURCE_DATA_EXCEPTION_MESSAGE,
          INCORRECT_REMOTE_DATASOURCE_DATA_EXCEPTION_CODE,
        ),
      );
    }
    const qbEntityFromDB: QBChatDialog = qbDialog.items[0];

    const resultDTO: RemoteDialogDTO =
      await this.getCurrentDialogDTOMapper().toTDO(qbEntityFromDB);

    return Promise.resolve(resultDTO);
  }

  // eslint-disable-next-line class-methods-use-this
  async deleteDialog(dto: RemoteDialogDTO): Promise<void> {
    const qbEntity: QBChatDialog =
      await this.getCurrentDialogDTOMapper().fromDTO(dto);

    await QBDeleteDialog([qbEntity._id]).catch(() => {
      throw new RemoteDataSourceException(
        INCORRECT_REMOTE_DATASOURCE_DATA_EXCEPTION_MESSAGE,
        INCORRECT_REMOTE_DATASOURCE_DATA_EXCEPTION_CODE,
      );
    });

    return Promise.resolve();
  }

  async deleteUsersFromDialog(
    dialogDTO: RemoteDialogDTO,
    usersDTO: Array<RemoteUserDTO>,
  ): Promise<void> {
    const qbEntity: QBChatDialog =
      await this.getCurrentDialogDTOMapper().fromDTO(dialogDTO);
    const usersIds: string[] = [];

    usersDTO.forEach((item) => {
      usersIds.push(item.id);
    });

    let data = {};

    if (usersIds.length > 0) {
      data = {
        pull_all: { occupants_ids: usersIds },
      };
    }
    const qbDialogs: QBChatDialog = await QBUpdateDialog(qbEntity._id, data);

    if (qbDialogs === null || qbDialogs === undefined) {
      return Promise.reject(
        new RemoteDataSourceException(
          INCORRECT_REMOTE_DATASOURCE_DATA_EXCEPTION_MESSAGE,
          INCORRECT_REMOTE_DATASOURCE_DATA_EXCEPTION_CODE,
        ),
      );
    }

    return Promise.resolve();
  }

  // eslint-disable-next-line @typescript-eslint/require-await,class-methods-use-this,@typescript-eslint/no-unused-vars
  async getUser(dto: RemoteUserDTO): Promise<RemoteUserDTO> {
    const currentItem: QBUser | undefined = await QBUsersGetById(
      parseInt(dto.id, 10),
    );

    if (currentItem === null || currentItem === undefined) {
      return Promise.reject(
        new RemoteDataSourceException(
          INCORRECT_REMOTE_DATASOURCE_DATA_EXCEPTION_MESSAGE,
          INCORRECT_REMOTE_DATASOURCE_DATA_EXCEPTION_CODE,
        ),
      );
    }
    let dtoUser: RemoteUserDTO | undefined;

    try {
      dtoUser = await this.userDTOMapper.toTDO<QBUser, RemoteUserDTO>(
        currentItem,
      );
    } catch (e) {
      console.log('problem with:');
      console.log(JSON.stringify(currentItem));
      console.log((e as MapperDTOException).message);
      console.log((e as MapperDTOException)._description);
    }

    if (dtoUser !== null || dtoUser !== undefined) {
      return Promise.resolve(dtoUser as RemoteUserDTO);
    }

    return Promise.reject(
      new RemoteDataSourceException(
        NOT_FOUND_REMOTE_DATASOURCE_EXCEPTION_MESSAGE,
        NOT_FOUND_REMOTE_DATASOURCE_EXCEPTION_CODE,
        `not found user with id: ${dto.id} (${dto.full_name})`,
      ),
    );
  }

  // eslint-disable-next-line @typescript-eslint/require-await,class-methods-use-this,@typescript-eslint/no-unused-vars
  async getUsers(remoteUsersDTO: RemoteUsersDTO): Promise<RemoteUsersDTO> {
    const usersDTO: Array<RemoteUserDTO> = new Array<RemoteUserDTO>();

    // eslint-disable-next-line no-restricted-syntax
    for (const item of remoteUsersDTO.users) {
      // eslint-disable-next-line no-await-in-loop
      const userDTO = await this.getUser(item);

      usersDTO.push(userDTO);
    }

    return Promise.resolve(new RemoteUsersDTO(usersDTO, new Pagination()));
  }

  //
  // eslint-disable-next-line class-methods-use-this
  public async getAllUsers(
    pagination: Pagination,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    filter?: string,
  ): Promise<PaginatedDTOResult> {
    console.log('call getAllUsers');

    console.log('pagination: ', JSON.stringify(pagination));

    const users: RemoteUserDTO[] = [];
    const pageTemplate = {
      pageSize: pagination.perPage,
      startPageNumber: pagination.getCurrentPage(),
    };
    const pageNumber = pageTemplate.startPageNumber;
    const resultPagination = new Pagination(
      pageNumber,
      pageTemplate.startPageNumber,
    );

    let params: GetUserParams = {
      per_page: pageTemplate.pageSize,
      page: pageNumber,
    };

    if (filter && filter.length > 2) {
      params = {
        full_name: filter,
        per_page: pageTemplate.pageSize,
        page: pageNumber > 0 ? pageNumber : 1,
      };
    }

    console.log('params: ', JSON.stringify(params));

    // eslint-disable-next-line no-await-in-loop
    const response: ListUserResponse | void = await QBUsersGet(params).catch(
      (err) => {
        console.log('catch call QBUsersGet : ', stringifyError(err));
      },
    );

    if (response === undefined || response === null) {
      throw new RemoteDataSourceException(
        NOT_FOUND_REMOTE_DATASOURCE_EXCEPTION_MESSAGE,
        NOT_FOUND_REMOTE_DATASOURCE_EXCEPTION_CODE,
        `params: ${JSON.stringify(params)}`,
      );
    }
    let currentItem: QBUser;

    console.log('response: total_entries: ', response.total_entries);
    console.log('response: per_page: ', response.per_page);
    console.log('response: current_page: ', response.current_page);

    resultPagination.totalPages =
      response.total_entries / pageTemplate.pageSize;
    resultPagination.setCurrentPage(response.current_page);
    console.log(
      `response result: count of items ${
        response.items.length
      } items: ${JSON.stringify(response.items)}`,
    );
    try {
      // eslint-disable-next-line no-restricted-syntax
      for (const item of response.items) {
        currentItem = item.user;
        // eslint-disable-next-line no-await-in-loop
        const dtoUser: RemoteUserDTO = await this.userDTOMapper.toTDO<
          QBUser,
          RemoteUserDTO
        >(currentItem);

        users.push(dtoUser);
      }
    } catch (e) {
      console.log('problem with:');
      console.log(JSON.stringify(currentItem!));
      console.log((e as MapperDTOException).message);
      console.log((e as MapperDTOException)._description);
    }

    return { ResultData: users, PaginationResult: resultPagination };
  }
  //
  //

  // eslint-disable-next-line @typescript-eslint/require-await,class-methods-use-this,@typescript-eslint/no-unused-vars,@typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/require-await,class-methods-use-this
  async getMessages(
    dialogId: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    pagination: Pagination,
  ): Promise<RemoteMessagesDTO> {
    const messagesDTO: Array<RemoteMessageDTO> = new Array<RemoteMessageDTO>();

    const qbMessages: GetMessagesResult = await qbChatGetMessagesExtended(
      dialogId,
    );

    if (qbMessages === null || qbMessages === undefined) {
      return Promise.reject(
        new RemoteDataSourceException(
          INCORRECT_REMOTE_DATASOURCE_DATA_EXCEPTION_MESSAGE,
          INCORRECT_REMOTE_DATASOURCE_DATA_EXCEPTION_CODE,
        ),
      );
    }
    console.log(
      `GET MESSAGES ${qbMessages.items.length} FROM SERVER: ${JSON.stringify(
        qbMessages,
      )} `,
    );
    const currentUserId = this._authInformation?.userId;

    await Promise.all(
      qbMessages.items.map(async (currentItem) => {
        const dtoMessage: RemoteMessageDTO = await this.messageDTOMapper.toTDO<
          QBChatMessage,
          RemoteMessageDTO
        >(currentItem);

        if (
          this.authProcessed &&
          currentUserId &&
          dtoMessage.read_ids &&
          dtoMessage.read_ids.length > 0 &&
          dtoMessage.read_ids.includes(currentUserId) === false
        ) {
          QBChatMarkMessageRead({
            messageId: dtoMessage.id,
            dialogId: dtoMessage.dialogId,
            userId: dtoMessage.sender_id,
          });
        }

        messagesDTO.push(dtoMessage);

        return dtoMessage;
      }),
    );

    return Promise.resolve(
      new RemoteMessagesDTO(messagesDTO, new Pagination()),
    );
  }

  // eslint-disable-next-line class-methods-use-this
  async typingMessageStart(
    dialogDTO: RemoteDialogDTO,
    senderId: number,
  ): Promise<void> {
    const qbEntity: QBChatDialog =
      await this.getCurrentDialogDTOMapper().fromDTO(dialogDTO);

    if (dialogDTO.type === DialogType.group) {
      await QBJoinGroupDialog(dialogDTO.id).catch(() => {
        throw new RemoteDataSourceException(
          INCORRECT_REMOTE_DATASOURCE_DATA_EXCEPTION_MESSAGE,
          INCORRECT_REMOTE_DATASOURCE_DATA_EXCEPTION_CODE,
        );
      });
    }

    QBSendIsTypingStatus(qbEntity, senderId);

    return Promise.resolve();
  }

  // eslint-disable-next-line class-methods-use-this
  async typingMessageStop(
    dialogDTO: RemoteDialogDTO,
    senderId: number,
  ): Promise<void> {
    const qbEntity: QBChatDialog =
      await this.getCurrentDialogDTOMapper().fromDTO(dialogDTO);

    QBSendIsStopTypingStatus(qbEntity, senderId);

    return Promise.resolve();
  }

  // eslint-disable-next-line @typescript-eslint/require-await,class-methods-use-this,@typescript-eslint/no-unused-vars
  async sendMessage(dto: RemoteMessageDTO): Promise<RemoteMessageDTO> {
    console.log('call sendMessage');
    //
    const QB = getQB();
    //
    const messageText = dto.message;

    const qbEntity: QBUIKitChatNewMessage = {
      type: dto.dialog_type === DialogType.private ? 'chat' : 'groupchat',
      body: messageText || '',
      notification_type: dto.notification_type,
      dialog_id: dto.dialogId,
      extension: {
        save_to_history: 1,
        dialog_id: dto.dialogId,
        notification_type: dto.notification_type,
        sender_id: dto.sender_id || dto.recipient_id,
        qb_message_action: dto.qb_message_action, // 'forward' 'reply'
        origin_sender_name: dto.origin_sender_name,
        qb_original_messages: MessageDTOMapper.translateOriginalDataToJSON(
          MessageDTOMapper.convertToQBChatNewMessage(
            dto.qb_original_messages || [],
          ) || [],
        ),
      },
      markable: 1,
      // markable: 0, // mark_as_read ??
    };

    if (dto.attachments?.length > 0) {
      qbEntity.extension.attachments = [];
      dto.attachments.forEach((att) => {
        const chatMessageAttachment: ChatMessageAttachment = {
          id: att.id,
          name: att.name,
          size: att.size,
          type: att.type.toString(),
          uid: att.uid,
        };

        qbEntity.extension.attachments?.push(chatMessageAttachment);
      });
    }
    let qbMessageId: QBChatMessage['_id'];

    if (dto.dialog_type === DialogType.private) {
      qbMessageId = await QBChatSendMessage(dto.recipient_id, qbEntity);
    } else {
      await QBJoinGroupDialog(dto.dialogId).catch(() => {
        throw new RemoteDataSourceException(
          INCORRECT_REMOTE_DATASOURCE_DATA_EXCEPTION_MESSAGE,
          INCORRECT_REMOTE_DATASOURCE_DATA_EXCEPTION_CODE,
        );
      });
      const dialogJid = QB.chat.helpers.getRoomJidFromDialogId(dto.dialogId);

      qbMessageId = await QBChatSendMessage(dialogJid, qbEntity);
    }

    if (qbMessageId === null || qbMessageId === undefined) {
      return Promise.reject(
        new RemoteDataSourceException(
          INCORRECT_REMOTE_DATASOURCE_DATA_EXCEPTION_MESSAGE,
          INCORRECT_REMOTE_DATASOURCE_DATA_EXCEPTION_CODE,
        ),
      );
    }
    console.log('regular message was sent');
    // eslint-disable-next-line no-param-reassign
    dto.id = qbMessageId;

    return Promise.resolve(dto);
  }

  // eslint-disable-next-line class-methods-use-this

  // eslint-disable-next-line class-methods-use-this
  async sendSystemMessage(dto: RemoteMessageDTO): Promise<boolean> {
    let qbMessages: QBSystemMessage | QBChatMessage['_id'] | undefined;

    if (dto.notification_type && dto.notification_type.length > 0) {
      const systemMessage: { extension: QBSystemMessage['extension'] } = {
        extension: {
          notification_type: dto.notification_type,
          dialog_id: dto.dialogId,
        },
      };

      qbMessages = await QBChatSendSystemMessage(
        dto.recipient_id,
        systemMessage,
      );
    }

    if (qbMessages === null || qbMessages === undefined) {
      return Promise.reject(
        new RemoteDataSourceException(
          INCORRECT_REMOTE_DATASOURCE_DATA_EXCEPTION_MESSAGE,
          INCORRECT_REMOTE_DATASOURCE_DATA_EXCEPTION_CODE,
        ),
      );
    }
    console.log('system message was sent');

    return Promise.resolve(true);
  }

  // eslint-disable-next-line @typescript-eslint/require-await,class-methods-use-this,@typescript-eslint/no-unused-vars
  async updateMessage(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    dto: RemoteMessageDTO,
  ): Promise<RemoteMessageDTO> {
    const qbEntity: QBChatMessage = await this.messageDTOMapper.fromDTO(dto);

    const storageValue = localStorage.getItem('qbMessages');
    const result: string = storageValue ?? '';

    const qbMessages: Record<string, QBChatMessage> =
      result === '' ? {} : JSON.parse(result);

    if (qbMessages === null || qbMessages === undefined) {
      return Promise.reject(
        new RemoteDataSourceException(
          INCORRECT_REMOTE_DATASOURCE_DATA_EXCEPTION_MESSAGE,
          INCORRECT_REMOTE_DATASOURCE_DATA_EXCEPTION_CODE,
        ),
      );
    }
    qbMessages[qbEntity._id] = qbEntity;

    // TODO: How get updated QBChatDialog and return to DTO
    localStorage.setItem('qbMessages', JSON.stringify(qbMessages));

    const newDTO: RemoteMessageDTO = await this.messageDTOMapper.toTDO(
      qbEntity,
    );

    return Promise.resolve(newDTO);
  }

  // eslint-disable-next-line @typescript-eslint/require-await,class-methods-use-this,@typescript-eslint/no-unused-vars
  async deleteMessage(dto: RemoteMessageDTO): Promise<void> {
    const qbEntity: QBChatMessage = await this.messageDTOMapper.fromDTO(dto);

    const storageValue = localStorage.getItem('qbMessages');
    const result: string = storageValue ?? '';

    const qbMessages: Record<string, QBChatMessage> =
      result === '' ? {} : JSON.parse(result);

    if (qbMessages === null || qbMessages === undefined) {
      return Promise.reject(
        new RemoteDataSourceException(
          INCORRECT_REMOTE_DATASOURCE_DATA_EXCEPTION_MESSAGE,
          INCORRECT_REMOTE_DATASOURCE_DATA_EXCEPTION_CODE,
        ),
      );
    }
    // TODO: try catch for delete
    const filteredqbMessages: Record<string, QBChatMessage> = {};

    Object.keys(qbMessages).forEach((key) => {
      if (key !== qbEntity._id) {
        filteredqbMessages[key] = qbMessages[key];
      }
    });

    localStorage.setItem('qbMessages', JSON.stringify(filteredqbMessages));

    return Promise.resolve();
  }

  // eslint-disable-next-line @typescript-eslint/require-await,class-methods-use-this,@typescript-eslint/no-unused-vars
  async createFile(dto: RemoteFileDTO): Promise<RemoteFileDTO> {
    console.log('call createFile in remote with params: ', JSON.stringify(dto));
    const qbParam: QBBlobCreateUploadParams = await this.fileDTOMapper.fromDTO(
      dto,
    );

    const result = await QBCreateAndUploadContent(qbParam).catch((err) => {
      console.log('Error: ', stringifyError(err));
      throw new RemoteDataSourceException(
        INCORRECT_REMOTE_DATASOURCE_DATA_EXCEPTION_MESSAGE,
        INCORRECT_REMOTE_DATASOURCE_DATA_EXCEPTION_CODE,
        `exception: ${stringifyError(err)}`,
      );
    });

    if (result === null || result === undefined) {
      return Promise.reject(
        new RemoteDataSourceException(
          INCORRECT_REMOTE_DATASOURCE_DATA_EXCEPTION_MESSAGE,
          INCORRECT_REMOTE_DATASOURCE_DATA_EXCEPTION_CODE,
        ),
      );
    }

    const qbContentObject: QBBlobCreate = result as QBBlobCreate;
    const newDto: RemoteFileDTO = await this.fileDTOMapper.toTDO<
      QBBlobCreate,
      RemoteFileDTO
    >(qbContentObject);

    console.log(
      'have result in createFile in remote ds: ',
      JSON.stringify(newDto),
    );

    return Promise.resolve(newDto);
  }

  // eslint-disable-next-line @typescript-eslint/require-await,class-methods-use-this,@typescript-eslint/no-unused-vars
  async getFile(dto: RemoteFileDTO): Promise<RemoteFileDTO> {
    throw new Error('Method not implemented.');
  }

  // eslint-disable-next-line @typescript-eslint/require-await,class-methods-use-this,@typescript-eslint/no-unused-vars
  async deleteFile(dto: RemoteFileDTO): Promise<void> {
    throw new Error('Method not implemented.');
  }

  // eslint-disable-next-line @typescript-eslint/require-await,class-methods-use-this,@typescript-eslint/no-unused-vars
  async subscribeToChatConnectionEvents(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fileId: string,
  ): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
