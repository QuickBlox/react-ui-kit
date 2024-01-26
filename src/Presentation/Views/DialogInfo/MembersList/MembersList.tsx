import React, { useEffect, useState } from 'react';
import './MembersList.scss';
import ActiveSvg from '../../../components/UI/svgs/ActiveSvg/ActiveSvg';
import Close from '../../../components/UI/svgs/Icons/Navigation/Close';
import { FunctionTypeVoidToVoid } from '../../../../CommonTypes/BaseViewModel';
import { UserEntity } from '../../../../Domain/entity/UserEntity';
import Search from '../../../components/UI/svgs/Icons/Navigation/Search';
import UsersList from '../UsersList/UsersList';

type MembersListProps = {
  closeInformationHandler: FunctionTypeVoidToVoid;
  members: UserEntity[];
  maxHeight?: number;
};
// eslint-disable-next-line react/function-component-definition
const MembersList: React.FC<MembersListProps> = ({
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
      <div className="members-container-header">
        <div className="members-container-header-left">
          <div className="members-container-header-left-headline">Members</div>
          <div className="members-container-header-left-headline-badge">
            <div className="members-container-header-left-headline-badge-value">
              {members.length}
            </div>
          </div>
        </div>
        <div className="members-container-header-icon">
          <ActiveSvg
            content={
              <Close
                width="24px"
                height="24px"
                applyZoom
                color="var(--secondary-elements)"
              />
            }
            onClick={closeInformationHandler}
          />
        </div>
      </div>
      <div className="members-container-search">
        <div className="members-container-search-text-field">
          <div className="members-container-search-text-field-f">
            <div className="members-container-search-text-field-f-left">
              <div className="members-container-search-text-field-f-left-icon">
                <Search
                  applyZoom
                  width="24"
                  height="24"
                  color="var(--tertiary-elements)"
                />
              </div>
              <div className="members-container-search-text-field-f-left-input">
                <input
                  type="text"
                  value={userNameForFilter}
                  onChange={(event) => {
                    setUserNameForFilter(event.target.value);
                  }}
                  placeholder="Search"
                />
              </div>
            </div>
            <div className="members-container-search-text-field-f-right" />
          </div>
        </div>
      </div>
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
