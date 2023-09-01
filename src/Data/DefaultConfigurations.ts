import { ProxyConfig, QBConfig } from '../CommonTypes/FunctionResult';

const supportedLanguagesForIATranslate: string[] = [
  'English',
  'Ukrainian',
  'Spanish',
  'Portuguese',
  'French',
  'German',
];

const languageBCP47: Record<string, string> = {
  'ar-SA': 'Arabic',
  'bn-BD': 'Bangla',
  'bn-IN': 'Bangla',
  'cs-CZ': 'Czech',
  'da-DK': 'Danish',
  'de-AT': 'German',
  'de-CH': 'German',
  'de-DE': 'German',
  'el-GR': 'Greek',
  'en-AU': 'English',
  'en-CA': 'English',
  'en-GB': 'English',
  'en-IE': 'English',
  'en-IN': 'English',
  'en-NZ': 'English',
  'en-US': 'English',
  'en-ZA': 'English',
  'es-AR': 'Spanish',
  'es-CL': 'Spanish',
  'es-CO': 'Spanish',
  'es-ES': 'Spanish',
  'es-MX': 'Spanish',
  'es-US': 'Spanish',
  'fi-FI': 'Finnish',
  'fr-BE': 'French',
  'fr-CA': 'French',
  'fr-CH': 'French',
  'fr-FR': 'French',
  'he-IL': 'Hebrew',
  'hi-IN': 'Hindi',
  'hu-HU': 'Hungarian',
  'id-ID': 'Indonesian',
  'it-CH': 'Italian',
  'it-IT': 'Italian',
  'ja-JP': 'Japanese',
  'ko-KR': 'Korean',
  'nl-BE': 'Dutch',
  'nl-NL': 'Dutch',
  'no-NO': 'Norwegian',
  'pl-PL': 'Polish',
  'pt-BR': 'Portuguese',
  'pt-PT': 'Portuguese',
  'ro-RO': 'Romanian',
  'ru-RU': 'Russian',
  'sk-SK': 'Slovak',
  'sv-SE': 'Swedish',
  'ta-IN': 'Tamil',
  'ta-LK': 'Tamil',
  'th-TH': 'Thai',
  'tr-TR': 'Turkish',
  'zh-CN': 'Chinese',
  'zh-HK': 'Chinese',
  'zh-TW': 'Chinese',
  'uk-UA': 'Ukrainian',
};

const getDefaultSystemLanguage = () => {
  const sysLanguage = navigator.language;

  const language: string = languageBCP47[sysLanguage] || 'English';

  return language;
};

export class DefaultConfigurations {
  static getDefaultProxyConfig(): ProxyConfig {
    return {
      api: 'v1/chat/completions',
      servername: 'https://api.openai.com',
      port: '',
      sessionToken: '',
    };
  }

  static getDefaultLanguageForAITranslate(): string {
    let languageForAITranslate = 'English';
    const { defaultLanguage } =
      DefaultConfigurations.getDefaultQBConfig().configAIApi
        .AITranslateWidgetConfig;

    if (
      defaultLanguage.length > 0 &&
      supportedLanguagesForIATranslate.includes(defaultLanguage)
    ) {
      languageForAITranslate = defaultLanguage;
    } else {
      const sysLanguage = getDefaultSystemLanguage();

      if (supportedLanguagesForIATranslate.includes(sysLanguage)) {
        languageForAITranslate = sysLanguage;
      }
    }

    return languageForAITranslate;
  }

  static getAdditionalLanguagesForAITranslate(): string[] {
    const additionalLanguages: string[] = [];
    const { languages } =
      DefaultConfigurations.getDefaultQBConfig().configAIApi
        .AITranslateWidgetConfig;

    languages.forEach((item) => {
      if (supportedLanguagesForIATranslate.includes(item)) {
        additionalLanguages.push(item);
      } else {
        additionalLanguages.push('English');
      }
    });

    return additionalLanguages;
  }

  //
  static getDefaultQBConfig(): QBConfig {
    return {
      credentials: {
        appId: -1,
        accountKey: '',
        authKey: '',
        authSecret: '',
        sessionToken: '',
      },
      configAIApi: {
        AIAnswerAssistWidgetConfig: {
          apiKey: '',
          useDefault: true,
          proxyConfig: {
            api: 'v1/chat/completions',
            servername: 'https://api.openai.com/',
            port: '',
            sessionToken: '',
          },
        },
        AITranslateWidgetConfig: {
          apiKey: '',
          useDefault: true,
          defaultLanguage: 'English',
          languages: [
            'English',
            'Spanish',
            'French',
            'Portuguese',
            'German',
            'Ukrainian',
          ],
          proxyConfig: {
            api: 'v1/chat/completions',
            servername: 'https://api.openai.com/',
            port: '',
            sessionToken: '',
          },
        },
        AIRephraseWidgetConfig: {
          apiKey: '',
          useDefault: true,
          defaultTone: 'Professional',
          proxyConfig: {
            api: 'v1/chat/completions',
            servername: 'https://api.openai.com/',
            port: '',
            sessionToken: '',
          },
        },
      },
      appConfig: {
        maxFileSize: 10 * 1024 * 1024,
        sessionTimeOut: 122,
        chatProtocol: {
          active: 2,
        },
        debug: true,
        endpoints: {
          api: 'api.quickblox.com',
          chat: 'chat.quickblox.com',
        },
        streamManagement: {
          enable: true,
        },
      },
    };
  }

  //
}
