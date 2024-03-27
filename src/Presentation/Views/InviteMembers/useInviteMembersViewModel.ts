import { useState } from 'react';
import { InviteMembersViewModel } from './InviteMembersViewModel';
import {
  PaginatedResult,
  Pagination,
} from '../../../Domain/repository/Pagination';
import { UserEntity } from '../../../Domain/entity/UserEntity';
import { GetAllUsersUseCase } from '../../../Domain/use_cases/GetAllUsersUseCase';
import UsersRepository from '../../../Data/repository/UsersRepository';
import useQbInitializedDataContext from '../../providers/QuickBloxUIKitProvider/useQbInitializedDataContext';
import { Stubs } from '../../../Data/Stubs';
import { stringifyError } from '../../../utils/parse';
import {
  NOT_FOUND_REMOTE_DATASOURCE_EXCEPTION_CODE,
  RemoteDataSourceException,
} from '../../../Data/source/exception/RemoteDataSourceException';
import { DefaultConfigurations } from '../../../Data/DefaultConfigurations';

export default function useInviteMembersViewModel(): InviteMembersViewModel {
  // initPagination?: Pagination,
  const currentContext = useQbInitializedDataContext();
  const QBConfig =
    currentContext.InitParams.qbConfig ||
    DefaultConfigurations.getDefaultQBConfig();
  const { regexUserName } = QBConfig.appConfig;
  const regex = regexUserName ? new RegExp(regexUserName) : null;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('error with getting user list');

  const startPagination: Pagination = new Pagination(0, 0);
  const [pagination, setPagination] = useState<Pagination>(startPagination);
  const [users, setUsers] = useState<UserEntity[]>([]);
  const [filter, setFilter] = useState<string>('');

  function updateFilter(newFilter: string) {
    setFilter(newFilter);
    setPagination(startPagination);
  }

  async function getUsers(currentPagination: Pagination) {
    console.log('call getUsers in useInviteMembersViewModel');
    console.log('currentPagination: ', JSON.stringify(currentPagination));
    console.log('pagination: ', JSON.stringify(pagination));

    console.log('after return call getUsers');
    setLoading(true);
    const allUsersUseCase: GetAllUsersUseCase = new GetAllUsersUseCase(
      new UsersRepository(
        currentContext.storage.LOCAL_DATA_SOURCE,
        currentContext.storage.REMOTE_DATA_SOURCE,
      ),
      currentPagination,
      filter,
    );

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    await allUsersUseCase
      .execute()
      // eslint-disable-next-line promise/always-return
      .then((data: PaginatedResult<UserEntity>) => {
        console.log('HAVE PAGINATED RESULT:', JSON.stringify(data.ResultData));
        setError('');
        setLoading(false);
        setPagination(data.CurrentPagination);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        setUsers((prevState) => {
          let newItems: UserEntity[] = [];

          if (regexUserName && regexUserName.length > 0) {
            // work
            const filteredUsers: UserEntity[] = data.ResultData.reduce(
              (userList: UserEntity[], u: UserEntity) => {
                if (!regex || regex.test(u.full_name)) {
                  userList.push(u);
                }

                return userList;
              },
              [],
            );

            newItems =
              currentPagination.getCurrentPage() === 0
                ? [...filteredUsers]
                : [...prevState, ...filteredUsers];
          } else {
            newItems =
              currentPagination.getCurrentPage() === 0
                ? [...data.ResultData]
                : [...prevState, ...data.ResultData];
          }

          return newItems;
        });
      })
      .catch((e) => {
        console.log('have ERROR get all users :', JSON.stringify(e));
        if (
          (e as RemoteDataSourceException).code ===
          NOT_FOUND_REMOTE_DATASOURCE_EXCEPTION_CODE
        ) {
          setError('');
        } else {
          setError(stringifyError(e));
        }
        setLoading(false);
        setUsers([]);
      });
    console.log('EXECUTE USE CASES getUsers');
  }

  const release = () => {
    console.log('call release in useUsersListViewModel');
  };

  return {
    get entity(): UserEntity {
      return Stubs.createUserEntityWithParams(0, '', '', '', '', '', 0, '', '');
    },
    // id: Date.now(),
    // name: '',
    users,
    loading,
    error,
    pagination,
    filter,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    getUsers,
    release,
    updateFilter,
  };
}
