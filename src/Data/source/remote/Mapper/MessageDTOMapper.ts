import { IDTOMapper } from './IDTOMapper';
import { RemoteMessageDTO } from '../../../dto/message/RemoteMessageDTO';
import {
  INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
  INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
  MapperDTOException,
} from '../../exception/MapperDTOException';
import ChatMessageAttachmentEntity from '../../../../Domain/entity/ChatMessageAttachmentEntity';

type DtoValidator<T> = {
  [key in keyof T]: (v: unknown) => v is T[key];
};

export class MessageDTOMapper implements IDTOMapper {
  // eslint-disable-next-line class-methods-use-this
  fromDTO<TArg, TResult>(dto: TArg): Promise<TResult> {
    const messageDTO: RemoteMessageDTO = dto as RemoteMessageDTO;

    MessageDTOMapper.validateDTO(messageDTO);

    // eslint-disable-next-line @typescript-eslint/no-shadow
    // todo: why we have empty values?
    const message: QBChatMessage = {
      _id: '',
      attachments: [],
      chat_dialog_id: '',
      created_at: '',
      date_sent: 0,
      delivered_ids: [],
      message: '',
      read: 0,
      read_ids: [],
      recipient_id: 0,
      sender_id: 0,
      updated_at: '',
    };

    return Promise.resolve(message as TResult);
  }

  // eslint-disable-next-line class-methods-use-this
  public static transformAttachment(qbAtts: ChatMessageAttachment[]) {
    const result: ChatMessageAttachmentEntity[] = qbAtts.map((item) => {
      const newItem: ChatMessageAttachmentEntity = {
        id: item.id,
        name: item.name,
        size: item.size,
        type: item.type,
        uid: item.uid,
        url: item.uid && QB.content.privateUrl(item.uid),
        file: {
          id: item.id,
          name: item.name,
          size: item.size,
          type: item.type,
          uid: item.uid || '',
          url: item.uid && QB.content.privateUrl(item.uid),
        },
      };

      return newItem;
    });

    return result;
  }

  // eslint-disable-next-line class-methods-use-this
  toTDO<TArg, TResult>(entity: TArg): Promise<TResult> {
    const qbMessage: QBChatMessage = entity as unknown as QBChatMessage;

    MessageDTOMapper.validateQBMessage(qbMessage);

    const dto: RemoteMessageDTO = new RemoteMessageDTO();

    dto.id = qbMessage._id;
    dto.dialogId = qbMessage.chat_dialog_id;
    dto.message = qbMessage.message;
    dto.created_at = qbMessage.created_at;
    dto.date_sent = qbMessage.date_sent * 1000;
    dto.delivered_ids = qbMessage.delivered_ids ? qbMessage.delivered_ids : [];
    dto.read_ids = qbMessage.read_ids ? qbMessage.read_ids : [];

    dto.recipient_id = qbMessage.recipient_id ? qbMessage.recipient_id : 0;
    dto.attachments = MessageDTOMapper.transformAttachment(
      qbMessage.attachments ? qbMessage.attachments : [],
    );
    dto.read = qbMessage.read;
    dto.sender_id = qbMessage.sender_id;
    dto.updated_at = qbMessage.updated_at;
    // // notification_type markable
    dto.notification_type = qbMessage.notification_type
      ? qbMessage.notification_type
      : '';
    dto.markable = qbMessage.notification_type
      ? qbMessage.notification_type
      : '';

    return Promise.resolve(dto as TResult);
  }

  private static validateDTO(messageDTO: RemoteMessageDTO) {
    const messageDTOValidator: DtoValidator<RemoteMessageDTO> = {
      created_at(v: unknown): v is RemoteMessageDTO['created_at'] {
        const { created_at } = v as RemoteMessageDTO;

        return (
          created_at !== undefined &&
          created_at !== null &&
          created_at.length > 0
        );
      },
      date_sent(v: unknown): v is RemoteMessageDTO['date_sent'] {
        const { date_sent } = v as RemoteMessageDTO;

        return date_sent !== undefined && date_sent !== null;
      },
      delivered_ids(v: unknown): v is RemoteMessageDTO['delivered_ids'] {
        const { delivered_ids } = v as RemoteMessageDTO;

        return (
          delivered_ids !== undefined && delivered_ids !== null
          // && delivered_ids.length >= 0
        );
      },
      dialogId(v: unknown): v is RemoteMessageDTO['dialogId'] {
        const { dialogId } = v as RemoteMessageDTO;

        return (
          dialogId !== undefined && dialogId !== null && dialogId.length > 0
        );
      },
      id(v: unknown): v is RemoteMessageDTO['id'] {
        const { id } = v as RemoteMessageDTO;

        return id !== undefined && id !== null;
      },
      message(v: unknown): v is RemoteMessageDTO['message'] {
        const { message } = v as RemoteMessageDTO;

        return message !== undefined && message !== null && message.length > 0;
      },
      read(v: unknown): v is RemoteMessageDTO['read'] {
        const { read } = v as RemoteMessageDTO;

        return read !== undefined && read !== null;
      },
      read_ids(v: unknown): v is RemoteMessageDTO['read_ids'] {
        const { read_ids } = v as RemoteMessageDTO;

        return (
          read_ids !== undefined && read_ids !== null
          // && read_ids.length >= 0
        );
      },
      recipient_id(v: unknown): v is RemoteMessageDTO['recipient_id'] {
        const { recipient_id } = v as RemoteMessageDTO;

        return recipient_id !== undefined && recipient_id !== null;
      },
      sender_id(v: unknown): v is RemoteMessageDTO['sender_id'] {
        const { sender_id } = v as RemoteMessageDTO;

        return sender_id !== undefined && sender_id !== null;
      },
      updated_at(v: unknown): v is RemoteMessageDTO['updated_at'] {
        const { updated_at } = v as RemoteMessageDTO;

        return (
          updated_at !== undefined &&
          updated_at !== null &&
          updated_at.length > 0
        );
      }, //
      attachments(v: unknown): v is RemoteMessageDTO['attachments'] {
        const { attachments } = v as RemoteMessageDTO;

        return attachments !== undefined && attachments !== null;
      },
    };

    if (!messageDTOValidator.created_at(messageDTO))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {created_at} does not exist or empty',
      );

    if (!messageDTOValidator.date_sent(messageDTO))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {date_sent} does not exist or empty',
      );

    if (!messageDTOValidator.delivered_ids(messageDTO))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {delivered_ids} does not exist or empty',
      );

    if (!messageDTOValidator.dialogId(messageDTO))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {dialogId} does not exist or empty',
      );

    if (!messageDTOValidator.id(messageDTO))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {id} does not exist or empty',
      );

    if (!messageDTOValidator.message(messageDTO))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {message} does not exist or empty',
      );

    if (!messageDTOValidator.read(messageDTO))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {read} does not exist or empty',
      );

    if (!messageDTOValidator.read_ids(messageDTO))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {read_ids} does not exist or empty',
      );

    if (!messageDTOValidator.recipient_id(messageDTO))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {recipient_id} does not exist or empty',
      );

    if (!messageDTOValidator.sender_id(messageDTO))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {sender_id} does not exist or empty',
      );

    if (!messageDTOValidator.updated_at(messageDTO))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {updated_at} does not exist or empty',
      );
  }

  private static validateQBMessage(qbMessage: QBChatMessage) {
    const qbMessageValidator: DtoValidator<QBChatMessage> = {
      delivered_ids(v: unknown): v is QBChatMessage['delivered_ids'] {
        const { delivered_ids } = v as QBChatMessage;

        return delivered_ids !== undefined && delivered_ids !== null;
      },
      read_ids(v: unknown): v is QBChatMessage['read_ids'] {
        const { read_ids } = v as QBChatMessage;

        return read_ids !== undefined && read_ids !== null;
      },
      _id(v: unknown): v is QBChatMessage['_id'] {
        const { _id } = v as QBChatMessage;

        return _id !== undefined && _id !== null && _id.length > 0;
      },
      // TODO: check attachment
      attachments(v: unknown): v is QBChatMessage['attachments'] {
        const { attachments } = v as QBChatMessage;

        return attachments !== undefined && attachments !== null;
      },
      chat_dialog_id(v: unknown): v is QBChatMessage['chat_dialog_id'] {
        const { chat_dialog_id } = v as QBChatMessage;

        return (
          chat_dialog_id !== undefined &&
          chat_dialog_id !== null &&
          chat_dialog_id.length > 0
        );
      },
      created_at(v: unknown): v is QBChatMessage['created_at'] {
        const { created_at } = v as QBChatMessage;

        return (
          created_at !== undefined &&
          created_at !== null &&
          created_at.length > 0
        );
      },
      date_sent(v: unknown): v is QBChatMessage['date_sent'] {
        const { date_sent } = v as QBChatMessage;

        return date_sent !== undefined && date_sent !== null;
      },
      message(v: unknown): v is QBChatMessage['message'] {
        const { message } = v as QBChatMessage;

        return message !== undefined && message !== null && message.length > 0;
      },
      read(v: unknown): v is QBChatMessage['read'] {
        const { read } = v as QBChatMessage;

        return read !== undefined && read !== null;
      },
      recipient_id(v: unknown): v is QBChatMessage['recipient_id'] {
        const { recipient_id } = v as QBChatMessage;

        return recipient_id !== undefined && recipient_id !== null;
      },
      sender_id(v: unknown): v is QBChatMessage['sender_id'] {
        const { sender_id } = v as QBChatMessage;

        return sender_id !== undefined && sender_id !== null;
      },
      updated_at(v: unknown): v is QBChatMessage['updated_at'] {
        const { updated_at } = v as QBChatMessage;

        return (
          updated_at !== undefined &&
          updated_at !== null &&
          updated_at.length > 0
        );
      },
    };

    if (!qbMessageValidator._id(qbMessage))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {_id} does not exist or empty',
      );

    if (!qbMessageValidator.chat_dialog_id(qbMessage))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {chat_dialog_id} does not exist or empty',
      );

    if (!qbMessageValidator.created_at(qbMessage))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {created_at} does not exist or empty',
      );

    if (!qbMessageValidator.date_sent(qbMessage))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {date_sent} does not exist or empty',
      );

    if (!qbMessageValidator.message(qbMessage))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {message} does not exist or empty',
      );

    if (!qbMessageValidator.read(qbMessage))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {read} does not exist or empty',
      );

    if (!qbMessageValidator.recipient_id(qbMessage))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {recipient_id} does not exist or empty',
      );

    if (!qbMessageValidator.sender_id(qbMessage))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {sender_id} does not exist or empty',
      );

    if (!qbMessageValidator.updated_at(qbMessage))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {updated_at} does not exist or empty',
      );
  }
}
