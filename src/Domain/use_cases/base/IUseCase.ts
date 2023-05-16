export type CallBackFunction<TArg> = (arg: TArg) => void;
export type CallBackFunctionWithPromise<TArg> = (arg: TArg) => Promise<void>;
export interface IUseCase<TArg, TResult> {
  execute(callBack: CallBackFunction<TArg> | undefined): Promise<TResult>;
}
