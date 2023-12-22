import { useState } from 'react';
import { DialogType } from '../../../Domain/entity/DialogTypes';
import useQbInitializedDataContext from '../../providers/QuickBloxUIKitProvider/useQbInitializedDataContext';
import { DialogEntity } from '../../../Domain/entity/DialogEntity';
import { DialogViewModel } from './DialogViewModel';
import { MessageEntity } from '../../../Domain/entity/MessageEntity';
import { GroupDialogEntity } from '../../../Domain/entity/GroupDialogEntity';
import { PrivateDialogEntity } from '../../../Domain/entity/PrivateDialogEntity';
import { GetUsersByIdsUseCase } from '../../../Domain/use_cases/GetUsersByIdsUseCase';
import UsersRepository from '../../../Data/repository/UsersRepository';
import { UserEntity } from '../../../Domain/entity/UserEntity';
import { GetAllMessagesForDialogMock } from '../../../Domain/use_cases/GetAllMessagesForDialog';
import MessagesRepository from '../../../Data/repository/MessagesRepository';
import { Pagination } from '../../../Domain/repository/Pagination';
import { FileEntity } from '../../../Domain/entity/FileEntity';
import { UploadFileUseCase } from '../../../Domain/use_cases/UploadFileUseCase';
import { FileRepository } from '../../../Data/repository/FileRepository';
import { stringifyError } from '../../../utils/parse';
import { SendTextMessageUseCase } from '../../../Domain/use_cases/SendTextMessageUseCase';
import { SubscribeToDialogEventsUseCase } from '../../../Domain/use_cases/SubscribeToDialogEventsUseCase';
import useEventMessagesRepository from '../../providers/QuickBloxUIKitProvider/useEventMessagesRepository';
import EventMessageType from '../../../Domain/entity/EventMessageType';
import { NotificationTypes } from '../../../Domain/entity/NotificationTypes';
import { GetDialogByIdUseCase } from '../../../Domain/use_cases/GetDialogByIdUseCase';
import DialogsRepository from '../../../Data/repository/DialogsRepository';
import ChatMessageAttachmentEntity from '../../../Domain/entity/ChatMessageAttachmentEntity';
import { UserTypingMessageUseCase } from '../../../Domain/use_cases/UserTypingMessageUseCase';
import { DialogEventInfo } from '../../../Domain/entity/DialogEventInfo';
import {
  ForwardMessagesParams,
  ReplyMessagesParams,
} from '../../../CommonTypes/BaseViewModel';
import { ForwardMessagesUseCase } from '../../../Domain/use_cases/ForwardMessagesUseCase';
import { ReplyMessagesUseCase } from '../../../Domain/use_cases/ReplyMessagesUseCase';
import { Creator, MessageEntityParams } from '../../../Data/Creator';

export default function useDialogViewModel(
  dialogType: DialogType,
  dialogEntity: DialogEntity,
): DialogViewModel {
  console.log('useDialogViewModel');
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [messages, setMessages] = useState<MessageEntity[]>([]);
  // const [users, setUsers] = useState<Record<number, UserEntity>>();
  const [dialog, setDialog] = useState<DialogEntity>(dialogEntity);
  // const [dialogsParticipants, setDialogsParticipants] = useState<number[]>([]);

  const currentContext = useQbInitializedDataContext();
  const eventMessaging = useEventMessagesRepository();
  const { REMOTE_DATA_SOURCE, LOCAL_DATA_SOURCE } = currentContext.storage;

  const subscribeToDialogEventsUseCase: SubscribeToDialogEventsUseCase =
    new SubscribeToDialogEventsUseCase(eventMessaging, 'MessagesViewModel');

  const [typingText, setTypingText] = useState<string>('');

  async function getMessages(pagination?: Pagination) {
    console.log(
      'call getMessages in MessagesViewModelWithMockUseCase for dialog: ',
      JSON.stringify(dialog),
    );
    setLoading(true);
    //
    //
    let participants: Array<number> = [];
    let userDictionary: Record<number, UserEntity> = {};

    if (dialog?.type === DialogType.group) {
      participants = (dialog as GroupDialogEntity).participantIds;
    } else if (dialog?.type === DialogType.private) {
      participants = [(dialog as PrivateDialogEntity).participantId];
    } else if (dialog?.type === DialogType.public) {
      participants = [];
    }
    const getAllUsersFromDialogByIdsUseCase: GetUsersByIdsUseCase =
      new GetUsersByIdsUseCase(
        new UsersRepository(LOCAL_DATA_SOURCE, REMOTE_DATA_SOURCE),
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
        new MessagesRepository(LOCAL_DATA_SOURCE, REMOTE_DATA_SOURCE),
        dialog.id,
        pagination || new Pagination(),
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

  const dialogUpdateHandler = (dialogInfo: DialogEventInfo) => {
    console.log('call dialogUpdateHandler in useDialogViewModel');

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
              let newState = [...prevState];

              if (newState.find((it) => it.id === messageId)) {
                newState = newState.map((elem) => {
                  const v: MessageEntity = {
                    ...elem,
                    delivered_ids: ResultMessage.delivered_ids,
                  };

                  return v;
                });
              } else {
                newState.push(ResultMessage);
              }

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
              new DialogsRepository(LOCAL_DATA_SOURCE, REMOTE_DATA_SOURCE),
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
      new MessagesRepository(LOCAL_DATA_SOURCE, REMOTE_DATA_SOURCE),
      dialog || dialogEntity,
      REMOTE_DATA_SOURCE.authInformation?.userId || 0,
    );

  const sendTypingTextMessage = () => {
    console.log('call release in MessagesViewModelWithMockUseCase');
    userTypingMessageUseCase.execute().catch((reason) => {
      const errorMessage: string = stringifyError(reason);

      console.log('have exception in sendTypingTextMessage: ', errorMessage);

      throw new Error(errorMessage);
    });
  };

  const uploadFile = async (file: File): Promise<FileEntity> => {
    console.log('call uploadFile(), file: ', file);
    const fileEntity: FileEntity = Creator.createFileEntity();

    fileEntity.data = file;
    fileEntity.uid = '';
    fileEntity.name = file.name;
    fileEntity.size = file.size;
    fileEntity.type = file.type || 'application/zip';
    const uploadFileUseCase: UploadFileUseCase = new UploadFileUseCase(
      new FileRepository(LOCAL_DATA_SOURCE, REMOTE_DATA_SOURCE),
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

  const sendMessage = (messageToSend: MessageEntity) => {
    const sendTextMessageUseCase: SendTextMessageUseCase =
      new SendTextMessageUseCase(
        new MessagesRepository(LOCAL_DATA_SOURCE, REMOTE_DATA_SOURCE),
        messageToSend,
      );

    // eslint-disable-next-line promise/catch-or-return
    sendTextMessageUseCase
      .execute()
      // eslint-disable-next-line promise/always-return
      .then((messageEntity) => {
        //
        // eslint-disable-next-line promise/catch-or-return
        getSender(messageEntity.sender_id)
          // eslint-disable-next-line promise/always-return
          .then((user) => {
            // eslint-disable-next-line no-param-reassign
            messageEntity.sender = user;
          })
          .finally(() => {
            setMessages((prevState) => {
              const newState = [...prevState, messageEntity];

              return newState;
            });
          });
        //
      })
      .catch((reason) => {
        const errorMessage: string = stringifyError(reason);

        console.log(
          'exception in sendMessage in useDialogViewModel',
          errorMessage,
        );
        setLoading(false);
        throw new Error(errorMessage);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const sendTextMessage = (newMessage: string) => {
    setLoading(true);
    const currentUserId = REMOTE_DATA_SOURCE.authInformation?.userId || 0;
    const messageEntityParams: MessageEntityParams = {
      dialogId: dialog.id,
      message: newMessage,
      sender_id: currentUserId,
      recipient_id:
        dialog.type === DialogType.private
          ? (dialog as PrivateDialogEntity).participantId
          : currentUserId,
      dialog_type: DialogType.group,
    };
    const messageToSend: MessageEntity =
      Creator.createMessageEntity(messageEntityParams);

    messageToSend.dialogType = dialog.type;

    sendMessage(messageToSend);
  };

  const createMessageContent = (messageBody: string, fileMessage: FileEntity) =>
    `MediaContentEntity|${messageBody}|${
      fileMessage.uid
    }|${fileMessage.type!.toString()}`;

  const setupMessageToSend = (
    fileMessage: FileEntity,
    currentUserId: number,
  ): MessageEntity => {
    const recipientId =
      dialog.type === DialogType.private
        ? (dialog as PrivateDialogEntity).participantId
        : currentUserId;
    const messageBody = fileMessage.name || '[attachment]';

    const messageEntityParams: MessageEntityParams = {
      dialogId: dialog.id,
      message: messageBody,
      sender_id: currentUserId,
      recipient_id: recipientId,
      dialog_type: DialogType.group,
    };

    const messageToReturn: MessageEntity =
      Creator.createMessageEntity(messageEntityParams);

    const attachments: ChatMessageAttachmentEntity[] = [
      {
        id: fileMessage.id as string,
        uid: fileMessage.uid,
        type: fileMessage.type!,
        file: fileMessage,
        name: fileMessage.name,
        size: fileMessage.size,
        url: fileMessage.url,
      },
    ];

    messageToReturn.attachments = attachments;
    messageToReturn.message = createMessageContent(messageBody, fileMessage);

    return messageToReturn;
  };

  const sendAttachmentMessage = async (newMessage: File): Promise<boolean> => {
    console.log('call sendAttachmentMessage');
    setLoading(true);
    const currentUserId = REMOTE_DATA_SOURCE.authInformation?.userId || 0;

    try {
      const fileMessage = await uploadFile(newMessage);
      const messageToSend = setupMessageToSend(fileMessage, currentUserId);

      sendMessage(messageToSend);
    } catch (reason) {
      setLoading(false);
      console.log('EXCEPTION in sendAttachmentMessage', stringifyError(reason));

      return false;
    }

    return true;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const sendAttachmentMessage = async (newMessage: File): Promise<boolean> => {
  //   console.log('call sendTextMessage');
  //   setLoading(true);
  //   const currentUserId = REMOTE_DATA_SOURCE.authInformation?.userId || 0;
  //
  //   try {
  //     await uploadFile(newMessage)
  //       // eslint-disable-next-line promise/always-return
  //       .then((fileMessage: FileEntity) => {
  //         console.log(JSON.stringify(fileMessage));
  //
  //         const recipientId =
  //           dialog.type === DialogType.private
  //             ? (dialog as PrivateDialogEntity).participantId
  //             : currentUserId;
  //
  //         // eslint-disable-next-line promise/always-return
  //         const messageBody = fileMessage.name || '[attachment]';
  //         //
  //         const messageEntityParams: MessageEntityParams = {
  //           dialogId: dialog.id,
  //           message: messageBody,
  //           sender_id: currentUserId,
  //           recipient_id: recipientId,
  //           dialog_type: DialogType.group,
  //         };
  //         const messageToSend: MessageEntity =
  //           Creator.createMessageEntity(messageEntityParams);
  //         //
  //
  //         messageToSend.dialogType = dialog.type;
  //         const attachments: ChatMessageAttachmentEntity[] = [
  //           {
  //             id: fileMessage.id as string,
  //             uid: fileMessage.uid,
  //             type: fileMessage.type!,
  //             file: fileMessage,
  //             name: fileMessage.name,
  //             size: fileMessage.size,
  //             url: fileMessage.url,
  //           },
  //         ];
  //
  //         messageToSend.attachments = attachments;
  //
  //         messageToSend.message = `MediaContentEntity|${messageBody}|${
  //           fileMessage.uid
  //         }|${fileMessage.type!.toString()}`;
  //         sendMessage(messageToSend);
  //         //
  //       })
  //       .catch((reason) => {
  //         setLoading(false);
  //         const errorMessage = stringifyError(reason);
  //
  //         console.log('EXCEPTION in sendAttachmentMessage', errorMessage);
  //
  //         throw new Error(errorMessage);
  //       });
  //   } catch (e) {
  //     return false;
  //   }
  //
  //   return true;
  // };

  const forwardMessage = async (
    targetDialogs: DialogEntity[],
    messagesToForward: MessageEntity[],
    relatedMessage: MessageEntity,
  ): Promise<void> => {
    //
    const userName = REMOTE_DATA_SOURCE.authInformation?.userName || '';
    const forwardMessagesUseCase: ForwardMessagesUseCase =
      new ForwardMessagesUseCase(
        new MessagesRepository(LOCAL_DATA_SOURCE, REMOTE_DATA_SOURCE),
        targetDialogs,
        messagesToForward,
        relatedMessage,
        userName,
      );

    // eslint-disable-next-line promise/catch-or-return
    await forwardMessagesUseCase
      .execute()
      .catch((reason) => {
        const errorMessage: string = stringifyError(reason);

        console.log(
          'exception in sendMessage in useDialogViewModel',
          errorMessage,
        );
        setLoading(false);
        throw new Error(errorMessage);
      })
      .finally(() => {
        setLoading(false);
      });
    //
  };

  const sendForwardedMessages = async (
    forwardingData: ForwardMessagesParams,
    // eslint-disable-next-line @typescript-eslint/require-await
  ): Promise<boolean> => {
    setLoading(true);
    const currentUserId = REMOTE_DATA_SOURCE.authInformation?.userId || 0;

    const messageEntityParams: MessageEntityParams = {
      dialogId: dialog.id,
      message: forwardingData.relatedTextMessage || '',
      sender_id: currentUserId,
      recipient_id:
        dialog.type === DialogType.private
          ? (dialog as PrivateDialogEntity).participantId
          : currentUserId,
      dialog_type: DialogType.group,
    };
    const relatedMessage: MessageEntity =
      Creator.createMessageEntity(messageEntityParams);

    relatedMessage.dialogType = dialog.type;

    let resultOperation = true;

    await forwardMessage(
      forwardingData.targetDialogs,
      forwardingData.messagesToForward,
      relatedMessage,
    ).catch(() => {
      resultOperation = false;
    });

    return resultOperation;
  };
  //

  // New function to handle errors
  const handleError = (reason: any, logMessage: string) => {
    setLoading(false);
    const errorMessage = stringifyError(reason);

    console.log(logMessage, errorMessage);
    throw new Error(errorMessage);
  };
  const replyMessage = async (
    messagesToReply: MessageEntity[],
    relatedMessage: MessageEntity,
  ): Promise<void> => {
    //
    const replyMessagesUseCase: ReplyMessagesUseCase = new ReplyMessagesUseCase(
      new MessagesRepository(LOCAL_DATA_SOURCE, REMOTE_DATA_SOURCE),
      messagesToReply,
      relatedMessage,
    );

    // eslint-disable-next-line promise/catch-or-return
    await replyMessagesUseCase
      .execute()
      // eslint-disable-next-line promise/always-return
      .then((messageEntity) => {
        //
        // eslint-disable-next-line promise/catch-or-return
        getSender(messageEntity.sender_id)
          // eslint-disable-next-line promise/always-return
          .then((user) => {
            // eslint-disable-next-line no-param-reassign
            messageEntity.sender = user;
          })
          .finally(() => {
            setMessages((prevState) => {
              const newState = [...prevState, messageEntity];

              return newState;
            });
          });
        //
      })
      .catch((reason) => {
        const errorMessage: string = stringifyError(reason);

        console.log(
          'exception in sendMessage in useDialogViewModel',
          errorMessage,
        );
        setLoading(false);
        throw new Error(errorMessage);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const sendReplyMessages = async (
    replyData: ReplyMessagesParams,
  ): Promise<boolean> => {
    setLoading(true);
    const currentUserId = REMOTE_DATA_SOURCE.authInformation?.userId || 0;
    const messageEntityParams: MessageEntityParams = {
      dialogId: dialog.id,
      message: replyData.relatedTextMessage || '',
      sender_id: currentUserId,
      recipient_id:
        // eslint-disable-next-line promise/always-return
        dialog.type === DialogType.private
          ? (dialog as PrivateDialogEntity).participantId
          : currentUserId,
      dialog_type: DialogType.group,
    };
    const relatedMessage: MessageEntity =
      Creator.createMessageEntity(messageEntityParams);

    relatedMessage.dialogType = dialog.type;
    let isOperationSuccessful = true;

    try {
      if (replyData.relatedFileMessage) {
        const fileMessage: FileEntity = await uploadFile(
          replyData.relatedFileMessage,
        );
        const attachments: ChatMessageAttachmentEntity[] = [
          {
            id: fileMessage.id as string,
            uid: fileMessage.uid,
            type: fileMessage.type!,
            file: fileMessage,
            name: fileMessage.name,
            size: fileMessage.size,
            url: fileMessage.url,
          },
        ];

        relatedMessage.attachments = attachments;
        await replyMessage(replyData.messagesToReply, relatedMessage);
      } else {
        await replyMessage(replyData.messagesToReply, relatedMessage);
      }
    } catch (e) {
      handleError(e, 'EXCEPTION in sendAttachmentMessage');
      isOperationSuccessful = false;
    }

    return isOperationSuccessful;
  };
  // const sendReplyMessages = async (
  //   replyData: ReplyMessagesParams,
  //   // eslint-disable-next-line @typescript-eslint/require-await
  // ): Promise<boolean> => {
  //   setLoading(true);
  //   const currentUserId = REMOTE_DATA_SOURCE.authInformation?.userId || 0;
  //   const messageEntityParams: MessageEntityParams = {
  //     dialogId: dialog.id,
  //     message: replyData.relatedTextMessage || '',
  //     sender_id: currentUserId,
  //     recipient_id:
  //       // eslint-disable-next-line promise/always-return
  //       dialog.type === DialogType.private
  //         ? (dialog as PrivateDialogEntity).participantId
  //         : currentUserId,
  //     dialog_type: DialogType.group,
  //   };
  //   const relatedMessage: MessageEntity =
  //     Creator.createMessageEntity(messageEntityParams);
  //
  //   relatedMessage.dialogType = dialog.type;
  //
  //   let resultOperation = true;
  //
  //   if (replyData.relatedFileMessage) {
  //     try {
  //       await uploadFile(replyData.relatedFileMessage)
  //         .then(async (fileMessage: FileEntity) => {
  //           const attachments: ChatMessageAttachmentEntity[] = [
  //             {
  //               id: fileMessage.id as string,
  //               uid: fileMessage.uid,
  //               type: fileMessage.type!,
  //               file: fileMessage,
  //               name: fileMessage.name,
  //               size: fileMessage.size,
  //               url: fileMessage.url,
  //             },
  //           ];
  //
  //           relatedMessage.attachments = attachments;
  //
  //           await replyMessage(replyData.messagesToReply, relatedMessage);
  //           resultOperation = true;
  //
  //           return resultOperation;
  //           //
  //         })
  //         .catch((reason) => {
  //           setLoading(false);
  //           const errorMessage = stringifyError(reason);
  //
  //           console.log('EXCEPTION in sendAttachmentMessage', errorMessage);
  //           resultOperation = false;
  //           throw new Error(errorMessage);
  //         });
  //     } catch (e) {
  //       resultOperation = false;
  //
  //       return resultOperation;
  //     }
  //   } else {
  //     await replyMessage(replyData.messagesToReply, relatedMessage).catch(
  //       () => {
  //         resultOperation = false;
  //
  //         return resultOperation;
  //       },
  //     );
  //   }
  //
  //   return resultOperation;
  // };

  //

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
    sendForwardedMessages,
    sendReplyMessages,
    typingText,
  };
}
