import { useState } from 'react';
import { QBDataContextType } from '../../components/providers/QuickBloxUIKitProvider/QuickBloxUIKitProvider';
import { Pagination } from '../../../Domain/repository/Pagination';
import { DialogsViewModel } from './DialogViewModel';
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

export default function useDialogsViewModel(
  currentContext: QBDataContextType,
  initPagination?: Pagination,
): DialogsViewModel {
  console.log('3.1. useDialogsViewModel');
  const startPagination: Pagination = initPagination || new Pagination();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [pagination, setPagination] = useState<Pagination>(startPagination);
  const [dialogs, setDialogs] = useState<PublicDialogEntity[]>([]);
  const [newDialog, setNewDialog] = useState<DialogEntity>();

  // const currentContext = useQbDataContext();
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

  const dialogUpdateHandler = (dialogInfo: DialogEventInfo) => {
    console.log('call dialogUpdateHandler in useDialogsViewModel');
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
            setNewDialog(updatedDialog);
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

  // eslint-disable-next-line @typescript-eslint/require-await
  async function getDialogs(currentPagination: Pagination) {
    console.log('getDialogs in useDialogsViewModel');
    console.log(
      'EXECUTE USE CASES GET DIALOG WITH PAGINATION: ',
      JSON.stringify(currentPagination),
    );
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
        console.log('EXECUTE COMPLETED: ', JSON.stringify(currentPagination));
        setDialogs([...(result.ResultData as PublicDialogEntity[])]);
        setLoading(false);
        setPagination(result.CurrentPagination);
      })
      .catch((e) => {
        console.log('call catch....', JSON.stringify(e));
        setError(`${(e as unknown as Error).message}`);
        setLoading(false);
      });
    await useCaseSubscribeToDialogsUpdates?.execute((data) => {
      try {
        console.log('3.SUBSCRIBE EXECUTE in useDialogsViewModel:', data);
        setDialogs([...(data as PublicDialogEntity[])]);
        setLoading(false);
        setError('');
      } catch (e) {
        console.log('catch error2');
        setError('ERROR2!!!');
      }
    });
  }

  const release = () => {
    useCaseSubscribeToDialogsUpdates.release();
  };

  const createDialog = async (
    dialogInfo: GroupDialogEntity,
  ): Promise<DialogEntity> => {
    console.log(
      'call createDialog in use case with params: ',
      JSON.stringify(dialogInfo),
    );

    const createDialogUseCase: CreateDialogUseCase = new CreateDialogUseCase(
      eventMessageRepository,
      new DialogsRepository(
        currentContext.storage.LOCAL_DATA_SOURCE,
        remoteDataSourceMock,
      ),
      dialogInfo,
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
    const updateDialogUseCase: UpdateDialogUseCase = new UpdateDialogUseCase(
      eventMessageRepository,
      new DialogsRepository(
        currentContext.storage.LOCAL_DATA_SOURCE,
        remoteDataSourceMock,
      ),
      dialog,
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
      const leaveDialogUseCase: LeaveDialogUseCase = new LeaveDialogUseCase(
        eventMessageRepository,
        new DialogsRepository(
          currentContext.storage.LOCAL_DATA_SOURCE,
          remoteDataSourceMock,
        ),
        dialogToDelete,
        DialogLeaveType.delete,
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
      const deleteUsersFromDialog: RemoveUsersFromTheDialogUseCase =
        new RemoveUsersFromTheDialogUseCase(
          eventMessageRepository,
          new DialogsRepository(
            currentContext.storage.LOCAL_DATA_SOURCE,
            remoteDataSourceMock,
          ),
          dialogToDelete,
          usersForDeleteFromDialog,
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
      const deleteUsersFromDialog: RemoveUsersFromTheDialogUseCase =
        new RemoveUsersFromTheDialogUseCase(
          eventMessageRepository,
          new DialogsRepository(
            currentContext.storage.LOCAL_DATA_SOURCE,
            remoteDataSourceMock,
          ),
          dialog,
          dialog.participantsToRemoveIds,
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

  return {
    get entity(): DialogEntity {
      return newDialog as DialogEntity;
    },
    set entity(item) {
      setNewDialog(item);
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
  };
}
