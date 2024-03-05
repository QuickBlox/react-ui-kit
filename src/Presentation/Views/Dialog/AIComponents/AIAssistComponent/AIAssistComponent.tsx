import React from 'react';
import './AIAssistComponent.scss';
import BotIcon from '../../../../components/UI/svgs/Icons/AIWidgets/BotIcon/BotIcon';
import { FunctionTypeVoidToVoid } from '../../../../../CommonTypes/BaseViewModel';

interface AIAssistComponentProps {
  onAssistAnswer: FunctionTypeVoidToVoid;
  waitAIWidget: boolean;
}

export default function AIAssistComponent(props: AIAssistComponentProps) {
  const { onAssistAnswer, waitAIWidget } = props;

  return (
    <div
      className="ai-assist-answer"
      style={{
        cursor: waitAIWidget ? '' : 'pointer',
      }}
    >
      <div className="ai-assist-icon" onClick={onAssistAnswer}>
        <div>
          <BotIcon width="24" height="25" applyZoom color="var(--primary)" />
        </div>
      </div>
    </div>
  );
}
