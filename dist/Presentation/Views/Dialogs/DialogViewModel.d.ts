import BaseViewModel, { FunctionTypeDialogEntityToBoolean, FunctionTypeDialogEntityToDialogEntity, FunctionTypeFileToFileEntity, FunctionTypePaginationToVoid, FunctionTypeVoidToVoid } from '../Base/BaseViewModel';
import { DialogEntity } from '../../../Domain/entity/DialogEntity';
import { Pagination } from '../../../Domain/repository/Pagination';
export interface DialogsViewModel extends BaseViewModel<DialogEntity> {
    loading: boolean;
    error: string;
    pagination?: Pagination;
    dialogs: DialogEntity[];
    getDialogs: FunctionTypePaginationToVoid;
    release: FunctionTypeVoidToVoid;
    createDialog: FunctionTypeDialogEntityToDialogEntity;
    updateDialog: FunctionTypeDialogEntityToDialogEntity;
    deleteDialog: FunctionTypeDialogEntityToBoolean;
    uploadFile: FunctionTypeFileToFileEntity;
    removeMembers: FunctionTypeDialogEntityToBoolean;
}
