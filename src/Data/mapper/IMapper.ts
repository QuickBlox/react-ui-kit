/*
interface Mapper {
    @Throws(Exception::class)
    fun <TArg, TArg> fromEntity(entity: TArg): TArg

    @Throws(Exception::class)
    fun <TArg, TArg> toEntity(data: TArg): TArg
}
 */
// TODO: add MappingException
export interface IMapper {
  fromEntity<TArg, TResult>(entity: TArg): Promise<TResult>;
  toEntity<TArg, TResult>(entity: TArg): Promise<TResult>;
}
