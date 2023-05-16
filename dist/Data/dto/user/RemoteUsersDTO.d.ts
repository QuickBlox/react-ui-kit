import { Pagination } from '../../../Domain/repository/Pagination';
import { RemoteUserDTO } from './RemoteUserDTO';
export declare class RemoteUsersDTO {
    get users(): Array<RemoteUserDTO>;
    get pagination(): Pagination;
    private _users;
    private _pagination;
    constructor(users: Array<RemoteUserDTO>, pagination: Pagination);
}
