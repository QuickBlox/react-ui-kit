import { useState } from 'react';
import { AIMessageWidget } from './AIMessageWidget';
import ErrorMessageIcon from './ErrorMessageIcon';
import AIWidgetIcon from '../../../svgs/Icons/AIWidgets/AIWidget';
import { Tone, toneToString } from './Tone';
import { AISource, IChatMessage } from '../../../../../../Data/source/AISource';

interface MessageWidgetProps {
  servername: string;
  api: string;
  port: string;
  sessionToken: string;
  apiKey: string;
}

export default function UseDefaultAIRephraseMessageWidget({
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
      let prompt = `Analyze the entire context of our conversation – all the messages – and create a brief summary of our discussion. Based on this analysis, rephrase the following text in a style and tone that is typical for most of the dialogue messages. Provide only the rephrased text in as the message text to rephrase and nothing more.Give me only rephrase text in brackets and nothing more. Here is the message text to rephrase:"${textToSend}"`;
      const { tone } = additionalSettings || {};

      if (tone) {
        prompt = `Analyze the entire context of our conversation – all the messages – and create a brief summary of our discussion. Based on this analysis, rephrase the following text in a ${toneToString(
          tone as Tone,
        )} style. Provide only the rephrased text in the same language as the message text to rephrase and nothing more.Give me only rephrase text in brackets and nothing more. Here is the message text to rephrase:"${textToSend}"`;
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

    //
    return '';
  };

  return {
    textToContent: textFromWidgetToContent,
    renderWidget,
    textToWidget,
  };
}
