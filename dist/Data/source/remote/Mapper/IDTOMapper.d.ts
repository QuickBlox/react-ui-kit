export interface IDTOMapper {
    fromDTO<TArg, TResult>(dto: TArg): Promise<TResult>;
    toTDO<TArg, TResult>(entity: TArg): Promise<TResult>;
}
