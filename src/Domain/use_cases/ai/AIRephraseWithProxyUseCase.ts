// eslint-disable-next-line import/extensions
import { QBAIRephrase } from 'qb-ai-rephrase';
import { IChatMessage } from '../../../Data/source/AISource';
import { IUseCase } from '../base/IUseCase';
import { Tone } from '../../../Presentation/components/UI/Dialogs/MessagesView/AIWidgets/Tone';

export class AIRephraseWithProxyUseCase implements IUseCase<void, string> {
  private textToSend: string;

  private tone: Tone;

  private dialogMessages: IChatMessage[];

  private servername: string;

  private api: string;

  private port: string;

  private sessionToken: string;

  private openAIModel: string;

  constructor(
    textToSend: string,
    tone: Tone,
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
    this.tone = tone;
    this.servername = servername;
    this.dialogMessages = dialogMessages;
  }

  async execute(): Promise<string> {
    console.log('execute AIRephraseUseCase');

    const settings = QBAIRephrase.createDefaultAIRephraseSettings();

    settings.token = this.sessionToken;
    // settings.organization = 'Quickblox';
    settings.model = this.openAIModel;
    settings.tone = this.tone;
    settings.serverPath = `${this.servername}:${this.port}/${this.api}`;

    return QBAIRephrase.rephrase(
      this.textToSend,
      this.dialogMessages,
      settings,
    );

    // const prompt = AIUtils.createRephrasePrompt(this.textToSend, this.tone);
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
