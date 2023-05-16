import { CallBackFunction, IUseCase } from './IUseCase';
import { SubscriptionPerformer } from './Subscribable/SubscriptionPerformer';
export declare abstract class BaseUseCase<TArg, TResult> extends SubscriptionPerformer<TArg> implements IUseCase<TArg, TResult> {
    abstract execute(args: CallBackFunction<TArg>): Promise<TResult>;
}
