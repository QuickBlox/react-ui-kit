import React, { useEffect, useState } from 'react';
import './AIRephraseWidget.scss';
import { Tone } from 'qb-ai-rephrase/src/Tone';
import { QBAIRephrase } from 'qb-ai-rephrase';
import {
  FunctionTypeBooleanToVoid,
  FunctionTypeStringToVoid,
} from '../../../../../CommonTypes/BaseViewModel';
import { AIMessageWidget } from '../AIMessageWidget';
import { MessageEntity } from '../../../../../Domain/entity/MessageEntity';
import AIWidgetActions, { MenuItem } from '../AIWidgetActions/AIWidgetActions';
import ToneIcon from '../../../../components/UI/svgs/Icons/Actions/Tone';
import NecktieIcon from '../../../../components/UI/svgs/Icons/AIWidgets/NecktieIcon';
import HandshakeIcon from '../../../../components/UI/svgs/Icons/AIWidgets/HandshakeIcon';
import MuscleIcon from '../../../../components/UI/svgs/Icons/AIWidgets/MuscleIcon';
import PalmsUpTogetherIcon from '../../../../components/UI/svgs/Icons/AIWidgets/PalmsUpTogetherIcon';
import NeutralFaceIcon from '../../../../components/UI/svgs/Icons/AIWidgets/NeutralFaceIcon';
import HammerIcon from '../../../../components/UI/svgs/Icons/AIWidgets/HammerIcon';
import BookIcon from '../../../../components/UI/svgs/Icons/AIWidgets/BookIcon/BookIcon';
import PointUpIcon from '../../../../components/UI/svgs/Icons/AIWidgets/PointUpIcon';
import SmirkIcon from '../../../../components/UI/svgs/Icons/AIWidgets/SmirkIcon';
import PerformingArtsIcon from '../../../../components/UI/svgs/Icons/AIWidgets/PerformingArtsIcon';
import { AIUtils } from '../../../../../utils/utils';
import WhiteCheckMarkIcon from '../../../../components/UI/svgs/Icons/AIWidgets/WhiteCheckMarkIcon';
import UiKitTheme from '../../../../themes/UiKitTheme';

type AIRephraseWidgetProps = {
  messageText: string;
  waitAIWidget: boolean;
  setWaitAIWidget: FunctionTypeBooleanToVoid;
  setMessageErrorToast: FunctionTypeStringToVoid;
  setShowErrorToast: FunctionTypeBooleanToVoid;
  AIRephrase?: AIMessageWidget;
  messagesToView: MessageEntity[];
  currentUserId: number;
  maxTokensForAIRephrase: number;
  rephraseTones: Tone[];
  theme?: UiKitTheme;
  setPrevValueText: FunctionTypeStringToVoid;
};
// eslint-disable-next-line react/function-component-definition
const AIRephraseWidget: React.FC<AIRephraseWidgetProps> = ({
  messageText,
  waitAIWidget,
  setWaitAIWidget,
  setMessageErrorToast,
  setShowErrorToast,
  AIRephrase,
  messagesToView,
  currentUserId,
  maxTokensForAIRephrase,
  rephraseTones,
  theme = undefined,
  setPrevValueText,
}: AIRephraseWidgetProps) => {
  const [currentMessageText, setCurrentMessageText] =
    useState<string>(messageText);
  const [prevTextMessage, setPrevTextMessage] = useState<string>('');

  useEffect(() => {
    setCurrentMessageText(messageText);
  }, [messageText]);

  function getDefaultIcon(index: number) {
    const defaultIcons = [
      <NecktieIcon />,
      <HandshakeIcon />,
      <MuscleIcon />,
      <PalmsUpTogetherIcon />,
      <NeutralFaceIcon />,
      <HammerIcon />,
      <BookIcon />,
      <PointUpIcon />,
      <SmirkIcon />,
      <PerformingArtsIcon />,
    ];

    return defaultIcons[index] || <NeutralFaceIcon />;
  }

  function getAIEditingMessagesItems() {
    const items: MenuItem[] = [];

    const tones = rephraseTones || QBAIRephrase.defaultTones();

    for (let i = 0; i < tones.length; i += 1) {
      const tone = tones[i];
      const title = tone.name;
      const icon = getDefaultIcon(i) || <NeutralFaceIcon />;

      const action = () => {
        if (
          currentMessageText &&
          currentMessageText.length > 0 &&
          !waitAIWidget
        ) {
          setWaitAIWidget(true);
          setPrevTextMessage(currentMessageText);
          AIRephrase?.textToWidget(
            currentMessageText,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-argument
            AIUtils.messageEntitiesToIChatMessageCollection(
              messagesToView,
              currentUserId,
              maxTokensForAIRephrase,
            ),
            {
              tone,
            },
          )
            .then((answerText) => {
              // eslint-disable-next-line promise/always-return
              if (answerText === 'Rephrase failed.') {
                setMessageErrorToast('Rephrase failed. Try again.');
                setShowErrorToast(true);
              }
              setWaitAIWidget(false);
            })
            .catch(() => {
              setMessageErrorToast('Rephrase failed. Try again.');
              setShowErrorToast(true);
              setWaitAIWidget(false);
            });
        }
      };

      items.push({
        title,
        icon,
        action,
      });
    }
    //
    items.push({
      title: 'Back to prev.',
      icon: <WhiteCheckMarkIcon />,
      action: () => {
        if (
          currentMessageText &&
          currentMessageText.length > 0 &&
          !waitAIWidget
        ) {
          setCurrentMessageText(prevTextMessage);
          setPrevValueText(prevTextMessage);
        }
      },
    });

    //
    return items;
  }

  return (
    <div className="right">
      {AIRephrase && (
        <div
          className="icon"
          style={{
            cursor: !waitAIWidget ? 'pointer' : '',
          }}
        >
          <AIWidgetActions
            widgetToRender={
              <ToneIcon
                width="24"
                height="24"
                applyZoom
                color={theme ? theme.mainText() : 'var(--main-text)'}
              />
            }
            items={getAIEditingMessagesItems()}
          />
        </div>
      )}
    </div>
  );
};

export default AIRephraseWidget;
