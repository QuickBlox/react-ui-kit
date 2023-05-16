import { SubscriptionPerformer } from '../../Domain/use_cases/base/Subscribable/SubscriptionPerformer';
import { stringifyError } from '../../utils/parse';

export default class ConnectionRepository extends SubscriptionPerformer<boolean> {
  private timerId: NodeJS.Timer | undefined;

  public needInit: boolean;

  private chatConnectedStatus = false;

  public isChatConnected(): boolean {
    return this.chatConnectedStatus;
  }

  constructor() {
    super();
    console.log('CREATE ConnectionRepository');
    this.needInit = true;
  }

  public changeConnectionStatus(satus: boolean) {
    if (this.chatConnectedStatus !== satus) {
      console.log('ConnectionRepository: HAVE CHANGED CONNECTION');
      console.log('this.chatConnectedStatus: ', this.chatConnectedStatus);
      this.chatConnectedStatus = satus;
      console.log(
        'have onEventByTypeSubscribers: ',
        this.onEventByTypeSubscribers.length,
      );
      // this.onEventByTypeSubscribers[EventMessageType.LocalMessage].forEach((subscriber) => {
      //   console.log('call: ', JSON.stringify(subscriber));
      // });
      this.informSubscribers(satus);
    }
  }

  private static readonly PING_ALIVE_INTERVAL = 60000;

  private static readonly PING_TIMEOUT = 5000;

  public async initializeStates(): Promise<boolean> {
    console.log('connection repository init');
    const resultInit = await this.ChatServerPing()
      // eslint-disable-next-line promise/always-return
      .then((result) => {
        this.changeConnectionStatus(result);
        this.needInit = false;

        // eslint-disable-next-line promise/no-return-wrap
        return Promise.resolve(true);
      })
      .catch(() => {
        console.log('connection repository have exception');
        this.changeConnectionStatus(false);

        // eslint-disable-next-line promise/no-return-wrap
        return Promise.resolve(false);
      });

    return Promise.resolve(resultInit);
  }

  public keepALiveChatConnection() {
    console.log('start keep alive');
    if (this.timerId === undefined) {
      console.log('set timer keep alive');
      this.timerId = setInterval(() => {
        console.log(
          `!!!--have ping result after ${ConnectionRepository.PING_ALIVE_INTERVAL}--!!!`,
        );
        // eslint-disable-next-line promise/always-return
        // todo: cause of recycle v1
        this.ChatServerPing()
          // eslint-disable-next-line promise/always-return
          .then((result) => {
            this.changeConnectionStatus(result);
          })
          .catch(() => {
            this.changeConnectionStatus(false);
          });
      }, ConnectionRepository.PING_ALIVE_INTERVAL);
    }
    console.log('end keep alive');
  }

  public stopKeepAlive() {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  protected async ChatServerPing(): Promise<boolean> {
    console.log('ping ChatServerPing');
    const pingChat = (): Promise<string> => {
      return new Promise<string>((resolve, reject) => {
        try {
          QB.chat.ping((error) => {
            if (error) {
              console.log('ping failed: ', stringifyError(error));
              resolve('failed');
            } else {
              console.log('ping connected');
              resolve('connected');
            }
          });
        } catch (e) {
          console.log('EXCEPTION PING in ChatServerPing: ', stringifyError(e));
          reject();
        }
      });
    };
    const waitingFor = (): Promise<string> => {
      return new Promise<string>((resolve) => {
        setTimeout(() => {
          resolve('timeout');
        }, ConnectionRepository.PING_TIMEOUT);
      });
    };

    const raceResult = await Promise.race([pingChat(), waitingFor()]);
    const result = raceResult === 'connected';

    console.log('ping ', raceResult, ' operation result is ', result);

    return Promise.resolve(result);
  }
}
