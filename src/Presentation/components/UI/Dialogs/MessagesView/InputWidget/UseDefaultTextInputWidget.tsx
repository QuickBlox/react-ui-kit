import { useState } from 'react';
import { InputWidget } from './InputWidget';

export default function useDefaultTextInputWidget(): InputWidget {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function
  const fileToWidget = (file: File): void => {};

  const renderWidget = (): JSX.Element => {
    // return <SendIcon width="21" height="18" applyZoom color="red" />;
    return (
      <div
        style={{
          width: '21',
          height: '18',
          color: 'red',
          fontSize: '9px',
          fontStyle: 'bold',
          fontWeight: '900',
          border: '2px solid red',
        }}
      >
        T2V
      </div>
    );
  };

  async function getData(textToSend: string): Promise<string> {
    const response = await fetch(
      `https://func270519800.azurewebsites.net/api/TranslateTextToEng?text=${textToSend}`,
    );

    console.log('getData: response: ', response);
    const data = await response.text();

    console.log(
      'getData have response: ',
      JSON.stringify(data.replaceAll('\n\n', '')),
    );

    return data.replaceAll('\n\n', '');
  }

  const [textFromWidgetToInput, setTextFromWidgetToInput] = useState('');
  const textToWidget = (value: string): void => {
    if (value && value.length > 0) {
      // eslint-disable-next-line promise/catch-or-return,promise/always-return
      getData(value).then((data) => {
        setTextFromWidgetToInput(data);
      });
    }
  };

  return {
    fileToInput: undefined,
    textToInput: textFromWidgetToInput,
    fileToWidget,
    renderWidget,
    textToWidget,
  };
}
