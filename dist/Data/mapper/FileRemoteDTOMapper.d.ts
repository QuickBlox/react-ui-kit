import { IMapper } from './IMapper';
export declare class FileRemoteDTOMapper implements IMapper {
    fromEntity<TArg, TResult>(entity: TArg): Promise<TResult>;
    toEntity<TArg, TResult>(data: TArg): Promise<TResult>;
    private static createDefaultFileEntity;
    private static validateEntity;
    private static validateDTO;
}
