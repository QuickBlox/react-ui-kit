import { IUseCase } from './base/IUseCase';
import DialogsRepository from '../../Data/repository/DialogsRepository';
import { DialogEntity } from '../entity/DialogEntity';
export declare class GetAllDialogsUseCase implements IUseCase<void, Array<DialogEntity>> {
    private dialogRepository;
    constructor(dialogRepository: DialogsRepository);
    execute(): Promise<Array<DialogEntity>>;
}
