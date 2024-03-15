import { ReactComponent as RobotSvg } from '../../../../icons/actions/robot.svg';
import { AIMessageWidget } from '../../AIWidgets/AIMessageWidget';
import { MessageEntity } from '../../../../../Domain/entity/MessageEntity';
import { AIUtils } from '../../../../../utils/utils';
import './AIAssist.scss';

interface AIAssistProps {
  loading?: boolean;
  AIAssistWidget: AIMessageWidget;
  maxTokens?: number;
  onLoading: (isLoading: boolean, id: string) => void;
  onError: (messageError: string) => void;
  messageToAssist?: MessageEntity;
  messageHistory?: MessageEntity[];
  currentUserId?: number;
}

export default function AIAssist({
  loading = false,
  AIAssistWidget,
  maxTokens,
  onLoading,
  onError,
  messageToAssist,
  messageHistory,
  currentUserId,
}: AIAssistProps) {
  async function assistAnswerHandler() {
    if (loading) {
      return;
    }

    try {
      if (messageToAssist && messageHistory) {
        onLoading(true, messageToAssist.id);
        await AIAssistWidget.textToWidget(
          messageToAssist.message,
          AIUtils.messageEntitiesToIChatMessageCollection(
            messageHistory,
            currentUserId,
            maxTokens,
          ),
        );
      } else {
        onError('Assist failed.');
      }
    } catch (error) {
      onError(error instanceof Error ? error.message : 'Assist failed.');
    } finally {
      onLoading(false, messageToAssist ? messageToAssist.id : '0');
    }
  }

  return (
    <div className="ai-assist-answer">
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <div className="ai-assist-answer__icon" onClick={assistAnswerHandler}>
        {!loading && (
          <RobotSvg className="ai-assist-answer__icon__media-robot" />
        )}
      </div>
    </div>
  );
}
