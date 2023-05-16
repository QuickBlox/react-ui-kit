import { Pagination } from '../../../Domain/repository/Pagination';
import { GroupDialogEntity } from '../../../Domain/entity/GroupDialogEntity';
import { DialogEntity } from '../../../Domain/entity/DialogEntity';
import { FileEntity } from '../../../Domain/entity/FileEntity';
export default class BaseViewModel<TResult> {
    get entity(): TResult;
    set entity(value: TResult);
    protected constructor(baseEntity: TResult);
    private _entity?;
}
export type FunctionTypeViewModelToVoid<TResult> = (it: BaseViewModel<TResult>) => void;
export type EditDialogParams = {
    dialogTitle: string;
    dialogAvatar: File | string | null;
};
export type FunctionTypeFileToToVoid = (file: File) => void;
export type FunctionTypePaginationToVoid = (pagination: Pagination) => void;
export type FunctionTypeVoidToVoid = () => void;
export type FunctionTypeStringToVoid = (value: string) => void;
export type FunctionTypeEditDialogParamsToVoid = (params: EditDialogParams) => void;
export type FunctionTypeDialogEntityToDialogEntity = (entity: GroupDialogEntity) => Promise<DialogEntity>;
export type FunctionTypeDialogEntityToBoolean = (entity: GroupDialogEntity) => Promise<boolean>;
export type FunctionTypeFileToFileEntity = (file: File) => Promise<FileEntity>;
