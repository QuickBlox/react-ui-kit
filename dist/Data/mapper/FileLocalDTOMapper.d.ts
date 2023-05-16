import { IMapper } from './IMapper';
export declare class FileLocalDTOMapper implements IMapper {
    fromEntity<TArg, TResult>(entity: TArg): Promise<TResult>;
    toEntity<TArg, TResult>(data: TArg): Promise<TResult>;
    private static validateEntity;
    private static createDefaultFileEntity;
    private static validateLocalDTO;
}
