import React from 'react';
import './AIAssistComponent.scss';
import BotIcon from '../../../../components/UI/svgs/Icons/AIWidgets/BotIcon/BotIcon';
import { FunctionTypeVoidToVoid } from '../../../../../CommonTypes/BaseViewModel';

function AIAssistComponent(props: {
  onAssistAnswer: FunctionTypeVoidToVoid;
  waitAIWidget: boolean;
}) {
  return (
    <div
      className="ai-assist-answer"
      style={{
        cursor: !props.waitAIWidget ? 'pointer' : '',
      }}
    >
      <div className="ai-assist-icon" onClick={props.onAssistAnswer}>
        <div
          style={{
            padding: '5px 3px 5px 3px',
            alignSelf: 'stretch',
            flex: '1',
            position: 'relative',
            overflow: 'visible',
          }}
        >
          <BotIcon width="24" height="25" applyZoom color="var(--primary)" />
        </div>
      </div>
    </div>
  );
}

export default AIAssistComponent;
