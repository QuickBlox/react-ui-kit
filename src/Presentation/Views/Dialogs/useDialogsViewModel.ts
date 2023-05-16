import { useState } from 'react';
import { PublicDialogEntity } from '../../../Domain/entity/PublicDialogEntity';
import { GetAllDialogsUseCase } from '../../../Domain/use_cases/GetAllDialogsUseCase';
import { SubscribeToDialogsUpdatesUseCase } from '../../../Domain/use_cases/SubscribeToDialogsUpdatesUseCase';
import { DialogEntity } from '../../../Domain/entity/DialogEntity';
import useQbDataContext from '../../components/providers/QuickBloxUIKitProvider/useQbDataContext';
import { DialogsViewModel } from './DialogViewModel';
import DialogsRepository from '../../../Data/repository/DialogsRepository';
import { GroupDialogEntity } from '../../../Domain/entity/GroupDialogEntity';
import { FileEntity } from '../../../Domain/entity/FileEntity';

export default function useDialogsViewModel(): DialogsViewModel {
  console.log('useDialogsViewModel');
  const currentContext = useQbDataContext(); // React.useContext(dataContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dialogs, setDialogs] = useState<PublicDialogEntity[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [newDialog, setNewDialog] = useState<DialogEntity>();

  const getAllUseCaseInit: GetAllDialogsUseCase = new GetAllDialogsUseCase(
    new DialogsRepository(
      currentContext.storage.LOCAL_DATA_SOURCE,
      currentContext.storage.REMOTE_DATA_SOURCE,
    ),
  );

  const [useCaseGetAllDialogs] =
    useState<GetAllDialogsUseCase>(getAllUseCaseInit);

  const subscribeToUpdatesUseCaseInit: SubscribeToDialogsUpdatesUseCase =
    new SubscribeToDialogsUpdatesUseCase(
      new DialogsRepository(
        currentContext.storage.LOCAL_DATA_SOURCE,
        currentContext.storage.REMOTE_DATA_SOURCE,
      ),
    );
  const [useCaseSubscribeToDialogsUpdates] =
    useState<SubscribeToDialogsUpdatesUseCase>(subscribeToUpdatesUseCaseInit);

  // eslint-disable-next-line @typescript-eslint/require-await
  async function getDialogs() {
    console.log('getDialogs');
    setLoading(true);

    //
    // const result = await useCaseGetAllDialogs?.execute();

    useCaseGetAllDialogs
      ?.execute()
      // eslint-disable-next-line promise/always-return
      .then((result) => {
        console.log('states: ', useCaseGetAllDialogs);
        setDialogs([...(result as PublicDialogEntity[])]);
        setLoading(false);
      })
      .catch(() => {
        console.log('call catch....');
        setError('ERROR!!!');
        setLoading(false);
      });

    //

    await useCaseSubscribeToDialogsUpdates?.execute((data) => {
      try {
        console.log('3.SUBSCRIBE EXECUTE in useDialogsViewModel:', data);
        // throw new Error('Error!!!');
        setDialogs([...(data as PublicDialogEntity[])]);
        setLoading(false);
        setError('');
      } catch (e) {
        console.log('catch error2');
        setError('ERROR2!!!');
      }
    });
  }

  const createDialog = (dialogInfo: GroupDialogEntity) => {
    console.log(JSON.stringify(dialogInfo));

    return Promise.reject(dialogInfo);
  };

  const updateDialog = async (
    // eslint-disable-next-line @typescript-eslint/no-shadow,@typescript-eslint/no-unused-vars
    dialogToUpdate: GroupDialogEntity,
  ): Promise<DialogEntity> => {
    return Promise.reject(newDialog);
  };

  const deleteDialog = async (
    // eslint-disable-next-line @typescript-eslint/no-shadow,@typescript-eslint/no-unused-vars
    dialogToDelete: GroupDialogEntity,
  ): Promise<boolean> => {
    return Promise.reject(newDialog);
  };

  const release = () => {
    useCaseSubscribeToDialogsUpdates.release();
  };

  const removeMembers = async (dialog: GroupDialogEntity): Promise<boolean> => {
    console.log('call removeMembers(), dialog: ', dialog);

    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject('');
  };

  const uploadFile = (file: File): Promise<FileEntity> => {
    console.log('call uploadFile(), file: ', file);

    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject('');
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
