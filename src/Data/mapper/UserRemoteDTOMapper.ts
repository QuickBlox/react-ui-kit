import { IMapper } from './IMapper';
import { RemoteUserDTO } from '../dto/user/RemoteUserDTO';
import { UserEntity } from '../../Domain/entity/UserEntity';
import {
  INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
  INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
  MapperDTOException,
  UNEXPECTED_MAPPER_DTO_EXCEPTION_EXCEPTION_CODE,
  UNEXPECTED_MAPPER_DTO_EXCEPTION_MESSAGE,
} from '../source/exception/MapperDTOException';

type DtoValidator<T> = {
  [key in keyof T]: (v: unknown) => v is T[key];
};

export class UserRemoteDTOMapper implements IMapper {
  // eslint-disable-next-line class-methods-use-this
  fromEntity<TArg, TResult>(entity: TArg): Promise<TResult> {
    const userEntity: UserEntity = entity as UserEntity;

    if (userEntity === null || userEntity === undefined) {
      throw new MapperDTOException(
        UNEXPECTED_MAPPER_DTO_EXCEPTION_MESSAGE,
        UNEXPECTED_MAPPER_DTO_EXCEPTION_EXCEPTION_CODE,
        'entity is null or undefined',
      );
    }

    const userDTO: RemoteUserDTO = new RemoteUserDTO();

    UserRemoteDTOMapper.validateEntity(userEntity);

    userDTO.id = userEntity.id.toString();

    userDTO.full_name = userEntity.full_name;

    userDTO.email = userEntity.email;

    userDTO.login = userEntity.login;

    userDTO.created_at = userEntity.created_at;

    userDTO.updated_at = userEntity.updated_at;

    userDTO.last_request_at = userEntity.last_request_at;

    userDTO.custom_data = userEntity.custom_data;

    userDTO.user_tags = userEntity.user_tags;

    return Promise.resolve(userDTO as TResult);
  }

  // eslint-disable-next-line class-methods-use-this
  toEntity<TArg, TResult>(data: TArg): Promise<TResult> {
    const userDTO = data as unknown as RemoteUserDTO;

    if (userDTO === null || userDTO === undefined) {
      throw new MapperDTOException(
        UNEXPECTED_MAPPER_DTO_EXCEPTION_MESSAGE,
        UNEXPECTED_MAPPER_DTO_EXCEPTION_EXCEPTION_CODE,
        'userDTO is null or undefined',
      );
    }

    UserRemoteDTOMapper.validateDTO(userDTO);

    const userEntity: UserEntity =
      UserRemoteDTOMapper.createDefaultUserEntity();

    userEntity.id = parseInt(userDTO.id, 10);

    userEntity.full_name = userDTO.full_name;

    userEntity.email = userDTO.email;

    userEntity.login = userDTO.login;

    userEntity.created_at = userDTO.created_at;

    userEntity.updated_at = userDTO.updated_at;

    userEntity.last_request_at = userDTO.last_request_at;

    userEntity.custom_data = userDTO.custom_data;

    userEntity.user_tags = userDTO.user_tags;

    return Promise.resolve(userEntity as TResult);
  }

  private static validateEntity(userEntity: UserEntity) {
    const userEntityValidator: DtoValidator<UserEntity> = {
      blob_id(v: unknown): v is UserEntity['blob_id'] {
        const { blob_id } = v as UserEntity;
        const result = (blob_id as unknown as string) || '';

        return result.length >= 0;
      },
      created_at(v: unknown): v is UserEntity['created_at'] {
        const { created_at } = v as UserEntity;

        return (
          created_at !== undefined &&
          created_at !== null &&
          created_at.length > 0
        );
      },
      custom_data(v: unknown): v is UserEntity['custom_data'] {
        const { custom_data } = v as UserEntity;

        // return (
        //   custom_data !== undefined &&
        //   custom_data !== null &&
        //   custom_data.length > 0
        // );
        return (custom_data as unknown as boolean) || true;
      },
      email(v: unknown): v is UserEntity['email'] {
        const { email } = v as UserEntity;

        return email !== undefined && email !== null && email.length > 0;
      },
      full_name(v: unknown): v is UserEntity['full_name'] {
        const { full_name } = v as UserEntity;

        return (
          full_name !== undefined && full_name !== null && full_name.length > 0
        );
      },
      id(v: unknown): v is UserEntity['id'] {
        const { id } = v as UserEntity;

        return id !== undefined && id !== null;
      },
      last_request_at(v: unknown): v is UserEntity['last_request_at'] {
        const { last_request_at } = v as UserEntity;

        return (
          last_request_at !== undefined &&
          last_request_at !== null &&
          last_request_at.length > 0
        );
      },
      login(v: unknown): v is UserEntity['login'] {
        const { login } = v as UserEntity;

        return login !== undefined && login !== null && login.length > 0;
      },
      updated_at(v: unknown): v is UserEntity['updated_at'] {
        const { updated_at } = v as UserEntity;

        return (
          updated_at !== undefined &&
          updated_at !== null &&
          updated_at.length > 0
        );
      },
      user_tags(v: unknown): v is UserEntity['user_tags'] {
        const { user_tags } = v as UserEntity;

        // return (
        //   user_tags !== undefined && user_tags !== null && user_tags.length > 0
        // );
        return (user_tags as unknown as boolean) || true;
      },
    };

    if (!userEntityValidator.blob_id(userEntity))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {blob_id} does not exists or empty',
      );

    if (!userEntityValidator.created_at(userEntity))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {created_at} does not exist or empty',
      );

    if (!userEntityValidator.custom_data(userEntity))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {custom_data} does not exist or empty',
      );

    if (!userEntityValidator.email(userEntity))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {email} does not exist or empty',
      );

    if (!userEntityValidator.full_name(userEntity))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {full_name} does not exist or empty',
      );

    if (!userEntityValidator.id(userEntity))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {id} does not exist or empty',
      );

    if (!userEntityValidator.last_request_at(userEntity))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {last_request_at} does not exist or empty',
      );

    if (!userEntityValidator.id(userEntity))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {id} does not exist or empty',
      );

    if (!userEntityValidator.updated_at(userEntity))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {updated_at} does not exist or empty',
      );

    if (!userEntityValidator.user_tags(userEntity))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {user_tags} does not exist or empty',
      );

    // return Promise.resolve();
  }

  private static validateDTO(userDTO: RemoteUserDTO) {
    const dtoValidator: DtoValidator<RemoteUserDTO> = {
      blob_id(v: unknown): v is RemoteUserDTO['blob_id'] {
        const { blob_id } = v as RemoteUserDTO;
        const result = (blob_id as unknown as string) || '';

        return result.length >= 0;
      },
      created_at(v: unknown): v is RemoteUserDTO['created_at'] {
        const { created_at } = v as RemoteUserDTO;

        return created_at !== undefined;
      },
      custom_data(v: unknown): v is RemoteUserDTO['created_at'] {
        const { created_at } = v as RemoteUserDTO;

        return created_at !== undefined;
      },
      email(v: unknown): v is RemoteUserDTO['email'] {
        const { email } = v as RemoteUserDTO;

        return email !== undefined;
      },
      full_name(v: unknown): v is RemoteUserDTO['full_name'] {
        const { full_name } = v as RemoteUserDTO;

        return full_name !== undefined;
      },
      id(v: unknown): v is RemoteUserDTO['id'] {
        const { id } = v as RemoteUserDTO;

        return id !== undefined;
      },
      last_request_at(v: unknown): v is RemoteUserDTO['last_request_at'] {
        const { last_request_at } = v as RemoteUserDTO;

        return last_request_at !== undefined;
      },
      login(v: unknown): v is RemoteUserDTO['login'] {
        const { login } = v as RemoteUserDTO;

        return login !== undefined;
      },
      name(v: unknown): v is RemoteUserDTO['name'] {
        const { name } = v as RemoteUserDTO;

        return name !== undefined;
      },
      updated_at(v: unknown): v is RemoteUserDTO['updated_at'] {
        const { updated_at } = v as RemoteUserDTO;

        return updated_at !== undefined;
      },
      user_tags(v: unknown): v is RemoteUserDTO['user_tags'] {
        const { user_tags } = v as RemoteUserDTO;

        return user_tags !== undefined;
      },
    };

    if (!dtoValidator.blob_id(userDTO))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {blob_id} does not exists or empty in DTO',
      );

    if (!dtoValidator.created_at(userDTO))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {created_at} does not exist or empty in DTO',
      );

    if (!dtoValidator.custom_data(userDTO))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {custom_data} does not exist or empty in DTO',
      );

    if (!dtoValidator.email(userDTO))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {email} does not exist or empty in DTO',
      );

    if (!dtoValidator.full_name(userDTO))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {full_name} does not exist or empty in DTO',
      );

    if (!dtoValidator.id(userDTO))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {id} does not exist or empty in DTO',
      );

    if (!dtoValidator.last_request_at(userDTO))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {last_request_at} does not exist or empty in DTO',
      );
    if (!dtoValidator.login(userDTO))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {login} does not exist or empty in DTO',
      );

    if (!dtoValidator.name(userDTO))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {name} does not exist or empty in DTO',
      );

    if (!dtoValidator.updated_at(userDTO))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {updated_at} does not exist or empty in DTO',
      );

    if (!dtoValidator.user_tags(userDTO))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {user_tags} does not exist or empty in DTO',
      );
  }

  public static createDefaultUserEntity(): UserEntity {
    return {
      created_at: '',
      custom_data: '',
      email: '',
      full_name: '',
      id: 0,
      last_request_at: '',
      login: '',
      updated_at: '',
      user_tags: '',
      blob_id: '',
    };
  }
}
