// eslint-disable-next-line import/extensions
import { IUseCase } from '../base/IUseCase';
import { IRemoteDataSource } from '../../../Data/source/remote/IRemoteDataSource';
import { AIAnswerResponse } from '../../../qb-api-calls';

export class AITranslateWithSDKUseCase implements IUseCase<void, string> {
  private languageCodes: { [key: string]: string } = {
    English: 'en',
    Spanish: 'es',
    'Chinese simplified': 'zh-Hans',
    'Chinese traditional': 'zh-Hant',
    French: 'fr',
    German: 'de',
    Japanese: 'ja',
    Korean: 'ko',
    Italian: 'it',
    Russian: 'ru',
    Portuguese: 'pt',
    Arabic: 'ar',
    Hindi: 'hi',
    Turkish: 'tr',
    Dutch: 'nl',
    Polish: 'pl',
    Ukrainian: 'uk',
    Albanian: 'sq',
    Armenian: 'hy',
    Azerbaijani: 'az',
    Basque: 'eu',
    Belarusian: 'be',
    Bengali: 'bn',
    Bosnian: 'bs',
    Bulgarian: 'bg',
    Catalan: 'ca',
    Croatian: 'hr',
    Czech: 'cs',
    Danish: 'da',
    Estonian: 'et',
    Finnish: 'fi',
    Galician: 'gl',
    Georgian: 'ka',
    Greek: 'el',
    Gujarati: 'gu',
    Hungarian: 'hu',
    Indonesian: 'id',
    Irish: 'ga',
    Kannada: 'kn',
    Kazakh: 'kk',
    Latvian: 'lv',
    Lithuanian: 'lt',
    Macedonian: 'mk',
    Malay: 'ms',
    Maltese: 'mt',
    Mongolian: 'mn',
    Nepali: 'ne',
    Norwegian: 'no',
    Pashto: 'ps',
    Persian: 'fa',
    Punjabi: 'pa',
    Romanian: 'ro',
    Sanskrit: 'sa',
    Serbian: 'sr',
    Sindhi: 'sd',
    Sinhala: 'si',
    Slovak: 'sk',
    Slovenian: 'sl',
    Uzbek: 'uz',
    Vietnamese: 'vi',
    Welsh: 'cy',
  };

  private textToSend: string;

  private language: string;

  private dataSource: IRemoteDataSource;

  private smartChatAssistantId: string;

  constructor(
    textToSend: string,
    language: string,
    dataSource: IRemoteDataSource,
    smartChatAssistantId: string,
  ) {
    console.log('CONSTRUCTOR AITranslateWithSDKUseCase');
    this.dataSource = dataSource;
    this.textToSend = textToSend;
    this.language = language;
    this.smartChatAssistantId = smartChatAssistantId;
  }

  getLanguageCode(language: string): string {
    return this.languageCodes[language] || 'en';
  }

  async execute(): Promise<string> {
    console.log('execute AITranslateWithSDKUseCase');

    const response: AIAnswerResponse = await this.dataSource.translate(
      this.textToSend,
      this.getLanguageCode(this.language),
      this.smartChatAssistantId,
    );

    return response.answer;
  }
}
