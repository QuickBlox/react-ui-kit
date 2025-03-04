import { DialogEntity } from '../entity/DialogEntity';
import DialogsRepository from '../../Data/repository/DialogsRepository';
import { IUseCase } from './base/IUseCase';
import { GroupDialogEntity } from '../entity/GroupDialogEntity';
import { QBUIKitConfig } from '../../CommonTypes/CommonTypes';

export class UpdateCurrentDialogInDataSourceUseCase
  implements IUseCase<void, DialogEntity>
{
  private dialogRepository: DialogsRepository;

  private updateDialog: GroupDialogEntity;

  private qbConfig: QBUIKitConfig;

  constructor(
    dialogRepository: DialogsRepository,
    updateDialog: GroupDialogEntity,
    qbConfig: QBUIKitConfig,
  ) {
    console.log('CONSTRUCTOR UpdateCurrentDialogInDataSourceUseCase');
    this.dialogRepository = dialogRepository;
    this.updateDialog = updateDialog;
    this.qbConfig = qbConfig;
  }

  async execute(): Promise<DialogEntity> {
    console.log('execute UpdateCurrentDialogInDataSourceUseCase');
    const result: DialogEntity =
      await this.dialogRepository.updateCurrentDialogInLocalDataSource(
        this.updateDialog,
        this.qbConfig,
      );

    return Promise.resolve(result);
  }
}
