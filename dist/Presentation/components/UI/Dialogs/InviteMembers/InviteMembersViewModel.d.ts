import BaseViewModel, { FunctionTypePaginationToVoid, FunctionTypeStringToVoid, FunctionTypeVoidToVoid } from '../../../../Views/Base/BaseViewModel';
import { Pagination } from '../../../../../Domain/repository/Pagination';
import { UserEntity } from '../../../../../Domain/entity/UserEntity';
export interface InviteMembersViewModel extends BaseViewModel<UserEntity> {
    loading: boolean;
    error: string;
    pagination: Pagination;
    users: UserEntity[];
    filter: string;
    getUsers: FunctionTypePaginationToVoid;
    release: FunctionTypeVoidToVoid;
    updateFilter: FunctionTypeStringToVoid;
}
