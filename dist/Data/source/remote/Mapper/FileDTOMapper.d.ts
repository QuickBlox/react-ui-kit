import { IDTOMapper } from './IDTOMapper';
export declare class FileDTOMapper implements IDTOMapper {
    fromDTO<TArg, TResult>(dto: TArg): Promise<TResult>;
    toTDO<TArg, TResult>(qbEntity: TArg): Promise<TResult>;
    private static validateDTO;
    private static validateQBFileDialog;
}
