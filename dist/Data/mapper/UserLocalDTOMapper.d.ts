import { IMapper } from './IMapper';
import { UserEntity } from '../../Domain/entity/UserEntity';
export declare class UserLocalDTOMapper implements IMapper {
    fromEntity<TArg, TResult>(entity: TArg): Promise<TResult>;
    toEntity<TArg, TResult>(data: TArg): Promise<TResult>;
    private static validateEntity;
    private static validateLocalDTO;
    static createDefaultUserEntity(): UserEntity;
}
