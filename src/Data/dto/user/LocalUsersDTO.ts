import { Pagination } from '../../../Domain/repository/Pagination';
import { LocalUserDTO } from './LocalUserDTO';

export class LocalUsersDTO {
  get users(): Array<LocalUserDTO> {
    return this._users;
  }

  get pagination(): Pagination {
    return this._pagination;
  }



  private _users: Array<LocalUserDTO>;

  private _pagination: Pagination;

  constructor(users: Array<LocalUserDTO>, pagination: Pagination) {
    this._pagination = pagination;
    this._users = users;
  }
}
