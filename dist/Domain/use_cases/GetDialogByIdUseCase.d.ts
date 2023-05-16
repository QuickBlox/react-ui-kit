import { IUseCase } from './base/IUseCase';
import { DialogEntity } from '../entity/DialogEntity';
import DialogsRepository from '../../Data/repository/DialogsRepository';
export declare class GetDialogByIdUseCase implements IUseCase<void, DialogEntity> {
    private readonly dialogRepository;
    private readonly dialogId;
    constructor(dialogRepository: DialogsRepository, dialogId: string);
    execute(): Promise<DialogEntity>;
}
