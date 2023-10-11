import {Tone} from "../Presentation/components/UI/Dialogs/MessagesView/AIWidgets/Tone";

export type FunctionResult<T> = {
  result: T | T[] | boolean;
  error: any;
};

export type ProxyConfig = {
  api: string;
  servername: string;
  port: string;
};
export interface WidgetConfig {
  organizationName: string;
  openAIModel: string;
  apiKey: string;
  maxTokens: number;
  useDefault: boolean;
  proxyConfig: ProxyConfig;
}

export interface AITranslateWidgetConfig extends WidgetConfig {
  defaultLanguage: string;
  languages: string[];
}

export interface AIRephraseWidgetConfig extends WidgetConfig {
  defaultTone: string;
  Tones: Tone[];
}

export interface QBConfig {
  credentials: {
    appId: number;
    accountKey: string;
    authKey: string;
    authSecret: string;
    sessionToken: string;
  };
  configAIApi: {
    AIAnswerAssistWidgetConfig: WidgetConfig;
    AITranslateWidgetConfig: AITranslateWidgetConfig;
    AIRephraseWidgetConfig: AIRephraseWidgetConfig;
  };
  appConfig: {
    maxFileSize: number;
    sessionTimeOut: number;
    chatProtocol: {
      active: number;
    };
    debug: boolean;
    endpoints: {
      api: string;
      chat: string;
    };
    // on: {
    //   sessionExpired: (handleResponse: any, retry: any) => Promise<void>;
    // };
    streamManagement: {
      enable: boolean;
    };
  };
}
