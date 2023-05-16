import { IUseCase } from './base/IUseCase';
import UsersRepository from '../../Data/repository/UsersRepository';
import { PaginatedResult, Pagination } from '../repository/Pagination';
import { UserEntity } from '../entity/UserEntity';

export class GetAllUsersUseCase
  implements IUseCase<void, PaginatedResult<UserEntity>>
{
  private usersRepository: UsersRepository;

  private currentPagination: Pagination;

  private filter: string;

  constructor(
    usersRepository: UsersRepository,
    currentPagination: Pagination,
    filter: string,
  ) {
    console.log('CONSTRUCTOR GetUsersByIdsUseCase');
    this.usersRepository = usersRepository;
    this.currentPagination = currentPagination;
    this.filter = filter;
  }

  execute(): Promise<PaginatedResult<UserEntity>> {
    console.log('execute GetUsersByIdsUseCase');

    return this.usersRepository.getALLUsersFromRemote(
      this.currentPagination,
      this.filter,
    );
  }
}
