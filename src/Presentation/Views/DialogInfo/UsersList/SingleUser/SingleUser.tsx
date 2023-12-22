import React from 'react';
import './SingleUser.scss';
import { UserEntity } from '../../../../../Domain/entity/UserEntity';
import User from '../../../../components/UI/svgs/Icons/Contents/User';

type UserSingleProps = {
  user: UserEntity;
  keyValue?: number;
};
// eslint-disable-next-line react/function-component-definition,@typescript-eslint/no-unused-vars
const UserSingle: React.FC<UserSingleProps> = ({ user, keyValue }) => {
  return (
    <div className="list-single-user">
      <div className="list-single-user-avatar">
        <div className="list-single-user-avatar-rectangle" />
        <div className="list-single-user-avatar-ellipse" />
        <div className="list-single-user-contents-user">
          <User
            width="26"
            height="26"
            applyZoom
            color="var(--tertiary-elements)"
          />
        </div>
      </div>
      <div className="list-single-user-subtitle">
        {user?.full_name || user?.login || user?.email || user?.id}
      </div>
    </div>
  );
};

export default UserSingle;
