import { BaseUseCase } from './base/BaseUseCase';
import DialogsRepository from '../../Data/repository/DialogsRepository';
import { CallBackFunction } from './base/IUseCase';
import ConnectionRepository from '../../Data/repository/ConnectionRepository';
import EventMessagesRepository from '../../Data/repository/EventMessagesRepository';
export declare class SyncDialogsUseCase extends BaseUseCase<boolean, boolean> {
    private connectionRepository;
    private dialogRepository;
    private eventMessagesRepository;
    private callBackExecute;
    private timer1Id;
    private timer2Id;
    private timerId;
    constructor(dialogRepository: DialogsRepository, connectionRepository: ConnectionRepository, eventMessagesRepository: EventMessagesRepository);
    execute(callBack: CallBackFunction<boolean>): Promise<boolean>;
    private syncDialogs;
    private syncDialogsActions;
    private setSyncInProgressAndClearLocal;
    private deleteAllDialogsInLocal;
    private setSyncInProgress;
    private setSyncInCompleted;
    release(): void;
}
