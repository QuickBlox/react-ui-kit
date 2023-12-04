import { IDTOMapper } from './IDTOMapper';
import { RemoteUserDTO } from '../../../dto/user/RemoteUserDTO';
import {
  INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
  INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
  MapperDTOException,
} from '../../exception/MapperDTOException';

type DtoValidator<T> = {
  [key in keyof T]: (v: unknown) => v is T[key];
};

export class UserDTOMapper implements IDTOMapper {
  // eslint-disable-next-line class-methods-use-this
  fromDTO<TArg, TResult>(dto: TArg): Promise<TResult> {
    const userDTO: RemoteUserDTO = dto as unknown as RemoteUserDTO;

    UserDTOMapper.validateDTO(userDTO);

    // eslint-disable-next-line @typescript-eslint/no-shadow
    const user: QBUser = {
      age_over16: true,
      allow_sales_activities: false,
      allow_statistics_analysis: false,
      blob_id: userDTO.blob_id,
      created_at: userDTO.created_at,
      custom_data: userDTO.custom_data,
      email: userDTO.email,
      external_user_id: null,
      facebook_id: '',
      full_name: userDTO.full_name,
      id: parseInt(userDTO.id, 10),
      last_request_at: userDTO.last_request_at,
      login: userDTO.login,
      old_password: '',
      parents_contacts: '',
      password: '',
      phone: '',
      updated_at: userDTO.updated_at,
      user_tags: userDTO.user_tags,
      website: '',
    };

    return Promise.resolve(user as TResult);
  }

  // eslint-disable-next-line class-methods-use-this
  toTDO<TArg, TResult>(qbEntity: TArg): Promise<TResult> {
    const qbUser: QBUser = qbEntity as unknown as QBUser;

    UserDTOMapper.validateQBChatDialog(qbUser);

    const dto: RemoteUserDTO = new RemoteUserDTO();

    dto.created_at = qbUser.created_at;
    dto.custom_data = qbUser.custom_data;
    dto.email = qbUser.email;
    dto.full_name = qbUser.full_name;
    dto.login = qbUser.login;
    dto.last_request_at = qbUser.last_request_at;
    dto.id = qbUser.id.toString();
    dto.updated_at = qbUser.updated_at;
    dto.user_tags = qbUser.user_tags;
    dto.blob_id = qbUser.blob_id;

    return Promise.resolve(dto as TResult);
  }

  private static validateDTO(userDTO: RemoteUserDTO) {
    const userDTOValidator: DtoValidator<RemoteUserDTO> = {
      blob_id(v: unknown): v is RemoteUserDTO['blob_id'] {
        const { blob_id } = v as RemoteUserDTO;
        const result: string = (blob_id as unknown as string) || '';

        return (result && result.length && result.length >= 0) || true;
      },
      created_at(v: unknown): v is RemoteUserDTO['created_at'] {
        const { created_at } = v as RemoteUserDTO;

        return created_at !== undefined;
      },
      custom_data(v: unknown): v is RemoteUserDTO['custom_data'] {
        const { custom_data } = v as RemoteUserDTO;

        return custom_data !== undefined;
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

    if (!userDTOValidator.blob_id(userDTO))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {blob_id} does not exists or empty in DTO',
      );

    if (!userDTOValidator.created_at(userDTO))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {created_at} does not exist or empty in DTO',
      );

    if (!userDTOValidator.custom_data(userDTO))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {custom_data} does not exist or empty in DTO',
      );

    if (!userDTOValidator.email(userDTO))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {email} does not exist or empty in DTO',
      );

    if (!userDTOValidator.full_name(userDTO))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {full_name} does not exist or empty in DTO',
      );

    if (!userDTOValidator.id(userDTO))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {id} does not exist or empty in DTO',
      );

    if (!userDTOValidator.last_request_at(userDTO))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {last_request_at} does not exist or empty in DTO',
      );
    if (!userDTOValidator.login(userDTO))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {login} does not exist or empty in DTO',
      );

    if (!userDTOValidator.name(userDTO))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {name} does not exist or empty in DTO',
      );

    if (!userDTOValidator.updated_at(userDTO))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {updated_at} does not exist or empty in DTO',
      );

    if (!userDTOValidator.user_tags(userDTO))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {user_tags} does not exist or empty in DTO',
      );
  }

  private static validateQBChatDialog(qbUser: QBUser) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const qbUserValidator: DtoValidator<QBUser> = {
      blob_id(v: unknown): v is QBUser['blob_id'] {
        const { blob_id } = v as QBUser;
        const result: string = (blob_id as unknown as string) || '';

        return (result && result.length && result.length >= 0) || true;
      },
      created_at(v: unknown): v is QBUser['created_at'] {
        const { created_at } = v as QBUser;

        return created_at !== undefined && created_at !== null;
      },
      custom_data(v: unknown): v is QBUser['custom_data'] {
        const { custom_data } = v as QBUser;

        return custom_data !== undefined; // && custom_data !== null;
      },
      email(v: unknown): v is QBUser['email'] {
        const { email } = v as QBUser;

        return email !== undefined; // && email !== null;
      },
      full_name(v: unknown): v is QBUser['full_name'] {
        const { full_name } = v as QBUser;

        return full_name !== undefined; // && full_name !== null;
      },
      id(v: unknown): v is QBUser['id'] {
        const { id } = v as QBUser;

        return id !== undefined && id !== null;
      },
      last_request_at(v: unknown): v is QBUser['last_request_at'] {
        const { last_request_at } = v as QBUser;

        return last_request_at !== undefined; // && last_request_at !== null;
      },
      login(v: unknown): v is QBUser['login'] {
        const { login } = v as QBUser;

        return login !== undefined && login !== null;
      },
      phone(v: unknown): v is QBUser['phone'] {
        const { phone } = v as QBUser;

        return phone !== undefined; // && phone !== null;
      },
      updated_at(v: unknown): v is QBUser['updated_at'] {
        const { updated_at } = v as QBUser;

        return updated_at !== undefined && updated_at !== null;
      },
      user_tags(v: unknown): v is QBUser['user_tags'] {
        const { user_tags } = v as QBUser;

        return user_tags !== undefined; // && user_tags !== null;
      },
    };

    if (!qbUserValidator.blob_id(qbUser))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {blob_id} does not exists or empty',
      );

    if (!qbUserValidator.created_at(qbUser))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {created_at} does not exist or empty',
      );

    if (!qbUserValidator.custom_data(qbUser))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {custom_data} does not exist or empty',
      );

    if (!qbUserValidator.email(qbUser))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {email} does not exist or empty',
      );

    if (!qbUserValidator.full_name(qbUser))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {full_name} does not exist or empty',
      );

    if (!qbUserValidator.id(qbUser))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {id} does not exist or empty',
      );

    if (!qbUserValidator.last_request_at(qbUser))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {last_request_at} does not exist or empty',
      );

    if (!qbUserValidator.login(qbUser))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {login} does not exist or empty',
      );

    if (!qbUserValidator.phone(qbUser))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {phone} does not exist or empty',
      );

    if (!qbUserValidator.updated_at(qbUser))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {updated_at} does not exist or empty',
      );

    if (!qbUserValidator.user_tags(qbUser))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {user_tags} does not exist or empty',
      );
  }
}
