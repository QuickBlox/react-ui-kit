import { BaseUseCase } from './base/BaseUseCase';
import { DialogEntity } from '../entity/DialogEntity';
import DialogsRepository from '../../Data/repository/DialogsRepository';
import { CallBackFunction } from './base/IUseCase';

export class SubscribeToDialogsUpdatesUseCaseWithMock extends BaseUseCase<
  Array<DialogEntity>,
  Array<DialogEntity>
> {
  private dialogRepository: DialogsRepository;

  private callBackExecute: CallBackFunction<Array<DialogEntity>> | undefined;

  private dialogs: Array<DialogEntity> = [];

  constructor(dialogRepository: DialogsRepository) {
    super();
    this.callBackExecute = undefined;

    this.dialogRepository = dialogRepository;
  }

  execute(
    callBack: CallBackFunction<Array<DialogEntity>>,
  ): Promise<Array<DialogEntity>> {
    console.log('execute SubscribeToDialogsUpdatesUseCaseWithMock', callBack);
    this.callBackExecute = callBack;
    if (
      this.callBackExecute !== undefined &&
      typeof this.callBackExecute === 'function'
    ) {
      this.subscribe(this.callBackExecute);
    }
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    this.dialogRepository.subscribeLocalSync(async () => {
      console.log(
        '2.CALL EXECUTE CALLBACK in SubscribeToDialogsUpdatesUseCaseWithMock',
      );
      this.dialogs = await this.dialogRepository.getDialogsFromLocal();
      this.informSubscribers(this.dialogs);
    });

    return Promise.resolve(this.dialogRepository.getDialogsFromLocal());
  }
}
