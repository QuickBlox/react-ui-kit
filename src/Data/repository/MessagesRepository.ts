import { ILocalDataSource } from '../source/local/ILocalDataSource';
import { IRemoteDataSource } from '../source/remote/IRemoteDataSource';
import { LocalDataSource } from '../source/local/LocalDataSource';
import { RemoteDataSource } from '../source/remote/RemoteDataSource';
import { IMessagesRepository } from '../../Domain/repository/IMessagesRepository';
import { MessageEntity } from '../../Domain/entity/MessageEntity';
import {
  LocalDataSourceException,
  NOT_FOUND_LOCAL_DATASOURCE_EXCEPTION_CODE,
  NOT_FOUND_LOCAL_DATASOURCE_EXCEPTION_MESSAGE,
  UNEXPECTED_LOCAL_DATASOURCE_EXCEPTION_CODE,
} from '../source/exception/LocalDataSourceException';
import RepositoryException, {
  UNEXPECTED_REPOSITORY_EXCEPTION_CODE,
  UNEXPECTED_REPOSITORY_EXCEPTION_MESSAGE,
} from '../source/exception/RepositoryException';
import { IMapper } from '../mapper/IMapper';
import { MessageRemoteDTOMapper } from '../mapper/MessageRemoteDTOMapper';
import { MessageLocalDTOMapper } from '../mapper/MessageLocalDTOMapper';
import { LocalMessageDTO } from '../dto/message/LocalMessageDTO';
import { RemoteMessageDTO } from '../dto/message/RemoteMessageDTO';
import { LocalMessagesDTO } from '../dto/message/LocalMessagesDTO';
import { RemoteMessagesDTO } from '../dto/message/RemoteMessagesDTO';
import {
  INCORRECT_REMOTE_DATASOURCE_DATA_EXCEPTION_CODE,
  INCORRECT_REMOTE_DATASOURCE_DATA_EXCEPTION_MESSAGE,
  RemoteDataSourceException,
} from '../source/exception/RemoteDataSourceException';
import {
  PaginatedResult,
  Pagination,
} from '../../Domain/repository/Pagination';
import { DialogEntity } from '../../Domain/entity/DialogEntity';
import { RemoteDialogDTO } from '../dto/dialog/RemoteDialogDTO';
import { GroupDialogEntity } from '../../Domain/entity/GroupDialogEntity';
import { DialogRemoteDTOMapper } from '../mapper/DialogRemoteDTOMapper';

export default class MessagesRepository implements IMessagesRepository {
  private localDataStorage: ILocalDataSource;

  private remoteDataSource: IRemoteDataSource;

  private messageRemoteDTOMapper: IMapper;

  private messageLocalDTOMapper: IMapper;

  private dialogRemoteDTOMapper: IMapper;

  // eslint-disable-next-line no-useless-constructor
  constructor(
    localDataStorage: LocalDataSource,
    remoteDataSource: RemoteDataSource,
  ) {
    this.localDataStorage = localDataStorage;
    this.remoteDataSource = remoteDataSource;
    this.messageRemoteDTOMapper = new MessageRemoteDTOMapper();
    this.messageLocalDTOMapper = new MessageLocalDTOMapper();
    this.dialogRemoteDTOMapper = new DialogRemoteDTOMapper();
  }

  async deleteMessageInLocal(entity: MessageEntity): Promise<boolean> {
    try {
      const dto: LocalMessageDTO = await this.messageLocalDTOMapper.fromEntity(
        entity,
      );
      const resultDeleteMessage = await this.localDataStorage.deleteMessage(
        dto,
      );

      return Promise.resolve(resultDeleteMessage);
    } catch (e) {
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject(false);
    }
  }

  async deleteMessageInRemote(entity: MessageEntity): Promise<boolean> {
    try {
      const dto: RemoteMessageDTO =
        await this.messageRemoteDTOMapper.fromEntity(entity);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const resultDeleteMessage = await this.remoteDataSource.deleteMessage(
        dto,
      );

      return Promise.resolve(true);
    } catch (e) {
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject(false);
    }
  }

  async getMessagesFromLocal(dialogId: string): Promise<Array<MessageEntity>> {
    const messages: Array<MessageEntity> = [];

    try {
      const arrayMessageDTO: Array<LocalMessageDTO> = [];

      arrayMessageDTO.push(new LocalMessageDTO());
      const dto: LocalMessagesDTO = new LocalMessagesDTO(
        arrayMessageDTO,
        new Pagination(),
      );

      dto.messages[0].dialogId = dialogId;
      const messagesDTO: LocalMessagesDTO =
        await this.localDataStorage.getMessages(dto);

      // TODO: check loop
      // eslint-disable-next-line no-restricted-syntax
      for (const item of messagesDTO.messages) {
        // eslint-disable-next-line no-await-in-loop
        const entity: MessageEntity = await this.messageLocalDTOMapper.toEntity(
          item,
        );

        messages.push(entity);
      }
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

    return Promise.resolve(messages);
  }

  async getMessagesFromRemote(
    dialogId: string,
    pagination: Pagination,
  ): Promise<PaginatedResult<MessageEntity>> {
    const messages: Array<MessageEntity> = [];
    const result: PaginatedResult<MessageEntity> = {
      ResultData: messages,
      CurrentPagination: pagination,
    };

    try {
      const arrayMessageDTO: Array<RemoteMessageDTO> = [];

      arrayMessageDTO.push(new RemoteMessageDTO());

      const dto: RemoteMessagesDTO = new RemoteMessagesDTO(
        arrayMessageDTO,
        new Pagination(),
      );

      dto.messages[0].dialogId = dialogId;
      const messagesDTO: RemoteMessagesDTO =
        await this.remoteDataSource.getMessages(dialogId, new Pagination());

      // todo: change loop
      // for (let i ; i < ; i+=)
      // eslint-disable-next-line no-restricted-syntax
      for (const item of messagesDTO.messages) {
        const entity: MessageEntity =
          // eslint-disable-next-line no-await-in-loop
          await this.messageRemoteDTOMapper.toEntity(item);

        messages.push(entity);
      }
      result.ResultData = messages;
      result.CurrentPagination = messagesDTO.pagination;
    } catch (e) {
      if (e instanceof RemoteDataSourceException) {
        //
        if (e.code !== INCORRECT_REMOTE_DATASOURCE_DATA_EXCEPTION_CODE) {
          return Promise.reject(
            new RepositoryException(
              INCORRECT_REMOTE_DATASOURCE_DATA_EXCEPTION_MESSAGE,
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

    return Promise.resolve(result);
  }

  async typingMessageStart(
    dialog: DialogEntity,
    senderId: number,
  ): Promise<void> {
    const remoteDialogDTO: RemoteDialogDTO =
      await this.dialogRemoteDTOMapper.fromEntity<
        GroupDialogEntity,
        RemoteDialogDTO
      >(dialog as GroupDialogEntity);

    await this.remoteDataSource.typingMessageStart(remoteDialogDTO, senderId);
  }

  async typingMessageStop(
    dialog: DialogEntity,
    senderId: number,
  ): Promise<void> {
    const remoteDialogDTO: RemoteDialogDTO =
      await this.dialogRemoteDTOMapper.fromEntity<
        GroupDialogEntity,
        RemoteDialogDTO
      >(dialog as GroupDialogEntity);

    await this.remoteDataSource.typingMessageStop(remoteDialogDTO, senderId);
  }

  async saveMessageToLocal(entity: MessageEntity): Promise<boolean> {
    try {
      const dto: RemoteMessageDTO = await this.messageLocalDTOMapper.fromEntity(
        entity,
      );

      await this.localDataStorage.saveMessage(dto);

      return Promise.resolve(true);
    } catch (e) {
      return Promise.resolve(false);
    }
  }

  async sendMessageToRemote(entity: MessageEntity): Promise<boolean> {
    try {
      const dto: RemoteMessageDTO =
        await this.messageRemoteDTOMapper.fromEntity(entity);

      await this.remoteDataSource.sendMessage(dto);

      return Promise.resolve(true);
    } catch (e) {
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject(false);
    }

    return Promise.resolve(false);
  }

  async updateMessageInLocal(entity: MessageEntity): Promise<boolean> {
    try {
      const dto: RemoteMessageDTO = await this.messageLocalDTOMapper.fromEntity(
        entity,
      );

      await this.localDataStorage.updateMessage(dto);

      return Promise.resolve(true);
    } catch (e) {
      return Promise.resolve(false);
    }
  }

  // eslint-disable-next-line class-methods-use-this,@typescript-eslint/no-unused-vars
  async updateMessageInRemote(entity: MessageEntity): Promise<boolean> {
    try {
      const dto: RemoteMessageDTO =
        await this.messageRemoteDTOMapper.fromEntity(entity);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const resultDeleteMessage = await this.remoteDataSource.updateMessage(
        dto,
      );

      return Promise.resolve(true);
    } catch (e) {
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject(false);
    }
  }
}
