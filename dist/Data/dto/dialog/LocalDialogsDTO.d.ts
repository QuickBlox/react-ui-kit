import { LocalDialogDTO } from './LocalDialogDTO';
import { Pagination } from '../../../Domain/repository/Pagination';
export declare class LocalDialogsDTO {
    get dialogs(): Array<LocalDialogDTO>;
    get pagination(): Pagination;
    private _dialogs;
    private _pagination;
    constructor(dialogs: Array<LocalDialogDTO>, pagination: Pagination);
}
