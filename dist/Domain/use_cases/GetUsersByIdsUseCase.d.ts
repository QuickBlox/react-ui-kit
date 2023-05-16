import { IUseCase } from './base/IUseCase';
import { UserEntity } from '../entity/UserEntity';
import UsersRepository from '../../Data/repository/UsersRepository';
export declare class GetUsersByIdsUseCase implements IUseCase<void, Array<UserEntity>> {
    private usersRepository;
    private userIds;
    constructor(usersRepository: UsersRepository, userIds: Array<number>);
    execute(): Promise<Array<UserEntity>>;
}
