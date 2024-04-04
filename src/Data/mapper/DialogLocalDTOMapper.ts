import { IMapper } from './IMapper';
import { DialogEntity } from '../../Domain/entity/DialogEntity';
import { LocalDialogDTO } from '../dto/dialog/LocalDialogDTO';
import { DialogType } from '../../Domain/entity/DialogTypes';
import { PrivateDialogEntity } from '../../Domain/entity/PrivateDialogEntity';
import { PublicDialogEntity } from '../../Domain/entity/PublicDialogEntity';
import { GroupDialogEntity } from '../../Domain/entity/GroupDialogEntity';
import {
  INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
  INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
  MapperDTOException,
  UNEXPECTED_MAPPER_DTO_EXCEPTION_EXCEPTION_CODE,
  UNEXPECTED_MAPPER_DTO_EXCEPTION_MESSAGE,
} from '../source/exception/MapperDTOException';
import { RemoteDialogDTO } from '../dto/dialog/RemoteDialogDTO';

type DtoValidator<T> = {
  [key in keyof T]: (v: unknown) => v is T[key];
};

export class DialogLocalDTOMapper implements IMapper {
  fromEntity<TArg, TResult>(entity: TArg): Promise<TResult> {
    const dialog: LocalDialogDTO = new LocalDialogDTO();

    const dialogEntity: DialogEntity = this.defineType(entity);

    DialogLocalDTOMapper.validateEntity(dialogEntity);

    dialog.id = dialogEntity.id;

    dialog.type = dialogEntity.type;

    dialog.ownerId = dialogEntity.ownerId;

    dialog.participantsIds =
      DialogLocalDTOMapper.getParticipantsIds(dialogEntity);

    dialog.participantId = DialogLocalDTOMapper.getParticipantId(dialogEntity);

    dialog.updatedAt = dialogEntity.updatedAt;

    dialog.lastMessageText = dialogEntity.lastMessage.text;

    dialog.lastMessageUserId = dialogEntity.lastMessage.userId.toString();

    dialog.lastMessageDateSent = dialogEntity.lastMessage.dateSent;

    dialog.unreadMessageCount = dialogEntity.unreadMessageCount;

    dialog.name = DialogLocalDTOMapper.getDialogName(dialogEntity);

    dialog.photo = DialogLocalDTOMapper.getPhoto(dialogEntity);

    return Promise.resolve(dialog as TResult);
  }

  // eslint-disable-next-line class-methods-use-this
  toEntity<TArg, TResult>(data: TArg): Promise<TResult> {
    const dialog = data as unknown as LocalDialogDTO;

    DialogLocalDTOMapper.validateLocalDTO(dialog);

    let entity: DialogEntity = DialogLocalDTOMapper.createDefaultDialogEntity(
      dialog.ownerId,
    );

    switch (dialog.type) {
      case DialogType.private:
        entity = new PrivateDialogEntity(
          { todo: '' },
          dialog.id,
          dialog.name,
          {
            dateSent: dialog.lastMessageDateSent,
            text: dialog.lastMessageText ? dialog.lastMessageText : '',
            userId: parseInt(dialog.lastMessageUserId, 10),
          },
          dialog.ownerId,
          dialog.type,
          dialog.unreadMessageCount,
          dialog.updatedAt,
          parseInt(dialog.participantId, 10),
        );
        break;
      case DialogType.public:
        entity = new PublicDialogEntity(
          { todo: '' },
          dialog.id,
          {
            dateSent: dialog.lastMessageDateSent,
            text: dialog.lastMessageText ? dialog.lastMessageText : '',
            userId: parseInt(dialog.lastMessageUserId, 10),
          },
          dialog.ownerId,
          dialog.type,
          dialog.unreadMessageCount,
          dialog.updatedAt,
          dialog.name,
          dialog.photo,
        );
        break;
      case DialogType.group:
        entity = new GroupDialogEntity(
          { todo: '' },
          dialog.id,
          {
            dateSent: dialog.lastMessageDateSent,
            text: dialog.lastMessageText ? dialog.lastMessageText : '',
            userId: parseInt(dialog.lastMessageUserId, 10),
          },
          dialog.ownerId,
          dialog.type,
          dialog.unreadMessageCount,
          dialog.updatedAt,
          dialog.participantsIds,
          dialog.name,
          dialog.photo,
        );
        break;
      default:
        return Promise.reject(
          new MapperDTOException(
            UNEXPECTED_MAPPER_DTO_EXCEPTION_MESSAGE,
            UNEXPECTED_MAPPER_DTO_EXCEPTION_EXCEPTION_CODE,
            'undefinded type dialog in DTO',
          ),
        );
    }

    return Promise.resolve(entity as unknown as TResult);
  }

  // eslint-disable-next-line class-methods-use-this
  private defineType(entity: unknown): DialogEntity {
    let dialogEntity: DialogEntity | null = entity as DialogEntity;

    switch (dialogEntity.type) {
      case DialogType.private:
        dialogEntity =
          entity instanceof PrivateDialogEntity
            ? (entity as unknown as PrivateDialogEntity)
            : null;
        break;
      case DialogType.public:
        dialogEntity =
          entity instanceof PublicDialogEntity
            ? (entity as unknown as PublicDialogEntity)
            : null;
        break;
      case DialogType.group:
        dialogEntity =
          entity instanceof GroupDialogEntity
            ? (entity as unknown as GroupDialogEntity)
            : null;
        break;
      default:
        dialogEntity = null;
    }

    if (!dialogEntity)
      throw new MapperDTOException(
        UNEXPECTED_MAPPER_DTO_EXCEPTION_MESSAGE,
        UNEXPECTED_MAPPER_DTO_EXCEPTION_EXCEPTION_CODE,
        'wrong type',
      );

    return dialogEntity;
  }

  private static getPhoto(dialogEntity: unknown): string {
    if (
      dialogEntity instanceof GroupDialogEntity ||
      dialogEntity instanceof PublicDialogEntity
    )
      return dialogEntity.photo || '';

    return '';
  }

  private static getDialogName(dialogEntity: unknown): string {
    if (
      dialogEntity instanceof GroupDialogEntity ||
      dialogEntity instanceof PublicDialogEntity ||
      dialogEntity instanceof PrivateDialogEntity
    )
      return dialogEntity.name;

    return '';
  }

  private static getParticipantId(dialogEntity: unknown): string {
    if (dialogEntity instanceof PrivateDialogEntity)
      return dialogEntity.participantId.toString();

    return '';
  }

  private static getParticipantsIds(dialogEntity: DialogEntity): Array<number> {
    if (dialogEntity instanceof GroupDialogEntity)
      return dialogEntity.participantIds;

    return [];
  }

  private static validateEntity(dialogEntity: DialogEntity) {
    if (dialogEntity instanceof PrivateDialogEntity) {
      return DialogLocalDTOMapper.validateIsPrivateDialogCorrect(dialogEntity);
    }
    if (dialogEntity instanceof PublicDialogEntity) {
      return DialogLocalDTOMapper.validateIsPublicDialogCorrect(dialogEntity);
    }

    if (dialogEntity instanceof GroupDialogEntity) {
      return DialogLocalDTOMapper.validateIsGroupDialogCorrect(dialogEntity);
    }

    return Promise.resolve();
  }

  private static validateIsPrivateDialogCorrect(
    dialogEntity: DialogEntity | unknown,
  ) {
    const privateDialogEntityValidator: DtoValidator<PrivateDialogEntity> = {
      name(v: unknown): v is PrivateDialogEntity['name'] {
        const { name } = v as PrivateDialogEntity;

        return name !== undefined && name !== null && name.length > 0;
      },

      customData(v: unknown): v is PrivateDialogEntity['customData'] {
        const { customData } = v as PrivateDialogEntity;

        return customData !== undefined && customData.todo !== undefined;
      },
      id(v: unknown): v is PrivateDialogEntity['id'] {
        const { id } = v as PrivateDialogEntity;

        return id !== undefined && id !== null;
      },
      lastMessage(v: unknown): v is PrivateDialogEntity['lastMessage'] {
        const { lastMessage } = v as PrivateDialogEntity;

        return (
          lastMessage !== undefined &&
          lastMessage !== null &&
          lastMessage.dateSent !== undefined &&
          lastMessage.text !== undefined &&
          lastMessage.userId !== undefined
        );
      },
      ownerId(v: unknown): v is PrivateDialogEntity['ownerId'] {
        const { ownerId } = v as PrivateDialogEntity;

        return ownerId !== undefined && ownerId !== null;
      },
      participantId(v: unknown): v is PrivateDialogEntity['participantId'] {
        const { participantId } = v as PrivateDialogEntity;

        return participantId !== undefined && participantId !== null;
      },
      type(v: unknown): v is PrivateDialogEntity['type'] {
        const { type } = v as PrivateDialogEntity;

        return type !== undefined && type !== null;
      },
      unreadMessageCount(
        v: unknown,
      ): v is PrivateDialogEntity['unreadMessageCount'] {
        const { unreadMessageCount } = v as PrivateDialogEntity;

        return unreadMessageCount !== undefined && unreadMessageCount !== null;
      },
      updatedAt(v: unknown): v is PrivateDialogEntity['updatedAt'] {
        const { updatedAt } = v as PrivateDialogEntity;

        return updatedAt !== undefined && updatedAt !== null;
      },
    };

    if (!privateDialogEntityValidator.id(dialogEntity))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {id} does not exist or empty',
      );
    if (!privateDialogEntityValidator.name(dialogEntity))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {name} does not exist or empty',
      );
    if (!privateDialogEntityValidator.customData(dialogEntity))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {customData} does not exist or empty',
      );
    if (!privateDialogEntityValidator.lastMessage(dialogEntity))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {lastMessage} does not exist or empty',
      );
    if (!privateDialogEntityValidator.ownerId(dialogEntity))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {ownerId} does not exist or empty',
      );
    if (!privateDialogEntityValidator.participantId(dialogEntity))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {participantId} does not exist or empty',
      );
    if (!privateDialogEntityValidator.type(dialogEntity))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {type} does not exist or empty',
      );
    if (!privateDialogEntityValidator.unreadMessageCount(dialogEntity))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {unreadMessageCount} does not exist or empty',
      );
    if (!privateDialogEntityValidator.updatedAt(dialogEntity))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {updatedAt} does not exist or empty',
      );
  }

  private static validateIsPublicDialogCorrect(dialogEntity: DialogEntity) {
    const publicDialogEntityValidator: DtoValidator<PublicDialogEntity> = {
      customData(v: unknown): v is PublicDialogEntity['customData'] {
        const { customData } = v as PublicDialogEntity;

        return customData !== undefined && customData.todo !== undefined;
      },
      id(v: unknown): v is PublicDialogEntity['id'] {
        const { id } = v as PublicDialogEntity;

        return id !== undefined && id !== null;
      },
      lastMessage(v: unknown): v is PublicDialogEntity['lastMessage'] {
        const { lastMessage } = v as PublicDialogEntity;

        return (
          lastMessage !== undefined &&
          lastMessage !== null &&
          lastMessage.dateSent !== undefined &&
          lastMessage.text !== undefined &&
          lastMessage.userId !== undefined
        );
      },
      ownerId(v: unknown): v is PublicDialogEntity['ownerId'] {
        const { ownerId } = v as PublicDialogEntity;

        return ownerId !== undefined && ownerId !== null;
      },
      type(v: unknown): v is PublicDialogEntity['type'] {
        const { type } = v as PublicDialogEntity;

        return type !== undefined && type !== null;
      },
      unreadMessageCount(
        v: unknown,
      ): v is PublicDialogEntity['unreadMessageCount'] {
        const { unreadMessageCount } = v as PublicDialogEntity;

        return unreadMessageCount !== undefined && unreadMessageCount !== null;
      },
      updatedAt(v: unknown): v is PublicDialogEntity['updatedAt'] {
        const { updatedAt } = v as PublicDialogEntity;

        return updatedAt !== undefined && updatedAt !== null;
      },

      name(v: unknown): v is PublicDialogEntity['name'] {
        const { name } = v as PublicDialogEntity;

        return name !== undefined && name !== null && name.length > 0;
      },

      photo(v: unknown): v is PublicDialogEntity['photo'] {
        const { photo } = v as PublicDialogEntity;

        return photo !== undefined && photo !== null;
      },
    };

    if (!publicDialogEntityValidator.id(dialogEntity))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {id} does not exist or empty',
      );
    if (!publicDialogEntityValidator.customData(dialogEntity))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {customData} does not exist or empty',
      );
    if (!publicDialogEntityValidator.lastMessage(dialogEntity))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {lastMessage} does not exist or empty',
      );
    if (!publicDialogEntityValidator.ownerId(dialogEntity))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {ownerId} does not exist or empty',
      );
    if (!publicDialogEntityValidator.type(dialogEntity))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {type} does not exist or empty',
      );
    if (!publicDialogEntityValidator.unreadMessageCount(dialogEntity))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {unreadMessageCount} does not exist or empty',
      );
    if (!publicDialogEntityValidator.updatedAt(dialogEntity))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {updatedAt} does not exist or empty',
      );
    if (!publicDialogEntityValidator.name(dialogEntity))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {name} does not exist or empty',
      );
    if (!publicDialogEntityValidator.photo(dialogEntity))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {photo} does not exist or empty',
      );
  }

  private static validateIsGroupDialogCorrect(dialogEntity: DialogEntity) {
    const groupDialogEntityValidator: DtoValidator<GroupDialogEntity> = {
      customData(v: unknown): v is GroupDialogEntity['customData'] {
        const { customData } = v as PublicDialogEntity;

        return customData !== undefined && customData.todo !== undefined;
      },
      id(v: unknown): v is GroupDialogEntity['id'] {
        const { id } = v as PublicDialogEntity;

        return id !== undefined && id !== null;
      },
      lastMessage(v: unknown): v is GroupDialogEntity['lastMessage'] {
        const { lastMessage } = v as PublicDialogEntity;

        return (
          lastMessage !== undefined &&
          lastMessage !== null &&
          lastMessage.dateSent !== undefined &&
          lastMessage.text !== undefined &&
          lastMessage.userId !== undefined
        );
      },
      ownerId(v: unknown): v is GroupDialogEntity['ownerId'] {
        const { ownerId } = v as PublicDialogEntity;

        return ownerId !== undefined && ownerId !== null;
      },
      type(v: unknown): v is GroupDialogEntity['type'] {
        const { type } = v as PublicDialogEntity;

        return type !== undefined && type !== null;
      },
      unreadMessageCount(
        v: unknown,
      ): v is GroupDialogEntity['unreadMessageCount'] {
        const { unreadMessageCount } = v as PublicDialogEntity;

        return unreadMessageCount !== undefined && unreadMessageCount !== null;
      },
      updatedAt(v: unknown): v is GroupDialogEntity['updatedAt'] {
        const { updatedAt } = v as PublicDialogEntity;

        return updatedAt !== undefined && updatedAt !== null;
      },

      name(v: unknown): v is GroupDialogEntity['name'] {
        const { name } = v as PublicDialogEntity;

        return name !== undefined && name !== null;
      },

      photo(v: unknown): v is GroupDialogEntity['photo'] {
        const { photo } = v as PublicDialogEntity;

        return photo !== undefined && photo !== null;
      },

      participantIds(v: unknown): v is GroupDialogEntity['participantIds'] {
        const { participantIds } = v as GroupDialogEntity;

        return participantIds !== undefined && participantIds !== null;
      },
    };

    if (!groupDialogEntityValidator.id(dialogEntity))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {id} does not exist or empty',
      );
    if (!groupDialogEntityValidator.customData(dialogEntity))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {customData} does not exist or empty',
      );
    if (!groupDialogEntityValidator.lastMessage(dialogEntity))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {lastMessage} does not exist or empty',
      );
    if (!groupDialogEntityValidator.ownerId(dialogEntity))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {ownerId} does not exist or empty',
      );
    if (!groupDialogEntityValidator.type(dialogEntity))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {type} does not exist or empty',
      );
    if (!groupDialogEntityValidator.unreadMessageCount(dialogEntity))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {unreadMessageCount} does not exist or empty',
      );
    if (!groupDialogEntityValidator.updatedAt(dialogEntity))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {updatedAt} does not exist or empty',
      );
    if (!groupDialogEntityValidator.name(dialogEntity))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {name} does not exist or empty',
      );
    if (!groupDialogEntityValidator.photo(dialogEntity))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {photo} does not exist or empty',
      );
    if (!groupDialogEntityValidator.participantIds(dialogEntity))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {participantIds} does not exist or empty',
      );
  }

  private static validateLocalDTO(data: LocalDialogDTO) {
    const dtoValidator: DtoValidator<LocalDialogDTO> = {
      id(v: unknown): v is LocalDialogDTO['id'] {
        const { id } = v as LocalDialogDTO;

        return id !== undefined;
      },
      lastMessageDateSent(
        v: unknown,
      ): v is LocalDialogDTO['lastMessageDateSent'] {
        const { lastMessageDateSent } = v as LocalDialogDTO;

        return lastMessageDateSent !== undefined;
      },
      lastMessageText(v: unknown): v is LocalDialogDTO['lastMessageText'] {
        const { lastMessageText } = v as LocalDialogDTO;

        return lastMessageText !== undefined;
      },
      lastMessageUserId(v: unknown): v is LocalDialogDTO['lastMessageUserId'] {
        const { lastMessageUserId } = v as LocalDialogDTO;

        return lastMessageUserId !== undefined;
      },
      name(v: unknown): v is LocalDialogDTO['name'] {
        const { name } = v as LocalDialogDTO;

        return name !== undefined;
      },
      ownerId(v: unknown): v is LocalDialogDTO['ownerId'] {
        const { ownerId } = v as LocalDialogDTO;

        return ownerId !== undefined;
      },
      participantId(v: unknown): v is LocalDialogDTO['participantId'] {
        const { participantId } = v as RemoteDialogDTO;

        return participantId !== undefined;
      },
      participantsIds(v: unknown): v is LocalDialogDTO['participantsIds'] {
        const { participantsIds } = v as LocalDialogDTO;

        return participantsIds !== undefined;
      },
      photo(v: unknown): v is LocalDialogDTO['photo'] {
        const { photo } = v as LocalDialogDTO;

        return photo !== undefined;
      },
      type(v: unknown): v is LocalDialogDTO['type'] {
        const { type } = v as LocalDialogDTO;

        return type !== undefined;
      },
      unreadMessageCount(
        v: unknown,
      ): v is LocalDialogDTO['unreadMessageCount'] {
        const { unreadMessageCount } = v as LocalDialogDTO;

        return unreadMessageCount !== undefined;
      },
      updatedAt(v: unknown): v is LocalDialogDTO['updatedAt'] {
        const { updatedAt } = v as LocalDialogDTO;

        return updatedAt !== undefined;
      },
    };

    if (!dtoValidator.id(data))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {id} does not exist or empty in DTO',
      );

    if (!dtoValidator.lastMessageDateSent(data))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {lastMessageDateSent} does not exist or empty in DTO',
      );

    if (!dtoValidator.lastMessageText(data))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {lastMessageText} does not exist or empty in DTO',
      );

    if (!dtoValidator.name(data))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {name} does not exist or empty in DTO',
      );

    if (!dtoValidator.ownerId(data))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {ownerId} does not exist or empty in DTO',
      );

    if (!dtoValidator.participantId(data))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {participantId} does not exist or empty in DTO',
      );

    if (!dtoValidator.participantsIds(data))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {participantsIds} does not exist or empty in DTO',
      );

    if (!dtoValidator.photo(data))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {photo} does not exist or empty in DTO',
      );

    if (!dtoValidator.type(data))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {type} does not exist or empty in DTO',
      );

    if (!dtoValidator.unreadMessageCount(data))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {unreadMessageCount} does not exist or empty in DTO',
      );

    if (!dtoValidator.updatedAt(data))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {updatedAt} does not exist or empty in DTO',
      );
  }

  public static createDefaultDialogEntity(owner_id: string): DialogEntity {
    return {
      customData: { todo: '' },
      lastMessage: { dateSent: 0, text: '', userId: 0 },
      ownerId: owner_id,
      type: DialogType.public,
      unreadMessageCount: 0,
      updatedAt: '',
      id: '',
      name: '_',
    };
  }
}
