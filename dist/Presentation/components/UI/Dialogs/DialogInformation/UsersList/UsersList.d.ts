import React from 'react';
import './UsersList.scss';
import { UserEntity } from '../../../../../../Domain/entity/UserEntity';
type UsersListProps = {
    usersFirstPageToView: UserEntity[];
    allUsers: UserEntity[];
    usersInDialogCount: number;
};
declare const UsersList: React.FC<UsersListProps>;
export default UsersList;
