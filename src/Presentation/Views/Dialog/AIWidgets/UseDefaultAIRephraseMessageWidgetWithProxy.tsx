import { useState } from 'react';
import { AIMessageWidget, MessageWidgetProps } from './AIMessageWidget';
import ErrorMessageIcon from './ErrorMessageIcon';
import AIWidgetIcon from '../../../components/UI/svgs/Icons/AIWidgets/AIWidget';
import { Tone } from './Tone';
import { IChatMessage } from '../../../../Data/source/AISource';
import { AIRephraseWithProxyUseCase } from '../../../../Domain/use_cases/ai/AIRephraseWithProxyUseCase';

// interface MessageWidgetProps {
//   servername: string;
//   api: string;
//   port: string;
//   apiKeyOrSessionToken: string;
//   apiKey: string;
// }

export default function UseDefaultAIRephraseMessageWidgetWithProxy({
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
    additionalSettings?: { [key: string]: any },
  ): Promise<string> => {
    if (textToSend && textToSend.length > 0) {
      const { tone } = additionalSettings || {};

      const openAIModel = 'gpt-3.5-turbo';

      const useCaseAIRephrase = new AIRephraseWithProxyUseCase(
        textToSend,
        tone as Tone,
        context,
        servername,
        api,
        port,
        apiKeyOrSessionToken,
        openAIModel,
      );

      // eslint-disable-next-line no-return-await
      return await useCaseAIRephrase.execute().then((data) => {
        setTextFromWidgetToContent(data);

        return data;
      });
    }

    //
    return '';
  };
  // const tonesToWidget = (): Tone[] => {
  //   return [
  //     Tone.Professional,
  //     Tone.Friendly,
  //     Tone.Encouraging,
  //     Tone.Empathetic,
  //     Tone.Assertive,
  //     Tone.Neutral,
  //     Tone.Instructive,
  //     Tone.Persuasive,
  //     Tone.Sarcastic,
  //     Tone.Poetic,
  //     Tone.Unchanged,
  //   ];
  // };

  return {
    textToContent: textFromWidgetToContent,
    renderWidget,
    textToWidget,
    // tonesToWidget,
  };
}
