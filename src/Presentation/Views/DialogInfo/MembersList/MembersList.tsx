import React, { useEffect, useState } from 'react';
import './MembersList.scss';
import { FunctionTypeVoidToVoid } from '../../../../CommonTypes/BaseViewModel';
import { UserEntity } from '../../../../Domain/entity/UserEntity';
import UsersList from '../UsersList/UsersList';
import Header from '../../../ui-components/Header/Header';
import { CloseSvg, SearchSvg } from '../../../icons';
import Badge from '../../../ui-components/Badge/Badge';
import { TextField } from '../../../ui-components';

type MembersListProps = {
  closeInformationHandler: FunctionTypeVoidToVoid;
  members: UserEntity[];
  maxHeight?: number;
};
// eslint-disable-next-line react/function-component-definition
const MembersList = ({
  closeInformationHandler,
  members,
  maxHeight = 0,
}: MembersListProps) => {
  const [userNameForFilter, setUserNameForFilter] = useState<string>('');
  const [membersListFilter, setMembersListFilter] = useState<UserEntity[]>([
    ...members,
  ]);

  useEffect(() => {
    if (userNameForFilter.length >= 3) {
      const newFilteredMembers = members.filter((item) =>
        item.full_name
          ? item.full_name
              .toUpperCase()
              .includes(userNameForFilter.toUpperCase(), 0)
          : false,
      );

      setMembersListFilter([...newFilteredMembers]);
    } else {
      setMembersListFilter([...members]);
    }
  }, [userNameForFilter]);

  return (
    <div className="members-container">
      <Header
        title="Members"
        badge={<Badge count={members.length} mute limit={9} />}
        className="members-container-header"
      >
        <CloseSvg
          onClick={closeInformationHandler}
          className="members-container-header-icon"
        />
      </Header>
      <TextField
        placeholder="Search"
        onChange={(value) => setUserNameForFilter(value)}
        value={userNameForFilter}
        icon={<SearchSvg className="members-container-text-field-icon" />}
        className="members-container-text-field"
      />
      <div className="members-container-members-list-wrapper">
        <UsersList
          maxHeight={maxHeight}
          usersFirstPageToView={[...membersListFilter]}
          allUsers={[...membersListFilter]}
          usersInDialogCount={membersListFilter.length}
        />
      </div>
    </div>
  );
};

export default MembersList;
