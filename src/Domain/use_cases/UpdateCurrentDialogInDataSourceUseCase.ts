import { DialogEntity } from '../entity/DialogEntity';
import DialogsRepository from '../../Data/repository/DialogsRepository';
import { IUseCase } from './base/IUseCase';
import { GroupDialogEntity } from '../entity/GroupDialogEntity';

export class UpdateCurrentDialogInDataSourceUseCase
  implements IUseCase<void, DialogEntity>
{
  private dialogRepository: DialogsRepository;

  private updateDialog: GroupDialogEntity;

  constructor(
    dialogRepository: DialogsRepository,
    updateDialog: GroupDialogEntity,
  ) {
    console.log('CONSTRUCTOR UpdateCurrentDialogInDataSourceUseCase');
    this.dialogRepository = dialogRepository;
    this.updateDialog = updateDialog;
  }

  async execute(): Promise<DialogEntity> {
    console.log('execute UpdateCurrentDialogInDataSourceUseCase');
    const result: DialogEntity =
      await this.dialogRepository.updateCurrentDialogInLocalDataSource(
        this.updateDialog,
      );

    return Promise.resolve(result);
  }
}
