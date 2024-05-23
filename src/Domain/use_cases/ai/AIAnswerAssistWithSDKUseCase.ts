// eslint-disable-next-line import/extensions
import { AIAnswerResponse, AIChatMessage, AIRole } from 'quickblox';
import { IChatMessage } from '../../../Data/source/AISource';
import { IUseCase } from '../base/IUseCase';
import { IRemoteDataSource } from '../../../Data/source/remote/IRemoteDataSource';

// interface AIChatMessageEx extends AIChatMessage {
//   content: string;
// } // artik 19.05.2024
export class AIAnswerAssistWithSDKUseCase implements IUseCase<void, string> {
  private textToSend: string;

  private dialogMessages: IChatMessage[];

  private dataSource: IRemoteDataSource;

  private smartChatAssistantId: string;

  constructor(
    textToSend: string,
    dialogMessages: IChatMessage[],
    dataSource: IRemoteDataSource,
    smartChatAssistantId: string,
  ) {
    console.log('CONSTRUCTOR AIAnswerAssistWithSDKUseCase');
    this.textToSend = textToSend;
    this.dialogMessages = dialogMessages;
    this.dataSource = dataSource;
    this.smartChatAssistantId = smartChatAssistantId;
  }

  async execute(): Promise<string> {
    console.log('execute AIAnswerAssistWithSDKUseCase');
    const history: AIChatMessage[] = this.dialogMessages.map(
      (msg: IChatMessage) => {
        return {
          role: msg.role as AIRole,
          message: msg.content,
        } as AIChatMessage;
      },
    );
    const response: AIAnswerResponse = await this.dataSource.createAnswer(
      this.textToSend,
      history,
      this.smartChatAssistantId,
    );

    return response.answer;
  }
}
