export declare const QBConfig: {
    credentials: {
        appId: number;
        accountKey: string;
        authKey: string;
        authSecret: string;
        sessionToken: string;
    };
    appConfig: {
        maxFileSize: number;
        chatProtocol: {
            active: number;
        };
        debug: {
            mode: number;
            file: null;
        };
        endpoints: {
            api: string;
            chat: string;
        };
        on: {
            sessionExpired(handleResponse: any, retry: any): Promise<void>;
        };
        streamManagement: {
            enable: boolean;
        };
    };
};
