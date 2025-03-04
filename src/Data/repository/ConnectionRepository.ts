import { SubscriptionPerformer } from '../../Domain/use_cases/base/Subscribable/SubscriptionPerformer';
import { stringifyError } from '../../utils/parse';
import { getQB } from '../../qb-api-calls';

export default class ConnectionRepository extends SubscriptionPerformer<boolean> {
  // private timerId: NodeJS.Timer | undefined;
  private timerId: ReturnType<typeof setTimeout> | undefined;

  private _needInit: boolean;

  get needInit(): boolean {
    const QB = getQB();
    const chatConnection = QB && QB.chat && QB.chat.isConnected;

    if (chatConnection) return false;

    return this._needInit;
  }

  set needInit(value: boolean) {
    this._needInit = value;
  }

  private chatConnectedStatus = false;

  public isChatConnected(): boolean {
    const QB = getQB();
    const chatConnection = QB && QB.chat && QB.chat.isConnected;

    if (chatConnection) return true;

    return this.chatConnectedStatus;
  }

  constructor() {
    super();
    console.log('CREATE ConnectionRepository');
    this._needInit = true;
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
        this._needInit = false;

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
    if (this.timerId === undefined) {
      this.timerId = setInterval(() => {
        // eslint-disable-next-line promise/always-return
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
  }

  public stopKeepAlive() {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  protected async ChatServerPing(): Promise<boolean> {
    const pingChat = (): Promise<string> => {
      return new Promise<string>((resolve, reject) => {
        const QB = getQB();

        try {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          QB.chat.pingchat((error) => {
            if (error) {
              console.log('ping failed: ', stringifyError(error));
              resolve('failed');
            } else {
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

    return Promise.resolve(result);
  }
}
