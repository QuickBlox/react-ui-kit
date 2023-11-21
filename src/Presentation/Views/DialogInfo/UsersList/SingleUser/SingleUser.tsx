import React from 'react';
import './SingleUser.scss';
import { UserEntity } from '../../../../../Domain/entity/UserEntity';
import ActiveSvg from '../../../../components/UI/svgs/ActiveSvg/ActiveSvg';
import User from '../../../../components/UI/svgs/Icons/Contents/User';

type UserSingleProps = {
  user: UserEntity;
  keyValue?: number;
};
// eslint-disable-next-line react/function-component-definition,@typescript-eslint/no-unused-vars
const UserSingle: React.FC<UserSingleProps> = ({ user, keyValue }) => {
  return (
    <div className="user-single-container--wrapper">
      <div className="user-single-container--wrapper__icon">
        <ActiveSvg
          content={
            <div className="user-single-container--wrapper__icon__content">
              <User
                width="26"
                height="26"
                applyZoom
                color="var(--disabled-elements)"
              />
            </div>
          }
          clickAction={() => {
            console.log('user click...');
          }}
          touchAction={() => {
            console.log('user touch...');
          }}
        />
      </div>
      <div key={keyValue} className="user-single-container--wrapper__username">
        {user?.full_name || user?.login || user?.email || user?.id}
      </div>
    </div>
  );
};

export default UserSingle;
