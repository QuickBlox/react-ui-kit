import { ILocalDataSource } from '../source/local/ILocalDataSource';
import { IRemoteDataSource } from '../source/remote/IRemoteDataSource';
import { DialogEntity } from '../../Domain/entity/DialogEntity';

import RepositoryException, {
  DIALOG_ENTITY_REPOSITORY_EXCEPTION_CODE,
  DIALOG_ENTITY_REPOSITORY_EXCEPTION_MESSAGE,
  UNEXPECTED_REPOSITORY_EXCEPTION_CODE,
  UNEXPECTED_REPOSITORY_EXCEPTION_MESSAGE,
} from '../source/exception/RepositoryException';
import { IDialogsRepository } from '../../Domain/repository/IDialogsRepository';
import {
  LocalDataSourceException,
  NOT_FOUND_LOCAL_DATASOURCE_EXCEPTION_CODE,
  NOT_FOUND_LOCAL_DATASOURCE_EXCEPTION_MESSAGE,
  UNEXPECTED_LOCAL_DATASOURCE_EXCEPTION_CODE,
} from '../source/exception/LocalDataSourceException';
import { IMapper } from '../mapper/IMapper';
import { DialogRemoteDTOMapper } from '../mapper/DialogRemoteDTOMapper';
import { RemoteDialogDTO } from '../dto/dialog/RemoteDialogDTO';
import { RemoteDialogsDTO } from '../dto/dialog/RemoteDialogsDTO';
import { DialogLocalDTOMapper } from '../mapper/DialogLocalDTOMapper';
import { LocalDialogDTO } from '../dto/dialog/LocalDialogDTO';
import { LocalDialogsDTO } from '../dto/dialog/LocalDialogsDTO';
import { FunctionTypeVoidToVoid } from '../../Presentation/Views/Base/BaseViewModel';
import { MapperDTOException } from '../source/exception/MapperDTOException';
import {
  PaginatedResult,
  Pagination,
} from '../../Domain/repository/Pagination';
import { GroupDialogEntity } from '../../Domain/entity/GroupDialogEntity';
import { stringifyError } from '../../utils/parse';
import { RemoteUserDTO } from '../dto/user/RemoteUserDTO';

export default class DialogsRepository implements IDialogsRepository {
  private localDataStorage: ILocalDataSource;

  private remoteDataSource: IRemoteDataSource;

  private dialogRemoteDTOMapper: IMapper;

  private dialogLocalDTOMapper: IMapper;

  // eslint-disable-next-line no-useless-constructor
  constructor(
    localDataStorage: ILocalDataSource,
    remoteDataSource: IRemoteDataSource,
  ) {
    this.localDataStorage = localDataStorage;
    this.remoteDataSource = remoteDataSource;
    this.dialogRemoteDTOMapper = new DialogRemoteDTOMapper();
    this.dialogLocalDTOMapper = new DialogLocalDTOMapper();
  }

  release() {
    this.localDataStorage.clearAll();
  }

  subscribeLocalSync(subscriber: FunctionTypeVoidToVoid): void {
    this.localDataStorage.subscribe(subscriber);
  }

  unsubscribeLocalSync(): void {
    this.localDataStorage.release();
  }

  isLocalSynced(): Promise<boolean> {
    return this.localDataStorage.isLocalSynced();
  }

  setLocalSynced(synced: boolean): void {
    this.localDataStorage.setLocalSynced(synced);
  }

  async saveDialogToLocal(entity: DialogEntity): Promise<boolean> {
    try {
      const dto: LocalDialogDTO = await this.dialogLocalDTOMapper.fromEntity(
        entity,
      );

      await this.localDataStorage.saveDialog(dto);

      return Promise.resolve(true);
    } catch (e) {
      let exceptionMessage: string;

      if (e instanceof MapperDTOException) {
        exceptionMessage = `have exception: ${e.message}, description: ${e._description} `;
        console.log(exceptionMessage);
      } else if (e instanceof LocalDataSourceException) {
        exceptionMessage = `have exception: ${e.message}`;
        console.log(exceptionMessage);
      } else {
        exceptionMessage = `have exception: ${
          (e as RepositoryException).message
        }`;
        console.log(exceptionMessage);
      }
      console.log('for entity: ', JSON.stringify(entity));

      // eslint-disable-next-line prefer-promise-reject-errors
      // return Promise.reject(false);
      return Promise.reject(exceptionMessage);
      // todo: pay attention on Promise.resolve
      // return Promise.resolve(false);
    }
  }

  async createDialogInRemote(entity: DialogEntity): Promise<DialogEntity> {
    console.log(
      'call createDialogInRemote in Repository with param: ',
      JSON.stringify(entity),
    );
    // todo exception convert error exception
    const remoteDialogDTO: RemoteDialogDTO =
      await this.dialogRemoteDTOMapper.fromEntity(entity);

    console.log('have remoteDialogDTO: ', JSON.stringify(remoteDialogDTO));

    // todo auth exception, restricted accsess, connection faild
    try {
      // todo MUST uncomment
      const resultDTO: RemoteDialogDTO =
        await this.remoteDataSource.createDialog(remoteDialogDTO);
      const resultEntity: DialogEntity =
        await this.dialogRemoteDTOMapper.toEntity(resultDTO);

      // todo MUST delete
      // const resultDTO: RemoteDialogDTO = remoteDialogDTO;
      // const resultEntity: DialogEntity =
      //   await this.dialogRemoteDTOMapper.toEntity(resultDTO);

      console.log(
        'have result entity in createDialogInRemote:',
        JSON.stringify(resultEntity),
      );

      return Promise.resolve(resultEntity);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async updateDialogInLocal(entity: DialogEntity): Promise<DialogEntity> {
    console.log('call updateDialogInLocal');
    try {
      const dto: LocalDialogDTO = await this.dialogLocalDTOMapper.fromEntity(
        entity,
      );

      await this.localDataStorage.updateDialog(dto);
      const newEntity: DialogEntity = await this.dialogLocalDTOMapper.toEntity(
        dto,
      );

      return Promise.resolve(newEntity);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  // eslint-disable-next-line class-methods-use-this,@typescript-eslint/no-unused-vars
  async updateDialogInRemote(entity: DialogEntity): Promise<DialogEntity> {
    // todo exception convert error exception
    const remoteDialogDTO: RemoteDialogDTO =
      await this.dialogRemoteDTOMapper.fromEntity<
        GroupDialogEntity,
        RemoteDialogDTO
      >(entity as GroupDialogEntity);

    // todo auth exception, restricted accsess, connection faild
    try {
      const resultDTO: RemoteDialogDTO =
        await this.remoteDataSource.updateDialog(remoteDialogDTO);
      const resultEntity: DialogEntity =
        await this.dialogRemoteDTOMapper.toEntity(resultDTO);

      return Promise.resolve(resultEntity);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async getDialogFromLocal(dialogId: string): Promise<DialogEntity> {
    const dto: LocalDialogDTO = new LocalDialogDTO();

    dto.id = dialogId;

    let checkResult = true;

    /*
    if (dialogId === '0' || dialogId === '') {
      checkResult = false;
    }

     */
    let dialog: DialogEntity =
      DialogRemoteDTOMapper.createDefaultDialogEntity('0');

    if (checkResult) {
      try {
        const dtoResult: LocalDialogDTO = await this.localDataStorage.getDialog(
          dto,
        );

        dialog = await this.dialogLocalDTOMapper.toEntity(dtoResult);
      } catch (e) {
        if (e instanceof LocalDataSourceException) {
          if (e.code !== UNEXPECTED_LOCAL_DATASOURCE_EXCEPTION_CODE) {
            // return Promise.reject(new RepositoryException(e.message, e.code));
            return Promise.reject(
              new RepositoryException(
                NOT_FOUND_LOCAL_DATASOURCE_EXCEPTION_MESSAGE,
                NOT_FOUND_LOCAL_DATASOURCE_EXCEPTION_CODE,
              ),
            );
            //
          }

          return Promise.reject(
            new RepositoryException(
              UNEXPECTED_REPOSITORY_EXCEPTION_MESSAGE,
              UNEXPECTED_REPOSITORY_EXCEPTION_CODE,
            ),
          );
        }
        checkResult = false;
      }
    }

    const prom = new Promise<DialogEntity>((resolve, reject) => {
      if (checkResult === true) {
        resolve(dialog);
      } else {
        reject(
          new RepositoryException(
            DIALOG_ENTITY_REPOSITORY_EXCEPTION_MESSAGE,
            DIALOG_ENTITY_REPOSITORY_EXCEPTION_CODE,
          ),
        );
      }
    });

    return prom;
  }

  async getDialogFromRemote(dialogId: string): Promise<DialogEntity> {
    const dto: RemoteDialogDTO = new RemoteDialogDTO();

    dto.id = dialogId;

    // todo auth exception, restricted accsess, connection faild
    try {
      const resultDTO: RemoteDialogDTO = await this.remoteDataSource.getDialog(
        dto,
      );
      const resultEntity: DialogEntity =
        await this.dialogRemoteDTOMapper.toEntity(resultDTO);

      return Promise.resolve(resultEntity);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async getDialogsFromLocal(
    pagination?: Pagination,
  ): Promise<Array<DialogEntity>> {
    try {
      const resultDTO: LocalDialogsDTO = await this.localDataStorage.getDialogs(
        pagination,
      );
      const entyties: Array<DialogEntity> = [];

      // TODO: check this loop
      // eslint-disable-next-line no-restricted-syntax
      for (const item of resultDTO.dialogs) {
        // eslint-disable-next-line no-await-in-loop
        const entity: DialogEntity = await this.dialogLocalDTOMapper.toEntity(
          item,
        );

        entyties.push(entity);
      }

      return Promise.resolve(entyties);
    } catch (e) {
      return Promise.reject(e);
    }
    /*
    let dialogs: Array<DialogEntity> = [];

    try {
      dialogs = await this.localDataStorage.getDialogs();
    } catch (e) {
      if (e instanceof LocalDataSourceException) {
        if (e.code !== UNEXPECTED_LOCAL_DATASOURCE_EXCEPTION_CODE) {
          return Promise.reject(
            new RepositoryException(
              NOT_FOUND_LOCAL_DATASOURCE_EXCEPTION_MESSAGE,
              NOT_FOUND_LOCAL_DATASOURCE_EXCEPTION_CODE,
            ),
          );
        }

        return Promise.reject(
          new RepositoryException(
            UNEXPECTED_REPOSITORY_EXCEPTION_MESSAGE,
            UNEXPECTED_REPOSITORY_EXCEPTION_CODE,
          ),
        );
      }
    }

    return Promise.resolve(dialogs);

     */
  }

  // eslint-disable-next-line class-methods-use-this
  async getDialogsFromRemote(
    pagination?: Pagination,
  ): Promise<PaginatedResult<DialogEntity>> {
    // todo auth exception, restricted accsess, connection faild
    try {
      const resultDTO: RemoteDialogsDTO =
        await this.remoteDataSource.getDialogs(pagination);
      const entyties: Array<DialogEntity> = [];

      // TODO: check this loop
      // eslint-disable-next-line no-restricted-syntax
      for (const item of resultDTO.dialogs) {
        // eslint-disable-next-line no-await-in-loop
        const entity: DialogEntity = await this.dialogRemoteDTOMapper.toEntity(
          item,
        );

        entyties.push(entity);
      }

      // const DialogsDictionary: Record<number, DialogEntity[]> = {};
      //
      // DialogsDictionary[resultDTO.pagination.getCurrentPage()] = entyties;

      const result: PaginatedResult<DialogEntity> = {
        // PaginatedList: DialogsDictionary,
        ResultData: entyties,
        CurrentPagination: resultDTO.pagination,
      };

      return Promise.resolve(result);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async deleteDialogFromLocal(dialogId: string): Promise<boolean> {
    const dto: LocalDialogDTO = new LocalDialogDTO();

    dto.id = dialogId;
    try {
      await this.localDataStorage.deleteDialog(dto);

      return Promise.resolve(true);
    } catch (e) {
      console.log('exception in deleteDialogFromLocal: ', stringifyError(e));

      return Promise.reject(e);
    }
    /*
    try {
      const resultDeleteDialog = await this.localDataStorage.deleteDialog(
        dialogId,
      );

      return resultDeleteDialog;
    } catch (e) {
      return Promise.resolve(false);
    }
     */
  }

  // eslint-disable-next-line class-methods-use-this,@typescript-eslint/no-unused-vars
  async deleteDialogFromRemote(dialogId: string): Promise<boolean> {
    const dto: RemoteDialogDTO = new RemoteDialogDTO();

    dto.id = dialogId;

    // todo auth exception, restricted accsess, connection faild
    try {
      await this.remoteDataSource.deleteDialog(dto);

      return Promise.resolve(true);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async deleteUsersFromDialogFromRemote(
    dialogId: string,
    usersIds: Array<number>,
  ): Promise<boolean> {
    const dialogDTO: RemoteDialogDTO = new RemoteDialogDTO();

    dialogDTO.id = dialogId;
    const arrayUsersDTO: Array<RemoteUserDTO> = new Array<RemoteUserDTO>();

    try {
      for (let i = 0; i < usersIds.length; i += 1) {
        const dto: RemoteUserDTO = new RemoteUserDTO();

        dto.id = usersIds[i].toString();
        arrayUsersDTO.push(dto);
      }

      await this.remoteDataSource.deleteUsersFromDialog(
        dialogDTO,
        arrayUsersDTO,
      );

      return Promise.resolve(true);
    } catch (e) {
      return Promise.reject(e);
    }
  }
}
