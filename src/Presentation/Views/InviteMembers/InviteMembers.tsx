import React, { useEffect, useRef, useState } from 'react';
import './InviteMembers.scss';
import ColumnContainer from '../../components/containers/ColumnContainer/ColumnContainer';
import RowRightContainer from '../../components/containers/RowRightContainer/RowRightContainer';
import MainButton, {
  TypeButton,
} from '../../components/UI/Buttons/MainButton/MainButton';
import ErrorComponent from '../../components/UI/Placeholders/ErrorComponent/ErrorComponent';
import { InviteMembersViewModel } from './InviteMembersViewModel';
import useInviteMembersViewModel from './useInviteMembersViewModel';
import { Pagination } from '../../../Domain/repository/Pagination';
import ScrollableContainer from '../../components/containers/ScrollableContainer/ScrollableContainer';
import { UserEntity } from '../../../Domain/entity/UserEntity';
import { FunctionTypeVoidToVoid } from '../../../CommonTypes/BaseViewModel';
import { DialogType } from '../../../Domain/entity/DialogTypes';
import NotFoundContent from './NotFoundContent/NotFoundContent';
import { OpenDialogArcheType, TypeOpenDialog } from '../EditDialog/EditDialog';
import { Loader, UserListItem } from '../../ui-components';
import { SearchSvg } from '../../icons';
import TextField from '../../ui-components/TextField/TextField';
import cn from 'classnames';

type SelectedItemInfo = { isChecked: boolean; userid: number };

export type FunctionTypeUserEntitiesToVoid = (
  userIdsForInvite: number[],
  usersIdsForRemove: number[],
) => void;

type InviteMembersProps = {
  typeDialog: DialogType;
  idOwnerDialog: string;
  typeAddEditDialog: OpenDialogArcheType;
  applyInviteUsersHandler: FunctionTypeUserEntitiesToVoid;
  participants?: number[];
  cancelInviteMembersHandler?: FunctionTypeVoidToVoid;
};
// eslint-disable-next-line react/function-component-definition,@typescript-eslint/no-unused-vars
const InviteMembers = ({
  typeDialog,
  idOwnerDialog,
  typeAddEditDialog,
  applyInviteUsersHandler,
  participants,
  cancelInviteMembersHandler,
}: InviteMembersProps) => {
  const userPerPage = 12;
  const userViewModel: InviteMembersViewModel = useInviteMembersViewModel();

  const initRecord: Record<number, SelectedItemInfo> = {};

  if (participants?.length && participants?.length > 0) {
    participants.forEach((item) => {
      initRecord[item] = { isChecked: true, userid: item };
    });
  }

  const [selectedItems, setSelectedItems] =
    React.useState<Record<number, SelectedItemInfo>>(initRecord);
  const [countSelectedItems, setCountSelected] = React.useState(
    participants ? participants?.length : 0,
  );

  useEffect(() => {
    userViewModel.getUsers(new Pagination(0, userPerPage));
  }, []);

  useEffect( () => {
    setCountSelected(getUsersForIncludeInDialog().length);
  }, [Object.entries(selectedItems).length])

  const fetchMoreData = () => {
    if (userViewModel.pagination.hasNextPage()) {
      const newPagination = userViewModel.pagination;

      newPagination.perPage = userPerPage;
      newPagination.nextPage();

      userViewModel.getUsers(newPagination);
    }
  };
  const getUsersForIncludeInDialog = () => {
    const listSelectedUsers: number[] = [];

    Object.entries(selectedItems).map((x) => {
      if (x[1].isChecked) {
        listSelectedUsers.push(x[1].userid);
      }

      return x[1].isChecked;
    });

    return listSelectedUsers;
  };

  const getUsersForExcludedFromDialog = () => {
    const listExcludedUsers: number[] = [];

    Object.entries(selectedItems).map((x) => {
      if (!x[1].isChecked) {
        listExcludedUsers.push(x[1].userid);
      }

      return x[1].isChecked;
    });

    return listExcludedUsers;
  };

  const containsSelectedUser = (id: number) => {
    let result = false;

    const r = Object.entries(selectedItems).findIndex(
      (x) => x[1].userid === id && x[1].isChecked,
    );

    if (r >= 0) {
      result = true;
    }

    return result;
  };

  const getDisabledStatus = (user: UserEntity) => {
    if (user.id.toString() === idOwnerDialog) {
      return true;
    }
    if (
      typeDialog === DialogType.private &&
      getUsersForIncludeInDialog().length >= 1 &&
      !containsSelectedUser(user.id)
    ) {
      return true;
    }

    return false;
  };

  const handleUserListItemChange = (userId: number, value: boolean) => {
    setSelectedItems((prevState) => {
      const updatedState = { ...prevState, [userId]: { isChecked: value, userid: userId } };

      Object.keys(updatedState).forEach((key) => {
        if (!updatedState[Number(key)].isChecked) {
          delete updatedState[Number(key)];
        }
      });

      return updatedState;
    });
  };

  const [userNameForFilter, setUserNameForFilter] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (userNameForFilter.length > 2) {
      const newFilter: string = userNameForFilter;

      userViewModel.updateFilter(newFilter);
    }

    setTimeout(() => inputRef.current?.focus(), 500);

    if (userNameForFilter.length === 0) {
      userViewModel.updateFilter('');
    }
  }, [userNameForFilter]);

  useEffect(() => {
    if (userNameForFilter.length > 2) {
      userViewModel.getUsers(new Pagination(0, userPerPage));
    }

    setTimeout(() => inputRef.current?.focus(), 500);

    if (userNameForFilter.length === 0) {
      userViewModel.getUsers(new Pagination(0, userPerPage));
    }
  }, [userViewModel.filter]);

  return (
    <ColumnContainer gapBetweenItem="8px">
      <div className="container-invite-members">
        <div className="container-invite-members--add-members-container">
          <div className="container-invite-members--add-members-container--wrapper">
            <TextField
              ref={inputRef}
              className="filtered-text-field"
              disabled={userViewModel.loading}
              placeholder="Search"
              icon={<SearchSvg className="filtered-text-field__icon" />}
              value={userNameForFilter}
              onChange={(value) => {
                setUserNameForFilter(value);
              }}
            />
            <div className= {cn("container-invite-members--add-members-container--wrapper__inf", {
              "disabled" : countSelectedItems < 1
            })}>
              {countSelectedItems} selected
            </div>
            <div className="container-invite-members--add-members-container--wrapper__members">
              <ColumnContainer>
                {userViewModel?.loading && (
                  <div className="container-invite-members--add-members-container--loader">
                    <div
                      style={{
                        height: '44px',
                        width: '44px',
                      }}
                    >
                      <Loader
                        size="md"
                        className="container-invite-members-loader"
                      />
                    </div>
                  </div>
                )}
                {userViewModel?.error && !userViewModel?.loading && (
                  <ErrorComponent
                    title={userViewModel?.error}
                    ClickActionHandler={() => {
                      alert('call click retry');
                    }}
                  />
                )}
                {userViewModel.users && userViewModel.users.length > 0 ? (
                  <ScrollableContainer
                    className="container-invite-members--add-members-container--wrapper__members__list"
                    data={userViewModel.users}
                    renderItem={(user) =>
                      user.id.toString() !== idOwnerDialog ? (
                        <UserListItem
                          userName={user.full_name}
                          key={user.id}
                          avatarUrl={user.photo!}
                          checked={selectedItems[user.id]?.isChecked || false}
                          onChange={(value: boolean) =>
                            handleUserListItemChange(user.id, value)
                          }
                          disabled={getDisabledStatus(user)}
                        />
                      ) : null
                    }
                    onEndReached={fetchMoreData}
                    onEndReachedThreshold={0.8}
                    refreshing={false}
                  />
                ) : (
                  <div className="container-invite-members--add-members-container--wrapper__members__empty-members">
                    <NotFoundContent message="There are no members" />
                  </div>
                )}
              </ColumnContainer>
            </div>
          </div>
          <div className="container-invite-members--btn-container">
            <RowRightContainer
              minHeightContainer="32px"
              gapBetweenItem="8px"
              RightContainerSize={{
                flexBasis: '63px',
                minWidth: '63px',
                maxWidth: '63px',
                minHeight: '32px',
                maxHeight: '32px',
              }}
              RightItem={
                <div>
                  <MainButton
                    title={
                      typeAddEditDialog === TypeOpenDialog.create
                        ? 'Create'
                        : 'Save'
                    }
                    typeButton={TypeButton.default}
                    disabled={
                      typeDialog === DialogType.private &&
                      getUsersForIncludeInDialog().length <= 0
                    }
                    clickHandler={() => {
                      const listUsersForInvite: number[] =
                        getUsersForIncludeInDialog();
                      const listUsersForRemove: number[] =
                        getUsersForExcludedFromDialog();

                      if (applyInviteUsersHandler) {
                        applyInviteUsersHandler(
                          listUsersForInvite,
                          listUsersForRemove,
                        );
                      }
                    }}
                  />
                </div>
              }
              CenterContainerSize={{
                flexBasis: '78px',
                minWidth: '78px',
                maxWidth: '78px',
                minHeight: '32px',
                maxHeight: '32px',
              }}
              CenterItem={
                <div>
                  <MainButton
                    title="Cancel"
                    typeButton={TypeButton.outlined}
                    clickHandler={() => {
                      if (cancelInviteMembersHandler) {
                        cancelInviteMembersHandler();
                      }
                    }}
                  />
                </div>
              }
            />
          </div>
        </div>
      </div>
    </ColumnContainer>
  );
};

export default InviteMembers;
