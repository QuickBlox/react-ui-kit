import { Pagination } from '../../../Domain/repository/Pagination';
import { LocalUserDTO } from './LocalUserDTO';
export declare class LocalUsersDTO {
    get users(): Array<LocalUserDTO>;
    get pagination(): Pagination;
    private _users;
    private _pagination;
    constructor(users: Array<LocalUserDTO>, pagination: Pagination);
}
