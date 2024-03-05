// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  HighLightLink,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  messageHasUrls,
} from '../../../../Views/Dialog/Message/HighLightLink/HighLightLink';
import './TextBubble.scss';

interface TextBubbleProps {
  text: string;
  type: 'outgoing' | 'incoming';
}

export default function TextBubble({ text, type }: TextBubbleProps) {
  return (
    <div className={`text-bubble-background__${type}`}>
      <div className="bubble-content-text">
        {messageHasUrls(text) ? <HighLightLink messageText={text} /> : text}
      </div>
    </div>
  );
}
