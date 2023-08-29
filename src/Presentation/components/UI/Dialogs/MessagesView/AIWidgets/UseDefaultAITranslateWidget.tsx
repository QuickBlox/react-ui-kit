import { useState } from 'react';
import AIWidgetIcon from '../../../svgs/Icons/AIWidgets/AIWidget';
import ErrorMessageIcon from './ErrorMessageIcon';
import { AIMessageWidget } from './AIMessageWidget';
import { AISource, IChatMessage } from '../../../../../../Data/source/AISource';

interface MessageWidgetProps {
  // https://api.openai.com/v1/chat/completions'
  // api: 'v1/chat/completions',
  // servername: 'https://myproxy.com',
  // https://func270519800.azurewebsites.net/api/TranslateTextToEng
  servername: string;
  api: string;
  port: string;
  sessionToken: string;
  apiKey: string;
}
export default function UseDefaultAITranslateWidget({
  servername,
  api,
  port,
  sessionToken,
  apiKey,
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
    additionalSettings?: { [key: string]: any },
  ): Promise<string> => {
    if (textToSend && textToSend.length > 0) {
      // eslint-disable-next-line no-return-await
      let prompt = `Please, translate the next text in english and give me just only translated text. Text to translate is: "${textToSend}"`;
      const { language } = additionalSettings || {};

      if (language) {
        prompt = `Please, translate the next text in ${
          language as string
        } and give me just only translated text. Text to translate is: "${textToSend}"`;
      }

      if (apiKey.length > 0) {
        // eslint-disable-next-line no-return-await
        return await AISource.getData(
          prompt,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          context,
          servername,
          api,
          port,
          sessionToken,
        ).then((data) => {
          setTextFromWidgetToContent(data);

          return data;
        });
      }

      // eslint-disable-next-line no-return-await
      return await AISource.getDataWithProxyServer(
        prompt,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        context,
        servername,
        api,
        port,
        sessionToken,
      ).then((data) => {
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
