import { BaseUseCase } from './base/BaseUseCase';
import { DialogEntity } from '../entity/DialogEntity';
import DialogsRepository from '../../Data/repository/DialogsRepository';
import { CallBackFunction } from './base/IUseCase';

export class SubscribeToDialogsUpdatesUseCase extends BaseUseCase<
  Array<DialogEntity>,
  Array<DialogEntity>
> {
  private dialogRepository: DialogsRepository;

  private callBackExecute: CallBackFunction<Array<DialogEntity>> | undefined;

  private dialogs: Array<DialogEntity> = [];

  constructor(dialogRepository: DialogsRepository) {
    console.log('CONSTRUCTOR SubscribeToDialogsUpdatesUseCase');
    super();
    this.callBackExecute = undefined;

    this.dialogRepository = dialogRepository;
  }

  execute(
    callBack: CallBackFunction<Array<DialogEntity>>,
  ): Promise<Array<DialogEntity>> {
    console.log('execute SubscribeToDialogsUpdatesUseCase', callBack);
    this.callBackExecute = callBack;
    if (
      this.callBackExecute !== undefined &&
      typeof this.callBackExecute === 'function'
    ) {
      this.subscribe(this.callBackExecute);
    }
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    // this.synUseCase.execute(async () => {
    //   console.log(
    //     '2.CALL EXECUTE CALLBACK in SubscribeToDialogsUpdatesUseCase',
    //   );
    //   this.dialogs = await this.dialogRepository.getDialogsFromLocal();
    //   this.informSubscribers(this.dialogs);
    // });
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    this.dialogRepository.subscribeLocalSync(async () => {
      console.log(
        '2.CALL EXECUTE CALLBACK in SubscribeToDialogsUpdatesUseCase',
      );
      this.dialogs = await this.dialogRepository.getDialogsFromLocal();
      this.informSubscribers(this.dialogs);
    });

    return Promise.resolve(this.dialogRepository.getDialogsFromLocal());
  }

  // subscribe(callBack: CallBackFunction): void {
  //   console.log('execute subscribe');
  //   // this.subject.subscribe()
  //   // this.callBackExecute = callBack;
  //   //
  //   // // callBack(this.dialogs);
  //   // if (this.events.listeners('Execute').length === 0) {
  //   //   this.events.addListener('Execute', this.callBackExecute);
  //   // }
  //   // this.events.on('Execute', this.callBackExecute);
  //   // this.register('Execute', callBack);
  //   this.addSubscriber(callBack);
  // }
}
