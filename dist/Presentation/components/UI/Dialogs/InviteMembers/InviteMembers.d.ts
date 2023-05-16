import React from 'react';
import './InviteMembers.scss';
import { FunctionTypeVoidToVoid } from '../../../../Views/Base/BaseViewModel';
import { DialogType } from '../../../../../Domain/entity/DialogTypes';
export type FunctionTypeUserEntitiesToVoid = (userIdsForInvite: number[], usersIdsForRemove: number[]) => void;
type InviteMembersProps = {
    typeDialog: DialogType;
    idOwnerDialog: string;
    applyInviteUsersHandler: FunctionTypeUserEntitiesToVoid;
    participants?: number[];
    cancelInviteMembersHandler?: FunctionTypeVoidToVoid;
};
declare const InviteMembers: React.FC<InviteMembersProps>;
export default InviteMembers;
