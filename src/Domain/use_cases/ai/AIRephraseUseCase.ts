// eslint-disable-next-line import/extensions
import { AISource, IChatMessage } from '../../../Data/source/AISource';
import { IUseCase } from '../base/IUseCase';
import {
  Tone,
  toneToString,
} from '../../../Presentation/components/UI/Dialogs/MessagesView/AIWidgets/Tone';

export class AIRephraseUseCase implements IUseCase<void, string> {
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

    let prompt = `Analyze the entire context of our conversation – all the messages – and create a brief summary of our discussion. Based on this analysis, rephrase the following text in a style and tone that is typical for most of the dialogue messages. Provide only the rephrased text in as the message text to rephrase and nothing more.Give me only rephrase text in brackets and nothing more. Here is the message text to rephrase:"${this.textToSend}"`;

    if (this.tone) {
      prompt = `Analyze the entire context of our conversation – all the messages – and create a brief summary of our discussion. Based on this analysis, rephrase the following text in a ${toneToString(
        this.tone,
      )} style. Provide only the rephrased text in the same language as the message text to rephrase and nothing more.Give me only rephrase text in brackets and nothing more. Here is the message text to rephrase:"${
        this.textToSend
      }"`;
    }
    //

    // return await AISource.getData(
    //     prompt,
    //     // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    //     context,
    //     servername,
    //     api,
    //     port,
    //     apiKeyOrSessionToken,
    // ).then((data) => {
    //     setTextFromWidgetToContent(data);
    //
    //     return data;
    // });

    //
    return AISource.getData(
      prompt,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      this.dialogMessages,
      this.servername,
      this.api,
      this.port,
      this.sessionToken,
      this.openAIModel,
    );
  }
}
