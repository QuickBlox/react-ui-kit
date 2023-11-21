import React from 'react';
import './AITranslateComponent.scss';
import AIWidgetActions from '../../AIWidgets/AIWidgetActions/AIWidgetActions';
import TranslateIcon from '../../../../components/UI/svgs/Icons/Media/Translate';
import {
  FunctionTypeStringToVoid,
  FunctionTypeVoidToVoid,
} from '../../../../../CommonTypes/BaseViewModel';

function AITranslateComponent(props: {
  onTranslate: FunctionTypeStringToVoid;
  onClickOriginalText: FunctionTypeVoidToVoid;
  originalTextMessage: boolean;
  waitAITranslateWidget: boolean;
  languagesForAITranslate: string[];
}) {
  return (
    <div className="translate-wrapper">
      <div className="translate-caption">
        <div
          className="ai-translate-action"
          style={{
            cursor: !props.waitAITranslateWidget ? 'pointer' : '',
          }}
          onClick={() => {
            if (!props.waitAITranslateWidget) {
              if (props.originalTextMessage) {
                props.onTranslate('');
              } else {
                props.onClickOriginalText();
              }
            }
          }}
        >
          {props.originalTextMessage ? 'Show translation' : 'Show original'}
        </div>
      </div>
      <AIWidgetActions
        disabled={!props.waitAITranslateWidget}
        widgetToRender={
          <div
            className="icon-translate"
            style={{
              cursor: !props.waitAITranslateWidget ? 'pointer' : '',
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
        items={props.languagesForAITranslate.map((item) => {
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

export default AITranslateComponent;
