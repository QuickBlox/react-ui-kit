import React from 'react';
import './UserAvatar.scss';
import { IconTheme } from '../../../svgs/Icons/IconsCommonTypes';
import { FunctionTypeVoidToVoid } from '../../../../../Views/Base/BaseViewModel';
type UserAvatarProps = {
    urlAvatar: string;
    iconTheme?: IconTheme;
    clickRemoveAvatarHandler?: FunctionTypeVoidToVoid;
};
declare const UserAvatar: React.FC<UserAvatarProps>;
export default UserAvatar;
