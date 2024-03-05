import { FunctionTypeVoidToVoid } from '../../../../CommonTypes/BaseViewModel';
import { ReactComponent as RobotSvg } from '../../../icons/actions/robot.svg';
import './AIAssist.scss';

interface AITrascribeComponentProps {
  onAssistAnswer: FunctionTypeVoidToVoid;
  waitAIWidget: boolean;
}

export default function AIAssist({
  onAssistAnswer,
  waitAIWidget,
}: AITrascribeComponentProps) {
  return (
    <div className="ai-assist-answer">
      <div className="ai-assist-answer__icon" onClick={onAssistAnswer}>
        {waitAIWidget ? (
          <div />
        ) : (
          <RobotSvg className="ai-assist-answer__icon__media-robot" />
        )}
      </div>
    </div>
  );
}
