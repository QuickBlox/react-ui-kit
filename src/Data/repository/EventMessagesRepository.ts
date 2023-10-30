import {
  // eslint-disable-next-line import/named
  Registry,
  SubscriptionPerformer,
} from '../../Domain/use_cases/base/Subscribable/SubscriptionPerformer';
import { RemoteDataSource } from '../source/remote/RemoteDataSource';
import ConnectionRepository from './ConnectionRepository';
import { LocalDataSource } from '../source/local/LocalDataSource';
import { RemoteMessageDTO } from '../dto/message/RemoteMessageDTO';
import { stringifyError } from '../../utils/parse';
import { CallBackFunction } from '../../Domain/use_cases/base/IUseCase';
import EventMessageType from '../../Domain/entity/EventMessageType';
import { IRemoteMessaging } from '../source/remote/IRemoteDataSource';
import { MessageEntity } from '../../Domain/entity/MessageEntity';
import { NotificationTypes } from '../../Domain/entity/NotificationTypes';
import { MessageRemoteDTOMapper } from '../mapper/MessageRemoteDTOMapper';
import { DialogEventInfo } from '../../Domain/entity/DialogEventInfo';

export interface IEventBus {
  dispatch<T>(event: string, arg?: T): void;
  register<T>(event: string, callback: CallBackFunction<T>): Registry;
}

export default class EventMessagesRepository
  implements IRemoteMessaging<MessageEntity>
{
  private messageDTOMapper: MessageRemoteDTOMapper;

  protected subscriptionOnSystemMessages: Dictionary<
    SubscriptionPerformer<MessageEntity>
  > = {};

  protected subscriptionOnChatMessages: SubscriptionPerformer<MessageEntity> =
    new SubscriptionPerformer<MessageEntity>();

  protected subscriptionOnUpdateMessageStatus: SubscriptionPerformer<DialogEventInfo> =
    new SubscriptionPerformer<DialogEventInfo>();

  constructor(
    private remoteDs: RemoteDataSource,
    private localDs: LocalDataSource,
    private connectionRep: ConnectionRepository,
  ) {
    console.log('CREATE EventMessagesRepository');
    this.messageDTOMapper = new MessageRemoteDTOMapper();
    this.subscriptionOnSystemMessages[NotificationTypes.UPDATE_DIALOG] =
      new SubscriptionPerformer<MessageEntity>();
    this.subscriptionOnSystemMessages[NotificationTypes.DELETE_LEAVE_DIALOG] =
      new SubscriptionPerformer<MessageEntity>();
    this.subscriptionOnSystemMessages[NotificationTypes.REMOVE_USER] =
      new SubscriptionPerformer<MessageEntity>();
    this.subscriptionOnSystemMessages[NotificationTypes.NEW_DIALOG] =
      new SubscriptionPerformer<MessageEntity>();
    this.remoteDs.subscribeOnSystemMessaging(
      NotificationTypes.NEW_DIALOG,
      this.NewDialogEventHandler.bind(this),
    );
    this.remoteDs.subscribeOnSystemMessaging(
      NotificationTypes.UPDATE_DIALOG,
      this.UpdateDialogEventHandler.bind(this),
    );
    this.remoteDs.subscribeOnSystemMessaging(
      NotificationTypes.DELETE_LEAVE_DIALOG,
      this.DeleteLeaveDialogEventHandler.bind(this),
    );
    this.remoteDs.subscribeOnSystemMessaging(
      NotificationTypes.REMOVE_USER,
      this.RemoteUserDialogEventHandler.bind(this),
    );
    this.remoteDs.subscribeOnMessaging(this.NewMessageEventHandler.bind(this));
    this.remoteDs.subscribeOnUpdateMessageStatus(
      this.UpdateMessageStatusEventHandler.bind(this),
    );
  }

  protected UpdateMessageStatusEventHandler(
    messageInfo: DialogEventInfo,
  ): void {
    console.log(
      'call UpdateMessageStatusEventHandler with updated message status in EventMessagesRepository',
    );
    this.subscriptionOnUpdateMessageStatus.informSubscribers(
      messageInfo,
      EventMessageType.LocalMessage,
    );
  }

  protected NewMessageEventHandler(messageInfo: RemoteMessageDTO): void {
    console.log(
      'call NewMessageEventHandler with new message in EventMessagesRepository',
    );
    this.messageDTOMapper
      .toEntity<RemoteMessageDTO, MessageEntity>(messageInfo)
      // eslint-disable-next-line promise/always-return
      .then((currentMessage: MessageEntity) => {
        console.log(
          'have system message for dialog',
          JSON.stringify(currentMessage),
        );
        this.subscriptionOnChatMessages.informSubscribers(
          currentMessage,
          EventMessageType.RegularMessage,
        );
      })
      .catch((reason) => {
        const errorMessage = stringifyError(reason);

        console.log(
          'get system message with new dialog with exception:',
          errorMessage,
        );

        throw new Error(errorMessage);
      });
  }

  protected NewDialogEventHandler(messageInfo: RemoteMessageDTO): void {
    this.messageDTOMapper
      .toEntity<RemoteMessageDTO, MessageEntity>(messageInfo)
      // eslint-disable-next-line promise/always-return
      .then((currentMessage: MessageEntity) => {
        console.log(
          'have system message new dialog',
          JSON.stringify(currentMessage),
        );
        this.subscriptionOnSystemMessages[
          NotificationTypes.NEW_DIALOG
        ].informSubscribers(currentMessage, EventMessageType.SystemMessage);
      })
      .catch((reason) => {
        const errorMessage = stringifyError(reason);

        console.log(
          'get system message with new dialog with exception:',
          errorMessage,
        );

        throw new Error(errorMessage);
      });
  }

  protected DeleteLeaveDialogEventHandler(messageInfo: RemoteMessageDTO): void {
    this.messageDTOMapper
      .toEntity<RemoteMessageDTO, MessageEntity>(messageInfo)
      // eslint-disable-next-line promise/always-return
      .then((currentMessage: MessageEntity) => {
        console.log(
          'have system message new dialog',
          JSON.stringify(currentMessage),
        );
        this.subscriptionOnSystemMessages[
          NotificationTypes.DELETE_LEAVE_DIALOG
        ].informSubscribers(currentMessage, EventMessageType.SystemMessage);
      })
      .catch((reason) => {
        const errorMessage = stringifyError(reason);

        console.log(
          'get system message with new dialog with exception:',
          errorMessage,
        );

        throw new Error(errorMessage);
      });
  }

  protected RemoteUserDialogEventHandler(messageInfo: RemoteMessageDTO): void {
    this.messageDTOMapper
      .toEntity<RemoteMessageDTO, MessageEntity>(messageInfo)
      // eslint-disable-next-line promise/always-return
      .then((currentMessage: MessageEntity) => {
        console.log(
          'have system message new dialog',
          JSON.stringify(currentMessage),
        );
        this.subscriptionOnSystemMessages[
          NotificationTypes.REMOVE_USER
        ].informSubscribers(currentMessage, EventMessageType.SystemMessage);
      })
      .catch((reason) => {
        const errorMessage = stringifyError(reason);

        console.log(
          'get system message with new dialog with exception:',
          errorMessage,
        );

        throw new Error(errorMessage);
      });
  }

  protected UpdateDialogEventHandler(messageInfo: RemoteMessageDTO): void {
    console.log('call UpdateDialogEventHandler');
    if (this.messageDTOMapper) {
      this.messageDTOMapper
        .toEntity<RemoteMessageDTO, MessageEntity>(messageInfo)
        // eslint-disable-next-line promise/always-return
        .then((currentMessage: MessageEntity) => {
          console.log(
            'have system message new dialog',
            JSON.stringify(currentMessage),
          );
          const subs =
            this.subscriptionOnSystemMessages[NotificationTypes.UPDATE_DIALOG];

          subs.informSubscribers(
            currentMessage,
            EventMessageType.SystemMessage,
          );
        })
        .catch((reason) => {
          const errorMessage = stringifyError(reason);

          console.log(
            'get system message with new dialog with exception:',
            errorMessage,
          );

          throw new Error(errorMessage);
        });
    } else {
      console.log('exception: this.messageDTOMapper');
    }
  }

  // eslint-disable-next-line class-methods-use-this
  public dispatchEvent<TEventInfo>(
    even: EventMessageType,
    eventBody: TEventInfo,
    receivers: number[],
  ) {
    console.log(
      `call dispatchEvent ${even.toString()} with ${JSON.stringify(
        eventBody,
      )} for ${JSON.stringify(receivers)}`,
    );
    if (even === EventMessageType.LocalMessage) {
      this.localDs.setLocalSynced(true);
    }
    if (even === EventMessageType.SystemMessage) {
      receivers.forEach((id) => {
        const systemMessageInfo: RemoteMessageDTO =
          eventBody as RemoteMessageDTO;

        systemMessageInfo.recipient_id = id;

        this.remoteDs.sendSystemMessage(systemMessageInfo).catch((reason) => {
          console.log(
            `EXCEPTION IN send System Message for recipient_id ${id}: `,
            stringifyError(reason),
          );
        });
      });
    }
    if (even === EventMessageType.RegularMessage) {
      const messageInfo: RemoteMessageDTO = eventBody as RemoteMessageDTO;

      this.remoteDs.sendMessage(messageInfo).catch((reason) => {
        console.log(
          `EXCEPTION IN send Regular Message for dialog ${messageInfo.dialogId}: `,
          stringifyError(reason),
        );
      });
    }
  }

  subscribeOnMessaging(
    callback: CallBackFunction<MessageEntity>,
    nameSubscription: string = SubscriptionPerformer.DEFAULT_SUBSCRIPTION_NAME,
  ): void {
    this.subscriptionOnChatMessages.subscribe(
      callback,
      EventMessageType.RegularMessage,
      nameSubscription,
    );
  }

  subscribeOnUpdateMessageStatus(
    callback: CallBackFunction<DialogEventInfo>,
    nameSubscription: string = SubscriptionPerformer.DEFAULT_SUBSCRIPTION_NAME,
  ): void {
    this.subscriptionOnUpdateMessageStatus.subscribe(
      callback,
      EventMessageType.LocalMessage,
      nameSubscription,
    );
  }

  releaseSubscriptions(): void {
    Object.entries(this.subscriptionOnSystemMessages).map((x) => {
      const eventName = x[0];

      return this.subscriptionOnSystemMessages[eventName].release();
    });
  }

  subscribeOnSystemMessaging(
    notificationType: NotificationTypes,
    callback: CallBackFunction<MessageEntity>,
    nameSubscription: string = SubscriptionPerformer.DEFAULT_SUBSCRIPTION_NAME,
  ): void {
    let SystemMessageType: string = NotificationTypes.NEW_DIALOG;

    switch (notificationType) {
      case NotificationTypes.DELETE_LEAVE_DIALOG:
        SystemMessageType = NotificationTypes.DELETE_LEAVE_DIALOG;
        break;
      case NotificationTypes.REMOVE_USER:
        SystemMessageType = NotificationTypes.REMOVE_USER;
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
      nameSubscription,
    );
  }
}
