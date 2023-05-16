import { BaseUseCase } from './base/BaseUseCase';
import { DialogEntity } from '../entity/DialogEntity';
import DialogsRepository from '../../Data/repository/DialogsRepository';
import { CallBackFunction } from './base/IUseCase';
export declare class SubscribeToDialogsUpdatesUseCase extends BaseUseCase<Array<DialogEntity>, Array<DialogEntity>> {
    private dialogRepository;
    private callBackExecute;
    private dialogs;
    constructor(dialogRepository: DialogsRepository);
    execute(callBack: CallBackFunction<Array<DialogEntity>>): Promise<Array<DialogEntity>>;
}
