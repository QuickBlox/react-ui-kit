import { ILocalDataSource } from '../source/local/ILocalDataSource';
import { IRemoteDataSource } from '../source/remote/IRemoteDataSource';
import { UserEntity } from '../../Domain/entity/UserEntity';
import { PaginatedResult, Pagination } from '../../Domain/repository/Pagination';
export default class UsersRepository {
    private localDataSource;
    private remoteDataSource;
    private userRemoteDTOMapper;
    private userLocalDTOMapper;
    constructor(localDataSource: ILocalDataSource, remoteDataSource: IRemoteDataSource);
    getUserFromLocal(userId: number): Promise<UserEntity>;
    getUserFromRemote(userId: number): Promise<UserEntity>;
    getUsersFromLocal(usersIds: Array<number>): Promise<Array<UserEntity>>;
    getUsersFromRemote(usersIds: Array<number>): Promise<Array<UserEntity>>;
    getALLUsersFromRemote(pagination?: Pagination, filter?: string): Promise<PaginatedResult<UserEntity>>;
    saveUsersToLocal(entities: Array<UserEntity>): Promise<boolean>;
    saveUserToLocal(entity: UserEntity): Promise<boolean>;
}
