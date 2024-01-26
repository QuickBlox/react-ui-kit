import BaseViewModel, {
  FunctionTypeUserIdToUserEntity,
  FunctionTypeVoidToVoid,
} from '../../../../CommonTypes/BaseViewModel';
import { UserEntity } from '../../../../Domain/entity/UserEntity';
import { DialogEntity } from '../../../../Domain/entity/DialogEntity';

export interface UsersListViewModel extends BaseViewModel<DialogEntity> {
  loading: boolean;
  error: string;
  users: UserEntity[]; // content
  getUsers: FunctionTypeVoidToVoid; // prepareContent
  release: FunctionTypeVoidToVoid; // release Content
  getUserById: FunctionTypeUserIdToUserEntity;
}
