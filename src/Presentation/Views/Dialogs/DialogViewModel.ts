import BaseViewModel, {
  FunctionTypeDialogEntityToBoolean,
  FunctionTypeDialogEntityToDialogEntity,
  FunctionTypeFileToFileEntity,
  FunctionTypePaginationToVoid,
  FunctionTypeVoidToVoid,
} from '../Base/BaseViewModel';
import { DialogEntity } from '../../../Domain/entity/DialogEntity';
import { Pagination } from '../../../Domain/repository/Pagination';

export interface DialogsViewModel extends BaseViewModel<DialogEntity> {
  loading: boolean;
  error: string;
  pagination?: Pagination;
  dialogs: DialogEntity[]; // content // PublicDialogEntity
  getDialogs: FunctionTypePaginationToVoid; // prepareContent
  release: FunctionTypeVoidToVoid; // release Content
  createDialog: FunctionTypeDialogEntityToDialogEntity;
  updateDialog: FunctionTypeDialogEntityToDialogEntity;
  deleteDialog: FunctionTypeDialogEntityToBoolean;
  uploadFile: FunctionTypeFileToFileEntity;
  removeMembers: FunctionTypeDialogEntityToBoolean;
}
