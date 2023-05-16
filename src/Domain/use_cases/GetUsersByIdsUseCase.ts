import { IUseCase } from './base/IUseCase';
import { UserEntity } from '../entity/UserEntity';
import UsersRepository from '../../Data/repository/UsersRepository';

export class GetUsersByIdsUseCase implements IUseCase<void, Array<UserEntity>> {
  private usersRepository: UsersRepository;

  private userIds: Array<number>;

  constructor(usersRepository: UsersRepository, userIds: Array<number>) {
    console.log('CONSTRUCTOR GetUsersByIdsUseCase');
    this.usersRepository = usersRepository;
    this.userIds = userIds;
  }

  execute(): Promise<Array<UserEntity>> {
    console.log('execute GetUsersByIdsUseCase');

    // return this.usersRepository.getUsersFromLocal(this.userIds);
    return this.usersRepository.getUsersFromRemote(this.userIds);
  }
}
