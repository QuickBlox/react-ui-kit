import { useState } from 'react';
import { AIWidget } from './AIWidget';
import AIWidgetIcon from '../../../svgs/Icons/Media/AIWidget';
import { IChatMessage } from '../../../../../Views/Base/BaseViewModel';
import { stringifyError } from '../../../../../../utils/parse';
import ErrorMessageIcon from './ErrorMessageIcon';

interface MessageWidgetProps {
  // https://api.openai.com/v1/chat/completions'
  // api: 'v1/chat/completions',
  // servername: 'https://myproxy.com',
  // https://func270519800.azurewebsites.net/api/TranslateTextToEng
  servername: string;
  api: string;
  port: string;
  sessionToken: string;
}
export default function UseDefaultAIAssistAnswerWidgetWithProxy({
  servername,
  api,
  port,
  sessionToken,
}: MessageWidgetProps): AIWidget {
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

  // async function getData(
  //   textToSend: string,
  //   dialogMessages: ChatCompletionRequestMessage[],
  // ): Promise<string> {
  //   //
  //   const apiEndpoint = 'https://api.openai.com/v1/chat/completions';
  //   const { apiKey } = QBConfig.configAIApi.AIAnswerAssistWidgetConfig; // Замените на ваш реальный ключ API
  //   const model = 'gpt-3.5-turbo';
  //   const requestOptions = {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${apiKey}`,
  //     },
  //     body: JSON.stringify({
  //       messages: [...dialogMessages, { role: 'user', content: textToSend }],
  //       model,
  //       temperature: 0.5,
  //     }),
  //   };
  //
  async function getData(
    textToSend: string,
    dialogMessages: IChatMessage[],
  ): Promise<string> {
    let outputMessage = '';
    const apiEndpoint = `${servername}${port}${api}`;
    const apiKey = sessionToken; // Замените на ваш реальный ключ API
    const model = 'gpt-3.5-turbo';
    const prompt = `Respond as a knowledgeable customer support specialist with access to ChatGPT features, and provide a simple and informative response to the inquiry :"${textToSend}"`;

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        messages: [...dialogMessages, { role: 'user', content: prompt }],
        model,
        temperature: 0.5,
      }),
    };

    //
    try {
      const response = await fetch(apiEndpoint, requestOptions);
      const data = await response.json();

      outputMessage = data.choices[0].message?.content || '';
    } catch (err) {
      outputMessage = stringifyError(err);
      setErrorMessage(outputMessage);
    }

    return outputMessage;
  }

  const [textFromWidgetToContent, setTextFromWidgetToContent] = useState('');
  // const textToWidget = (value: string, context: IChatMessage[]): void => {
  //   if (value && value.length > 0) {
  //     // eslint-disable-next-line promise/catch-or-return
  //     getOpenAIApiData(value, context as ChatCompletionRequestMessage[]).then(
  //       // eslint-disable-next-line promise/always-return
  //       (data) => {
  //         setTextFromWidgetToContent(data);
  //       },
  //     );
  //   }
  // };

  const textToWidget = (value: string, context: IChatMessage[]): void => {
    if (value && value.length > 0) {
      // eslint-disable-next-line promise/catch-or-return
      getData(value, context).then(
        // eslint-disable-next-line promise/always-return
        (data) => {
          setTextFromWidgetToContent(data);
        },
      );
    }
  };

  return {
    fileToContent: undefined,
    textToContent: textFromWidgetToContent,
    fileToWidget,
    renderWidget,
    textToWidget,
  };
}
