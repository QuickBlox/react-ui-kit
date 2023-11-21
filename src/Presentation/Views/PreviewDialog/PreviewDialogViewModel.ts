import BaseViewModel, {
  FunctionTypeViewModelToVoid,
} from '../../../CommonTypes/BaseViewModel';
import { DialogEntity } from '../../../Domain/entity/DialogEntity';

export default class PreviewDialogViewModel extends BaseViewModel<DialogEntity> {
  get item(): BaseViewModel<DialogEntity> {
    return this;
  }

  protected _isSelected: boolean;

  get isSelected(): boolean {
    return this._isSelected;
  }

  set isSelected(value: boolean) {
    this._isSelected = value;
  }

  constructor(
    itemClickActionHandler:
      | FunctionTypeViewModelToVoid<DialogEntity>
      | undefined,
    itemTouchActionHandler:
      | FunctionTypeViewModelToVoid<DialogEntity>
      | undefined,
    // id: number,
    // name: string,
    dialogEntity: DialogEntity,
  ) {
    // super(id, name, dialogEntity);
    super(dialogEntity);
    this.itemClickActionHandler = itemClickActionHandler;
    this.itemTouchActionHandler = itemTouchActionHandler;
    this._isSelected = false;
  }

  public itemClickActionHandler?: FunctionTypeViewModelToVoid<DialogEntity>;

  public itemTouchActionHandler?: FunctionTypeViewModelToVoid<DialogEntity>;
}
