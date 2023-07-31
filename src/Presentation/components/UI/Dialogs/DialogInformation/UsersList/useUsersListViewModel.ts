import { useState } from 'react';
import { DialogEntity } from '../../../../../../Domain/entity/DialogEntity';
import useQbInitializedDataContext from '../../../../providers/QuickBloxUIKitProvider/useQbInitializedDataContext';
import { UserEntity } from '../../../../../../Domain/entity/UserEntity';
import { UsersListViewModel } from './UsersListViewModel';
import { GetUsersByIdsUseCase } from '../../../../../../Domain/use_cases/GetUsersByIdsUseCase';
import UsersRepository from '../../../../../../Data/repository/UsersRepository';
import { DialogType } from '../../../../../../Domain/entity/DialogTypes';
import { GroupDialogEntity } from '../../../../../../Domain/entity/GroupDialogEntity';
import { PrivateDialogEntity } from '../../../../../../Domain/entity/PrivateDialogEntity';

export default function useUsersListViewModel(
  dialogEntity: DialogEntity,
): UsersListViewModel {
  console.log('create useUsersListViewModel');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('error with getting user list');
  const [users, setUsers] = useState<UserEntity[]>([]);
  const [dialog, setDialog] = useState<DialogEntity>(dialogEntity);

  const currentContext = useQbInitializedDataContext();

  async function getUsers() {
    console.log('call getUsers in useUsersListViewModel');
    let participants: Array<number> = [];

    if (dialog && dialog?.type === DialogType.group) {
      participants = (dialog as GroupDialogEntity).participantIds;
    } else if (dialog && dialog?.type === DialogType.private) {
      participants = [(dialog as PrivateDialogEntity).participantId];
    } else if (dialog && dialog?.type === DialogType.public) {
      participants = [];
    }
    setLoading(true);
    const initAllUsersByIdsUseCase: GetUsersByIdsUseCase =
      new GetUsersByIdsUseCase(
        new UsersRepository(
          currentContext.storage.LOCAL_DATA_SOURCE,
          currentContext.storage.REMOTE_DATA_SOURCE,
        ),
        participants,
      );

    await initAllUsersByIdsUseCase
      .execute()
      // eslint-disable-next-line promise/always-return
      .then((data) => {
        console.log('have getUsers :', JSON.stringify(data));
        console.log('have idis :', JSON.stringify(participants));
        setUsers([...data]);
        setLoading(false);
        setError('');
      })
      .catch((e) => {
        console.log('have ERROR get users :', JSON.stringify(e));
        setLoading(false);
        setError((e as unknown as Error).message);
      });

    console.log('EXECUTE USE CASES getUsers');
  }

  const release = () => {
    console.log('call release in useUsersListViewModel');
  };

  return {
    get entity(): DialogEntity {
      return dialog;
    },
    set entity(newDialog) {
      setDialog(newDialog);
    },
    users,
    loading,
    error,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    getUsers,
    release,
  };
}
