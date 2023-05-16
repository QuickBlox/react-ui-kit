import React from 'react';
import './DialogMembersButton.scss';
import { FunctionTypeVoidToVoid } from '../../../../../Views/Base/BaseViewModel';
type DialogMembersButtonProps = {
    content: string;
    clickHandler: FunctionTypeVoidToVoid;
    touchHandler: FunctionTypeVoidToVoid;
};
declare const DialogMembersButton: React.FC<DialogMembersButtonProps>;
export default DialogMembersButton;
