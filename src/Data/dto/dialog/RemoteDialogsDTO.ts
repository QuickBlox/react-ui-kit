import { Pagination } from '../../../Domain/repository/Pagination';
import { RemoteDialogDTO } from './RemoteDialogDTO';

export class RemoteDialogsDTO {
  get dialogs(): Array<RemoteDialogDTO> {
    return this._dialogs;
  }

  get pagination(): Pagination {
    return this._pagination;
  }

  private _dialogs: Array<RemoteDialogDTO>;

  private _pagination: Pagination;

  constructor(dialogs: Array<RemoteDialogDTO>, pagination: Pagination) {
    this._pagination = pagination;
    this._dialogs = dialogs;
  }
}
