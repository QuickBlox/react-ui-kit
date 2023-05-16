import { Pagination } from '../../../Domain/repository/Pagination';
import { RemoteUserDTO } from './RemoteUserDTO';

export class RemoteUsersDTO {
  get users(): Array<RemoteUserDTO> {
    return this._users;
  }

  get pagination(): Pagination {
    return this._pagination;
  }

  private _users: Array<RemoteUserDTO>;

  private _pagination: Pagination;

  constructor(users: Array<RemoteUserDTO>, pagination: Pagination) {
    this._pagination = pagination;
    this._users = users;
  }
}
