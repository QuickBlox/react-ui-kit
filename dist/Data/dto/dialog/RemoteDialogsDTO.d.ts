import { Pagination } from '../../../Domain/repository/Pagination';
import { RemoteDialogDTO } from './RemoteDialogDTO';
export declare class RemoteDialogsDTO {
    get dialogs(): Array<RemoteDialogDTO>;
    get pagination(): Pagination;
    private _dialogs;
    private _pagination;
    constructor(dialogs: Array<RemoteDialogDTO>, pagination: Pagination);
}
