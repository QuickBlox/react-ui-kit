import React from 'react';
import './EditDialog.scss';
import { FunctionTypeEditDialogParamsToVoid, FunctionTypeVoidToVoid } from '../../../../Views/Base/BaseViewModel';
import { DialogType } from '../../../../../Domain/entity/DialogTypes';
export declare const TypeOpenDialog: {
    readonly edit: "edit";
    readonly create: "create";
};
export type OpenDialogArcheType = keyof typeof TypeOpenDialog;
type EditDialogProps = {
    nameDialog: string;
    typeDialog: DialogType;
    ulrIcon?: string;
    typeAddEditDialog: OpenDialogArcheType;
    clickUpdatedHandler?: FunctionTypeEditDialogParamsToVoid;
    clickCancelHandler?: FunctionTypeVoidToVoid;
};
declare const EditDialog: React.FC<EditDialogProps>;
export default EditDialog;
