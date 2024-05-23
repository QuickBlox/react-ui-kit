import { useState } from 'react';
import { AIMessageWidget } from './AIMessageWidget';
import AIWidgetIcon from '../../../components/UI/svgs/Icons/AIWidgets/AIWidget';
import ErrorMessageIcon from './ErrorMessageIcon';
import { IChatMessage } from '../../../../Data/source/AISource';
import { RemoteDataSource } from '../../../../Data/source/remote/RemoteDataSource';
import { AIAnswerAssistWithSDKUseCase } from '../../../../Domain/use_cases/ai/AIAnswerAssistWithSDKUseCase';

export default function UseDefaultAIAssistAnswerWidgetWithSDK(
  dataSource: RemoteDataSource,
  smartChatAssistantId: string,
): AIMessageWidget {
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
      const useCaseAIAnswerAssist = new AIAnswerAssistWithSDKUseCase(
        textToSend,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        context,
        dataSource,
        smartChatAssistantId,
      );

      // eslint-disable-next-line no-return-await
      return await useCaseAIAnswerAssist
        .execute()
        .then((data) => {
          setTextFromWidgetToContent(data);

          return data;
        })
        .catch((reason) => {
          console.log('SDK: ai answer assist error: ', reason);
          setTextFromWidgetToContent(JSON.stringify(reason));

          return reason;
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
