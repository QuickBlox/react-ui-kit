import { ILocalDataSource } from '../source/local/ILocalDataSource';
import { IRemoteDataSource } from '../source/remote/IRemoteDataSource';
import { UserEntity } from '../../Domain/entity/UserEntity';
import RepositoryException, {
  UNEXPECTED_REPOSITORY_EXCEPTION_CODE,
  UNEXPECTED_REPOSITORY_EXCEPTION_MESSAGE,
  USER_ENTITY_REPOSITORY_EXCEPTION_CODE,
  USER_ENTITY_REPOSITORY_EXCEPTION_MESSAGE,
} from '../source/exception/RepositoryException';
import {
  LocalDataSourceException,
  NOT_FOUND_LOCAL_DATASOURCE_EXCEPTION_CODE,
  NOT_FOUND_LOCAL_DATASOURCE_EXCEPTION_MESSAGE,
  UNEXPECTED_LOCAL_DATASOURCE_EXCEPTION_CODE,
} from '../source/exception/LocalDataSourceException';
import { IMapper } from '../mapper/IMapper';
import { LocalUserDTO } from '../dto/user/LocalUserDTO';
import { RemoteUserDTO } from '../dto/user/RemoteUserDTO';
import { UserLocalDTOMapper } from '../mapper/UserLocalDTOMapper';
import { UserRemoteDTOMapper } from '../mapper/UserRemoteDTOMapper';
import {
  INCORRECT_REMOTE_DATASOURCE_DATA_EXCEPTION_CODE,
  INCORRECT_REMOTE_DATASOURCE_DATA_EXCEPTION_MESSAGE,
  RemoteDataSourceException,
  UNAUTHORISED_REMOTE_DATASOURCE_EXCEPTION_CODE,
} from '../source/exception/RemoteDataSourceException';
import {
  PaginatedResult,
  Pagination,
} from '../../Domain/repository/Pagination';
import {
  PaginatedDTOResult,
  RemoteDataSource,
} from '../source/remote/RemoteDataSource';

export default class UsersRepository {
  private localDataSource: ILocalDataSource;

  private remoteDataSource: IRemoteDataSource;

  private userRemoteDTOMapper: IMapper;

  private userLocalDTOMapper: IMapper;

  // eslint-disable-next-line no-useless-constructor
  constructor(
    localDataSource: ILocalDataSource,
    remoteDataSource: IRemoteDataSource,
  ) {
    this.localDataSource = localDataSource;
    this.remoteDataSource = remoteDataSource;
    this.userLocalDTOMapper = new UserLocalDTOMapper();
    this.userRemoteDTOMapper = new UserRemoteDTOMapper();
  }

  async getUserFromLocal(userId: number): Promise<UserEntity> {
    let checkResult = true;

    if (userId === 0) {
      checkResult = false;
    }
    let userEntity: UserEntity = UserLocalDTOMapper.createDefaultUserEntity();

    if (checkResult) {
      try {
        const dto: LocalUserDTO = new LocalUserDTO();

        dto.id = userId.toString();

        const userDTO: LocalUserDTO = await this.localDataSource.getUser(dto);

        userEntity = await this.userLocalDTOMapper.toEntity(userDTO);
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
        checkResult = false;
      }
    }

    const prom = new Promise<UserEntity>((resolve, reject) => {
      if (checkResult === true) {
        resolve(userEntity);
      } else {
        reject(
          new RepositoryException(
            USER_ENTITY_REPOSITORY_EXCEPTION_MESSAGE,
            USER_ENTITY_REPOSITORY_EXCEPTION_CODE,
          ),
        );
      }
    });

    return prom;
  }

  // eslint-disable-next-line class-methods-use-this
  async getUserFromRemote(userId: number): Promise<UserEntity> {
    let checkResult = true;

    if (userId === 0) {
      checkResult = false;
    }
    let userEntity: UserEntity = UserLocalDTOMapper.createDefaultUserEntity();

    if (checkResult) {
      try {
        const dto: RemoteUserDTO = new RemoteUserDTO();

        dto.id = userId.toString();

        const userDTO: RemoteUserDTO = await this.remoteDataSource.getUser(dto);

        userEntity = await this.userRemoteDTOMapper.toEntity(userDTO);
      } catch (e) {
        if (e instanceof RemoteDataSourceException) {
          if (e.code !== UNAUTHORISED_REMOTE_DATASOURCE_EXCEPTION_CODE) {
            return Promise.reject(
              new RepositoryException(
                INCORRECT_REMOTE_DATASOURCE_DATA_EXCEPTION_MESSAGE,
                INCORRECT_REMOTE_DATASOURCE_DATA_EXCEPTION_CODE,
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
        checkResult = false;
      }
    }

    const prom = new Promise<UserEntity>((resolve, reject) => {
      if (checkResult === true) {
        resolve(userEntity);
      } else {
        reject(
          new RepositoryException(
            USER_ENTITY_REPOSITORY_EXCEPTION_MESSAGE,
            USER_ENTITY_REPOSITORY_EXCEPTION_CODE,
          ),
        );
      }
    });

    return prom;
  }

  // eslint-disable-next-line class-methods-use-this
  async getUsersFromLocal(usersIds: Array<number>): Promise<Array<UserEntity>> {
    const arrayUserDTO: Array<LocalUserDTO> = new Array<LocalUserDTO>();

    try {
      for (let i = 0; i < usersIds.length; i += 1) {
        let dto: LocalUserDTO = new LocalUserDTO();

        dto.id = usersIds[i].toString();
        // eslint-disable-next-line no-await-in-loop
        dto = await this.localDataSource.getUser(dto);
        arrayUserDTO.push(dto);
      }
      const users: Array<UserEntity> = new Array<UserEntity>();

      // eslint-disable-next-line no-restricted-syntax
      for (const item of arrayUserDTO) {
        // eslint-disable-next-line no-await-in-loop
        const entity: UserEntity = await this.userLocalDTOMapper.toEntity(item);

        users.push(entity);
      }

      return Promise.resolve(users);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async getUsersFromRemote(
    usersIds: Array<number>,
  ): Promise<Array<UserEntity>> {
    const arrayUserDTO: Array<RemoteUserDTO> = new Array<RemoteUserDTO>();

    try {
      for (let i = 0; i < usersIds.length; i += 1) {
        let dto: RemoteUserDTO = new RemoteUserDTO();

        dto.id = usersIds[i].toString();
        // eslint-disable-next-line no-await-in-loop
        dto = await this.remoteDataSource.getUser(dto);
        arrayUserDTO.push(dto);
      }
      const users: Array<UserEntity> = new Array<UserEntity>();

      // eslint-disable-next-line no-restricted-syntax
      for (const item of arrayUserDTO) {
        // eslint-disable-next-line no-await-in-loop
        const entity: UserEntity = await this.userRemoteDTOMapper.toEntity(
          item,
        );

        users.push(entity);
      }

      return Promise.resolve(users);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async getALLUsersFromRemote(
    pagination?: Pagination,
    filter?: string,
  ): Promise<PaginatedResult<UserEntity>> {
    const currentPagination: Pagination = pagination || new Pagination(1, 5);

    if (this.remoteDataSource instanceof RemoteDataSource) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const result: PaginatedDTOResult =
        await this.remoteDataSource.getAllUsers(currentPagination, filter);
      const ResultData: UserEntity[] = [];

      // eslint-disable-next-line no-restricted-syntax
      for (const remoteUser of result.ResultData) {
        // eslint-disable-next-line no-await-in-loop
        const userEntity: UserEntity = await this.userRemoteDTOMapper.toEntity<
          RemoteUserDTO,
          UserEntity
        >(remoteUser);

        ResultData.push(userEntity);
      }

      return {
        ResultData,
        CurrentPagination: result.PaginationResult,
      };
    }

    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject(false);
  }

  async saveUsersToLocal(entities: Array<UserEntity>): Promise<boolean> {
    try {
      // eslint-disable-next-line no-restricted-syntax
      for (const item of entities) {
        // eslint-disable-next-line no-await-in-loop
        const dto: LocalUserDTO = await this.userLocalDTOMapper.fromEntity(
          item,
        );

        // eslint-disable-next-line no-await-in-loop
        await this.localDataSource.saveUser(dto);
      }

      return Promise.resolve(true);
    } catch (e) {
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject(false);
    }
  }

  async saveUserToLocal(entity: UserEntity): Promise<boolean> {
    try {
      const dto: LocalUserDTO = await this.userLocalDTOMapper.fromEntity(
        entity,
      );

      await this.localDataSource.saveUser(dto);

      return Promise.resolve(true);
    } catch (e) {
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject(false);
    }
  }
}
