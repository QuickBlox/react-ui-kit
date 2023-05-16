import { IMapper } from './IMapper';
export declare class MessageRemoteDTOMapper implements IMapper {
    fromEntity<TArg, TResult>(entity: TArg): Promise<TResult>;
    toEntity<TArg, TResult>(data: TArg): Promise<TResult>;
    private static validateEntity;
    private static validateDTO;
    private static createDefaultMessageEntity;
}
