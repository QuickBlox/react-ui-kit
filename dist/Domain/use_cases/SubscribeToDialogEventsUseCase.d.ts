import { BaseUseCase } from './base/BaseUseCase';
import { CallBackFunction } from './base/IUseCase';
import EventMessagesRepository from '../../Data/repository/EventMessagesRepository';
import { MessageEntity } from '../entity/MessageEntity';
import { DialogEventInfo } from '../entity/DialogEventInfo';
export declare class SubscribeToDialogEventsUseCase extends BaseUseCase<DialogEventInfo, boolean> {
    private eventMessagesRepository;
    private callBackExecute;
    constructor(eventMessagesRepository: EventMessagesRepository, nameSubscription?: string);
    execute(callBack: CallBackFunction<DialogEventInfo>): Promise<boolean>;
    updateMessageStatusEventHandler(dialogEventInfo: DialogEventInfo): void;
    newMessageEventHandler(messageEntity: MessageEntity): void;
    updateDialogEventHandler(messageEntity: MessageEntity): void;
    leaveDialogEventHandler(messageEntity: MessageEntity): void;
    newDialogEventHandler(messageEntity: MessageEntity): void;
}
