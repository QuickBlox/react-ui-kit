// eslint-disable-next-line import/extensions
import { AITranslateSettings, QBAITranslate } from 'qb-ai-translate';
import { IChatMessage } from '../../../Data/source/AISource';
import { IUseCase } from '../base/IUseCase';

export class AITranslateWithProxyUseCase implements IUseCase<void, string> {
  private textToSend: string;

  private language: string;

  private dialogMessages: IChatMessage[];

  private servername: string;

  private api: string;

  private port: string;

  private sessionToken: string;

  private openAIModel: string;

  constructor(
    textToSend: string,
    language: string,
    dialogMessages: IChatMessage[],
    servername: string,
    api: string,
    port: string,
    sessionToken: string,
    openAIModel = 'gpt-3.5-turbo',
  ) {
    console.log('CONSTRUCTOR AIRephraseUseCase');
    this.api = api;
    this.openAIModel = openAIModel;
    this.port = port;
    this.sessionToken = sessionToken;
    this.textToSend = textToSend;
    this.language = language;
    this.servername = servername;
    this.dialogMessages = dialogMessages;
  }

  async execute(): Promise<string> {
    console.log('execute AIRephraseUseCase');

    const settings: AITranslateSettings =
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      QBAITranslate.createDefaultAITranslateSettings();

    settings.token = this.sessionToken;
    // settings.organization = 'Quickblox';
    settings.model = this.openAIModel;
    settings.language = this.language;
    settings.serverPath = `${this.servername}:${this.port}/${this.api}`;

    return QBAITranslate.translate(
      this.textToSend,
      this.dialogMessages,
      settings,
    );

    // const prompt = AIUtils.createTranslatePrompt(
    //   this.textToSend,
    //   this.language,
    // );
    //
    // return AISource.getDataWithProxyServer(
    //   prompt,
    //   // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    //   this.dialogMessages,
    //   this.servername,
    //   this.api,
    //   this.port,
    //   this.sessionToken,
    //   this.openAIModel,
    // );
  }
}
