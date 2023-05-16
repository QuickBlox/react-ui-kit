import { LocalDialogDTO } from './LocalDialogDTO';
import { Pagination } from '../../../Domain/repository/Pagination';

export class LocalDialogsDTO {
  get dialogs(): Array<LocalDialogDTO> {
    return this._dialogs;
  }

  get pagination(): Pagination {
    return this._pagination;
  }

  private _dialogs: Array<LocalDialogDTO>;

  private _pagination: Pagination;

  constructor(dialogs: Array<LocalDialogDTO>, pagination: Pagination) {
    this._pagination = pagination;
    this._dialogs = dialogs;
  }
}
