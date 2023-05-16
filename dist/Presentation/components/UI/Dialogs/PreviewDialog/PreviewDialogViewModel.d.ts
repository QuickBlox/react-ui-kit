import BaseViewModel, { FunctionTypeViewModelToVoid } from '../../../../Views/Base/BaseViewModel';
import { DialogEntity } from '../../../../../Domain/entity/DialogEntity';
export default class PreviewDialogViewModel extends BaseViewModel<DialogEntity> {
    get item(): BaseViewModel<DialogEntity>;
    protected _isSelected: boolean;
    get isSelected(): boolean;
    set isSelected(value: boolean);
    constructor(itemClickActionHandler: FunctionTypeViewModelToVoid<DialogEntity> | undefined, itemTouchActionHandler: FunctionTypeViewModelToVoid<DialogEntity> | undefined, dialogEntity: DialogEntity);
    itemClickActionHandler?: FunctionTypeViewModelToVoid<DialogEntity>;
    itemTouchActionHandler?: FunctionTypeViewModelToVoid<DialogEntity>;
}
