import React from 'react';
import './DialogInformation.scss';
import { DialogEntity } from '../../../../../Domain/entity/DialogEntity';
import { FunctionTypeVoidToVoid } from '../../../../Views/Base/BaseViewModel';
import { DialogsViewModel } from '../../../../Views/Dialogs/DialogViewModel';
type HeaderDialogsProps = {
    dialog: DialogEntity;
    dialogViewModel: DialogsViewModel;
    closeInformationHandler: FunctionTypeVoidToVoid;
};
declare const DialogInformation: React.FC<HeaderDialogsProps>;
export default DialogInformation;
