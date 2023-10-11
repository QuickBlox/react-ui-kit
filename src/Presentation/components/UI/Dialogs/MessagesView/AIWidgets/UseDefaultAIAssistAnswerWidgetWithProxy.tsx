import { useState } from 'react';
import { AIMessageWidget, MessageWidgetProps } from './AIMessageWidget';
import AIWidgetIcon from '../../../svgs/Icons/AIWidgets/AIWidget';
import ErrorMessageIcon from './ErrorMessageIcon';
import { IChatMessage } from '../../../../../../Data/source/AISource';
import { AIAnswerAssistWithProxyUseCase } from '../../../../../../Domain/use_cases/ai/AIAnswerAssistWithProxyUseCase';

// interface MessageWidgetProps {
//   // https://api.openai.com/v1/chat/completions'
//   // api: 'v1/chat/completions',
//   // servername: 'https://myproxy.com',
//   // https://func270519800.azurewebsites.net/api/TranslateTextToEng
//   servername: string;
//   api: string;
//   port: string;
//   apiKeyOrSessionToken: string;
//   apiKey: string;
// }
export default function UseDefaultAIAssistAnswerWidgetWithProxy({
  servername,
  api,
  port,
  apiKeyOrSessionToken,
}: MessageWidgetProps): AIMessageWidget {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [errorMessage, setErrorMessage] = useState<string>('');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function
  const fileToWidget = (file: File, context: IChatMessage[]): void => {};

  const renderWidget = (): JSX.Element => {
    if (errorMessage && errorMessage.length > 0) {
      const errorsDescriptions:
        | { title: string; action: () => void }[]
        | undefined = [];

      return (
        <ErrorMessageIcon
          errorMessageText={errorMessage}
          errorsDescriptions={errorsDescriptions}
        />
      );
    }

    return <AIWidgetIcon applyZoom color="green" />;
  };

  const [textFromWidgetToContent, setTextFromWidgetToContent] = useState('');
  const textToWidget = async (
    textToSend: string,
    context: IChatMessage[],
  ): Promise<string> => {
    if (textToSend && textToSend.length > 0) {
      const openAIModel = 'gpt-3.5-turbo';

      const useCaseAIAnswerAssist = new AIAnswerAssistWithProxyUseCase(
        textToSend,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        context,
        servername,
        api,
        port,
        apiKeyOrSessionToken,
        openAIModel,
      );

      // eslint-disable-next-line no-return-await
      return await useCaseAIAnswerAssist.execute().then((data) => {
        setTextFromWidgetToContent(data);

        return data;
      });
    }

    return '';
  };

  return {
    textToContent: textFromWidgetToContent,
    renderWidget,
    textToWidget,
  };
}
