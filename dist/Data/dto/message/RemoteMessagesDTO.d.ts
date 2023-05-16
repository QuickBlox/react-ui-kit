import { Pagination } from '../../../Domain/repository/Pagination';
import { RemoteMessageDTO } from './RemoteMessageDTO';
export declare class RemoteMessagesDTO {
    get messages(): Array<RemoteMessageDTO>;
    get pagination(): Pagination;
    private _messages;
    private _pagination;
    constructor(messages: Array<RemoteMessageDTO>, pagination: Pagination);
}
