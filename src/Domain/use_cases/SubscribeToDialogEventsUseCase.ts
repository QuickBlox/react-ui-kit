import { BaseUseCase } from './base/BaseUseCase';
import { CallBackFunction } from './base/IUseCase';
import EventMessagesRepository from '../../Data/repository/EventMessagesRepository';
import EventMessageType from '../entity/EventMessageType';
import { NotificationTypes } from '../entity/NotificationTypes';
import { MessageEntity } from '../entity/MessageEntity';
import { SubscriptionPerformer } from './base/Subscribable/SubscriptionPerformer';
import { DialogEventInfo } from '../entity/DialogEventInfo';

export class SubscribeToDialogEventsUseCase extends BaseUseCase<
  DialogEventInfo,
  boolean
> {
  private eventMessagesRepository: EventMessagesRepository;

  private callBackExecute: CallBackFunction<DialogEventInfo> | undefined;

  // todo: delete synUseCase: BaseUseCase<boolean>, use only dialogRepository
  constructor(
    eventMessagesRepository: EventMessagesRepository,
    nameSubscription: string = SubscriptionPerformer.DEFAULT_SUBSCRIPTION_NAME,
  ) {
    console.log('CONSTRUCTOR SubscribeToDialogsUpdatesUseCaseWithMock');
    super();
    this.callBackExecute = undefined;

    this.EVENT_NAME = nameSubscription;
    this.EVENT_TYPE = EventMessageType.LocalMessage;
    this.eventMessagesRepository = eventMessagesRepository;
  }

  execute(callBack: CallBackFunction<DialogEventInfo>): Promise<boolean> {
    console.log('execute SubscribeToDialogEventsUseCase', callBack);
    this.callBackExecute = callBack;
    if (
      this.callBackExecute !== undefined &&
      typeof this.callBackExecute === 'function'
    ) {
      this.subscribe(this.callBackExecute, this.EVENT_TYPE, this.EVENT_NAME);
    }

    this.eventMessagesRepository.subscribeOnSystemMessaging(
      NotificationTypes.NEW_DIALOG,
      this.newDialogEventHandler.bind(this),
      this.EVENT_NAME,
    );

    this.eventMessagesRepository.subscribeOnSystemMessaging(
      NotificationTypes.DELETE_LEAVE_DIALOG,
      this.leaveDialogEventHandler.bind(this),
      this.EVENT_NAME,
    );

    this.eventMessagesRepository.subscribeOnSystemMessaging(
      NotificationTypes.REMOVE_USER,
      this.removeUserDialogEventHandler.bind(this),
      this.EVENT_NAME,
    );

    this.eventMessagesRepository.subscribeOnSystemMessaging(
      NotificationTypes.UPDATE_DIALOG,
      this.updateDialogEventHandler.bind(this),
      this.EVENT_NAME,
    );

    this.eventMessagesRepository.subscribeOnMessaging(
      this.newMessageEventHandler.bind(this),
      this.EVENT_NAME,
    );

    this.eventMessagesRepository.subscribeOnUpdateMessageStatus(
      this.updateMessageStatusEventHandler.bind(this),
      this.EVENT_NAME,
    );

    return Promise.resolve(true);
  }

  updateMessageStatusEventHandler(dialogEventInfo: DialogEventInfo): void {
    console.log(
      'execute newDialogEventHandler in SubscribeToDialogEventsUseCase:',
      JSON.stringify(dialogEventInfo),
    );

    this.informSubscribers(dialogEventInfo);
  }

  newMessageEventHandler(messageEntity: MessageEntity): void {
    console.log(
      'execute newDialogEventHandler in SubscribeToDialogEventsUseCase:',
      JSON.stringify(messageEntity),
    );
    const messageInfo: DialogEventInfo = {
      messageInfo: messageEntity,
      notificationTypes: NotificationTypes.UPDATE_DIALOG,
      eventMessageType: EventMessageType.RegularMessage,
      messageStatus: undefined,
    };

    this.informSubscribers(messageInfo);
  }

  updateDialogEventHandler(messageEntity: MessageEntity): void {
    console.log(
      'execute updateDialogEventHandler in SubscribeToDialogEventsUseCase:',
      JSON.stringify(messageEntity),
    );
    const messageInfo: DialogEventInfo = {
      messageInfo: messageEntity,
      notificationTypes: NotificationTypes.UPDATE_DIALOG,
      eventMessageType: EventMessageType.SystemMessage,
      messageStatus: undefined,
    };

    this.informSubscribers(messageInfo);
  }

  leaveDialogEventHandler(messageEntity: MessageEntity): void {
    console.log(
      'execute leaveDialogEventHandler in SubscribeToDialogEventsUseCase:',
      JSON.stringify(messageEntity),
    );
    const messageInfo: DialogEventInfo = {
      messageInfo: messageEntity,
      notificationTypes: NotificationTypes.DELETE_LEAVE_DIALOG,
      eventMessageType: EventMessageType.SystemMessage,
      messageStatus: undefined,
    };

    this.informSubscribers(messageInfo);
  }

  removeUserDialogEventHandler(messageEntity: MessageEntity): void {
    console.log(
      'execute removeUserDialogEventHandler in SubscribeToDialogEventsUseCase:',
      JSON.stringify(messageEntity),
    );
    const messageInfo: DialogEventInfo = {
      messageInfo: messageEntity,
      notificationTypes: NotificationTypes.REMOVE_USER,
      eventMessageType: EventMessageType.SystemMessage,
      messageStatus: undefined,
    };

    this.informSubscribers(messageInfo);
  }

  newDialogEventHandler(messageEntity: MessageEntity): void {
    console.log(
      'execute newDialogEventHandler in SubscribeToDialogEventsUseCase:',
      JSON.stringify(messageEntity),
    );
    const messageInfo: DialogEventInfo = {
      messageInfo: messageEntity,
      notificationTypes: NotificationTypes.NEW_DIALOG,
      eventMessageType: EventMessageType.SystemMessage,
      messageStatus: undefined,
    };

    this.informSubscribers(messageInfo);
  }
}
