import { SubscriptionPerformer } from '../../Domain/use_cases/base/Subscribable/SubscriptionPerformer';
export default class ConnectionRepository extends SubscriptionPerformer<boolean> {
    private timerId;
    needInit: boolean;
    private chatConnectedStatus;
    isChatConnected(): boolean;
    constructor();
    changeConnectionStatus(satus: boolean): void;
    private static readonly PING_ALIVE_INTERVAL;
    private static readonly PING_TIMEOUT;
    initializeStates(): Promise<boolean>;
    keepALiveChatConnection(): void;
    stopKeepAlive(): void;
    protected ChatServerPing(): Promise<boolean>;
}
