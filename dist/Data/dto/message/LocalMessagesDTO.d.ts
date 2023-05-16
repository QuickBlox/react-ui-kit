import { Pagination } from '../../../Domain/repository/Pagination';
import { LocalMessageDTO } from './LocalMessageDTO';
export declare class LocalMessagesDTO {
    get messages(): Array<LocalMessageDTO>;
    get pagination(): Pagination;
    private _messages;
    private _pagination;
    constructor(messages: Array<LocalMessageDTO>, pagination: Pagination);
}
