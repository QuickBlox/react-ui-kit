import { useState } from 'react';
import { InputWidget } from './InputWidget';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import VoiceIcon from '../../../svgs/Icons/Actions/Voice';

export default function useDefaultVoiceInputWidget(): InputWidget {
  const renderWidget = (): JSX.Element => {
    // return <VoiceIcon width="21" height="18" applyZoom color="red" />;
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
        v2t
      </div>
    );
  };

  const [textFromWidgetToInput, setTextFromWidgetToInput] = useState('');
  const textToWidget = (value: string): void => {
    if (value && value.length > 0) {
      setTextFromWidgetToInput(value.toUpperCase());
    }
  };

  const [audioFromWidgetToInput, setAudioFromWidgetToInput] = useState<File>();

  async function sendFile(file: File): Promise<any> {
    if (file) {
      // Создание объекта FormData и добавление файла
      const formData = new FormData();

      formData.append('file', file, file.name);

      // Отправка запроса POST с телом formData
      const response = await fetch(
        'https://func270519800.azurewebsites.net/api/VoiceToText',
        {
          method: 'POST',
          body: formData,
        },
      );

      // Возвращение данных из ответа
      console.log('sendFile: response: ', response);
      const data = await response.text();

      console.log(
        'sendFile have response: ',
        JSON.stringify(data.replaceAll('\n\n', '')),
      );

      return data.replaceAll('\n\n', '');
    }
  }

  const fileToWidget = (file: File): void => {
    setAudioFromWidgetToInput(file);
    const fileInfo = `${file.name}, ${file.type}, ${file.size} Mb`;

    console.log(fileInfo);
    if (file) {
      // Отправка файла и получение результата
      sendFile(file).then((result) => {
        // Обработка результата
        console.log(result);
        setTextFromWidgetToInput(result);
      });
    }
  };

  return {
    fileToInput: audioFromWidgetToInput,
    textToInput: textFromWidgetToInput,
    fileToWidget,
    renderWidget,
    textToWidget,
  };
}
