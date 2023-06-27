import { useState } from 'react';
import { DialogType } from '../../../../../Domain/entity/DialogTypes';
import useQbDataContext from '../../../providers/QuickBloxUIKitProvider/useQbDataContext';
import { DialogEntity } from '../../../../../Domain/entity/DialogEntity';
import { MessagesViewModel } from './MessagesViewModel';
import { MessageEntity } from '../../../../../Domain/entity/MessageEntity';
import { GroupDialogEntity } from '../../../../../Domain/entity/GroupDialogEntity';
import { PrivateDialogEntity } from '../../../../../Domain/entity/PrivateDialogEntity';
import { GetUsersByIdsUseCase } from '../../../../../Domain/use_cases/GetUsersByIdsUseCase';
import UsersRepository from '../../../../../Data/repository/UsersRepository';
import { UserEntity } from '../../../../../Domain/entity/UserEntity';
import { GetAllMessagesForDialogMock } from '../../../../../Domain/use_cases/GetAllMessagesForDialog';
import MessagesRepository from '../../../../../Data/repository/MessagesRepository';
import { Pagination } from '../../../../../Domain/repository/Pagination';
import { FileEntity } from '../../../../../Domain/entity/FileEntity';
import { Stubs } from '../../../../../Data/Stubs';
import { UploadFileUseCase } from '../../../../../Domain/use_cases/UploadFileUseCase';
import { FileRepository } from '../../../../../Data/repository/FileRepository';
import { stringifyError } from '../../../../../utils/parse';
import { SendTextMessageUseCase } from '../../../../../Domain/use_cases/SendTextMessageUseCase';
import { SubscribeToDialogEventsUseCase } from '../../../../../Domain/use_cases/SubscribeToDialogEventsUseCase';
import useEventMessagesRepository from '../../../providers/QuickBloxUIKitProvider/useEventMessagesRepository';
import EventMessageType from '../../../../../Domain/entity/EventMessageType';
import { NotificationTypes } from '../../../../../Domain/entity/NotificationTypes';
import { GetDialogByIdUseCase } from '../../../../../Domain/use_cases/GetDialogByIdUseCase';
import DialogsRepository from '../../../../../Data/repository/DialogsRepository';
import ChatMessageAttachmentEntity from '../../../../../Domain/entity/ChatMessageAttachmentEntity';
import { UserTypingMessageUseCase } from '../../../../../Domain/use_cases/UserTypingMessageUseCase';
import { DialogEventInfo } from '../../../../../Domain/entity/DialogEventInfo';

export default function useMessagesViewModel(
  dialogType: DialogType,
  dialogEntity: DialogEntity,
): MessagesViewModel {
  console.log('useMessagesViewModel');
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState('error: wrong message list');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [messages, setMessages] = useState<MessageEntity[]>([]);
  // const [users, setUsers] = useState<Record<number, UserEntity>>();
  const [dialog, setDialog] = useState<DialogEntity>(dialogEntity);
  // const [dialogsParticipants, setDialogsParticipants] = useState<number[]>([]);

  const currentContext = useQbDataContext();
  const eventMessaging = useEventMessagesRepository();

  const subscribeToDialogEventsUseCase: SubscribeToDialogEventsUseCase =
    new SubscribeToDialogEventsUseCase(eventMessaging, 'MessagesViewModel');

  const [typingText, setTypingText] = useState<string>('');

  async function getMessages() {
    console.log(
      'call getMessages in MessagesViewModelWithMockUseCase for dialog: ',
      JSON.stringify(dialog),
    );
    setLoading(true);
    //
    //
    let participants: Array<number> = [];
    let userDictionary: Record<number, UserEntity> = {};

    if (dialog.type === DialogType.group) {
      participants = (dialog as GroupDialogEntity).participantIds;
    } else if (dialog.type === DialogType.private) {
      participants = [(dialog as PrivateDialogEntity).participantId];
    } else if (dialog.type === DialogType.public) {
      participants = [];
    }
    const getAllUsersFromDialogByIdsUseCase: GetUsersByIdsUseCase =
      new GetUsersByIdsUseCase(
        new UsersRepository(
          currentContext.storage.LOCAL_DATA_SOURCE,
          currentContext.storage.REMOTE_DATA_SOURCE,
        ),
        participants,
      );

    //
    await getAllUsersFromDialogByIdsUseCase
      .execute()
      // eslint-disable-next-line promise/always-return
      .then((data) => {
        console.log(
          `use Message have dialog: ${JSON.stringify(
            dialogEntity,
          )} getUsers:${JSON.stringify(data)}`,
        );
        console.log('have users ids :', JSON.stringify(participants));
        userDictionary = data.reduce((acc, item) => {
          const obj = acc;

          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          acc[item.id] = item;

          return obj;
        }, {});

        console.log(
          'have dictionary of users:',
          JSON.stringify(userDictionary),
        );
        setLoading(false);
        setError('');
      })
      .catch((e) => {
        console.log('have ERROR get users :', JSON.stringify(e));
        setLoading(false);
        setError((e as unknown as Error).message);
      });

    //
    //
    const getDialogMessages: GetAllMessagesForDialogMock =
      new GetAllMessagesForDialogMock(
        new MessagesRepository(
          currentContext.storage.LOCAL_DATA_SOURCE,
          currentContext.storage.REMOTE_DATA_SOURCE,
        ),
        dialog.id,
        new Pagination(),
      );

    //
    await getDialogMessages
      .execute()
      // eslint-disable-next-line promise/always-return
      .then((data) => {
        console.log(
          `DIALOG: ${JSON.stringify(dialogEntity)} WITH ${
            data.length
          } messages:${JSON.stringify(data)}`,
        );

        const ResultMessages = data.map((message) => {
          const obj = { ...message };

          console.log('have sender id:', message.sender_id);

          if (userDictionary) {
            obj.sender = userDictionary[message.sender_id];
          }

          return obj;
        });

        console.log(`result messages:${JSON.stringify(ResultMessages)}`);
        setMessages(ResultMessages);
        setLoading(false);
        setError('');
      })
      .catch((e) => {
        console.log('have ERROR get users :', JSON.stringify(e));
        setLoading(false);
        setError((e as unknown as Error).message);
      });
    //

    console.log('EXECUTE USE CASE MessagesViewModelWithMockUseCase EXECUTED');
  }

  const dialogUpdateHandler = (dialogInfo: DialogEventInfo) => {
    console.log('call dialogUpdateHandler in useMessagesViewModel');
    const getSender = async (sender_id: number) => {
      const getUser: GetUsersByIdsUseCase = new GetUsersByIdsUseCase(
        new UsersRepository(
          currentContext.storage.LOCAL_DATA_SOURCE,
          currentContext.storage.REMOTE_DATA_SOURCE,
        ),
        [sender_id],
      );

      let userEntity: UserEntity | undefined;

      await getUser
        .execute()
        // eslint-disable-next-line promise/always-return
        .then((data) => {
          // eslint-disable-next-line prefer-destructuring
          userEntity = data[0];
        })
        .catch((e) => {
          console.log('have ERROR get users :', JSON.stringify(e));
        });

      return userEntity;
    };

    if (dialogInfo.eventMessageType === EventMessageType.LocalMessage) {
      if (dialogInfo.messageStatus) {
        if (dialogInfo.messageStatus.isTyping) {
          // eslint-disable-next-line promise/catch-or-return
          getSender(dialogInfo.messageStatus.userId).then((senderUser) => {
            const typingMessage = `User ${
              // eslint-disable-next-line promise/always-return
              senderUser?.full_name ||
              senderUser?.login ||
              senderUser?.email ||
              senderUser?.id ||
              ''
            } is typing message`;

            setTypingText(typingMessage);
          });
        } else {
          setTypingText('');
        }
      }
    }
    if (dialogInfo.eventMessageType === EventMessageType.RegularMessage) {
      if (
        dialogInfo.messageInfo &&
        dialogInfo.messageInfo.message &&
        dialogInfo.messageInfo.id &&
        dialogInfo.messageInfo.dialogId === dialog.id
      ) {
        const messageId = dialogInfo.messageInfo.id;
        const messageText = dialogInfo.messageInfo.message;

        console.log(
          `new message id = ${messageId}, new message text: ${messageText}, found messages:`,
        );
        const ResultMessage: MessageEntity = { ...dialogInfo.messageInfo };

        // eslint-disable-next-line promise/catch-or-return,promise/always-return
        getSender(dialogInfo.messageInfo.sender_id)
          // eslint-disable-next-line promise/always-return
          .then((user) => {
            ResultMessage.sender = user;
            ResultMessage.sender_id = dialogInfo.messageInfo!.sender_id;
          })
          .finally(() => {
            setMessages((prevState) => {
              const newState = [...prevState];

              newState.push(ResultMessage);

              return newState;
            });
          });
      }
      // else {
      //   // загрузить все сообщения заново
      //   getMessages().catch();
      // }
    }
    if (dialogInfo.eventMessageType === EventMessageType.SystemMessage) {
      if (dialogInfo.notificationTypes === NotificationTypes.UPDATE_DIALOG) {
        if (dialogInfo.messageInfo) {
          const { dialogId } = dialogInfo.messageInfo;

          const getDialogByIdUseCase: GetDialogByIdUseCase =
            new GetDialogByIdUseCase(
              new DialogsRepository(
                currentContext.storage.LOCAL_DATA_SOURCE,
                currentContext.storage.REMOTE_DATA_SOURCE,
              ),
              dialogId,
            );

          // eslint-disable-next-line promise/catch-or-return,promise/always-return
          getDialogByIdUseCase.execute().then((updatedDialog) => {
            setDialog(updatedDialog);
          });
        }
      }
    }
  };

  subscribeToDialogEventsUseCase
    .execute(dialogUpdateHandler)
    .catch((reason) => {
      console.log(stringifyError(reason));
    });

  //
  // eslint-disable-next-line @typescript-eslint/require-await

  const release = () => {
    console.log('call release in MessagesViewModelWithMockUseCase');
  };

  const userTypingMessageUseCase: UserTypingMessageUseCase =
    new UserTypingMessageUseCase(
      new MessagesRepository(
        currentContext.storage.LOCAL_DATA_SOURCE,
        currentContext.storage.REMOTE_DATA_SOURCE,
      ),
      dialog || dialogEntity,
      currentContext.storage.REMOTE_DATA_SOURCE.authInformation?.userId || 0,
    );

  const sendTypingTextMessage = () => {
    console.log('call release in MessagesViewModelWithMockUseCase');
    userTypingMessageUseCase.execute().catch((reason) => {
      const errorMessage = stringifyError(reason);

      console.log('have exception in sendTypingTextMessage: ', errorMessage);

      throw new Error(errorMessage);
    });
  };

  const uploadFile = async (file: File): Promise<FileEntity> => {
    console.log('call uploadFile(), file: ', file);
    const fileEntity: FileEntity = Stubs.createFileEntityWithDefaultValues();

    fileEntity.data = file;
    fileEntity.uid = '';
    fileEntity.name = file.name;
    fileEntity.size = file.size;
    fileEntity.type = file.type;
    const uploadFileUseCase: UploadFileUseCase = new UploadFileUseCase(
      new FileRepository(
        currentContext.storage.LOCAL_DATA_SOURCE,
        currentContext.storage.REMOTE_DATA_SOURCE,
      ),
      fileEntity,
    );

    const resultEnity: FileEntity = await uploadFileUseCase
      .execute()
      .catch((e) => {
        console.log('Error UploadFileUseCase: ', stringifyError(e));
        throw new Error(stringifyError(e));
      });

    return Promise.resolve(resultEnity);
  };

  function sendMessage(messageToSend: MessageEntity) {
    const sendTextMessageUseCase: SendTextMessageUseCase =
      new SendTextMessageUseCase(
        new MessagesRepository(
          currentContext.storage.LOCAL_DATA_SOURCE,
          currentContext.storage.REMOTE_DATA_SOURCE,
        ),
        messageToSend,
      );

    // eslint-disable-next-line promise/catch-or-return
    sendTextMessageUseCase
      .execute()
      .catch((reason) => {
        const errorMessage = stringifyError(reason);

        console.log(
          'exception in sendMessage in useMessagesViewModel',
          errorMessage,
        );
        setLoading(false);
        throw new Error(errorMessage);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const sendTextMessage = (newMessage: string) => {
    setLoading(true);
    const currentUserId =
      currentContext.storage.REMOTE_DATA_SOURCE.authInformation?.userId || 0;
    const messageToSend: MessageEntity = Stubs.createMessageEntityWithParams(
      0,
      dialog.id,
      newMessage,
      Date.now().toString(),
      Date.now(),
      Date.now().toString(),
      [],
      [],
      1,
      currentUserId, // artan 22.06.23
      dialog.type === DialogType.private
        ? (dialog as PrivateDialogEntity).participantId
        : currentUserId,
      [],
      '',
      DialogType.group,
    );

    messageToSend.dialogType = dialog.type;

    sendMessage(messageToSend);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const sendAttachmentMessage = (newMessage: File) => {
    console.log('call sendTextMessage');
    setLoading(true);
    const currentUserId =
      currentContext.storage.REMOTE_DATA_SOURCE.authInformation?.userId || 0;

    uploadFile(newMessage)
      // eslint-disable-next-line promise/always-return
      .then((fileMessage: FileEntity) => {
        console.log(JSON.stringify(fileMessage));
        // '[attachment]'
        const messageToSend: MessageEntity =
          Stubs.createMessageEntityWithParams(
            0,
            dialog.id,
            // eslint-disable-next-line promise/always-return
            fileMessage.name || '[attachment]',
            Date.now().toString(),
            Date.now(),
            Date.now().toString(),
            [],
            [],
            1,
            currentUserId,
            currentUserId,
            [],
            '',
            DialogType.group,
          );

        messageToSend.dialogType = dialog.type;
        const attachments: ChatMessageAttachmentEntity[] = [
          {
            id: fileMessage.uid,
            type: fileMessage.type!,
            file: fileMessage,
            name: fileMessage.name,
            size: fileMessage.size,
          },
        ];

        messageToSend.attachments = attachments;

        sendMessage(messageToSend);
        //
      })
      .catch((reason) => {
        const errorMessage = stringifyError(reason);

        console.log('EXCEPTION in sendAttachmentMessage');
        throw new Error(errorMessage);
      });
  };

  return {
    get entity(): DialogEntity {
      return dialog;
    },
    set entity(newDialog) {
      setDialog(newDialog);
    },
    messages,
    loading,
    error,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    getMessages,
    release,
    sendTextMessage,
    sendAttachmentMessage,
    sendTypingTextMessage,
    typingText,
  };
}
