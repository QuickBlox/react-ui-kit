import { IMapper } from './IMapper';
import {
  INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
  INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
  MapperDTOException,
  UNEXPECTED_MAPPER_DTO_EXCEPTION_EXCEPTION_CODE,
  UNEXPECTED_MAPPER_DTO_EXCEPTION_MESSAGE,
} from '../source/exception/MapperDTOException';
import { LocalMessageDTO } from '../dto/message/LocalMessageDTO';
import { MessageEntity } from '../../Domain/entity/MessageEntity';
import ChatMessageAttachmentEntity from '../../Domain/entity/ChatMessageAttachmentEntity';

type DtoValidator<T> = {
  [key in keyof T]: (v: unknown) => v is T[key];
};

export class MessageLocalDTOMapper implements IMapper {
  // eslint-disable-next-line class-methods-use-this
  fromEntity<TArg, TResult>(entity: TArg): Promise<TResult> {
    const messageDTO: LocalMessageDTO = new LocalMessageDTO();

    const messageEntity: MessageEntity = entity as MessageEntity;

    if (messageEntity === null || messageEntity === undefined) {
      throw new MapperDTOException(
        UNEXPECTED_MAPPER_DTO_EXCEPTION_MESSAGE,
        UNEXPECTED_MAPPER_DTO_EXCEPTION_EXCEPTION_CODE,
        'entity is null or undefined',
      );
    }

    MessageLocalDTOMapper.validateEntity(messageEntity);

    messageDTO.id = messageEntity.id.toString();
    messageDTO.dialogId = messageEntity.dialogId;
    messageDTO.created_at = messageEntity.created_at;
    messageDTO.date_sent = messageEntity.date_sent;
    messageDTO.delivered_ids = messageEntity.delivered_ids;
    messageDTO.message = messageEntity.message;
    messageDTO.read_ids = messageEntity.read_ids;
    messageDTO.read = messageEntity.read ? 1 : 0;
    if (messageEntity.recipient_id !== null) {
      messageDTO.recipient_id = messageEntity.recipient_id;
    }
    //
    messageDTO.notification_type = messageEntity.notification_type;
    messageDTO.dialog_type = messageEntity.dialogType;
    messageDTO.sender_id = messageEntity.sender_id;
    messageDTO.updated_at = messageEntity.updated_at;
    if (messageEntity.attachments && messageEntity.attachments.length) {
      messageEntity.attachments.forEach((att) => {
        const newAtt: ChatMessageAttachmentEntity = { ...att };

        messageDTO.attachments.push(newAtt);
      });
    }

    return Promise.resolve(messageDTO as TResult);
  }

  // eslint-disable-next-line class-methods-use-this
  toEntity<TArg, TResult>(data: TArg): Promise<TResult> {
    const messageDTO = data as unknown as LocalMessageDTO;

    MessageLocalDTOMapper.validateLocalDTO(messageDTO);

    const messageEntity: MessageEntity =
      MessageLocalDTOMapper.createDefaultMessageEntity();

    // messageEntity.id = parseInt(messageDTO.id, 10);
    messageEntity.id = messageDTO.id;
    messageEntity.dialogId = messageDTO.dialogId;
    messageEntity.created_at = messageDTO.created_at;
    messageEntity.date_sent = messageDTO.date_sent;
    messageEntity.delivered_ids = messageDTO.delivered_ids;
    messageEntity.message = messageDTO.message;
    messageEntity.read_ids = messageDTO.read_ids;
    messageEntity.read = messageDTO.read;
    messageEntity.recipient_id = messageDTO.recipient_id;
    messageEntity.sender_id = messageDTO.sender_id;
    messageEntity.updated_at = messageDTO.updated_at;
    //
    if (messageDTO.attachments && messageDTO.attachments.length) {
      messageEntity.attachments = [];
      messageDTO.attachments.forEach((att) => {
        const newAtt: ChatMessageAttachmentEntity = { ...att };

        messageEntity.attachments?.push(newAtt);
      });
    }
    messageEntity.notification_type = messageDTO?.notification_type
      ? messageDTO?.notification_type
      : '';
    messageEntity.markable = messageDTO?.markable ? messageDTO?.markable : '';
    //

    return Promise.resolve(messageEntity as TResult);
  }

  private static validateEntity(messageEntity: MessageEntity) {
    const messageEntityValidator: DtoValidator<MessageEntity> = {
      created_at(v: unknown): v is MessageEntity['created_at'] {
        const { created_at } = v as MessageEntity;

        return (
          created_at !== undefined &&
          created_at !== null &&
          created_at.length > 0
        );
      },
      date_sent(v: unknown): v is MessageEntity['date_sent'] {
        const { date_sent } = v as MessageEntity;

        return date_sent !== undefined && date_sent !== null;
      },
      delivered_ids(v: unknown): v is MessageEntity['delivered_ids'] {
        const { delivered_ids } = v as MessageEntity;

        return delivered_ids !== undefined && delivered_ids !== null;
        // && delivered_ids.length >= 0
      },
      dialogId(v: unknown): v is MessageEntity['dialogId'] {
        const { dialogId } = v as MessageEntity;

        return (
          dialogId !== undefined && dialogId !== null && dialogId.length > 0
        );
      },
      id(v: unknown): v is MessageEntity['id'] {
        const { id } = v as MessageEntity;

        return id !== undefined && id !== null;
      },
      message(v: unknown): v is MessageEntity['message'] {
        const { message } = v as MessageEntity;

        return message !== undefined && message !== null && message.length > 0;
      },
      read(v: unknown): v is MessageEntity['read'] {
        const { read } = v as MessageEntity;

        return read !== undefined && read !== null;
      },
      read_ids(v: unknown): v is MessageEntity['read_ids'] {
        const { read_ids } = v as MessageEntity;

        return (
          read_ids !== undefined && read_ids !== null
          // && read_ids.length >= 0
        );
      },
      recipient_id(v: unknown): v is MessageEntity['recipient_id'] {
        const { recipient_id } = v as MessageEntity;

        return recipient_id !== undefined && recipient_id !== null;
      },
      sender_id(v: unknown): v is MessageEntity['sender_id'] {
        const { sender_id } = v as MessageEntity;

        return sender_id !== undefined && sender_id !== null;
      },
      updated_at(v: unknown): v is MessageEntity['updated_at'] {
        const { updated_at } = v as MessageEntity;

        return (
          updated_at !== undefined &&
          updated_at !== null &&
          updated_at.length > 0
        );
      },
    };

    if (!messageEntityValidator.created_at(messageEntity))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {created_at} does not exist or empty',
      );

    if (!messageEntityValidator.date_sent(messageEntity))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {date_sent} does not exist or empty',
      );

    if (!messageEntityValidator.delivered_ids(messageEntity))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {delivered_ids} does not exist or empty',
      );

    if (!messageEntityValidator.dialogId(messageEntity))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {dialogId} does not exist or empty',
      );

    if (!messageEntityValidator.id(messageEntity))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {id} does not exist or empty',
      );

    if (!messageEntityValidator.message(messageEntity))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {message} does not exist or empty',
      );

    if (!messageEntityValidator.read(messageEntity))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {read} does not exist or empty',
      );

    if (!messageEntityValidator.read_ids(messageEntity))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {read_ids} does not exist or empty',
      );

    if (!messageEntityValidator.recipient_id(messageEntity))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {recipient_id} does not exist or empty',
      );

    if (!messageEntityValidator.sender_id(messageEntity))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {sender_id} does not exist or empty',
      );

    if (!messageEntityValidator.updated_at(messageEntity))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {updated_at} does not exist or empty',
      );

    return Promise.resolve();
  }

  private static validateLocalDTO(messageDTO: LocalMessageDTO) {
    const dtoValidator: DtoValidator<LocalMessageDTO> = {
      created_at(v: unknown): v is LocalMessageDTO['created_at'] {
        const { created_at } = v as LocalMessageDTO;

        return (
          created_at !== undefined &&
          created_at !== null &&
          created_at.length > 0
        );
      },
      date_sent(v: unknown): v is LocalMessageDTO['date_sent'] {
        const { date_sent } = v as LocalMessageDTO;

        return date_sent !== undefined && date_sent !== null;
      },
      delivered_ids(v: unknown): v is LocalMessageDTO['delivered_ids'] {
        const { delivered_ids } = v as LocalMessageDTO;

        return (
          delivered_ids !== undefined && delivered_ids !== null
          // && delivered_ids.length >= 0
        );
      },
      dialogId(v: unknown): v is LocalMessageDTO['dialogId'] {
        const { dialogId } = v as LocalMessageDTO;

        return (
          dialogId !== undefined && dialogId !== null && dialogId.length > 0
        );
      },
      id(v: unknown): v is LocalMessageDTO['id'] {
        const { id } = v as LocalMessageDTO;

        return id !== undefined && id !== null;
      },
      message(v: unknown): v is LocalMessageDTO['message'] {
        const { message } = v as LocalMessageDTO;

        return message !== undefined && message !== null && message.length > 0;
      },
      read(v: unknown): v is LocalMessageDTO['read'] {
        const { read } = v as LocalMessageDTO;

        return read !== undefined && read !== null;
      },
      read_ids(v: unknown): v is LocalMessageDTO['read_ids'] {
        const { read_ids } = v as LocalMessageDTO;

        return (
          read_ids !== undefined && read_ids !== null
          // && read_ids.length >= 0
        );
      },
      recipient_id(v: unknown): v is LocalMessageDTO['recipient_id'] {
        const { recipient_id } = v as LocalMessageDTO;

        return recipient_id !== undefined && recipient_id !== null;
      },
      sender_id(v: unknown): v is LocalMessageDTO['sender_id'] {
        const { sender_id } = v as LocalMessageDTO;

        return sender_id !== undefined && sender_id !== null;
      },
      updated_at(v: unknown): v is LocalMessageDTO['updated_at'] {
        const { updated_at } = v as LocalMessageDTO;

        return (
          updated_at !== undefined &&
          updated_at !== null &&
          updated_at.length > 0
        );
      },
      attachments(v: unknown): v is LocalMessageDTO['attachments'] {
        const { attachments } = v as LocalMessageDTO;

        return attachments !== undefined && attachments !== null;
      },
    };

    if (!dtoValidator.created_at(messageDTO))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {created_at} does not exist or empty',
      );

    if (!dtoValidator.date_sent(messageDTO))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {date_sent} does not exist or empty',
      );

    if (!dtoValidator.delivered_ids(messageDTO))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {delivered_ids} does not exist or empty',
      );

    if (!dtoValidator.dialogId(messageDTO))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {dialogId} does not exist or empty',
      );

    if (!dtoValidator.id(messageDTO))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {id} does not exist or empty',
      );

    if (!dtoValidator.message(messageDTO))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {message} does not exist or empty',
      );

    if (!dtoValidator.read(messageDTO))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {read} does not exist or empty',
      );

    if (!dtoValidator.read_ids(messageDTO))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {read_ids} does not exist or empty',
      );

    if (!dtoValidator.recipient_id(messageDTO))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {recipient_id} does not exist or empty',
      );

    if (!dtoValidator.sender_id(messageDTO))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {sender_id} does not exist or empty',
      );

    if (!dtoValidator.updated_at(messageDTO))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {updated_at} does not exist or empty',
      );
  }

  private static createDefaultMessageEntity() {
    return {
      id: '',
      dialogId: '',
      created_at: '',
      date_sent: 0,
      delivered_ids: Array<number>(),
      message: '',
      read_ids: Array<number>(),
      read: 0,
      recipient_id: 0,
      sender_id: 0,
      updated_at: '',
    };
  }
}
