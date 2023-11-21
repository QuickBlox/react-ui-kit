import { UserEntity } from '../../../Domain/entity/UserEntity';

export default class InviteUsersResultViewModel {
  public users: UserEntity[];

  public status: boolean[];

  constructor(users: UserEntity[] = [], status: boolean[] = []) {
    this.users = users;
    this.status = status;
  }
}
