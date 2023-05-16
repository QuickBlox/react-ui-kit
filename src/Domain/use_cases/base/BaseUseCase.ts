import { CallBackFunction, IUseCase } from './IUseCase';
import { SubscriptionPerformer } from './Subscribable/SubscriptionPerformer';

export abstract class BaseUseCase<TArg, TResult>
  extends SubscriptionPerformer<TArg>
  implements IUseCase<TArg, TResult>
{
  abstract execute(args: CallBackFunction<TArg>): Promise<TResult>;

  // abstract subscribe(args: CallBackFunction): void;

  // public release(): void {
  //   this.onEventByTypeSubscribers.slice();
  // }

  // protected informSubscribers(arg?: TArg): void {
  //   this.onEventByTypeSubscribers.forEach((subscriber) => {
  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  //     subscriber(arg);
  //   });
  // }
  //
  // protected addSubscriber(subscriber: CallBackFunction): void {
  //   this.onEventByTypeSubscribers.push(subscriber);
  // }

  // protected abstract dispatch(eventName: string): void;

  // public subject: BehaviorSubject<TArg> = new BehaviorSubject(null as TArg);
  //
  //
  // private readonly onEventByTypeSubscribers: Array<CallBackFunction>;

  // protected constructor() {
  //   this.onEventByTypeSubscribers = [];
  // }

  // protected dispatch(arg?: TArg): void {
  //   const subscriber = this.onEventByTypeSubscribers[event];
  //
  //   if (subscriber === undefined) {
  //     return;
  //   }
  //
  //   Object.keys(subscriber).forEach((key) => {
  //     console.log(`dispatch called for key:${key} `);
  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  //     subscriber[key](arg);
  //   });
  // }
  //
  // public register(event: string, callback: CallBackFunction): Registry {
  //   const id = this.getNextId();
  //
  //   if (!this.onEventByTypeSubscribers[event]) this.onEventByTypeSubscribers[event] = {};
  //
  //   this.onEventByTypeSubscribers[event][id] = callback;
  //
  //   return {
  //     unregister: () => {
  //       delete this.onEventByTypeSubscribers[event][id];
  //       if (Object.keys(this.onEventByTypeSubscribers[event]).length === 0)
  //         delete this.onEventByTypeSubscribers[event];
  //     },
  //   };
  // }
  //
  // // eslint-disable-next-line class-methods-use-this
  // private getNextId(): number {
  //   // eslint-disable-next-line no-return-assign
  //   //  return (BaseUseCase.nextId += 1);
  //   return BaseUseCase.nextId;
  // }

  //
  //
}
