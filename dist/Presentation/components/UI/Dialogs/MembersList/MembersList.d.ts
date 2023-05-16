import React from 'react';
import './MembersList.scss';
import { FunctionTypeVoidToVoid } from '../../../../Views/Base/BaseViewModel';
import { UserEntity } from '../../../../../Domain/entity/UserEntity';
type MembersListProps = {
    closeInformationHandler: FunctionTypeVoidToVoid;
    members: UserEntity[];
};
declare const MembersList: React.FC<MembersListProps>;
export default MembersList;
