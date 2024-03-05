// eslint-disable-next-line max-classes-per-file
import { DialogEntity } from '../Domain/entity/DialogEntity';
import { DialogType } from '../Domain/entity/DialogTypes';
import { PublicDialogEntity } from '../Domain/entity/PublicDialogEntity';
import { PrivateDialogEntity } from '../Domain/entity/PrivateDialogEntity';
import { GroupDialogEntity } from '../Domain/entity/GroupDialogEntity';
import { RemoteDialogDTO } from './dto/dialog/RemoteDialogDTO';
import { UserEntity } from '../Domain/entity/UserEntity';
import { MessageEntity } from '../Domain/entity/MessageEntity';
import ChatMessageAttachmentEntity from '../Domain/entity/ChatMessageAttachmentEntity';
import { FileType } from '../Domain/entity/FileTypes';
import { IMapper } from './mapper/IMapper';
import { UserRemoteDTOMapper } from './mapper/UserRemoteDTOMapper';
import { LocalUserDTO } from './dto/user/LocalUserDTO';
import { MapperDTOException } from './source/exception/MapperDTOException';
import { DialogLocalDTOMapper } from './mapper/DialogLocalDTOMapper';
import { LocalDialogDTO } from './dto/dialog/LocalDialogDTO';
import RepositoryException from './source/exception/RepositoryException';
import { MessageLocalDTOMapper } from './mapper/MessageLocalDTOMapper';
import { LocalMessageDTO } from './dto/message/LocalMessageDTO';
import { LocalDataSource } from './source/local/LocalDataSource';
import { FileEntity } from '../Domain/entity/FileEntity';

export class Stubs {
  static createMessageEntityWithParams(
    id: string,
    dialogId: string,
    message: string,
    created_at: string,
    date_sent: number,
    updated_at: string,
    delivered_ids: Array<number>,
    read_ids: Array<number>,
    read: number,
    sender_id: number,
    recipient_id: number,
    attachments?: ChatMessageAttachmentEntity[],
    notification_type?: string,
    dialog_type?: DialogType,
  ): MessageEntity {
    return {
      created_at,
      date_sent,
      delivered_ids,
      dialogId,
      id,
      message,
      read,
      read_ids,
      recipient_id,
      sender_id,
      updated_at,
      attachments,
      notification_type,
      dialogType: dialog_type,
    };
  }

  public static createFileEntityWithDefaultValues(): FileEntity {
    return {
      id: '0',
      uid: '',
      url: '',
      name: '',
      size: 0,
      type: FileType.image,
      data: '',
    };
  }

  public static async initializeWithUsersMockData(
    ds: LocalDataSource,
  ): Promise<void> {
    console.log('local datasource sync status: ', ds.isLocalSynced());
    const userEntities = Stubs.createUsersForTest();
    const userEntityToDTOMapper: IMapper = new UserRemoteDTOMapper();

    // eslint-disable-next-line no-restricted-syntax
    for (const entity of userEntities) {
      try {
        // eslint-disable-next-line no-await-in-loop
        const userDTO = await userEntityToDTOMapper.fromEntity<
          UserEntity,
          LocalUserDTO
        >(entity);

        // eslint-disable-next-line no-await-in-loop
        await ds.saveUser(userDTO);
      } catch (e) {
        console.log('EXCEPTION UserEntity perform: ', JSON.stringify(entity));
        console.log((e as MapperDTOException).message);
        console.log((e as MapperDTOException)._description);
      }
    }
  }

  public static async initializeWithDialogsMockData(
    ds: LocalDataSource,
  ): Promise<void> {
    console.log('local datasource sync status: ', ds.isLocalSynced());
    const dialogsDTOtoEntityMapper: IMapper = new DialogLocalDTOMapper();
    const dialogsEntities = Stubs.createDialogsForTest();

    // eslint-disable-next-line no-restricted-syntax
    for (const item of dialogsEntities) {
      const dialogDTO: LocalDialogDTO =
        // eslint-disable-next-line no-await-in-loop
        await dialogsDTOtoEntityMapper.fromEntity<
          DialogEntity,
          RemoteDialogDTO
        >(item);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars,promise/catch-or-return,promise/always-return
      ds.saveDialog(dialogDTO)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars,promise/always-return
        .then((_) => {
          console.log(`added mock item ${JSON.stringify(dialogDTO)}`);
        })
        .catch((e) => {
          console.log('EXCEPTION:', (e as RepositoryException).message);
        });
    }
  }

  public static async initializeWithMessagesMockData(ds: LocalDataSource) {
    console.log('call initializeWithMessagesMockData');
    const initFirstPageMessages: Array<MessageEntity> =
      new Array<MessageEntity>();
    // attachments
    // shot text message with attachment photo
    const photo: ChatMessageAttachmentEntity = {
      id: '10231',
      type: FileType.image,
      uid: '10231',
      url: 'https://via.placeholder.com/600/92c952',
      file: {
        id: '10231',
        uid: '',
        type: FileType.image,
        url: 'https://via.placeholder.com/600/92c952',
      },
    };
    const photoAttachments: ChatMessageAttachmentEntity[] = [photo];
    // shot text message with attachment video
    const video: ChatMessageAttachmentEntity = {
      id: '10232',
      type: FileType.video,
      uid: '10232',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
      file: {
        id: '10232',
        uid: '',
        type: FileType.video,
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
      },
    };
    const videoAttachments: ChatMessageAttachmentEntity[] = [video];
    const audio: ChatMessageAttachmentEntity = {
      id: '10233',
      type: FileType.audio,
      uid: '10233',
      url: 'https://cdn.freesound.org/previews/681/681715_1648170-lq.mp3',
      file: {
        id: '10233',
        uid: '',
        type: FileType.audio,
        url: 'https://cdn.freesound.org/previews/681/681715_1648170-lq.mp3',
      },
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const audioAttachments: ChatMessageAttachmentEntity[] = [audio];
    // shot text message with attachment text
    const text: ChatMessageAttachmentEntity = {
      id: '10233',
      type: FileType.text,
      uid: '10233',
      url: 'https://www.learningcontainer.com/wp-content/uploads/2020/04/sample-text-file.txt',
      file: {
        id: '10233',
        uid: '',
        type: FileType.text,
        url: 'https://www.learningcontainer.com/wp-content/uploads/2020/04/sample-text-file.txt',
      },
      name: 'textFile.txt',
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const textAttachments: ChatMessageAttachmentEntity[] = [text];
    const currentUser = 134885168; // should be 134885168 was 11

    // attachments
    for (let i = 0; i < 47; i += 1) {
      const newMessageEntity: MessageEntity =
        Stubs.createMessageEntityWithParams(
          i.toString(),
          '103',
          i % 9 === 0
            ? `${
                i + 1
              } very very very long test text message for dialog 103. The text message with huge text: bla-bla-bla long long long long, bla-bla-bla, very very very long test text message for dialog 103. very very very long test text message for dialog 103. etc`
            : `${i + 1} test message for dialog 103`,
          '31.03.2023',
          Date.now(),
          '31.03.2023',
          [currentUser, 12, 13],
          [currentUser, 12, 13],
          1,
          i % 2 === 0 ? currentUser : 12,
          i % 2 === 0 ? 12 : currentUser,
          // eslint-disable-next-line no-nested-ternary
          i === 4 ? photoAttachments : i === 5 ? videoAttachments : undefined,
          i % 7 === 0 ? '3' : undefined,
        );

      initFirstPageMessages.push(newMessageEntity);
    }
    //
    for (let i = 47; i < 100; i += 1) {
      const newMessageEntity: MessageEntity =
        Stubs.createMessageEntityWithParams(
          i.toString(),
          '103',
          `${i + 1} test message for dialog 103`,
          '31.03.2023',
          Date.now(),
          '31.03.2023',
          [currentUser, 12, 13],
          [currentUser, 12, 13],
          1,
          currentUser,
          12,
          textAttachments,
        );

      initFirstPageMessages.push(newMessageEntity);
    }
    //
    const messageEntityToDTOMapper: IMapper = new MessageLocalDTOMapper();

    // eslint-disable-next-line no-restricted-syntax
    for (const entity of initFirstPageMessages) {
      try {
        // eslint-disable-next-line no-await-in-loop
        const messageDTO = await messageEntityToDTOMapper.fromEntity<
          MessageEntity,
          LocalMessageDTO
        >(entity);

        // eslint-disable-next-line no-await-in-loop
        await ds.saveMessage(messageDTO);
      } catch (e) {
        console.log(
          'EXCEPTION MessageEntity perform: ',
          JSON.stringify(entity),
        );
        console.log((e as MapperDTOException).message);
        console.log((e as MapperDTOException)._description);
      }
    }
    //
  }

  public static initializeMessagesWithMockData() {
    const initFirstPageMessages: Array<MessageEntity> =
      new Array<MessageEntity>();
    // attachments
    // shot text message with attachment photo
    const photo: ChatMessageAttachmentEntity = {
      id: '10231',
      type: FileType.image,
      uid: '10231',
      url: 'https://via.placeholder.com/600/92c952',
      file: {
        id: '10231',
        uid: '',
        type: FileType.image,
        url: 'https://via.placeholder.com/600/92c952',
      },
    };
    const photoAttachments: ChatMessageAttachmentEntity[] = [photo];
    // shot text message with attachment video
    const video: ChatMessageAttachmentEntity = {
      id: '10232',
      type: FileType.video,
      uid: '10232',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
      file: {
        id: '10232',
        uid: '',
        type: FileType.video,
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
      },
    };
    const videoAttachments: ChatMessageAttachmentEntity[] = [video];
    const audio: ChatMessageAttachmentEntity = {
      id: '10233',
      type: FileType.audio,
      uid: '10233',
      url: 'https://cdn.freesound.org/previews/681/681715_1648170-lq.mp3',
      file: {
        id: '10233',
        uid: '',
        type: FileType.audio,
        url: 'https://cdn.freesound.org/previews/681/681715_1648170-lq.mp3',
      },
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const audioAttachments: ChatMessageAttachmentEntity[] = [audio];
    // shot text message with attachment text
    const text: ChatMessageAttachmentEntity = {
      id: '10233',
      type: FileType.text,
      uid: '10233',
      url: 'https://www.learningcontainer.com/wp-content/uploads/2020/04/sample-text-file.txt',
      file: {
        id: '10233',
        uid: '',
        type: FileType.text,
        url: 'https://www.learningcontainer.com/wp-content/uploads/2020/04/sample-text-file.txt',
      },
      name: 'textFile.txt',
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const textAttachments: ChatMessageAttachmentEntity[] = [text];
    const currentUser = 134885168; // should be 134885168 was 11

    const createAttachment = (i: number): ChatMessageAttachmentEntity[] => {
      switch (i) {
        case 1:
          return photoAttachments;
        case 2:
          return videoAttachments;
        case 3:
          return audioAttachments;
        case 4:
          return textAttachments;
        default:
          return [];
      }
    };

    // attachments
    for (let i = 1; i <= 4; i += 1) {
      const newMessageEntity: MessageEntity =
        Stubs.createMessageEntityWithParams(
          i.toString(),
          '103',
          i % 3 === 0
            ? `${
                i + 1
              } very very very long test text message for dialog 103. The text message with huge text: bla-bla-bla long long long long, bla-bla-bla, very very very long test text message for dialog 103. very very very long test text message for dialog 103. etc`
            : `${i + 1} test message for dialog 103`,
          '31.03.2023',
          Date.now(),
          '31.03.2023',
          [currentUser, 12, 13],
          [currentUser, 12, 13],
          1,
          i % 2 === 0 ? currentUser : 12,
          i % 2 === 0 ? 12 : currentUser,
          // eslint-disable-next-line no-nested-ternary
          createAttachment(i),
          i % 7 === 0 ? '3' : undefined,
        );

      initFirstPageMessages.push(newMessageEntity);
    }

    return initFirstPageMessages;
  }

  static createDialogEntityByTypeWithEmptyValues(
    dialogType: DialogType,
  ): DialogEntity {
    let dialogEntity: DialogEntity;

    switch (dialogType) {
      case DialogType.private:
        dialogEntity = new PrivateDialogEntity(
          { todo: '' },
          '',
          '_',
          {
            dateSent: '',
            text: '',
            userId: 0,
          },
          '',
          DialogType.private,
          0,
          '',
          0,
        );
        break;
      case DialogType.public:
        dialogEntity = new PublicDialogEntity(
          { todo: '' },
          '',
          {
            dateSent: '',
            text: '',
            userId: 0,
          },
          '',
          DialogType.public,
          0,
          '',
          '',
          '',
        );
        break;
      case DialogType.group:
        dialogEntity = new GroupDialogEntity(
          { todo: '' },
          '',
          {
            dateSent: '',
            text: '',
            userId: 0,
          },
          '',
          DialogType.group,
          0,
          '',
          [],
          '',
          '',
        );
        break;
      default:
        dialogEntity = {
          customData: { todo: '' },
          id: '',
          name: '_',
          lastMessage: { dateSent: '', text: '', userId: 0 },
          ownerId: '',
          type: -1,
          unreadMessageCount: 0,
          updatedAt: '',
        };
        break;
    }

    return dialogEntity;
  }

  static createDialogEntityWithError() {
    const entity: DialogEntity =
      Stubs.createDialogEntityByTypeWithEmptyValues(-1);

    return entity;
  }

  static createDialogEntityByTypeWithDefaultValues(
    dialogType: DialogType,
  ): DialogEntity {
    let dialogEntity: DialogEntity;

    switch (dialogType) {
      case DialogType.private:
        dialogEntity = new PrivateDialogEntity(
          { todo: '' },
          '111',
          '_111',
          {
            dateSent: '01.02.2023',
            text: 'text test',
            userId: 777,
          },
          '999',
          DialogType.private,
          555,
          '02.02.2023',
          333,
        );
        break;
      case DialogType.public:
        dialogEntity = new PublicDialogEntity(
          { todo: '' },
          '111',
          {
            dateSent: '01.02.2023',
            text: 'text test',
            userId: 777,
          },
          '999',
          DialogType.public,
          555,
          '02.02.2023',
          'test public dialog',
          'no photo public dialog',
        );
        break;
      case DialogType.group:
        dialogEntity = new GroupDialogEntity(
          { todo: '' },
          '111',
          {
            dateSent: '01.02.2023',
            text: 'text test',
            userId: 777,
          },
          '999',
          DialogType.group,
          555,
          '02.02.2023',
          [],
          'test group dialog',
          'no photo group dialog',
        );
        break;
      default:
        dialogEntity = {
          customData: { todo: '' },
          id: '111',
          name: '_111',
          lastMessage: {
            dateSent: '01.02.2023',
            text: 'text test',
            userId: 777,
          },
          ownerId: '999',
          type: -1,
          unreadMessageCount: 555,
          updatedAt: '03.02.2023',
        };
        break;
    }

    return dialogEntity;
  }

  static createDialogDTOByTypeWithDefaultValues(dialogType: DialogType) {
    const dto: RemoteDialogDTO = new RemoteDialogDTO();

    switch (dialogType) {
      case DialogType.private:
        dto.id = '111';
        dto.lastMessageDateSent = '01.02.2023';
        dto.lastMessageText = 'text test';
        dto.lastMessageUserId = '777';
        dto.ownerId = '999';
        dto.type = dialogType;
        dto.unreadMessageCount = 555;
        dto.updatedAt = '02.02.2023';
        dto.participantId = '333';
        break;
      case DialogType.public:
        dto.id = '111';
        dto.lastMessageDateSent = '01.02.2023';
        dto.lastMessageText = 'text test';
        dto.lastMessageUserId = '777';
        dto.ownerId = '999';
        dto.type = dialogType;
        dto.unreadMessageCount = 555;
        dto.updatedAt = '02.02.2023';
        dto.name = 'test public dialog';
        dto.photo = 'no photo public dialog';
        break;
      case DialogType.group:
        dto.id = '111';
        dto.lastMessageDateSent = '01.02.2023';
        dto.lastMessageText = 'text test';
        dto.lastMessageUserId = '777';
        dto.ownerId = '999';
        dto.type = dialogType;
        dto.unreadMessageCount = 555;
        dto.updatedAt = '02.02.2023';
        dto.participantsIds = [];
        dto.name = 'test group dialog';
        dto.photo = 'no photo group dialog';
        break;
      default:
    }

    return dto;
  }

  static createArrayDialogDTOByTypeWithDefaultValues(
    count: number,
    dialogType: DialogType,
  ) {
    const arrayDialogs: RemoteDialogDTO[] = [];

    for (let i = 0; i < count; i += 1) {
      const dialog = Stubs.createDialogDTOByTypeWithDefaultValues(dialogType);

      dialog.id = (1000 + i).toString();
      arrayDialogs.push();
    }

    return arrayDialogs;
  }

  static createArrayPublicDialogDTO() {
    console.log('call createArrayPublicDialogDTO');
    const dialogs: RemoteDialogDTO[] = [
      {
        id: '1',
        name: 'Cash Chat 1',
        ownerId: '1',
        photo: '',
        type: DialogType.public,
        participantId: '',
        participantsIds: [],
        lastMessageText: '',
        lastMessageDateSent: '',
        lastMessageUserId: '',
        lastMessageId: '',
        unreadMessageCount: 0,
        updatedAt: '',
      },
      {
        id: '2',
        name: 'Cash Chat 2',
        ownerId: '2',
        photo: '',
        type: DialogType.public,
        participantId: '',
        participantsIds: [],
        lastMessageText: '',
        lastMessageDateSent: '',
        lastMessageUserId: '',
        lastMessageId: '',
        unreadMessageCount: 0,
        updatedAt: '',
      },
      {
        id: '3',
        name: 'Chat 3 from Cash',
        ownerId: '3',
        photo: '',
        type: DialogType.public,
        participantId: '',
        participantsIds: [],
        lastMessageText: '',
        lastMessageDateSent: '',
        lastMessageUserId: '',
        lastMessageId: '',
        unreadMessageCount: 0,
        updatedAt: '',
      },
      {
        id: '4',
        name: 'Chat 4 from Cash',
        ownerId: '4',
        photo: '',
        type: DialogType.public,
        participantId: '',
        participantsIds: [],
        lastMessageText: '',
        lastMessageDateSent: '',
        lastMessageUserId: '',
        lastMessageId: '',
        unreadMessageCount: 0,
        updatedAt: '',
      },
      {
        id: '5',
        name: 'Chat 5 from Cash',
        ownerId: '5',
        photo: '',
        type: DialogType.public,
        participantId: '',
        participantsIds: [],
        lastMessageText: '',
        lastMessageDateSent: '',
        lastMessageUserId: '',
        lastMessageId: '',
        unreadMessageCount: 0,
        updatedAt: '',
      },
      {
        id: '6',
        name: 'Chat 6 from Cash',
        ownerId: '6',
        photo: '',
        type: DialogType.public,
        participantId: '',
        participantsIds: [],
        lastMessageText: '',
        lastMessageDateSent: '',
        lastMessageUserId: '',
        lastMessageId: '',
        unreadMessageCount: 0,
        updatedAt: '',
      },
      {
        id: '7',
        name: 'Chat 7 Lucky Room',
        ownerId: '7',
        photo: '',
        type: DialogType.public,
        participantId: '',
        participantsIds: [],
        lastMessageText: '',
        lastMessageDateSent: '',
        lastMessageUserId: '',
        lastMessageId: '',
        unreadMessageCount: 0,
        updatedAt: '',
      },
    ];

    return dialogs;
  }

  static createPublicDialogQBWithEmptyValues() {
    const qbDialog: QBChatDialog = {
      _id: '111',
      created_at: '01.03.2023',
      last_message: 'test message',
      last_message_date_sent: '02.03.2023',
      last_message_id: '100',
      last_message_user_id: 112,
      name: '',
      occupants_ids: [],
      new_occupants_ids: [],
      photo: null,
      type: DialogType.public,
      unread_messages_count: 0,
      updated_at: '02.03.2023',
      user_id: 0,
      xmpp_room_jid: null,
    };

    return qbDialog;
  }

  static createPrivateDialogQBWithEmptyValues() {
    const qbDialog: QBChatDialog = {
      _id: '111',
      created_at: '01.03.2023',
      last_message: 'test message',
      last_message_date_sent: '02.03.2023',
      last_message_id: '100',
      last_message_user_id: 112,
      name: '',
      occupants_ids: [],
      new_occupants_ids: [],
      photo: null,
      type: DialogType.private,
      unread_messages_count: 0,
      updated_at: '02.03.2023',
      user_id: 0,
      xmpp_room_jid: null,
    };

    return qbDialog;
  }

  static createGroupDialogQBWithEmptyValues() {
    const qbDialog: QBChatDialog = {
      _id: '111',
      created_at: '01.03.2023',
      last_message: 'test message',
      last_message_date_sent: '02.03.2023',
      last_message_id: '100',
      last_message_user_id: 112,
      name: '',
      occupants_ids: [],
      new_occupants_ids: [],
      photo: null,
      type: DialogType.group,
      unread_messages_count: 0,
      updated_at: '02.03.2023',
      user_id: 0,
      xmpp_room_jid: null,
    };

    return qbDialog;
  }

  static createDialogEntityWithParams(
    dialogType: DialogType,
    id: string,
    name: string,
    dateSentLastMessage: string,
    textLastMessage: string,
    userIdLastMessage: number,
    ownerId: string,
    unreadMessageCount: number,
    updatedAt: string,
    participantId: number,
    photo = '',
    participantIds: number[] = [],
  ): DialogEntity {
    let dialogEntity: DialogEntity;

    switch (dialogType) {
      case DialogType.private:
        dialogEntity = new PrivateDialogEntity(
          { todo: '' },
          id,
          name,
          {
            dateSent: dateSentLastMessage,
            text: textLastMessage,
            userId: userIdLastMessage,
          },
          ownerId,
          DialogType.private,
          unreadMessageCount,
          updatedAt,
          participantId,
        );
        break;
      case DialogType.public:
        dialogEntity = new PublicDialogEntity(
          { todo: '' },
          id,
          {
            dateSent: dateSentLastMessage,
            text: textLastMessage,
            userId: userIdLastMessage,
          },
          ownerId,
          DialogType.public,
          unreadMessageCount,
          updatedAt,
          name,
          photo,
        );
        break;
      case DialogType.group:
        dialogEntity = new GroupDialogEntity(
          { todo: '' },
          id,
          {
            dateSent: dateSentLastMessage,
            text: textLastMessage,
            userId: userIdLastMessage,
          },
          ownerId,
          DialogType.group,
          unreadMessageCount,
          updatedAt,
          participantIds,
          name,
          photo,
        );
        break;
      default:
        dialogEntity = {
          customData: { todo: '' },
          id: '012345',
          name: 'error dialog',
          lastMessage: {
            dateSent: '31.03.2023',
            text: 'text test',
            userId: 12345,
          },
          ownerId: '12345',
          type: -1,
          unreadMessageCount: 0,
          updatedAt: '31.03.2023',
        };
        break;
    }

    return dialogEntity;
  }

  static createUserEntityWithParams(
    id: number,
    full_name: string,
    email: string,
    login: string,
    created_at: string,
    updated_at: string,
    last_request_at: string,
    custom_data: string | null = null,
    user_tags: string | null = null,
    blob_id = '',
    photo = '',
  ): UserEntity {
    const userEntity: UserEntity = {
      id,
      full_name,
      email,
      login,
      // phone: string;
      // website: string;
      created_at,
      updated_at,
      last_request_at,
      // external_user_id: null;
      // facebook_id: string | null;
      blob_id,
      photo,
      custom_data,
      // age_over16: boolean;
      // allow_statistics_analysis: boolean;
      // allow_sales_activities: boolean;
      // parents_contacts: string;
      user_tags,
      // password?: string;
      // old_password?: string;
    };

    return userEntity;
  }

  static createDialogsForTest(): Array<DialogEntity> {
    const dialogs: Array<DialogEntity> = new Array<DialogEntity>();

    const privateDialog: DialogEntity = Stubs.createDialogEntityWithParams(
      DialogType.private,
      '101',
      'Stub1 Private Dialog',
      '31.03.2023',
      'Test text message for private dialog',
      11,
      '11',
      1,
      '31.03.20223',
      12,
    );

    dialogs.push(privateDialog);

    const publicDialog: DialogEntity = Stubs.createDialogEntityWithParams(
      DialogType.public,
      '102',
      'Stub2 Public Dialog',
      '31.03.2023',
      'Test text message for public dialog',
      12,
      '12',
      1,
      '31.03.20223',
      12,
      'no photo',
      [11, 12, 13],
    );

    dialogs.push(publicDialog);

    const groupDialog: DialogEntity = Stubs.createDialogEntityWithParams(
      DialogType.group,
      '103',
      'Stub 3 Group Dialog',
      '31.03.2023',
      'Test text message for group dialog',
      13,
      '13',
      1,
      '31.03.20223',
      13,
      'no photo',
      [11, 12, 13],
    );

    dialogs.push(groupDialog);

    return dialogs;
  }

  static createUsersForTest(): Array<UserEntity> {
    const users: Array<UserEntity> = new Array<UserEntity>();

    const user11: UserEntity = Stubs.createUserEntityWithParams(
      11,
      'fl_user11',
      'fl_user11@q.ua',
      'login_user11',
      '31.03.2023',
      '31.03.2023',
      '31.03.2023',
    );

    const user12: UserEntity = Stubs.createUserEntityWithParams(
      12,
      'fl_user12',
      'fl_user12@q.ua',
      'login_user12',
      '31.03.2023',
      '31.03.2023',
      '31.03.2023',
    );

    const user13: UserEntity = Stubs.createUserEntityWithParams(
      13,
      'fl_user13',
      'fl_user13@q.ua',
      'login_user13',
      '31.03.2023',
      '31.03.2023',
      '31.03.2023',
    );

    users.push(user11);
    users.push(user12);
    users.push(user13);

    return users;
  }

  static createMessagesForTest(): Array<MessageEntity> {
    const messages: Array<MessageEntity> = new Array<MessageEntity>();
    // shot text message
    const message102_1 = Stubs.createMessageEntityWithParams(
      '1021',
      '102',
      '1 test message for dialog 102',
      '31.03.2023',
      Date.now(),
      '31.03.2023',
      [11, 12, 13],
      [11, 12, 13],
      1,
      11,
      12,
    );
    // long text message
    const message102_2 = Stubs.createMessageEntityWithParams(
      '1022',
      '102',
      '2 test message for dialog 102',
      '31.03.2023',
      Date.now(),
      '31.03.2023',
      [11, 12, 13],
      [11, 12, 13],
      1,
      11,
      12,
    );
    // shot text message with attachment photo
    const photo: ChatMessageAttachmentEntity = {
      id: '10231',
      type: FileType.image,
      uid: '10231',
      url: 'https://via.placeholder.com/600/92c952',
      file: {
        id: '10231',
        uid: '',
        type: FileType.image,
        url: 'https://via.placeholder.com/600/92c952',
      },
    };
    const photoAttachments: ChatMessageAttachmentEntity[] = [photo];
    const message102_3 = Stubs.createMessageEntityWithParams(
      '1023',
      '102',
      '3 test message for dialog 102',
      '31.03.2023',
      Date.now(),
      '31.03.2023',
      [11, 12, 13],
      [11, 12, 13],
      1,
      11,
      12,
      photoAttachments,
    );
    // shot text message with attachment video
    const video: ChatMessageAttachmentEntity = {
      id: '10232',
      type: FileType.video,
      uid: '10232',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
      file: {
        id: '10232',
        uid: '',
        type: FileType.video,
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
      },
    };
    const videoAttachments: ChatMessageAttachmentEntity[] = [video];
    const message102_4 = Stubs.createMessageEntityWithParams(
      '1024',
      '102',
      '3 test message for dialog 102',
      '31.03.2023',
      Date.now(),
      '31.03.2023',
      [11, 12, 13],
      [11, 12, 13],
      1,
      11,
      12,
      videoAttachments,
    );
    // shot text message with attachment audio
    const audio: ChatMessageAttachmentEntity = {
      id: '10233',
      type: FileType.audio,
      uid: '10233',
      url: 'https://cdn.freesound.org/previews/681/681715_1648170-lq.mp3',
      file: {
        id: '10233',
        uid: '',
        type: FileType.audio,
        url: 'https://cdn.freesound.org/previews/681/681715_1648170-lq.mp3',
      },
    };
    const audioAttachments: ChatMessageAttachmentEntity[] = [audio];
    const message102_5 = Stubs.createMessageEntityWithParams(
      '1025',
      '102',
      '3 test message for dialog 102',
      '31.03.2023',
      Date.now(),
      '31.03.2023',
      [11, 12, 13],
      [11, 12, 13],
      1,
      11,
      12,
      audioAttachments,
    );
    // shot text message with attachment text
    const text: ChatMessageAttachmentEntity = {
      id: '10233',
      type: FileType.text,
      uid: '10233',
      url: 'https://www.learningcontainer.com/wp-content/uploads/2020/04/sample-text-file.txt',
      file: {
        id: '10233',
        uid: '',
        type: FileType.text,
        url: 'https://www.learningcontainer.com/wp-content/uploads/2020/04/sample-text-file.txt',
      },
    };
    const textAttachments: ChatMessageAttachmentEntity[] = [text];
    const message102_6 = Stubs.createMessageEntityWithParams(
      '1026',
      '102',
      '3 test message for dialog 102',
      '31.03.2023',
      Date.now(),
      '31.03.2023',
      [11, 12, 13],
      [11, 12, 13],
      1,
      11,
      12,
      textAttachments,
    );

    messages.push(message102_1);
    messages.push(message102_2);
    messages.push(message102_3); // image
    messages.push(message102_4); // video
    messages.push(message102_5); // audio
    messages.push(message102_6); // text

    const message112_1 = Stubs.createMessageEntityWithParams(
      '1121',
      '112',
      '1 test message for dialog 112',
      '31.03.2023',
      Date.now(),
      '31.03.2023',
      [11, 12, 13],
      [11, 12, 13],
      1,
      11,
      12,
    );

    const message112_2 = Stubs.createMessageEntityWithParams(
      '1122',
      '112',
      '2 test message for dialog 112',
      '31.03.2023',
      Date.now(),
      '31.03.2023',
      [11, 12, 13],
      [11, 12, 13],
      1,
      11,
      12,
    );

    const message112_3 = Stubs.createMessageEntityWithParams(
      '1123',
      '112',
      '3 test message for dialog 112',
      '31.03.2023',
      Date.now(),
      '31.03.2023',
      [11, 12, 13],
      [11, 12, 13],
      1,
      11,
      12,
    );

    messages.push(message112_1);
    messages.push(message112_2);
    messages.push(message112_3);

    const message113_1 = Stubs.createMessageEntityWithParams(
      '1131',
      '113',
      '1 test message for dialog 113',
      '31.03.2023',
      Date.now(),
      '31.03.2023',
      [11, 12, 13],
      [11, 12, 13],
      1,
      11,
      12,
    );

    const message113_2 = Stubs.createMessageEntityWithParams(
      '1132',
      '113',
      '2 test message for dialog 113',
      '31.03.2023',
      Date.now(),
      '31.03.2023',
      [11, 12, 13],
      [11, 12, 13],
      1,
      11,
      12,
    );

    const message113_3 = Stubs.createMessageEntityWithParams(
      '1133',
      '113',
      '3 test message for dialog 113',
      '31.03.2023',
      Date.now(),
      '31.03.2023',
      [11, 12, 13],
      [11, 12, 13],
      1,
      11,
      12,
    );

    messages.push(message113_1);
    messages.push(message113_2);
    messages.push(message113_3);

    return messages;
  }
}
