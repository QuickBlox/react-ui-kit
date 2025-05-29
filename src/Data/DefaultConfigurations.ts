import {
  AITranslateWidgetConfig,
  ProxyConfig,
  QBUIKitConfig,
} from '../CommonTypes/CommonTypes';

const supportedLanguagesForIATranslate: string[] = [
  'English',
  'Ukrainian',
  'Spanish',
  'Portuguese',
  'French',
  'German',
];

// ["en-US", "zh-CN", "ja-JP"]
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
    };
  }

  static getDefaultLanguageForAITranslate(
    configAITranslate: AITranslateWidgetConfig,
  ): string {
    let languageForAITranslate = 'English';
    const defaultLanguage: string =
      configAITranslate.defaultLanguage ||
      DefaultConfigurations.getDefaultQBConfig().configAIApi
        .AITranslateWidgetConfig.defaultLanguage;

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

  static getAdditionalLanguagesForAITranslate(
    configAITranslate: AITranslateWidgetConfig,
  ): string[] {
    const additionalLanguages: string[] = [];
    const languages: string[] =
      configAITranslate.languages ||
      DefaultConfigurations.getDefaultQBConfig().configAIApi
        .AITranslateWidgetConfig.languages;

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
  static getDefaultQBConfig(): QBUIKitConfig {
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
          smartChatAssistantId: '',
          organizationName: 'Quickblox',
          openAIModel: 'gpt-3.5-turbo',
          apiKey: '',
          maxTokens: 3584,
          useDefault: true,
          proxyConfig: {
            api: 'v1/chat/completions',
            servername: 'https://api.openai.com/',
            port: '',
          },
        },
        AITranslateWidgetConfig: {
          smartChatAssistantId: '',
          organizationName: 'Quickblox',
          openAIModel: 'gpt-3.5-turbo',
          apiKey: '',
          maxTokens: 3584,
          useDefault: true,
          defaultLanguage: 'English',
          languages: ['English', 'French', 'Portuguese', 'German', 'Ukrainian'],
          proxyConfig: {
            api: 'v1/chat/completions',
            servername: '',
            port: '',
          },
          // proxyConfig: {
          //   api: 'v1/chat/completions',
          //   servername: 'http://localhost',
          //   port: '3012',
          // },
        },
        AIRephraseWidgetConfig: {
          smartChatAssistantId: '',
          organizationName: 'Quickblox',
          openAIModel: 'gpt-3.5-turbo',
          apiKey: '',
          maxTokens: 3584,
          useDefault: true,
          defaultTone: 'Professional',
          Tones: [
            {
              name: 'Professional Tone',
              description:
                'This would edit messages to sound more formal, using technical vocabulary, clear sentence structures, and maintaining a respectful tone. It would avoid colloquial language and ensure appropriate salutations and sign-offs',
              iconEmoji: '👔',
            },
            {
              name: 'Friendly Tone',
              description:
                'This would adjust messages to reflect a casual, friendly tone. It would incorporate casual language, use emoticons, exclamation points, and other informalities to make the message seem more friendly and approachable.',
              iconEmoji: '🤝',
            },
            {
              name: 'Encouraging Tone',
              description:
                'This tone would be useful for motivation and encouragement. It would include positive words, affirmations, and express support and belief in the recipient.',
              iconEmoji: '💪',
            },
            {
              name: 'Empathetic Tone',
              description:
                'This tone would be utilized to display understanding and empathy. It would involve softer language, acknowledging feelings, and demonstrating compassion and support.',
              iconEmoji: '🤲',
            },
            {
              name: 'Neutral Tone',
              description:
                'For times when you want to maintain an even, unbiased, and objective tone. It would avoid extreme language and emotive words, opting for clear, straightforward communication.',
              iconEmoji: '😐',
            },
            {
              name: 'Assertive Tone',
              description:
                'This tone is beneficial for making clear points, standing ground, or in negotiations. It uses direct language, is confident, and does not mince words.',
              iconEmoji: '🔨',
            },
            {
              name: 'Instructive Tone',
              description:
                'This tone would be useful for tutorials, guides, or other teaching and training materials. It is clear, concise, and walks the reader through steps or processes in a logical manner.',
              iconEmoji: '📖',
            },
            {
              name: 'Persuasive Tone',
              description:
                'This tone can be used when trying to convince someone or argue a point. It uses persuasive language, powerful words, and logical reasoning.',
              iconEmoji: '☝️',
            },
            {
              name: 'Sarcastic/Ironic Tone',
              description:
                'This tone can make the communication more humorous or show an ironic stance. It is harder to implement as it requires the AI to understand nuanced language and may not always be taken as intended by the reader.',
              iconEmoji: '😏',
            },
            {
              name: 'Poetic Tone',
              description:
                'This would add an artistic touch to messages, using figurative language, rhymes, and rhythm to create a more expressive text.',
              iconEmoji: '🎭',
            },
          ],
          proxyConfig: {
            api: 'v1/chat/completions',
            servername: 'https://api.openai.com/',
            port: '',
          },
        },
      },
      appConfig: {
        maxFileSize: 10 * 1024 * 1024,
        sessionTimeOut: 119,
        chatProtocol: {
          active: 2,
        },
        pingLocalhostTimeInterval: 5,
        chatReconnectionTimeInterval: 3,
        debug: true,
        enableForwarding: true,
        enableReplying: true,
        regexUserName: '', // '/^(?=[a-zA-Z])[-a-zA-Z_ ]{3,49}(?<! )$/',
        showPublicDialogsInList: false,
        allowPublicDialogCreation: false,
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
}
