import { UserEntity } from '../entity/UserEntity';

export interface IUsersRepository {
  getUserFromLocal(userId: number): Promise<UserEntity>;

  getUserFromRemote(userId: number): Promise<UserEntity>;

  getUsersFromLocal(usersIds: Array<number>): Promise<Array<UserEntity>>;

  getUsersFromRemote(usersIds: Array<number>): Promise<Array<UserEntity>>;

  saveUsersToLocal(users: Array<UserEntity>): void;
}
