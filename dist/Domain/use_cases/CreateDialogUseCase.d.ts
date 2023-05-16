import { DialogEntity } from '../entity/DialogEntity';
import DialogsRepository from '../../Data/repository/DialogsRepository';
import { IUseCase } from './base/IUseCase';
import { GroupDialogEntity } from '../entity/GroupDialogEntity';
import EventMessagesRepository from '../../Data/repository/EventMessagesRepository';
export declare class CreateDialogUseCase implements IUseCase<void, DialogEntity> {
    private dialogRepository;
    private eventMessagesRepository;
    private newDialog;
    constructor(eventMessagesRepository: EventMessagesRepository, dialogRepository: DialogsRepository, newDialog: GroupDialogEntity);
    execute(): Promise<DialogEntity>;
}
