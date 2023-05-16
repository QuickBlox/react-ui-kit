import React from 'react';
import './SingleUser.scss';
import { UserEntity } from '../../../../../../../Domain/entity/UserEntity';
type UserSingleProps = {
    user: UserEntity;
    keyValue?: number;
};
declare const UserSingle: React.FC<UserSingleProps>;
export default UserSingle;
