import { CallBackFunction } from '../IUseCase';
import { ISubscribable } from './ISubscribable';
export interface Registry {
    unregister: () => void;
}
export interface Callable<TArg> {
    [key: string]: CallBackFunction<TArg>;
}
export interface EventSubscriber<TArg> {
    [key: string]: Callable<TArg>;
}
type DictionaryType<T> = Dictionary<CallBackFunction<T>>;
export declare class SubscriptionPerformer<TArg> implements ISubscribable<TArg> {
    protected readonly onEventByTypeSubscribers: Dictionary<DictionaryType<TArg>>;
    static readonly DEFAULT_SUBSCRIPTION_NAME = "DEFAULT";
    protected readonly subscribers: DictionaryType<TArg>;
    protected EVENT_NAME: string;
    protected EVENT_TYPE: string;
    release(): void;
    constructor();
    subscribe(callBack: CallBackFunction<TArg>, typeEvent?: string, nameEvent?: string): void;
    informSubscribers(arg: TArg, eventType?: string, event?: string): void;
}
export {};
