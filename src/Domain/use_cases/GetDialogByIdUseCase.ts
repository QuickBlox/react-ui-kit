import { IUseCase } from './base/IUseCase';
import { DialogEntity } from '../entity/DialogEntity';
import DialogsRepository from '../../Data/repository/DialogsRepository';

export class GetDialogByIdUseCase implements IUseCase<void, DialogEntity> {
  private readonly dialogRepository: DialogsRepository;

  private readonly dialogId: string;

  constructor(dialogRepository: DialogsRepository, dialogId: string) {
    console.log('CONSTRUCTOR GetDialogByIdUseCase');
    this.dialogRepository = dialogRepository;
    this.dialogId = dialogId;
  }

  async execute(): Promise<DialogEntity> {
    console.log('execute GetAllDialogsUseCaseWithMock');
    const fromRemote: DialogEntity =
      await this.dialogRepository.getDialogFromRemote(this.dialogId);

    try {
      await this.dialogRepository.updateDialogInLocal(fromRemote);
    } catch (e) {
      await this.dialogRepository.saveDialogToLocal(fromRemote);
    }

    const dialogResult: DialogEntity =
      await this.dialogRepository.getDialogFromLocal(this.dialogId);

    return dialogResult;
  }
}
