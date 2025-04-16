// eslint-disable-next-line import/extensions
import { QBAIAnswerAssistant } from 'qb-ai-answer-assistant';
import { IChatMessage } from '../../../Data/source/AISource';
import { IUseCase } from '../base/IUseCase';

export class AIAnswerAssistWithProxyUseCase implements IUseCase<void, string> {
  private textToSend: string;

  private dialogMessages: IChatMessage[];

  private servername: string;

  private api: string;

  private port: string;

  private sessionToken: string;

  private openAIModel: string;

  constructor(
    textToSend: string,
    dialogMessages: IChatMessage[],
    servername: string,
    api: string,
    port: string,
    sessionToken: string,
    openAIModel = 'gpt-3.5-turbo',
  ) {
    this.api = api;
    this.openAIModel = openAIModel;
    this.port = port;
    this.sessionToken = sessionToken;
    this.textToSend = textToSend;
    this.servername = servername;
    this.dialogMessages = dialogMessages;
  }

  async execute(): Promise<string> {
    const settings =
      QBAIAnswerAssistant.createDefaultAIAnswerAssistantSettings();

    settings.token = this.sessionToken;
    // settings.organization = 'Quickblox';
    settings.model = this.openAIModel;
    settings.serverPath = `${this.servername}:${this.port}/${this.api}`;

    return QBAIAnswerAssistant.createAnswer(
      this.textToSend,
      this.dialogMessages,
      settings,
    );
  }
}
