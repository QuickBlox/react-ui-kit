import { Registry, SubscriptionPerformer } from '../../Domain/use_cases/base/Subscribable/SubscriptionPerformer';
import { RemoteDataSource } from '../source/remote/RemoteDataSource';
import ConnectionRepository from './ConnectionRepository';
import { LocalDataSource } from '../source/local/LocalDataSource';
import { RemoteMessageDTO } from '../dto/message/RemoteMessageDTO';
import { CallBackFunction } from '../../Domain/use_cases/base/IUseCase';
import EventMessageType from '../../Domain/entity/EventMessageType';
import { IRemoteMessaging } from '../source/remote/IRemoteDataSource';
import { MessageEntity } from '../../Domain/entity/MessageEntity';
import { NotificationTypes } from '../../Domain/entity/NotificationTypes';
import { DialogEventInfo } from '../../Domain/entity/DialogEventInfo';
export interface IEventBus {
    dispatch<T>(event: string, arg?: T): void;
    register<T>(event: string, callback: CallBackFunction<T>): Registry;
}
export default class EventMessagesRepository implements IRemoteMessaging<MessageEntity> {
    private remoteDs;
    private localDs;
    private connectionRep;
    private messageDTOMapper;
    protected subscriptionOnSystemMessages: Dictionary<SubscriptionPerformer<MessageEntity>>;
    protected subscriptionOnChatMessages: SubscriptionPerformer<MessageEntity>;
    protected subscriptionOnUpdateMessageStatus: SubscriptionPerformer<DialogEventInfo>;
    constructor(remoteDs: RemoteDataSource, localDs: LocalDataSource, connectionRep: ConnectionRepository);
    protected UpdateMessageStatusEventHandler(messageInfo: DialogEventInfo): void;
    protected NewMessageEventHandler(messageInfo: RemoteMessageDTO): void;
    protected NewDialogEventHandler(messageInfo: RemoteMessageDTO): void;
    protected DeleteLeaveDialogEventHandler(messageInfo: RemoteMessageDTO): void;
    protected UpdateDialogEventHandler(messageInfo: RemoteMessageDTO): void;
    dispatchEvent<TEventInfo>(even: EventMessageType, eventBody: TEventInfo, receivers: number[]): void;
    subscribeOnMessaging(callback: CallBackFunction<MessageEntity>, nameSubscription?: string): void;
    subscribeOnUpdateMessageStatus(callback: CallBackFunction<DialogEventInfo>, nameSubscription?: string): void;
    releaseSubscriptions(): void;
    subscribeOnSystemMessaging(notificationType: NotificationTypes, callback: CallBackFunction<MessageEntity>, nameSubscription?: string): void;
}
