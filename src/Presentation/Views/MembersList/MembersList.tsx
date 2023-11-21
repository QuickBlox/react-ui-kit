import React, { useEffect, useState } from 'react';
import './MembersList.scss';
import ColumnContainer from '../../components/containers/ColumnContainer/ColumnContainer';
import ActiveSvg from '../../components/UI/svgs/ActiveSvg/ActiveSvg';
import Close from '../../components/UI/svgs/Icons/Navigation/Close';
import { FunctionTypeVoidToVoid } from '../../../CommonTypes/BaseViewModel';
import { UserEntity } from '../../../Domain/entity/UserEntity';
import Search from '../../components/UI/svgs/Icons/Navigation/Search';
import UsersList from '../DialogInfo/UsersList/UsersList';

type MembersListProps = {
  closeInformationHandler: FunctionTypeVoidToVoid;
  members: UserEntity[];
};
// eslint-disable-next-line react/function-component-definition
const MembersList: React.FC<MembersListProps> = ({
  closeInformationHandler,
  members,
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
      <ColumnContainer>
        <div className="members-container--members-information-wrapper">
          <div className="members-container--members-information-wrapper__members-information">
            Members
          </div>
          <div className="members-container--members-information-wrapper__members-information-count">
            {members.length}
          </div>
          <div className="members-container--members-information-wrapper__members-close">
            <ActiveSvg
              content={<Close applyZoom color="var(--secondary-elements)" />}
              clickAction={() => {
                if (closeInformationHandler) {
                  closeInformationHandler();
                }
              }}
            />
          </div>
        </div>
        <div className="members-container--members-search-wrapper">
          <div className="members-container--members-search-wrapper__search-member-input">
            <Search
              applyZoom
              width="24"
              height="24"
              color="var(--tertiary-elements)"
            />
            <input
              type="text"
              style={{ width: '280px' }}
              value={userNameForFilter}
              onChange={(event) => {
                setUserNameForFilter(event.target.value);
              }}
              placeholder="Search"
            />
          </div>
        </div>
        <div className="members-container--members-list-wrapper">
          <UsersList
            usersFirstPageToView={[...membersListFilter]}
            allUsers={[...membersListFilter]}
            usersInDialogCount={membersListFilter.length}
          />
        </div>
      </ColumnContainer>
    </div>
  );
};

export default MembersList;
