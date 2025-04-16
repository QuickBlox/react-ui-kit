import QB, {
  AIAnswerResponse,
  AIChatHistory,
  ChatConnectParams,
  GetMessagesResult,
  GetUserParams,
  ListUserParams,
  ListUserResponse,
  QBBlob,
  QBBlobCreateUploadParams,
  QBChatMessage,
  QBCustomObject,
  QBDataDeletedResponse,
  QBGetDialogResult,
  QBLoginParams,
  QBMediaParams,
  QBMessageStatusParams,
  QBSession,
  QBSystemMessage,
  QBUser,
  QBUserCreateParams,
  QBWebRTCSession,
} from 'quickblox/quickblox';
import { stringifyError } from '../utils/parse';
import {
  QBChatDialogType,
  QBUIKitChatDialog,
  QBUIKitChatNewMessage,
  QBUIKitConfig,
} from '../CommonTypes/CommonTypes';

export type QBInitParams = {
  appIdOrToken: string | number;
  authKeyOrAppId: string | number;
  authSecret?: string;
  accountKey: string;
  config?: QBUIKitConfig;
};

// eslint-disable-next-line import/no-mutable-exports
export let qbSDK: typeof QB | undefined;

export function setQB(sdk: typeof QB) {
  qbSDK = sdk;
}

export function getQB(): typeof QB {
  if (!qbSDK) {
    qbSDK = QB;
  }

  return qbSDK;
}

export function QBInit(params: QBInitParams) {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const QB = getQB();

  QB.init(
    params.appIdOrToken,
    params.authKeyOrAppId,
    params.authSecret,
    params.accountKey,
    params.config?.appConfig,
  );
}

export function QBCreateSession(params?: QBLoginParams) {
  return new Promise<QBSession>((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const QB = getQB();

    if (!params) {
      QB.createSession((sessionError, session) => {
        if (sessionError) {
          reject(stringifyError(sessionError));
        } else {
          resolve(session!);
        }
      });
    } else
      QB.createSession(params, (sessionError, session) => {
        if (sessionError) {
          reject(stringifyError(sessionError));
        } else {
          resolve(session!);
        }
      });
  });
}

export function QBGetSession() {
  return new Promise<QBSession>((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const QB = getQB();

    QB.getSession((getSessionError, response) => {
      if (getSessionError || !response?.session) {
        reject(
          getSessionError ? stringifyError(getSessionError) : 'No session',
        );
      } else {
        resolve(response.session);
      }
    });
  });
}

export function loginToQuickBlox(params: QBLoginParams) {
  return new Promise<QBUser>((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const QB = getQB();

    QB.login(params, (loginError, user) => {
      if (loginError) {
        reject(stringifyError(loginError));
      } else {
        resolve(user!);
      }
    });
  });
}

export function QBLogin(params: QBLoginParams) {
  let session: QBSession;

  return QBCreateSession()
    .then((_session) => {
      session = _session;

      return loginToQuickBlox(params);
    })
    .then((user) => ({ user, session }));
}

export function QBLogout() {
  return new Promise((resolve) => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const QB = getQB();

    QB.destroySession(resolve);
  });
}

export function QBChatConnect(params: ChatConnectParams) {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const QB = getQB();

    QB.chat.connect(params, (error, success) => {
      if (error) {
        reject(stringifyError(error));
      } else {
        resolve(success);
      }
    });
  });
}

export function QBChatDisconnect() {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const QB = getQB();

  QB.chat.disconnect();
}

export function registrationAccount(params: QBUserCreateParams) {
  return new Promise<QBUser>((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const QB = getQB();

    QB.users.create(params, (error, createdUser) => {
      if (error) {
        reject(stringifyError(error));
      } else {
        resolve(createdUser!);
      }
    });
  });
}

export function QBUserCreate(params: QBUserCreateParams) {
  let session: QBSession;

  return QBCreateSession()
    .then((_session) => {
      session = _session;

      return registrationAccount(params);
    })
    .then((user) => ({ user, session }));
}

export function QBUserUpdate(userId: QBUser['id'], user: Partial<QBUser>) {
  return new Promise<QBUser>((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const QB = getQB();

    QB.users.update(userId, user, (error, updatedUser) => {
      if (error) {
        reject(stringifyError(error));
      } else {
        resolve(updatedUser!);
      }
    });
  });
}

export function QBUserGet(params: GetUserParams | number) {
  if (typeof params === 'number') {
    return new Promise<QBUser | undefined>((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const QB = getQB();

      QB.users.get(params, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result!);
        }
      });
    });
  }

  return new Promise<ListUserResponse>((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const QB = getQB();

    QB.users.get(params, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result!);
      }
    });
  });
}
//
export function QBUsersGet(params: GetUserParams) {
  return new Promise<ListUserResponse>((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const QB = getQB();

    QB.users.get(params, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result!);
      }
    });
  });
}
export function QBUsersGetById(params: number) {
  return new Promise<QBUser | undefined>((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const QB = getQB();

    QB.users.get(params, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result!);
      }
    });
  });
}

//
export function QBUserList(params: ListUserParams) {
  return new Promise<ListUserResponse | undefined>((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const QB = getQB();

    QB.users.listUsers(params, (error, response) => {
      if (error) {
        reject(stringifyError(error));
      } else {
        resolve(response!);
      }
    });
  });
}

export function QBDataGet<T extends QBCustomObject>(
  className: string,
  filters: Dictionary<unknown>,
) {
  return new Promise<{
    class_name: string;
    items: T[];
    limit: number;
    skip: number;
  }>((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const QB = getQB();

    QB.data.list<T>(className, filters, (error, result) => {
      if (error) {
        reject(stringifyError(error));
      } else {
        resolve(result!);
      }
    });
  });
}

export function QBDataCreate<T extends QBCustomObject>(
  className: string,
  data: Dictionary<unknown>,
) {
  return new Promise<T>((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const QB = getQB();

    QB.data.create<T>(className, data, (error, customObject) => {
      if (error) {
        reject(stringifyError(error));
      } else {
        resolve(customObject!);
      }
    });
  });
}

export function QBDataDelete(
  className: string,
  ids: QBCustomObject['_id'] | Array<QBCustomObject['_id']>,
) {
  return new Promise<QBDataDeletedResponse>((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const QB = getQB();

    QB.data.delete(className, ids, (error, customObject) => {
      if (error) {
        reject(stringifyError(error));
      } else {
        resolve(customObject!);
      }
    });
  });
}

export function QBDataUpdate<T extends QBCustomObject>(
  className: string,
  _id: T['_id'],
  data: Dictionary<unknown>,
) {
  return new Promise<T>((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const QB = getQB();

    QB.data.update<T>(className, { _id, ...data }, (error, item) => {
      if (error) {
        reject(stringifyError(error));
      } else {
        resolve(item!);
      }
    });
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function QBGetDialogs(filters: Dictionary<any>) {
  return new Promise<QBGetDialogResult | undefined>((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const QB = getQB();

    QB.chat.dialog.list(filters, (error, result) => {
      if (error) {
        reject(stringifyError(error));
      } else {
        resolve(result!);
      }
    });
  });
}

export function QBGetDialogById(id: string) {
  return new Promise<QBGetDialogResult | undefined>((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const QB = getQB();

    QB.chat.dialog.list({ _id: id }, (error, result) => {
      if (error) {
        reject(stringifyError(error));
      } else {
        resolve(result!);
      }
    });
  });
}

export function QBCreatePrivateDialog(
  userId: QBUser['id'],
  dialogName?: string,
  data?: Dictionary<unknown>,
) {
  console.log(
    `call QBCreatePrivateDialog with userid: ${userId} dialog name: ${
      dialogName || '-'
    }`,
  );

  return new Promise<QBUIKitChatDialog>((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const QB = getQB();

    QB.chat.dialog.create(
      { name: dialogName || '-', occupants_ids: [userId], type: 3, data },
      (error, chat) => {
        if (error) {
          reject(stringifyError(error));
        } else {
          resolve(chat!);
        }
      },
    );
  });
}
export function QBCreateGroupDialog(
  userIds: Array<QBUser['id']>,
  dialogName?: string,
  data?: Dictionary<unknown>,
) {
  console.log(
    `call QBCreateGroupDialog with ids: ${JSON.stringify(userIds)} name: ${
      dialogName || ''
    }`,
  );

  let params = {};

  if (data && data?.photo) {
    params = {
      name: dialogName || '-',
      occupants_ids: [userIds],
      type: 2,
      photo: data?.photo,
    };
  } else {
    params = {
      name: dialogName || '-',
      occupants_ids: [userIds],
      type: 2,
    };
  }

  return new Promise<QBUIKitChatDialog>((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const QB = getQB();

    QB.chat.dialog.create(
      // {
      //   name: dialogName || '-',
      //   occupants_ids: [userIds],
      //   type: 2,
      //   photo: data?.photo,
      // },
      params,
      (error, chat) => {
        if (error) {
          reject(stringifyError(error));
        } else {
          resolve(chat!);
        }
      },
    );
  });
}

export function QBUpdateDialog(
  dialogId: QBUIKitChatDialog['_id'],
  data: Dictionary<unknown>,
) {
  return new Promise<QBUIKitChatDialog>((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const QB = getQB();

    QB.chat.dialog.update(dialogId, data, (error, chat) => {
      if (error) {
        reject(stringifyError(error));
      } else {
        resolve(chat!);
      }
    });
  });
}

export function QBJoinGroupDialog(dialogId: QBUIKitChatDialog['_id']) {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const QB = getQB();
    const dialogJid = QB.chat.helpers.getRoomJidFromDialogId(dialogId);

    // QB.chat.muc.join(dialogJid, (error, res) => {
    //   if (error) {
    //     console.log('ERROR in QBJoinGroupDialog with join group dialog:', error);
    //     reject(stringifyError(error));
    //   } else {
    //     console.log('QBJoinGroupDialog: join group dialog:', res);
    //     resolve(res);
    //   }
    // });
    QB.chat.muc.join(dialogJid, (error, res) => {
      if (error) {
        console.log('ERROR in QBJoinGroupDialog with join group dialog:', error);
        console.log('stringify Error:', stringifyError(error));
        // Если ошибка содержит станзу, проверяем ее на наличие тега <error>
        try {
          const errorNode = error as any;

          if (errorNode.childNodes && errorNode.childNodes.length > 0) {
            for (let i = 0; i < errorNode.childNodes.length; i++) {
              const elItem = errorNode.childNodes.item(i);
              if (elItem.tagName === 'error') {
                const code = elItem.getAttribute('code') || '500';
                const message = elItem.textContent || 'Unknown issue';
                console.log(`Join error: ${code}, message: ${message}`);
                return reject({ code, message });
              }
            }
          }
        } catch (parseError) {
          console.log('Error parsing join error stanza:', parseError);
          return reject({ code: '500', message: 'Error parsing join error stanza' });
        }

        return reject({ code: '500', message: 'Unknown error during join' });
      } else {
        console.log('QBJoinGroupDialog: join group dialog:', res);
        resolve(res);
      }
    });

  });
}

export function QBDeleteDialog(dialogIds: Array<QBUIKitChatDialog['_id']>) {
  return new Promise<void>((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const QB = getQB();

    QB.chat.dialog.delete(dialogIds, (error) => {
      if (error) {
        reject(stringifyError(error));
      } else {
        resolve();
      }
    });
  });
}

export function QBLeaveDialog(dialogId: QBUIKitChatDialog['_id']) {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const QB = getQB();
    const dialogJid = QB.chat.helpers.getRoomJidFromDialogId(dialogId);

    QB.chat.muc.leave(dialogJid, (error, res) => {
      if (error) {
        reject(stringifyError(error));
      } else {
        resolve(res);
      }
    });
  });
}

export function QBGetInfoFile(fileId: QBBlob['id']) {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const QB = getQB();

    QB.content.getInfo(fileId, (error, response) => {
      if (error) {
        reject(stringifyError(error));
      } else {
        resolve(response);
      }
    });
  });
}

export function QBDeleteContent(contentId: QBBlob['id']) {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const QB = getQB();

    QB.content.delete(contentId, (error, response) => {
      if (error) {
        reject(stringifyError(error));
      } else {
        resolve(response);
      }
    });
  });
}

export function QBCreateAndUploadContent(
  paramContent: QBBlobCreateUploadParams,
) {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const QB = getQB();

    QB.content.createAndUpload(paramContent, (error, response) => {
      if (error) {
        reject(stringifyError(error));
      } else {
        resolve(response);
      }
    });
  });
}

// export function QBChatGetMessages(
//   dialogId: QBChatDialog['_id'],
//   skip = 0,
//   limit = 100,
// ) {
//   return new Promise<GetMessagesResult & { dialogId: QBChatDialog['_id'] }>(
//     (resolve, reject) => {
//       QB.chat.message.list(
//         {
//           chat_dialog_id: dialogId,
//           sort_desc: 'date_sent',
//           limit,
//           skip,
//           mark_as_read: 0,
//         },
//         (error, messages) => {
//           if (error) {
//             reject(stringifyError(error));
//           } else {
//             resolve({ ...messages, dialogId });
//           }
//         },
//       );
//     },
//   );
// }
// //

export function qbChatGetMessagesExtended(
  dialogId: QBUIKitChatDialog['_id'],
  params: Partial<{
    skip: number;
    limit: number;
    sort_desc: 'date_sent' | 'created_at' | 'updated_at';
    sort_asc: 'date_sent' | 'created_at' | 'updated_at';
    _id: string;
    mark_as_read: 0 | 1;
    date_sent: Partial<{
      lt: number;
      lte: number;
      gt: number;
      gte: number;
    }>;
  }> = {},
): Promise<GetMessagesResult> {
  return new Promise<GetMessagesResult>((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const QB = getQB();

    QB.chat.message.list(
      {
        chat_dialog_id: dialogId,
        sort_desc: 'date_sent',
        ...params,
      },
      (error, messages) => {
        if (error) {
          reject(error);
        } else {
          resolve(messages!);
        }
      },
    );
  });
}
//
export function QBSendIsTypingStatus(
  dialog: QBUIKitChatDialog,
  senderId: QBUser['id'],
) {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const QB = getQB();
  const isPrivate: QBChatDialogType = 3;
  const jidOrUserid =
    dialog.type === isPrivate
      ? QB.chat.helpers.getRecipientId(dialog.occupants_ids, senderId)
      : QB.chat.helpers.getRoomJidFromDialogId(dialog._id);

  // const dialogJid = QB.chat.helpers.getRoomJidFromDialogId(dialogId);

  try {
    QB.chat.sendIsTypingStatus(jidOrUserid);
  } catch (e) {
    console.log(JSON.stringify(e));
  }
}
export function QBSendIsStopTypingStatus(
  dialog: QBUIKitChatDialog,
  senderId: QBUser['id'],
) {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const QB = getQB();
  const isPrivate: QBChatDialogType = 3;
  const jidOrUserid =
    dialog.type === isPrivate
      ? QB.chat.helpers.getRecipientId(dialog.occupants_ids, senderId)
      : QB.chat.helpers.getRoomJidFromDialogId(dialog._id);

  // const dialogJid = QB.chat.helpers.getRoomJidFromDialogId(dialogId);

  try {
    QB.chat.sendIsStopTypingStatus(jidOrUserid);
  } catch (e) {
    console.log(JSON.stringify(e));
  }
}
//

export function QBChatSendMessage(
  to: string | number, // artan 22.06.23
  message: QBUIKitChatNewMessage,
) {
  return new Promise<QBChatMessage['_id']>((resolve) => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const QB = getQB();

    resolve(QB.chat.send(to, message));
  });
}

export function QBChatSendSystemMessage(
  to: QBUser['id'] | string,
  message: { extension: QBSystemMessage['extension'] },
) {
  return new Promise<QBSystemMessage['id']>((resolve) => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const QB = getQB();

    resolve(QB.chat.sendSystemMessage(to, message));
  });
}

export function QBChatMarkMessageRead(params: QBMessageStatusParams) {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const QB = getQB();

  QB.chat.sendReadStatus(params);
}

export function QBChatMarkMessageDelivered(params: QBMessageStatusParams) {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const QB = getQB();

  QB.chat.sendDeliveredStatus(params);
}

export function QBWebRTCSessionGetUserMedia(
  session: QBWebRTCSession,
  params: QBMediaParams,
) {
  return new Promise<MediaStream | undefined>((resolve, reject) => {
    session.getUserMedia({ ...params }, (error, stream) => {
      if (error) {
        reject(error);
      } else {
        resolve(stream!);
      }
    });
  });
}
// export interface AIAnswerResponse {
//   answer: string;
// } // artim 19.05.2024

export function QBAnswerAssist(
  smartChatAssistantId: string,
  messageToAssist: string,
  history: AIChatHistory,
) {
  return new Promise<AIAnswerResponse>((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const QB = getQB();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    QB.ai.answerAssist(
      smartChatAssistantId,
      messageToAssist,
      history,
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res as unknown as AIAnswerResponse);
        }
      },
    );
  });
}

export function QBTranslate(
  smartChatAssistantId: string,
  textToTranslate: string,
  languageCode: string,
) {
  return new Promise<AIAnswerResponse>((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const QB = getQB();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    QB.ai.translate(
      smartChatAssistantId,
      textToTranslate,
      languageCode,
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res as unknown as AIAnswerResponse);
        }
      },
    );
  });
}
