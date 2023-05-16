import { IUseCase } from './base/IUseCase';
import UsersRepository from '../../Data/repository/UsersRepository';
import { PaginatedResult, Pagination } from '../repository/Pagination';
import { UserEntity } from '../entity/UserEntity';
export declare class GetAllUsersUseCase implements IUseCase<void, PaginatedResult<UserEntity>> {
    private usersRepository;
    private currentPagination;
    private filter;
    constructor(usersRepository: UsersRepository, currentPagination: Pagination, filter: string);
    execute(): Promise<PaginatedResult<UserEntity>>;
}
