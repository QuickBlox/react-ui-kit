import { IFileRepository } from '../../Domain/repository/IFileRepository';
import { FileEntity } from '../../Domain/entity/FileEntity';
import { ILocalDataSource } from '../source/local/ILocalDataSource';
import { IRemoteDataSource } from '../source/remote/IRemoteDataSource';
import { IMapper } from '../mapper/IMapper';
import { LocalDataSource } from '../source/local/LocalDataSource';
import { RemoteDataSource } from '../source/remote/RemoteDataSource';
import { FileRemoteDTOMapper } from '../mapper/FileRemoteDTOMapper';
import { FileLocalDTOMapper } from '../mapper/FileLocalDTOMapper';
import { stringifyError } from '../../utils/parse';
import { RemoteFileDTO } from '../dto/file/RemoteFileDTO';
import RepositoryException, {
  FILE_ENTITY_REPOSITORY_EXCEPTION_CODE,
  FILE_ENTITY_REPOSITORY_EXCEPTION_MESSAGE,
} from '../source/exception/RepositoryException';

export class FileRepository implements IFileRepository {
  private localDataSource: ILocalDataSource;

  private remoteDataSource: IRemoteDataSource;

  private fileRemoteDTOMapper: IMapper;

  private fileLocalDTOMapper: IMapper;

  constructor(
    localDataStorage: LocalDataSource,
    remoteDataSource: RemoteDataSource,
  ) {
    this.localDataSource = localDataStorage;
    this.remoteDataSource = remoteDataSource;
    this.fileRemoteDTOMapper = new FileRemoteDTOMapper();
    this.fileLocalDTOMapper = new FileLocalDTOMapper();
  }

  // eslint-disable-next-line class-methods-use-this,@typescript-eslint/no-unused-vars
  async deleteFile(entity: FileEntity): Promise<boolean> {
    const dto: RemoteFileDTO = new RemoteFileDTO();

    if (entity.id !== undefined) {
      dto.id = entity.id.toString();
    } else {
      return Promise.reject(
        new RepositoryException(
          FILE_ENTITY_REPOSITORY_EXCEPTION_MESSAGE,
          FILE_ENTITY_REPOSITORY_EXCEPTION_CODE,
        ),
      );
    }

    try {
      await this.remoteDataSource.deleteFile(dto);

      return Promise.resolve(true);
    } catch (e) {
      console.log('exception in deleteFileFromRemote: ', stringifyError(e));

      return Promise.reject(e);
    }
  }

  // eslint-disable-next-line class-methods-use-this,@typescript-eslint/no-unused-vars
  async downloadFile(entity: FileEntity): Promise<FileEntity> {
    const dto: RemoteFileDTO = new RemoteFileDTO();

    if (entity.id !== undefined) {
      dto.id = entity.id.toString();
    } else {
      return Promise.reject(
        new RepositoryException(
          FILE_ENTITY_REPOSITORY_EXCEPTION_MESSAGE,
          FILE_ENTITY_REPOSITORY_EXCEPTION_CODE,
        ),
      );
    }

    try {
      const resultDTO: RemoteFileDTO = await this.remoteDataSource.getFile(dto);
      const resultEntity: FileEntity = await this.fileRemoteDTOMapper.toEntity(
        resultDTO,
      );

      return Promise.resolve(resultEntity);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  // eslint-disable-next-line class-methods-use-this,@typescript-eslint/no-unused-vars
  async saveFileInRemote(entity: FileEntity): Promise<FileEntity> {
    // todo exception convert error exception
    const remoteFileDTO: RemoteFileDTO =
      await this.fileRemoteDTOMapper.fromEntity(entity);

    // todo auth exception, restricted accsess, connection faild
    try {
      // todo MUST uncomment
      const resultDTO: RemoteFileDTO = await this.remoteDataSource.createFile(
        remoteFileDTO,
      );
      const resultEntity: FileEntity = await this.fileRemoteDTOMapper.toEntity(
        resultDTO,
      );

      return Promise.resolve(resultEntity);
    } catch (e) {
      return Promise.reject(e);
    }
  }
}
