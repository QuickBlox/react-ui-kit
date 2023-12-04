import React from 'react';
import './AITranslateComponent.scss';
import AIWidgetActions from '../../AIWidgets/AIWidgetActions/AIWidgetActions';
import TranslateIcon from '../../../../components/UI/svgs/Icons/Media/Translate';
import {
  FunctionTypeStringToVoid,
  FunctionTypeVoidToVoid,
} from '../../../../../CommonTypes/BaseViewModel';

interface AITranslateComponentProps {
  onTranslate: FunctionTypeStringToVoid;
  onClickOriginalText: FunctionTypeVoidToVoid;
  originalTextMessage: boolean;
  waitAITranslateWidget: boolean;
  languagesForAITranslate: string[];
}

export default function AITranslateComponent(props: AITranslateComponentProps) {
  const {
    onTranslate,
    onClickOriginalText,
    originalTextMessage,
    waitAITranslateWidget,
    languagesForAITranslate,
  } = props;

  return (
    <div className="translate-wrapper">
      <div className="translate-caption">
        <div
          className="ai-translate-action"
          style={{
            cursor: waitAITranslateWidget ? '' : 'pointer',
          }}
          onClick={() => {
            if (waitAITranslateWidget) return;

            if (originalTextMessage) {
              onTranslate('');
            } else {
              onClickOriginalText();
            }
          }}
        >
          {originalTextMessage ? 'Show translation' : 'Show original'}
        </div>
      </div>
      <AIWidgetActions
        disabled={!waitAITranslateWidget}
        widgetToRender={
          <div
            className="icon-translate"
            style={{
              cursor: waitAITranslateWidget ? '' : 'pointer',
            }}
          >
            <TranslateIcon
              width="16"
              height="16"
              applyZoom
              color="var(--tertiary-elements)"
            />
          </div>
        }
        items={languagesForAITranslate.map((item) => {
          return {
            title: item,
            action: () => {
              if (!props.waitAITranslateWidget) {
                props.onTranslate(item);
              }
            },
          };
        })}
      />
    </div>
  );
}
