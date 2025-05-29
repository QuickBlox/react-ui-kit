import React from 'react';
import { ReactComponent as ForwardSvg } from '../../../icons/actions/forward-filled.svg';
import { ReactComponent as ReplySvg } from '../../../icons/actions/reply-filled.svg';
import './MessageCaption.scss';

interface MessageCaptionProps {
  type: 'outgoing' | 'incoming';
  subtype?: 'reply' | 'forward';
  userName: string;
}

const subtypeIconDictionary = {
  forward: ForwardSvg,
  reply: ReplySvg,
};

const renderSubtype = (subtype: 'reply' | 'forward') => {
  const SubTypeIcon = subtypeIconDictionary[subtype];

  return (
    <SubTypeIcon className={`message-caption__forward-reply--${subtype}`} />
  );
};

export default function MessageCaption({
  type,
  subtype,
  userName,
}: MessageCaptionProps) {
  return (
    <div className="message-caption__user__caption">
      <div className="message-caption__forward-reply">
        {subtype && renderSubtype(subtype)}
        <span className="message-caption__forward-reply__from">
          {subtype === 'forward' && 'Forwarded from '}
          {subtype === 'reply' && 'Replied to '}
        </span>
      </div>
      {(type === 'incoming' ||
        subtype === 'reply' ||
        subtype === 'forward') && (
        <div className="message-caption__user__caption__name">{userName}</div>
      )}
    </div>
  );
}
