import React, { useEffect, useState } from 'react';
import './InviteMembers.scss';
import ColumnContainer from '../../../containers/ColumnContainer/ColumnContainer';
import RowRightContainer from '../../../containers/RowRightContainer/RowRightContainer';
import MainButton, { TypeButton } from '../../Buttons/MainButton/MainButton';
import Search from '../../svgs/Icons/Navigation/Search';
import LoaderComponent from '../../Placeholders/LoaderComponent/LoaderComponent';
import ErrorComponent from '../../Placeholders/ErrorComponent/ErrorComponent';
import { InviteMembersViewModel } from './InviteMembersViewModel';
import useInviteMembersViewModel from './useInviteMembersViewModel';
import { Pagination } from '../../../../../Domain/repository/Pagination';
import ScrollableContainer from '../../../containers/ScrollableContainer/ScrollableContainer';
import { UserEntity } from '../../../../../Domain/entity/UserEntity';
import SingleUserWithCheckBox from './InviteUsersList/SingleUserWithCheckBox/SingleUserWithCheckBox';
import { FunctionTypeVoidToVoid } from '../../../../Views/Base/BaseViewModel';
import { DialogType } from '../../../../../Domain/entity/DialogTypes';
import NotFoundContent from './NotFoundContent/NotFoundContent';
import Remove from '../../svgs/Icons/Actions/Remove';
import { OpenDialogArcheType, TypeOpenDialog } from '../EditDialog/EditDialog';

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
const InviteMembers: React.FC<InviteMembersProps> = ({
  typeDialog,
  idOwnerDialog,
  typeAddEditDialog,
  applyInviteUsersHandler,
  participants,
  cancelInviteMembersHandler,
}) => {
  const userperPage = 12;
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
    userViewModel.getUsers(new Pagination(0, userperPage));
  }, []);

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

  const userSelectedHandler = (item: UserEntity, checkedStatus: boolean) => {
    const newItems = selectedItems;

    newItems[item.id] = { isChecked: checkedStatus, userid: item.id };
    setSelectedItems(newItems);
    const countCheckedUsers = getUsersForIncludeInDialog().length;

    setCountSelected(countCheckedUsers);
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const renderUserComponent = (user: UserEntity, index: number) => {
    const checkedValue = selectedItems[user.id]?.isChecked || false;

    if (user.id.toString() !== idOwnerDialog) {
      return (
        <SingleUserWithCheckBox
          user={user}
          checkedHandler={userSelectedHandler}
          isElementChecked={checkedValue}
          keyValue={user.id}
          isDisabled={getDisabledStatus(user)}
        />
      );
    }

    return null;
  };

  const fetchMoreData = () => {
    if (userViewModel.pagination.hasNextPage()) {
      const newPagination = userViewModel.pagination;

      newPagination.perPage = 12;
      newPagination.nextPage();

      userViewModel.getUsers(newPagination);
    }
  };

  const [userNameForFilter, setUserNameForFilter] = useState<string>('');

  useEffect(() => {
    if (userNameForFilter.length > 2) {
      const newFilter: string = userNameForFilter;

      userViewModel.updateFilter(newFilter);
    }
    if (userNameForFilter.length === 0) {
      userViewModel.updateFilter('');
    }
  }, [userNameForFilter]);

  useEffect(() => {
    if (userNameForFilter.length > 2) {
      userViewModel.getUsers(new Pagination(0, userperPage));
    }
    if (userNameForFilter.length === 0) {
      userViewModel.getUsers(new Pagination(0, userperPage));
    }
  }, [userViewModel.filter]);

  return (
    <ColumnContainer gapBetweenItem="8px">
      <div className="container-invite-members">
        <div className="container-invite-members--add-members-container">
          <div className="container-invite-members--add-members-container--wrapper">
            <div className="container-invite-members--add-members-container--wrapper__dialog-name-input">
              <Search
                applyZoom
                width="24"
                height="24"
                color="var(--tertiary-elements)"
              />
              <input
                type="text"
                style={{ width: '268px' }}
                value={userNameForFilter}
                onChange={(event) => {
                  setUserNameForFilter(event.target.value);
                }}
                placeholder="Search"
              />
              {userNameForFilter.length > 0 ? (
                <div
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setUserNameForFilter('');
                  }}
                >
                  <Remove
                    width="24"
                    height="24"
                    color="var(--tertiary-elements)"
                  />
                </div>
              ) : null}
            </div>
            <div className="container-invite-members--add-members-container--wrapper__inf">
              {countSelectedItems} selected
            </div>
            <div className="container-invite-members--add-members-container--wrapper__members">
              <ColumnContainer>
                {userViewModel?.loading && (
                  <div
                    style={{
                      height: '44px',
                      width: '44px',
                    }}
                  >
                    <LoaderComponent width="44" height="44" />
                  </div>
                )}
                {userViewModel?.error && (
                  <ErrorComponent
                    title={userViewModel?.error}
                    ClickActionHandler={() => {
                      alert('call click retry');
                    }}
                  />
                )}
                {userViewModel.users && userViewModel.users.length > 0 ? (
                  <ScrollableContainer
                    data={userViewModel.users}
                    renderItem={renderUserComponent}
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
