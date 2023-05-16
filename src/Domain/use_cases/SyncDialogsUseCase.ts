import { BaseUseCase } from './base/BaseUseCase';
import DialogsRepository from '../../Data/repository/DialogsRepository';
import { CallBackFunction } from './base/IUseCase';
import ConnectionRepository from '../../Data/repository/ConnectionRepository';
import { stringifyError } from '../../utils/parse';
import EventMessagesRepository from '../../Data/repository/EventMessagesRepository';
import { NotificationTypes } from '../entity/NotificationTypes';

export class SyncDialogsUseCase extends BaseUseCase<boolean, boolean> {
  private connectionRepository: ConnectionRepository;

  private dialogRepository: DialogsRepository;

  private eventMessagesRepository: EventMessagesRepository;

  private callBackExecute: CallBackFunction<boolean> | undefined;

  private timer1Id: NodeJS.Timer | undefined;

  private timer2Id: NodeJS.Timer | undefined;

  private timerId: NodeJS.Timer | undefined;

  constructor(
    dialogRepository: DialogsRepository,
    connectionRepository: ConnectionRepository,
    eventMessagesRepository: EventMessagesRepository,
  ) {
    super();
    console.log('CONSTRUCTOR SyncDialogsUseCaseWithMock');
    this.callBackExecute = undefined;

    this.dialogRepository = dialogRepository;
    this.connectionRepository = connectionRepository;
    this.eventMessagesRepository = eventMessagesRepository;
  }

  // todo: SyncDialogUseCaseWithMock
  // создаем подписку на переменную в LocalDataSource
  // SyncDialogUseCase слушает ее и при возникновении - передает дальше
  // избавиться от таймера мы сможем когда введем EventRepository котор слушаеточередь сообщений
  // или подписка на ремоте датасурсе
  execute(callBack: CallBackFunction<boolean>): Promise<boolean> {
    console.log('EXECUTE in SyncDialogUseCaseWithMock', callBack);
    // todo uncomment
    this.syncDialogs().catch();
    this.callBackExecute = callBack;
    if (
      this.callBackExecute !== undefined &&
      typeof this.callBackExecute === 'function'
    ) {
      console.log('call SUBSCRIBE in SyncDialogsUseCaseWithMock');
      this.subscribe(this.callBackExecute);
    }

    // if (this.timer1Id === undefined) {
    //   this.timer1Id = setInterval(() => {
    //     console.log(
    //       'MOCK 1. connection lost',
    //       'time: ',
    //       new Date().toTimeString(),
    //     );
    //     this.connectionRepository.changeConnectionStatus(false);
    //     this.setSyncInProgress();
    //     this.informSubscribers(true);
    //   }, 5000);
    // }
    //
    // if (this.timer2Id === undefined) {
    //   this.timer2Id = setInterval(() => {
    //     console.log(
    //       'MOCK 1. connection restore',
    //       'time: ',
    //       new Date().toTimeString(),
    //     );
    //     this.connectionRepository.changeConnectionStatus(true);
    //     this.setSyncInProgress();
    //     this.informSubscribers(true);
    //   }, 10000);
    // }
    //
    // add new item every 15 sec - not implemented
    // if (this.timerId === undefined) {
    //   setTimeout(() => {
    //     console.log('MOCK 3. start update');
    //     if (this.timerId === undefined) {
    //       this.timerId = setInterval(() => {
    //         console.log('MOCK 3. timer tick');
    //         console.log('time: ', new Date().toTimeString());
    //         //
    //         this.dialogRepository.setLocalSynced(false);
    //         const newItem: DialogEntity =
    //           Stubs.createDialogEntityByTypeWithDefaultValues(
    //             DialogType.public,
    //           );
    //
    //         newItem.id = new Date().getTime().toString();
    //         newItem.name = `Mock dialog ${new Date().toLocaleTimeString()}`;
    //         newItem.lastMessage = {
    //           dateSent: `${new Date().toLocaleTimeString()}`,
    //           text: `Hello world! ${new Date().toLocaleTimeString()}`,
    //           userId: 0,
    //         };
    //         newItem.updatedAt = `${new Date().toLocaleTimeString()}`;
    //         this.dialogRepository
    //           .saveDialogToLocal(newItem)
    //           // eslint-disable-next-line promise/always-return
    //           .then((result) => {
    //             this.informSubscribers(result);
    //             this.dialogRepository.setLocalSynced(true);
    //           })
    //           .catch((error) => {
    //             console.log(error);
    //           });
    //       }, 15000);
    //     }
    //   }, 30000);
    // }

    return Promise.resolve(true);
  }

  private async syncDialogs(): Promise<void> {
    console.log('call syncDialogs()  in SyncDialogsUseCaseWithMock');
    // todo: cause of recycle v1
    // this.connectionRepository.keepALiveChatConnection();
    if (this.connectionRepository.isChatConnected()) {
      await this.syncDialogsActions();
    }
    this.connectionRepository.subscribe(() => {
      console.log('HAVE CHANGED CONNECTION');
      if (this.connectionRepository.isChatConnected()) {
        console.log('CONNECTED');
        this.syncDialogsActions().catch((e) => {
          console.log(
            'HAVE EXCEPTION IN syncDialogsActions',
            stringifyError(e),
          );
        });
      } else {
        console.log('HAVE NO CONNECTION');
      }
    });
    this.eventMessagesRepository.subscribeOnSystemMessaging(
      NotificationTypes.NEW_DIALOG,
      () => {
        console.log('call subscribeOnSystemMessaging in  syncDialogs Mock');
        if (this.connectionRepository.isChatConnected()) {
          console.log('NotificationTypes.NEW_DIALOG: GET UPDATED DIALOG LIST');
          this.syncDialogsActions().catch((e) => {
            console.log(
              'HAVE EXCEPTION IN syncDialogsActions',
              stringifyError(e),
            );
          });
        } else {
          console.log('GET UPDATED DIALOG LOST: HAVE NO CONNECTION');
        }
      },
    );
    this.eventMessagesRepository.subscribeOnSystemMessaging(
      NotificationTypes.DELETE_LEAVE_DIALOG,
      () => {
        console.log('call subscribeOnSystemMessaging in  syncDialogs Mock');
        if (this.connectionRepository.isChatConnected()) {
          console.log('NotificationTypes.NEW_DIALOG: GET UPDATED DIALOG LIST');
          this.syncDialogsActions().catch((e) => {
            console.log(
              'HAVE EXCEPTION IN syncDialogsActions',
              stringifyError(e),
            );
          });
        } else {
          console.log('GET UPDATED DIALOG LOST: HAVE NO CONNECTION');
        }
      },
    );
    this.eventMessagesRepository.subscribeOnSystemMessaging(
      NotificationTypes.UPDATE_DIALOG,
      () => {
        console.log('call subscribeOnSystemMessaging in  syncDialogs Mock');
        if (this.connectionRepository.isChatConnected()) {
          console.log('NotificationTypes.NEW_DIALOG: GET UPDATED DIALOG LIST');
          this.syncDialogsActions().catch((e) => {
            console.log(
              'HAVE EXCEPTION IN syncDialogsActions',
              stringifyError(e),
            );
          });
        } else {
          console.log('GET UPDATED DIALOG LOST: HAVE NO CONNECTION');
        }
      },
    );
  }

  private async syncDialogsActions(): Promise<void> {
    const remoteDialogs = await this.dialogRepository.getDialogsFromRemote();

    await this.setSyncInProgressAndClearLocal();
    for (let i = 0; i < remoteDialogs.ResultData.length; i += 1) {
      const dialog = remoteDialogs.ResultData[i];

      // eslint-disable-next-line no-await-in-loop
      await this.dialogRepository.saveDialogToLocal(dialog);
    }
    this.setSyncInCompleted();
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  private async setSyncInProgressAndClearLocal() {
    this.setSyncInProgress();
    // todo delete comment
    // await this.deleteAllDialogsInLocal();
  }

  private async deleteAllDialogsInLocal() {
    const dialogs = await this.dialogRepository.getDialogsFromLocal();

    for (let i = 0; i < dialogs.length; i += 1) {
      const item = dialogs[i];

      try {
        // eslint-disable-next-line no-await-in-loop
        await this.dialogRepository.deleteDialogFromLocal(item.id);
      } catch {
        console.log('have deleting problem with ', JSON.stringify(item));
      }
    }
  }

  private setSyncInProgress(): void {
    this.dialogRepository.setLocalSynced(false);
  }

  private setSyncInCompleted(): void {
    this.dialogRepository.setLocalSynced(true);
  }

  override release() {
    super.release();
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
  }
}
