import { useState } from 'react';
import { DialogEntity } from '../../../../Domain/entity/DialogEntity';
import useQbInitializedDataContext from '../../../providers/QuickBloxUIKitProvider/useQbInitializedDataContext';
import { UserEntity } from '../../../../Domain/entity/UserEntity';
import { UsersListViewModel } from './UsersListViewModel';
import { GetUsersByIdsUseCase } from '../../../../Domain/use_cases/GetUsersByIdsUseCase';
import UsersRepository from '../../../../Data/repository/UsersRepository';
import { DialogType } from '../../../../Domain/entity/DialogTypes';
import { GroupDialogEntity } from '../../../../Domain/entity/GroupDialogEntity';
import { PrivateDialogEntity } from '../../../../Domain/entity/PrivateDialogEntity';
import { DefaultConfigurations } from '../../../../Data/DefaultConfigurations';

export default function useUsersListViewModel(
  dialogEntity?: DialogEntity,
): UsersListViewModel {
  console.log('create useUsersListViewModel');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('error with getting user list');
  const [users, setUsers] = useState<UserEntity[]>([]);
  const [dialog, setDialog] = useState<DialogEntity | undefined>(dialogEntity);

  const currentContext = useQbInitializedDataContext();
  const QBConfig =
    currentContext.InitParams.qbConfig ||
    DefaultConfigurations.getDefaultQBConfig();
  const { regexUserName } = QBConfig.appConfig;
  const regex = regexUserName ? new RegExp(regexUserName) : null;

  function logData(message: string, data: any) {
    console.log(`${message} :`, JSON.stringify(data));
  }
  function handleSuccessfulFetch(participants: Array<number>, data: any) {
    logData('have getUsers', data);
    logData('have idis', participants);
    setUsers([...data]);
    setLoading(false);
    setError('');
  }

  function handleFailedFetch(errorMessage: string) {
    logData('have ERROR get users', errorMessage);
    setLoading(false);
    setError(errorMessage);
  }

  async function getUsersData(participants: Array<number>) {
    const usersRepository = new UsersRepository(
      currentContext.storage.LOCAL_DATA_SOURCE,
      currentContext.storage.REMOTE_DATA_SOURCE,
    );
    const getUsersByIdsUseCase = new GetUsersByIdsUseCase(
      usersRepository,
      participants,
    );
    const data = await getUsersByIdsUseCase.execute();

    return data;
  }
  async function fetchUsersData(participants: Array<number>) {
    setLoading(true);
    try {
      const data = await getUsersData(participants);
      //
      const tmpItems: UserEntity[] = [];

      for (let i = 0; i < data.length; i += 1) {
        const u = data[i];
        const regexResult = u.full_name && regex && regex.test(u.full_name);

        if (!regexResult) {
          u.full_name = 'Unknown';
        }
        tmpItems.push(u);
      }

      //
      handleSuccessfulFetch(participants, tmpItems);
    } catch (er) {
      const errorMessage = (er as Error).message;

      handleFailedFetch(errorMessage);
    }
  }
  async function getUsers() {
    console.log('call getUsers in useUsersListViewModel');
    const participants: Array<number> =
      // eslint-disable-next-line no-nested-ternary
      dialog?.type === DialogType.group
        ? (dialog as GroupDialogEntity).participantIds
        : dialog?.type === DialogType.private
        ? [(dialog as PrivateDialogEntity).participantId]
        : [];

    await fetchUsersData(participants);
    console.log('EXECUTE USE CASES getUsers');
  }
  async function getUserById(id: number): Promise<UserEntity> {
    const response = await getUsersData([id]);

    return Promise.resolve(response[0]);
  }

  const release = () => {
    console.log('call release in useUsersListViewModel');
  };

  return {
    get entity(): DialogEntity {
      return dialog!;
    },
    set entity(newDialog) {
      setDialog(newDialog);
    },
    users,
    loading,
    error,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    getUsers,
    getUserById,
    release,
  };
}
