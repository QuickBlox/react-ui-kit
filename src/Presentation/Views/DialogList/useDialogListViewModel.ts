import { useState } from 'react';
import { QBDataContextType } from '../../providers/QuickBloxUIKitProvider/QuickBloxUIKitProvider';
import { Pagination } from '../../../Domain/repository/Pagination';
import { DialogListViewModel } from './DialogListViewModel';
import { PublicDialogEntity } from '../../../Domain/entity/PublicDialogEntity';
import { DialogEntity } from '../../../Domain/entity/DialogEntity';
import { SubscribeToDialogsUpdatesUseCaseWithMock } from '../../../Domain/use_cases/SubscribeToDialogsUpdatesUseCaseWithMock';
import DialogsRepository from '../../../Data/repository/DialogsRepository';
import { GetAllDialogsUseCaseWithMock } from '../../../Domain/use_cases/GetAllDialogsUseCaseWithMock';
import { CreateDialogUseCase } from '../../../Domain/use_cases/CreateDialogUseCase';
import EventMessagesRepository from '../../../Data/repository/EventMessagesRepository';
import { stringifyError } from '../../../utils/parse';
import { GroupDialogEntity } from '../../../Domain/entity/GroupDialogEntity';
import { UpdateDialogUseCase } from '../../../Domain/use_cases/UpdateDialogUseCase';
import {
  DialogLeaveType,
  LeaveDialogUseCase,
} from '../../../Domain/use_cases/LeaveDialogUseCase';
import { FileEntity } from '../../../Domain/entity/FileEntity';
import { UploadFileUseCase } from '../../../Domain/use_cases/UploadFileUseCase';
import { FileRepository } from '../../../Data/repository/FileRepository';
import { Stubs } from '../../../Data/Stubs';
import { SubscribeToDialogEventsUseCase } from '../../../Domain/use_cases/SubscribeToDialogEventsUseCase';
import EventMessageType from '../../../Domain/entity/EventMessageType';
import { NotificationTypes } from '../../../Domain/entity/NotificationTypes';
import { GetDialogByIdUseCase } from '../../../Domain/use_cases/GetDialogByIdUseCase';
import { DialogType } from '../../../Domain/entity/DialogTypes';
import { RemoveUsersFromTheDialogUseCase } from '../../../Domain/use_cases/RemoveUsersFromTheDialogUseCase';
import { DialogEventInfo } from '../../../Domain/entity/DialogEventInfo';
import { RemoteDataSource } from '../../../Data/source/remote/RemoteDataSource';
import { GetUsersByIdsUseCase } from '../../../Domain/use_cases/GetUsersByIdsUseCase';
import UsersRepository from '../../../Data/repository/UsersRepository';
import { UserEntity } from '../../../Domain/entity/UserEntity';
import { DefaultConfigurations } from '../../../Data/DefaultConfigurations';
import { UpdateCurrentDialogInDataSourceUseCase } from '../../../Domain/use_cases/UpdateCurrentDialogInDataSourceUseCase';

export default function useDialogListViewModel(
  currentContext: QBDataContextType,
  initPagination?: Pagination,
): DialogListViewModel {
  console.log('3.1. useDialogListViewModel');
  const startPagination: Pagination = initPagination || new Pagination();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [pagination, setPagination] = useState<Pagination>(startPagination);
  const [dialogs, setDialogs] = useState<PublicDialogEntity[]>([]);
  const [newDialog, setNewDialog] = useState<DialogEntity>();

  //
  const currentUserId =
    currentContext.storage.REMOTE_DATA_SOURCE.authInformation?.userId || -1;
  const currentUserName =
    currentContext.storage.REMOTE_DATA_SOURCE.authInformation?.userName || '';
  // const currentContext = useQbInitializedDataContext();
  const remoteDataSourceMock: RemoteDataSource =
    currentContext.storage.REMOTE_DATA_SOURCE;

  const eventMessageRepository: EventMessagesRepository =
    currentContext.storage.EVENT_MESSAGE_REPOSITORY;

  const useCaseSubscribeToDialogsUpdates: SubscribeToDialogsUpdatesUseCaseWithMock =
    new SubscribeToDialogsUpdatesUseCaseWithMock(
      new DialogsRepository(
        currentContext.storage.LOCAL_DATA_SOURCE,
        remoteDataSourceMock,
      ),
    );

  const subscribeToDialogEventsUseCase: SubscribeToDialogEventsUseCase =
    new SubscribeToDialogEventsUseCase(
      eventMessageRepository,
      'DialogsViewModel',
    );
  //
  const QBConfig =
    currentContext.InitParams.qbConfig ||
    DefaultConfigurations.getDefaultQBConfig();
  const { regexUserName } = QBConfig.appConfig;
  const regex = regexUserName ? new RegExp(regexUserName) : null;

  async function getDialogs(currentPagination: Pagination) {
    setLoading(true);
    const useCaseGetAllDialogs: GetAllDialogsUseCaseWithMock =
      new GetAllDialogsUseCaseWithMock(
        new DialogsRepository(
          currentContext.storage.LOCAL_DATA_SOURCE,
          remoteDataSourceMock,
        ),
        currentPagination,
      );

    await useCaseGetAllDialogs
      ?.execute()
      // eslint-disable-next-line promise/always-return
      .then((result) => {
        const filteredDialogs: PublicDialogEntity[] = (
          result.ResultData as PublicDialogEntity[]
        ).reduce(
          (dialogList: PublicDialogEntity[], dialog: PublicDialogEntity) => {
            const isPrivate = dialog.type === DialogType.private;
            const isValidName =
              (regex &&
                dialog.name &&
                dialog.name.length > 0 &&
                regex.test(dialog.name)) ||
              !regex;

            if (isPrivate && !isValidName) {
              // eslint-disable-next-line no-param-reassign
              dialog.name = 'Unknown';
            }
            dialogList.push(dialog);

            return dialogList;
          },
          [],
        );

        const sortedData = [...filteredDialogs].sort((a, b) => {
          return (
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );
        });

        setDialogs([...sortedData]);
        setLoading(false);
        setPagination(result.CurrentPagination);
      })
      .catch((e) => {
        console.log(
          'call in useCaseGetAllDialogs catch....',
          JSON.stringify(e),
        );
        setError(`${(e as unknown as Error).message}`);
        setLoading(false);
      });
    await useCaseSubscribeToDialogsUpdates?.execute((data) => {
      try {
        const sortedData = [...(data as PublicDialogEntity[])].sort((a, b) => {
          return (
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );
        });

        setDialogs(sortedData);
        setLoading(false);
        setError('');
      } catch (e) {
        console.log(
          'call in useCaseSubscribeToDialogsUpdates catch....',
          JSON.stringify(e),
        );
        setError(`${(e as Error).message}`);
      }
    });
  }

  const dialogUpdateHandler = (dialogInfo: DialogEventInfo) => {
    console.log('call dialogUpdateHandler in useDialogListView:', dialogInfo);
    if (
      dialogInfo.eventMessageType === EventMessageType.SystemMessage
      // || dialogInfo.eventMessageType === EventMessageType.RegularMessage
    ) {
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
            setNewDialog(updatedDialog);
          });
        }
      } else if (
        dialogInfo.notificationTypes === NotificationTypes.DELETE_LEAVE_DIALOG
      ) {
        if (
          dialogInfo.messageInfo &&
          dialogInfo.messageInfo.sender_id === currentUserId
        ) {
          setNewDialog(undefined);
        }
      } else if (
        dialogInfo.notificationTypes === NotificationTypes.REMOVE_USER
      ) {
        if (
          dialogInfo.messageInfo &&
          dialogInfo.messageInfo.dialogId === newDialog?.id
        ) {
          setNewDialog(undefined);
        }
        getDialogs(pagination).catch();
      } else if (
        dialogInfo.notificationTypes === NotificationTypes.NEW_DIALOG
      ) {
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
          getDialogByIdUseCase
            .execute()
            // eslint-disable-next-line promise/always-return
            .then((newItem) => {
              //
              setDialogs((prevDialogs) => {
                const newDialogs = [
                  ...prevDialogs,
                  newItem as PublicDialogEntity,
                ];

                const sortedData = [...newDialogs].sort((a, b) => {
                  return (
                    new Date(b.updatedAt).getTime() -
                    new Date(a.updatedAt).getTime()
                  );
                });

                return sortedData;
              });
              //
            })
            .catch((e) => {
              console.log('Error getDialogByIdUseCase: ', stringifyError(e));
            });
        }
        // getDialogs(pagination).catch();
      }
    } else if (dialogInfo.eventMessageType === EventMessageType.LocalMessage) {
      if (dialogInfo.dialogInfo) {
        setDialogs((prevDialogs) => {
          const newDialogs = prevDialogs.map((dialog) => {
            if (dialog.id === dialogInfo.dialogInfo?.id) {
              return dialogInfo.dialogInfo as PublicDialogEntity;
            }

            return dialog;
          });

          const sortedData = [...newDialogs].sort((a, b) => {
            return (
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
            );
          });

          return sortedData;
        });
      }
    }
  };

  subscribeToDialogEventsUseCase
    .execute(dialogUpdateHandler)
    .catch((reason) => {
      console.log(stringifyError(reason));
    });

  // eslint-disable-next-line @typescript-eslint/require-await

  const release = () => {
    useCaseSubscribeToDialogsUpdates.release();
  };

  const setWaitLoadingStatus = (status: boolean): void => {
    setLoading(status);
  };

  const getSenders = async (senders: number[]) => {
    const getUsers: GetUsersByIdsUseCase = new GetUsersByIdsUseCase(
      new UsersRepository(
        currentContext.storage.LOCAL_DATA_SOURCE,
        currentContext.storage.REMOTE_DATA_SOURCE,
      ),
      [...senders],
    );

    let userEntites: UserEntity[] = [];

    await getUsers
      .execute()
      // eslint-disable-next-line promise/always-return
      .then((data) => {
        // eslint-disable-next-line prefer-destructuring
        userEntites = data;
      })
      .catch((e) => {
        console.log('have ERROR get users :', JSON.stringify(e));
      });

    return userEntites;
  };

  const createDialog = async (
    dialogInfo: GroupDialogEntity,
  ): Promise<DialogEntity> => {
    const textInformationMessage = `${currentUserName} create the chat`;
    const createDialogUseCase: CreateDialogUseCase = new CreateDialogUseCase(
      eventMessageRepository,
      new DialogsRepository(
        currentContext.storage.LOCAL_DATA_SOURCE,
        remoteDataSourceMock,
      ),
      dialogInfo,
      textInformationMessage,
    );
    const resultDialog: DialogEntity = await createDialogUseCase
      .execute()
      .catch((e) => {
        console.log('EXCEPTION IN CREATE NEW DIALOG: ', stringifyError(e));
        setNewDialog(undefined);

        throw new Error(stringifyError(e));
      });

    if (resultDialog) {
      setNewDialog(resultDialog);

      return Promise.resolve(resultDialog);
    }

    return Promise.reject(resultDialog);
  };

  const updateDialog = async (
    // eslint-disable-next-line @typescript-eslint/no-shadow,@typescript-eslint/no-unused-vars
    dialog: GroupDialogEntity,
  ): Promise<DialogEntity> => {
    const textInformationMessage = `${currentUserName} has updated dialog`;
    const updateDialogUseCase: UpdateDialogUseCase = new UpdateDialogUseCase(
      eventMessageRepository,
      new DialogsRepository(
        currentContext.storage.LOCAL_DATA_SOURCE,
        remoteDataSourceMock,
      ),
      dialog,
      textInformationMessage,
    );

    const resultDialog: DialogEntity = await updateDialogUseCase
      .execute()
      .catch((e) => {
        console.log('Error updateDialogUseCase: ', stringifyError(e));
        throw new Error(stringifyError(e));
      });

    const { participantIds } = dialog;

    dialog.newParticipantIds?.forEach((item) => {
      if (!participantIds.includes(item)) {
        participantIds.push(item);
      }
    });

    const dialogForUpdate: GroupDialogEntity = {
      ...dialog,
      participantIds,
    };

    setNewDialog(dialogForUpdate as DialogEntity);

    return Promise.resolve(resultDialog);
  };

  const deleteDialog = async (
    // eslint-disable-next-line @typescript-eslint/no-shadow,@typescript-eslint/no-unused-vars
    dialogToDelete: GroupDialogEntity,
  ): Promise<boolean> => {
    let leaveResult = false;

    if (dialogToDelete.type === DialogType.private) {
      const textInformationMessage = `${currentUserName} has left dialog`;
      const leaveDialogUseCase: LeaveDialogUseCase = new LeaveDialogUseCase(
        eventMessageRepository,
        new DialogsRepository(
          currentContext.storage.LOCAL_DATA_SOURCE,
          remoteDataSourceMock,
        ),
        dialogToDelete,
        DialogLeaveType.delete,
        textInformationMessage,
      );

      leaveResult = await leaveDialogUseCase.execute().catch((e) => {
        console.log('Error leaveDialogUseCase: ', stringifyError(e));
        throw new Error(stringifyError(e));
      });
    } else {
      const usersForDeleteFromDialog: Array<number> = new Array<number>();

      const userToDeleteId: number =
        remoteDataSourceMock?.authInformation?.userId || 0;

      usersForDeleteFromDialog.push(userToDeleteId);
      const textInformationMessage = `${currentUserName} has left dialog`;
      const deleteUsersFromDialog: RemoveUsersFromTheDialogUseCase =
        new RemoveUsersFromTheDialogUseCase(
          eventMessageRepository,
          new DialogsRepository(
            currentContext.storage.LOCAL_DATA_SOURCE,
            remoteDataSourceMock,
          ),
          dialogToDelete,
          usersForDeleteFromDialog,
          textInformationMessage,
        );

      leaveResult = await deleteUsersFromDialog.execute().catch((e) => {
        console.log(
          'Error delete users from RemoveUsersFromDialogUseCase: ',
          stringifyError(e),
        );
        throw new Error(stringifyError(e));
      });
    }

    if (leaveResult) {
      return Promise.resolve(leaveResult);
    }

    return Promise.reject(leaveResult);
  };

  const removeMembers = async (dialog: GroupDialogEntity): Promise<boolean> => {
    let leaveResult = false;

    if (
      dialog.participantsToRemoveIds &&
      dialog.participantsToRemoveIds.length > 0
    ) {
      const usersToDelete: UserEntity[] = await getSenders(
        dialog.participantsToRemoveIds,
      );
      let userNames = '';

      usersToDelete.forEach((u) => {
        userNames += u.login || u.full_name || u.email;
      });
      const textInformationMessage = `${currentUserName} remove ${userNames}`;
      const deleteUsersFromDialog: RemoveUsersFromTheDialogUseCase =
        new RemoveUsersFromTheDialogUseCase(
          eventMessageRepository,
          new DialogsRepository(
            currentContext.storage.LOCAL_DATA_SOURCE,
            remoteDataSourceMock,
          ),
          dialog,
          dialog.participantsToRemoveIds,
          textInformationMessage,
        );

      leaveResult = await deleteUsersFromDialog.execute().catch((e) => {
        console.log(
          'Error delete users from RemoveUsersFromDialogUseCase: ',
          stringifyError(e),
        );
        throw new Error(stringifyError(e));
      });
    }

    if (leaveResult) {
      const dialogForUpdate: GroupDialogEntity = {
        ...dialog,
        participantIds: dialog.participantIds.filter(
          (item) => !dialog.participantsToRemoveIds?.includes(item),
        ),
      };

      setNewDialog(dialogForUpdate as DialogEntity);

      return Promise.resolve(leaveResult);
    }

    return Promise.reject(leaveResult);
  };

  const uploadFile = async (file: File): Promise<FileEntity> => {
    const fileEntity: FileEntity = Stubs.createFileEntityWithDefaultValues();

    fileEntity.data = file;
    fileEntity.uid = '';
    fileEntity.name = file.name;
    fileEntity.size = file.size;
    const uploadFileUseCase: UploadFileUseCase = new UploadFileUseCase(
      new FileRepository(
        currentContext.storage.LOCAL_DATA_SOURCE,
        remoteDataSourceMock,
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function
  function informDataSources(item: DialogEntity) {
    const updateCurrentDialogInDataSourceUseCase: UpdateCurrentDialogInDataSourceUseCase =
      new UpdateCurrentDialogInDataSourceUseCase(
        new DialogsRepository(
          currentContext.storage.LOCAL_DATA_SOURCE,
          remoteDataSourceMock,
        ),
        item as GroupDialogEntity,
      );

    updateCurrentDialogInDataSourceUseCase.execute().catch((e) => {
      console.log(
        'Error updateCurrentDialogInDataSourceUseCase: ',
        stringifyError(e),
      );
      throw new Error(stringifyError(e));
    });
  }

  return {
    get entity(): DialogEntity {
      return newDialog as DialogEntity;
    },
    set entity(item) {
      setNewDialog(item);
      informDataSources(item);
    },
    dialogs,
    loading,
    error,
    pagination,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    getDialogs,
    release,
    createDialog,
    updateDialog,
    deleteDialog,
    uploadFile,
    removeMembers,
    setWaitLoadingStatus,
  };
}
