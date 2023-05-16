import { IUseCase } from './base/IUseCase';
import DialogsRepository from '../../Data/repository/DialogsRepository';
import { DialogEntity } from '../entity/DialogEntity';

export class GetAllDialogsUseCase
  implements IUseCase<void, Array<DialogEntity>>
{
  private dialogRepository: DialogsRepository;

  constructor(dialogRepository: DialogsRepository) {
    console.log('CONSTRUCTOR GetAllDialogsUseCase');
    this.dialogRepository = dialogRepository;
  }

  execute(): Promise<Array<DialogEntity>> {
    console.log('execute GetAllDialogsUseCase');

    return this.dialogRepository.getDialogsFromLocal();
  }
}
