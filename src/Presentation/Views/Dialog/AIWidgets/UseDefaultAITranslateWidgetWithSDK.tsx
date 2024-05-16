import { useState } from 'react';
import AIWidgetIcon from '../../../components/UI/svgs/Icons/AIWidgets/AIWidget';
import ErrorMessageIcon from './ErrorMessageIcon';
import { AIMessageWidget } from './AIMessageWidget';
import { IChatMessage } from '../../../../Data/source/AISource';
import { RemoteDataSource } from '../../../../Data/source/remote/RemoteDataSource';
import { AITranslateWithSDKUseCase } from '../../../../Domain/use_cases/ai/AITranslateWithSDKUseCase';

export default function UseDefaultAITranslateWidgetWithSDK(
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
    additionalSettings?: { [key: string]: any },
  ): Promise<string> => {
    if (textToSend && textToSend.length > 0) {
      // eslint-disable-next-line no-return-await
      const { language } = additionalSettings || {};

      const useCaseAITranslate = new AITranslateWithSDKUseCase(
        textToSend,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        language,
        dataSource,
        smartChatAssistantId,
      );

      // eslint-disable-next-line no-return-await
      return await useCaseAITranslate.execute().then((data) => {
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
