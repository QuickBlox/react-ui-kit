import { CallBackFunction } from '../IUseCase';

export interface ISubscribable<TArg> {
  subscribe(args: CallBackFunction<TArg>, event: string): void;
  release(): void;
}
