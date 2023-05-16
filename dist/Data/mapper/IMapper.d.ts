export interface IMapper {
    fromEntity<TArg, TResult>(entity: TArg): Promise<TResult>;
    toEntity<TArg, TResult>(entity: TArg): Promise<TResult>;
}
