import { IUseCase } from './base/IUseCase';
import { UserEntity } from '../entity/UserEntity';
import UsersRepository from '../../Data/repository/UsersRepository';

export class GetUsersByIdsUseCase implements IUseCase<void, Array<UserEntity>> {
  private usersRepository: UsersRepository;

  private userIds: Array<number>;

  constructor(usersRepository: UsersRepository, userIds: Array<number>) {
    this.usersRepository = usersRepository;
    this.userIds = userIds;
  }

  execute(): Promise<Array<UserEntity>> {
     if (this.userIds.length > 0) {

       return this.usersRepository.getUsersFromRemote(this.userIds);
     }else
     {
       return this.usersRepository.getUsersFromLocal(this.userIds);
     }
  }
}
