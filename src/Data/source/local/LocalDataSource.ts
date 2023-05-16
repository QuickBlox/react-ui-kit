import { ILocalDataSource } from './ILocalDataSource';
import {
  LocalDataSourceException,
  NOT_FOUND_LOCAL_DATASOURCE_EXCEPTION_CODE,
  NOT_FOUND_LOCAL_DATASOURCE_EXCEPTION_MESSAGE,
  UNEXPECTED_LOCAL_DATASOURCE_EXCEPTION_CODE,
  UNEXPECTED_LOCAL_DATASOURCE_EXCEPTION_MESSAGE,
} from '../exception/LocalDataSourceException';
import { LocalDialogDTO } from '../../dto/dialog/LocalDialogDTO';
import { LocalMessageDTO } from '../../dto/message/LocalMessageDTO';
import { LocalDialogsDTO } from '../../dto/dialog/LocalDialogsDTO';
import { LocalMessagesDTO } from '../../dto/message/LocalMessagesDTO';
import { LocalUserDTO } from '../../dto/user/LocalUserDTO';
import { Pagination } from '../../../Domain/repository/Pagination';
import { SubscriptionPerformer } from '../../../Domain/use_cases/base/Subscribable/SubscriptionPerformer';

export class LocalDataSource
  extends SubscriptionPerformer<boolean>
  implements ILocalDataSource
{
  private localSynced = false;

  public isLocalSynced(): Promise<boolean> {
    return Promise.resolve(this.localSynced);
  }

  // public release(): void {
  //   this.onEventByTypeSubscribers.slice();
  // }

  // public subscribe(subscriber: FunctionTypeVoidToVoid): void {
  //   this.onEventByTypeSubscribers.push(subscriber);
  // }

  public setLocalSynced(synced: boolean): void {
    this.localSynced = synced;
    if (synced) {
      this.informSubscribers(synced);
    }
  }

  // protected informSubscribers(): void {
  //   this.onEventByTypeSubscribers.forEach((subscriber) => {
  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  //     subscriber();
  //   });
  // }

  // constructor() {
  //   super();
  //   // this.onEventByTypeSubscribers = [];
  // }

  // private readonly onEventByTypeSubscribers: Array<FunctionTypeVoidToVoid>;

  private dialogs: Record<string, LocalDialogDTO> = {};

  private users: Record<string, LocalUserDTO> = {};

  private messages: Record<string, LocalMessageDTO> = {};

  clearAll(): Promise<void> {
    this.messages = {};
    sessionStorage.setItem('messages', JSON.stringify(this.messages));

    this.dialogs = {};
    sessionStorage.setItem('dialogs', JSON.stringify(this.dialogs));

    this.users = {};
    sessionStorage.setItem('users', JSON.stringify(this.users));

    return Promise.resolve();
  }

  deleteDialog(dtoDialog: LocalDialogDTO): Promise<boolean> {
    const storageValue = sessionStorage.getItem('dialogs');
    const result: string = storageValue ?? '';

    this.dialogs = result === '' ? {} : JSON.parse(result);
    const filteredDialogsList: Record<string, LocalDialogDTO> = {};

    if (
      this.dialogs[dtoDialog.id] === undefined ||
      this.dialogs[dtoDialog.id] === null
    ) {
      return Promise.reject(
        new LocalDataSourceException(
          NOT_FOUND_LOCAL_DATASOURCE_EXCEPTION_MESSAGE,
          NOT_FOUND_LOCAL_DATASOURCE_EXCEPTION_CODE,
        ),
      );
    }

    Object.keys(this.dialogs).forEach((key) => {
      if (key !== dtoDialog.id) {
        filteredDialogsList[key] = this.dialogs[key];
      }
    });
    this.dialogs = filteredDialogsList;
    sessionStorage.setItem('dialogs', JSON.stringify(this.dialogs));

    return Promise.resolve(true);
  }

  deleteMessage(dtoMessage: LocalMessageDTO): Promise<boolean> {
    const storageValue = sessionStorage.getItem('messages');
    const result: string = storageValue ?? '';

    this.messages = result === '' ? {} : JSON.parse(result);
    const filteredMessagesList: Record<string, LocalMessageDTO> = {};

    if (
      this.messages[dtoMessage.id] === undefined ||
      this.messages[dtoMessage.id] === null
    ) {
      return Promise.reject(
        new LocalDataSourceException(
          NOT_FOUND_LOCAL_DATASOURCE_EXCEPTION_MESSAGE,
          NOT_FOUND_LOCAL_DATASOURCE_EXCEPTION_CODE,
        ),
      );
    }

    Object.keys(this.messages).forEach((key) => {
      if (key !== dtoMessage.id.toString()) {
        filteredMessagesList[key] = this.messages[key];
      }
    });
    this.messages = filteredMessagesList;
    sessionStorage.setItem('messages', JSON.stringify(this.messages));

    return Promise.resolve(true);
  }

  getDialog(dtoDialog: LocalDialogDTO): Promise<LocalDialogDTO> {
    const storageValue = sessionStorage.getItem('dialogs');
    const result: string = storageValue ?? '';

    this.dialogs = result === '' ? {} : JSON.parse(result);
    try {
      const entity: LocalDialogDTO = this.dialogs[dtoDialog.id];

      if (entity === undefined || entity === null) {
        return Promise.reject(
          new LocalDataSourceException(
            NOT_FOUND_LOCAL_DATASOURCE_EXCEPTION_MESSAGE,
            NOT_FOUND_LOCAL_DATASOURCE_EXCEPTION_CODE,
          ),
        );
      }

      return Promise.resolve(entity);
    } catch (e) {
      return Promise.reject(
        new LocalDataSourceException(
          NOT_FOUND_LOCAL_DATASOURCE_EXCEPTION_MESSAGE,
          NOT_FOUND_LOCAL_DATASOURCE_EXCEPTION_CODE,
        ),
      );
    }
  }

  getDialogs(pagination?: Pagination): Promise<LocalDialogsDTO> {
    const storageValue = sessionStorage.getItem('dialogs');
    const result: string = storageValue ?? '';

    this.dialogs = result === '' ? {} : JSON.parse(result);
    try {
      const arrayDialogDTO: Array<LocalDialogDTO> = Object.keys(
        this.dialogs,
      ).map((id) => this.dialogs[id]);

      if (arrayDialogDTO === undefined || arrayDialogDTO === null) {
        return Promise.reject(
          new LocalDataSourceException(
            NOT_FOUND_LOCAL_DATASOURCE_EXCEPTION_MESSAGE,
            NOT_FOUND_LOCAL_DATASOURCE_EXCEPTION_CODE,
          ),
        );
      }
      const currentPagination: Pagination = pagination || new Pagination();
      const dtoResult: LocalDialogsDTO = new LocalDialogsDTO(
        arrayDialogDTO,
        currentPagination,
      );

      return Promise.resolve(dtoResult);
    } catch (e) {
      return Promise.reject(
        new LocalDataSourceException(
          NOT_FOUND_LOCAL_DATASOURCE_EXCEPTION_MESSAGE,
          NOT_FOUND_LOCAL_DATASOURCE_EXCEPTION_CODE,
        ),
      );
    }
  }

  getMessages(dtoMessages: LocalMessagesDTO): Promise<LocalMessagesDTO> {
    const storageValue = sessionStorage.getItem('messages');
    const result: string = storageValue ?? '';

    this.messages = result === '' ? {} : JSON.parse(result);
    // let resultMessages : Array<LocalMessagesDTO>;
    const arrayMessageDTO: Array<LocalMessageDTO> = [];

    try {
      // eslint-disable-next-line no-restricted-syntax
      for (const item of dtoMessages.messages) {
        // eslint-disable-next-line array-callback-return
        Object.keys(this.messages).map((id) => {
          if (this.messages[id].dialogId === item.dialogId) {
            const dto: LocalMessageDTO = this.messages[id];

            arrayMessageDTO.push(dto);
          }
        });
      }

      if (arrayMessageDTO.length === 0) {
        return Promise.reject(
          new LocalDataSourceException(
            NOT_FOUND_LOCAL_DATASOURCE_EXCEPTION_MESSAGE,
            NOT_FOUND_LOCAL_DATASOURCE_EXCEPTION_CODE,
          ),
        );
      }

      return Promise.resolve(
        new LocalMessagesDTO(arrayMessageDTO, new Pagination()),
      );
    } catch (e) {
      return Promise.reject(
        new LocalDataSourceException(
          NOT_FOUND_LOCAL_DATASOURCE_EXCEPTION_MESSAGE,
          NOT_FOUND_LOCAL_DATASOURCE_EXCEPTION_CODE,
        ),
      );
    }
  }

  getUser(dtoUser: LocalUserDTO): Promise<LocalUserDTO> {
    const storageValue = sessionStorage.getItem('users');
    const result: string = storageValue ?? '';

    this.users = result === '' ? {} : JSON.parse(result);
    try {
      const dto: LocalUserDTO = this.users[dtoUser.id];

      if (dto === undefined || dto === null) {
        return Promise.reject(
          new LocalDataSourceException(
            NOT_FOUND_LOCAL_DATASOURCE_EXCEPTION_MESSAGE,
            NOT_FOUND_LOCAL_DATASOURCE_EXCEPTION_CODE,
          ),
        );
      }

      return Promise.resolve(dto);
    } catch (e) {
      return Promise.reject(
        new LocalDataSourceException(
          NOT_FOUND_LOCAL_DATASOURCE_EXCEPTION_MESSAGE,
          NOT_FOUND_LOCAL_DATASOURCE_EXCEPTION_CODE,
        ),
      );
    }
  }

  saveDialog(dtoDialog: LocalDialogDTO): Promise<boolean> {
    const storageValue = sessionStorage.getItem('dialogs');
    const result: string = storageValue ?? '';

    this.dialogs = result === '' ? {} : JSON.parse(result);
    if (dtoDialog === null || dtoDialog === undefined) {
      return Promise.reject(
        new LocalDataSourceException(
          UNEXPECTED_LOCAL_DATASOURCE_EXCEPTION_MESSAGE,
          UNEXPECTED_LOCAL_DATASOURCE_EXCEPTION_CODE,
        ),
      );
    }
    this.dialogs[dtoDialog.id] = dtoDialog;
    sessionStorage.setItem('dialogs', JSON.stringify(this.dialogs));

    return Promise.resolve(true);
  }

  saveMessage(dtoMessage: LocalMessageDTO): Promise<boolean> {
    const storageValue = sessionStorage.getItem('messages');
    const result: string = storageValue ?? '';

    this.messages = result === '' ? {} : JSON.parse(result);
    if (dtoMessage === null || dtoMessage === undefined) {
      return Promise.reject(
        new LocalDataSourceException(
          UNEXPECTED_LOCAL_DATASOURCE_EXCEPTION_MESSAGE,
          UNEXPECTED_LOCAL_DATASOURCE_EXCEPTION_CODE,
        ),
      );
    }
    this.messages[dtoMessage.id] = dtoMessage;
    sessionStorage.setItem('messages', JSON.stringify(this.messages));

    return Promise.resolve(true);
  }

  saveUser(dtoUser: LocalUserDTO): Promise<boolean> {
    const storageValue = sessionStorage.getItem('users');
    const result: string = storageValue ?? '';

    this.users = result === '' ? {} : JSON.parse(result);
    if (dtoUser === null || dtoUser === undefined) {
      return Promise.reject(
        new LocalDataSourceException(
          UNEXPECTED_LOCAL_DATASOURCE_EXCEPTION_MESSAGE,
          UNEXPECTED_LOCAL_DATASOURCE_EXCEPTION_CODE,
        ),
      );
    }
    this.users[dtoUser.id] = dtoUser;
    sessionStorage.setItem('users', JSON.stringify(this.users));

    return Promise.resolve(true);
  }

  updateDialog(dtoDialog: LocalDialogDTO): Promise<boolean> {
    const storageValue = sessionStorage.getItem('dialogs');
    const result: string = storageValue ?? '';

    this.dialogs = result === '' ? {} : JSON.parse(result);
    // todo: const filteredDialogsList: Record<string, DialogEntity> = {};

    if (
      this.dialogs[dtoDialog.id] === undefined ||
      this.dialogs[dtoDialog.id] === null
    ) {
      return Promise.reject(
        new LocalDataSourceException(
          NOT_FOUND_LOCAL_DATASOURCE_EXCEPTION_MESSAGE,
          NOT_FOUND_LOCAL_DATASOURCE_EXCEPTION_CODE,
        ),
      );
    }

    this.dialogs[dtoDialog.id] = dtoDialog;

    sessionStorage.setItem('dialogs', JSON.stringify(this.dialogs));

    return Promise.resolve(true);
  }

  updateMessage(dtoMessage: LocalMessageDTO): Promise<boolean> {
    const storageValue = sessionStorage.getItem('messages');
    const result: string = storageValue ?? '';

    this.messages = result === '' ? {} : JSON.parse(result);
    // todo: const filteredMessagesList: Record<string, MessageEntity> = {};

    if (
      this.messages[dtoMessage.id] === undefined ||
      this.messages[dtoMessage.id] === null
    ) {
      return Promise.reject(
        new LocalDataSourceException(
          NOT_FOUND_LOCAL_DATASOURCE_EXCEPTION_MESSAGE,
          NOT_FOUND_LOCAL_DATASOURCE_EXCEPTION_CODE,
        ),
      );
    }

    this.messages[dtoMessage.id] = dtoMessage;

    sessionStorage.setItem('messages', JSON.stringify(this.messages));

    return Promise.resolve(true);
  }
}
