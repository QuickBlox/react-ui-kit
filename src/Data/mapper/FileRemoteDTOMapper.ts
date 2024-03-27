import { IMapper } from './IMapper';
import {
  INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
  INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
  MapperDTOException,
  UNEXPECTED_MAPPER_DTO_EXCEPTION_EXCEPTION_CODE,
  UNEXPECTED_MAPPER_DTO_EXCEPTION_MESSAGE,
} from '../source/exception/MapperDTOException';
import { FileEntity } from '../../Domain/entity/FileEntity';
import { RemoteFileDTO } from '../dto/file/RemoteFileDTO';
import { LocalFileDTO } from '../dto/file/LocalFileDTO';

type DtoValidator<T> = {
  [key in keyof T]: (v: unknown) => v is T[key];
};

export class FileRemoteDTOMapper implements IMapper {
  // eslint-disable-next-line class-methods-use-this
  fromEntity<TArg, TResult>(entity: TArg): Promise<TResult> {
    const fileEntity: FileEntity = entity as FileEntity;

    if (fileEntity === null || fileEntity === undefined) {
      throw new MapperDTOException(
        UNEXPECTED_MAPPER_DTO_EXCEPTION_MESSAGE,
        UNEXPECTED_MAPPER_DTO_EXCEPTION_EXCEPTION_CODE,
        'entity is null or undefined',
      );
    }

    const fileDTO: RemoteFileDTO = new RemoteFileDTO();

    FileRemoteDTOMapper.validateEntity(fileEntity);

    fileDTO.id = fileEntity.id?.toString() || '';

    fileDTO.type = fileEntity.type?.toString() || '';

    fileDTO.uid = fileEntity.uid?.toString() || '';

    fileDTO.url = fileEntity.url || '';

    fileDTO.name = fileEntity.name || '';

    fileDTO.size = fileEntity.size || 0;

    fileDTO.data = fileEntity.data;

    return Promise.resolve(fileDTO as TResult);
  }

  // eslint-disable-next-line class-methods-use-this
  toEntity<TArg, TResult>(data: TArg): Promise<TResult> {
    const fileDTO = data as unknown as RemoteFileDTO;

    if (fileDTO === null || fileDTO === undefined) {
      throw new MapperDTOException(
        UNEXPECTED_MAPPER_DTO_EXCEPTION_MESSAGE,
        UNEXPECTED_MAPPER_DTO_EXCEPTION_EXCEPTION_CODE,
        'fileDTO is null or undefined',
      );
    }

    FileRemoteDTOMapper.validateDTO(fileDTO);

    const fileEntity: FileEntity =
      FileRemoteDTOMapper.createDefaultFileEntity();

    fileEntity.id = parseInt(fileDTO.id, 10);

    fileEntity.type = fileDTO.type;

    fileEntity.uid = fileDTO.uid;

    fileEntity.url = fileDTO.url;

    fileEntity.name = fileDTO.name;

    fileEntity.size = fileDTO.size;

    return Promise.resolve(fileEntity as TResult);
  }

  private static createDefaultFileEntity(): FileEntity {
    return {
      id: 0,
      name: '',
      size: 0,
      type: undefined,
      uid: '0',
      url: '',
    };
  }

  private static validateEntity(fileEntity: FileEntity) {
    const fileEntityValidator: DtoValidator<FileEntity> = {
      id(v: unknown): v is FileEntity['id'] {
        const { id } = v as FileEntity;
        const result = (id as unknown as string) || '';

        return result.length >= 0;
      },
      name(v: unknown): v is FileEntity['name'] {
        const { name } = v as FileEntity;
        const result = (name as unknown as string) || '';

        // return name !== undefined && name !== null && name.length > 0;
        return result.length >= 0;
      },
      size(v: unknown): v is FileEntity['size'] {
        const { size } = v as FileEntity;
        const result = (size as unknown as string) || '';

        return result.length >= 0;
      },
      type(v: unknown): v is FileEntity['type'] {
        const { type } = v as FileEntity;
        const result = (type as unknown as string) || '';

        return result.length >= 0;
      },
      uid(v: unknown): v is FileEntity['uid'] {
        const { uid } = v as FileEntity;

        return uid !== undefined && uid !== null;
      },
      url(v: unknown): v is FileEntity['url'] {
        const { url } = v as FileEntity;
        const result = (url as unknown as string) || '';

        return result.length >= 0;
      },
    };

    if (!fileEntityValidator.uid(fileEntity))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {uid} does not exists or empty',
      );

    return Promise.resolve();
  }

  private static validateDTO(fileDTO: RemoteFileDTO) {
    const dtoValidator: DtoValidator<LocalFileDTO> = {
      id(v: unknown): v is LocalFileDTO['id'] {
        const { id } = v as LocalFileDTO;

        return id !== undefined && id !== null;
      },
      name(v: unknown): v is LocalFileDTO['name'] {
        const { name } = v as LocalFileDTO;

        return name !== undefined && name !== null && name.length > 0;
      },
      size(v: unknown): v is LocalFileDTO['size'] {
        const { size } = v as LocalFileDTO;

        return size !== undefined && size !== null;
      },
      uid(v: unknown): v is LocalFileDTO['uid'] {
        const { uid } = v as LocalFileDTO;

        return uid !== undefined && uid !== null;
      },
      data(v: unknown): v is LocalFileDTO['data'] {
        const { data, uid } = v as LocalFileDTO;

        return <boolean>(
          ((data !== undefined && data !== null) || (uid && uid.length > 0))
        );
      },
      url(v: unknown): v is LocalFileDTO['url'] {
        const { url } = v as LocalFileDTO;

        return url !== undefined;
      },
      type(v: unknown): v is LocalFileDTO['type'] {
        const { type } = v as LocalFileDTO;
        const result = (type as unknown as string) || '';

        return result.length >= 0;
      },
    };

    if (!dtoValidator.id(fileDTO))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {id} does not exists or empty in DTO',
      );

    if (!dtoValidator.name(fileDTO))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {name} does not exist or empty in DTO',
      );

    if (!dtoValidator.data(fileDTO))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {data} does not exists or empty in DTO',
      );

    if (!dtoValidator.url(fileDTO))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {url} does not exist or empty in DTO',
      );

    if (!dtoValidator.size(fileDTO))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {size} does not exists or empty in DTO',
      );

    if (!dtoValidator.uid(fileDTO))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {uid} does not exist or empty in DTO',
      );

    return Promise.resolve();
  }
}
