import BaseViewModel, {
  FunctionTypeBooleanToVoid,
  FunctionTypeDialogEntityToBoolean,
  FunctionTypeDialogEntityToDialogEntity,
  FunctionTypeFileToFileEntity,
  FunctionTypePaginationToVoid,
  FunctionTypeVoidToVoid,
} from '../../../CommonTypes/BaseViewModel';
import { DialogEntity } from '../../../Domain/entity/DialogEntity';
import { Pagination } from '../../../Domain/repository/Pagination';

export interface DialogListViewModel extends BaseViewModel<DialogEntity> {
  loading: boolean;
  error: string;
  pagination?: Pagination;
  dialogs: DialogEntity[]; // content // PublicDialogEntity
  getDialogs: FunctionTypePaginationToVoid; // prepareContent
  release: FunctionTypeVoidToVoid; // release Content
  setWaitLoadingStatus: FunctionTypeBooleanToVoid; // set loading state
  createDialog: FunctionTypeDialogEntityToDialogEntity;
  updateDialog: FunctionTypeDialogEntityToDialogEntity;
  deleteDialog: FunctionTypeDialogEntityToBoolean;
  uploadFile: FunctionTypeFileToFileEntity;
  removeMembers: FunctionTypeDialogEntityToBoolean;
}
