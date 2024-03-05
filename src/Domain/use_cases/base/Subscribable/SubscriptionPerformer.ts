import { CallBackFunction } from '../IUseCase';
import { ISubscribable } from './ISubscribable';
import EventMessageType from '../../../entity/EventMessageType';

export interface Registry {
  unregister: () => void;
}

export interface Callable<TArg> {
  [key: string]: CallBackFunction<TArg>;
}

export interface EventSubscriber<TArg> {
  [key: string]: Callable<TArg>;
}

// SubscriptionPerformer<TArg>
/*
release
subscribe
informSubscribers
 */
type DictionaryType<T> = Dictionary<CallBackFunction<T>>;
export class SubscriptionPerformer<TArg> implements ISubscribable<TArg> {
  protected readonly onEventByTypeSubscribers: Dictionary<
    DictionaryType<TArg>
  > = {};

  public static readonly DEFAULT_SUBSCRIPTION_NAME = 'DEFAULT';

  protected readonly subscribers: DictionaryType<TArg> = {};

  protected EVENT_NAME: string =
    SubscriptionPerformer.DEFAULT_SUBSCRIPTION_NAME;

  protected EVENT_TYPE: string = EventMessageType.LocalMessage;

  // eslint-disable-next-line class-methods-use-this
  public release(): void {
    console.log('SubscriptionPerformer release actions.');
    // Object.entries(this.onEventByTypeSubscribers).map((x) => {
    //   const eventName = x[0];
    //
    //   this.onEventByTypeSubscribers[eventName][this.EVENT_NAME] = () => {
    //     console.log('ERROR release event in SubscriptionPerformer');
    //   };
    //
    //   return this.onEventByTypeSubscribers[eventName][this.EVENT_NAME];
    // });
  }

  constructor() {
    console.log('CONSTRUCTOR SubscriptionPerformer');
    // this.onEventByTypeSubscribers[EventMessageType.LocalMessage] = [];
    this.onEventByTypeSubscribers[EventMessageType.LocalMessage] =
      this.subscribers;
  }

  subscribe(
    callBack: CallBackFunction<TArg>,
    typeEvent: string = this.EVENT_TYPE,
    nameEvent: string = this.EVENT_NAME,
  ): void {
    if (this.onEventByTypeSubscribers[typeEvent] === undefined) {
      this.onEventByTypeSubscribers[typeEvent] = {};
    }
    this.onEventByTypeSubscribers[typeEvent][nameEvent] = callBack;

    // if (!this.onEventByTypeSubscribers[typeEvent]) {
    //   this.onEventByTypeSubscribers[typeEvent] = [];
    // }
    // const alreadyHave = this.onEventByTypeSubscribers[typeEvent].includes(callBack);
    //
    // if (!alreadyHave) {
    //   this.onEventByTypeSubscribers[typeEvent].push(callBack);
    // } else {
    //   console.log('ALREADY HAVE CALLBACK');
    // }
  }

  public informSubscribers(
    arg?: TArg,
    eventType: string = this.EVENT_TYPE,
    event: string = SubscriptionPerformer.DEFAULT_SUBSCRIPTION_NAME,
  ): void {
    const haveSubscriptionsForType = this.onEventByTypeSubscribers[eventType];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const haveSubscriptionName =
      event !== SubscriptionPerformer.DEFAULT_SUBSCRIPTION_NAME;
    const haveSubscriber =
      this.onEventByTypeSubscribers[eventType][event] !== undefined;
    const haveValidType =
      typeof this.onEventByTypeSubscribers[eventType][event] === 'function';
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const haveManySubscribers =
      Object.entries(this.onEventByTypeSubscribers[eventType]).length > 1;

    if (haveSubscriptionsForType) {
      if (haveSubscriptionName && haveSubscriber && haveValidType) {
        // if (!haveSubscriptionName && haveSubscriber && haveValidType)
        // if (!haveManySubscribers && haveSubscriber && haveValidType)

        if (arg) {
          this.onEventByTypeSubscribers[eventType][event](arg); // new, edit dialog
        }
      } else {
        // local events and leave dialog
        Object.entries(this.onEventByTypeSubscribers[eventType]).forEach(
          (value) => {
            if (arg) {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const currentEventName = value[0];

              value[1](arg);
            }
          },
        );
      }
    }

    // if (this.onEventByTypeSubscribers[eventType]) {
    //   if (
    //     event !== SubscriptionPerformer.DEFAULT_SUBSCRIPTION_NAME &&
    //     this.onEventByTypeSubscribers[eventType][event] &&
    //     typeof this.onEventByTypeSubscribers[eventType][event] === 'function'
    //   ) {
    //     if (arg) {
    //       this.onEventByTypeSubscribers[eventType][event](arg);
    //     }
    //   } else {
    //     Object.entries(this.onEventByTypeSubscribers[eventType]).forEach(
    //       (value) => {
    //         if (arg) {
    //           const currentEventName = value[0];
    //
    //           console.log('call for event: ', currentEventName);
    //           value[1](arg);
    //         }
    //       },
    //     );
    //   }
    // }
  }
}
