import { DialogEntity } from '../entity/DialogEntity';
import DialogsRepository from '../../Data/repository/DialogsRepository';
import { IUseCase } from './base/IUseCase';
import { GroupDialogEntity } from '../entity/GroupDialogEntity';
import EventMessagesRepository from '../../Data/repository/EventMessagesRepository';
export declare class UpdateDialogUseCase implements IUseCase<void, DialogEntity> {
    private dialogRepository;
    private eventMessagesRepository;
    private updateDialog;
    constructor(eventMessagesRepository: EventMessagesRepository, dialogRepository: DialogsRepository, updateDialog: GroupDialogEntity);
    execute(): Promise<DialogEntity>;
}
