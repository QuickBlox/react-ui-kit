import { IDTOMapper } from './IDTOMapper';
import { RemoteFileDTO } from '../../../dto/file/RemoteFileDTO';
import {
  INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
  INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
  MapperDTOException,
} from '../../exception/MapperDTOException';

type DtoValidator<T> = {
  [key in keyof T]: (v: unknown) => v is T[key];
};

export class FileDTOMapper implements IDTOMapper {
  // eslint-disable-next-line class-methods-use-this
  fromDTO<TArg, TResult>(dto: TArg): Promise<TResult> {
    const fileDTO: RemoteFileDTO = dto as unknown as RemoteFileDTO;

    FileDTOMapper.validateDTO(fileDTO);

    // eslint-disable-next-line @typescript-eslint/no-shadow
    const fileContentParam: QBContentParam = {
      name: fileDTO.name || '',
      file: fileDTO.data,
      type: fileDTO.type || '',
      size: fileDTO.size || 0,
      public: false, // optional, "false" by default
    };

    return Promise.resolve(fileContentParam as TResult);
  }

  // eslint-disable-next-line class-methods-use-this
  toTDO<TArg, TResult>(qbEntity: TArg): Promise<TResult> {
    const qbFile: QBContentObject = qbEntity as unknown as QBContentObject;

    FileDTOMapper.validateQBFileDialog(qbFile);

    const dto: RemoteFileDTO = new RemoteFileDTO();

    dto.id = qbFile.id?.toString() || '';

    dto.type = qbFile.content_type || '';

    dto.uid = qbFile.uid?.toString() || '';

    dto.url =
      qbFile.uid.toString() && QB.content.privateUrl(qbFile.uid.toString());

    dto.name = qbFile.name || '';

    dto.size = qbFile.size || 0;

    return Promise.resolve(dto as TResult);
  }

  private static validateDTO(fileDTO: RemoteFileDTO) {
    const fileDTOValidator: DtoValidator<RemoteFileDTO> = {
      data(v: unknown): v is RemoteFileDTO['data'] {
        const { data } = v as RemoteFileDTO;

        return data !== undefined && data !== null;
      },
      id(v: unknown): v is RemoteFileDTO['id'] {
        const { id } = v as RemoteFileDTO;

        return id !== undefined && id !== null;
      },
      name(v: unknown): v is RemoteFileDTO['name'] {
        const { name } = v as RemoteFileDTO;

        return name !== undefined && name !== null && name.length > 0;
      },
      size(v: unknown): v is RemoteFileDTO['size'] {
        const { size } = v as RemoteFileDTO;

        return size !== undefined && size !== null;
      },
      uid(v: unknown): v is RemoteFileDTO['uid'] {
        const { uid } = v as RemoteFileDTO;

        return uid !== undefined && uid !== null;
      },
      url(v: unknown): v is RemoteFileDTO['url'] {
        const { url } = v as RemoteFileDTO;

        return url !== undefined;
      },
      type(v: unknown): v is RemoteFileDTO['type'] {
        const { type } = v as RemoteFileDTO;
        const result = (type as unknown as string) || '';

        return result.length >= 0;
      },
    };

    if (!fileDTOValidator.id(fileDTO))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {id} does not exists or empty in DTO',
      );

    if (!fileDTOValidator.name(fileDTO))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {name} does not exist or empty in DTO',
      );

    if (!fileDTOValidator.data(fileDTO))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {data} does not exists or empty in DTO',
      );

    if (!fileDTOValidator.url(fileDTO))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {url} does not exist or empty in DTO',
      );

    if (!fileDTOValidator.size(fileDTO))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {size} does not exists or empty in DTO',
      );

    if (!fileDTOValidator.uid(fileDTO))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {uid} does not exist or empty in DTO',
      );

    if (!fileDTOValidator.type(fileDTO))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {type} does not exist or empty in DTO',
      );

    return Promise.resolve();
  }

  private static validateQBFileDialog(qbFile: QBContentObject) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const qbFileValidator: DtoValidator<QBContentObject> = {
      account_id(v: unknown): v is QBContentObject['account_id'] {
        const { account_id } = v as QBContentObject;

        return account_id !== undefined && account_id !== null;
      },
      app_id(v: unknown): v is QBContentObject['app_id'] {
        const { app_id } = v as QBContentObject;

        return app_id !== undefined && app_id !== null;
      },
      content_type(v: unknown): v is QBContentObject['content_type'] {
        const { content_type } = v as QBContentObject;

        return content_type !== undefined && content_type !== null;
      },
      created_at(v: unknown): v is QBContentObject['created_at'] {
        const { created_at } = v as QBContentObject;

        return (
          created_at !== undefined &&
          created_at !== null &&
          created_at.length > 0
        );
      },
      id(v: unknown): v is QBContentObject['id'] {
        const { id } = v as QBContentObject;

        return id !== undefined && id !== null;
      },
      name(v: unknown): v is QBContentObject['name'] {
        const { name } = v as QBContentObject;

        return name !== undefined && name !== null && name.length > 0;
      },
      size(v: unknown): v is QBContentObject['size'] {
        const { size } = v as QBContentObject;

        return size !== undefined && size !== null;
      },
      uid(v: unknown): v is QBContentObject['uid'] {
        const { uid } = v as QBContentObject;

        return uid !== undefined && uid !== null && uid.length > 0;
      },
      updated_at(v: unknown): v is QBContentObject['updated_at'] {
        const { updated_at } = v as QBContentObject;

        return (
          updated_at !== undefined &&
          updated_at !== null &&
          updated_at.length > 0
        );
      },
    };

    if (!qbFileValidator.account_id(qbFile))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {account_id} does not exists or empty',
      );

    if (!qbFileValidator.app_id(qbFile))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {app_id} does not exists or empty',
      );

    if (!qbFileValidator.content_type(qbFile))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {content_type} does not exists or empty',
      );

    if (!qbFileValidator.created_at(qbFile))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {created_at} does not exists or empty',
      );

    if (!qbFileValidator.id(qbFile))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {id} does not exists or empty',
      );

    if (!qbFileValidator.name(qbFile))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {name} does not exists or empty',
      );

    if (!qbFileValidator.size(qbFile))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {size} does not exists or empty',
      );

    if (!qbFileValidator.uid(qbFile))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {size} does not exists or empty',
      );

    if (!qbFileValidator.updated_at(qbFile))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {size} does not exists or empty',
      );
  }
}
