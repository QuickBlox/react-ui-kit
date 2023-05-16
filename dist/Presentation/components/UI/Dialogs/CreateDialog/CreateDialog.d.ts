import React from 'react';
import './CreateDialog.scss';
import { FunctionTypeVoidToVoid } from '../../../../Views/Base/BaseViewModel';
type CreateDialogProps = {
    createPrivateDialogClickHandler: FunctionTypeVoidToVoid;
    createPrivateDialogTouchHandler: FunctionTypeVoidToVoid;
    createGroupDialogClickHandler: FunctionTypeVoidToVoid;
    createGroupDialogTouchHandler: FunctionTypeVoidToVoid;
    createPublicDialogClickHandler: FunctionTypeVoidToVoid;
    createPublicDialogTouchHandler: FunctionTypeVoidToVoid;
};
declare const CreateDialog: React.FC<CreateDialogProps>;
export default CreateDialog;
