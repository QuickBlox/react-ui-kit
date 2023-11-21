import React from 'react';
import './UserAvatar.scss';
import { IconTheme } from '../../../components/UI/svgs/Icons/IconsCommonTypes';
import ActiveSvg from '../../../components/UI/svgs/ActiveSvg/ActiveSvg';
import Remove from '../../../components/UI/svgs/Icons/Actions/Remove';
import { FunctionTypeVoidToVoid } from '../../../../CommonTypes/BaseViewModel';

type UserAvatarProps = {
  urlAvatar: string;
  iconTheme?: IconTheme;
  clickRemoveAvatarHandler?: FunctionTypeVoidToVoid;
};

// eslint-disable-next-line react/function-component-definition
const UserAvatar: React.FC<UserAvatarProps> = ({
  urlAvatar,
  iconTheme = { width: '55px', height: '55px' },
  clickRemoveAvatarHandler,
}) => {
  return (
    <div
      className="user-avatar-wrapper"
      style={{ width: iconTheme.width, height: iconTheme.height }}
    >
      <div
        style={{
          margin: '0 auto',
        }}
      >
        <img
          src={urlAvatar}
          className="user-avatar-wrapper--img"
          style={{ width: iconTheme.width, height: iconTheme.height }}
        />
        {/* <div>{urlAvatar}</div> */}
      </div>
      {clickRemoveAvatarHandler ? (
        <div className="user-avatar-wrapper--btn">
          <ActiveSvg
            content={
              <Remove
                width="20"
                height="20"
                color="var(--secondary-elements)"
              />
            }
            clickAction={() => {
              if (clickRemoveAvatarHandler) {
                clickRemoveAvatarHandler();
              }
            }}
          />
        </div>
      ) : null}
    </div>
  );
};

export default UserAvatar;
