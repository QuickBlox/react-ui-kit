import React, { ReactElement } from 'react';
import cn from 'classnames';
import Avatar from '../Avatar/Avatar';
import CheckBox from '../CheckBox/CheckBox';
import MessageCaption from './MessageCaption/MessageCaption';
import TimeAndStatus from './TimeAndStatus/TimeAndStatus';
import './Message.scss';

export type MessageProps = {
  userName: string;
  avatar?: ReactElement;
  time: string;
  type: 'outgoing' | 'incoming';
  subtype?: 'reply' | 'forward';
  status?: 'sent' | 'delivered' | 'viewed' | 'error';
  enableSelect?: boolean;
  isSelect?: boolean;
  disabled?: boolean;
  onSelect?: (isSelected: boolean) => void;
  bottomPart?: ReactElement;
  additionalPart?: ReactElement;
  children?: ReactElement;
};

// eslint-disable-next-line react/function-component-definition,@typescript-eslint/no-unused-vars
export default function Message({
  userName,
  avatar = <Avatar />,
  time,
  type,
  status,
  subtype,
  enableSelect = false,
  isSelect = false,
  disabled = false,
  onSelect,
  bottomPart,
  additionalPart,
  children,
}: MessageProps) {
  return (
    <div className="message-item">
      {enableSelect && (
        <CheckBox disabled={disabled} checked={isSelect} onChange={onSelect} />
      )}

      {type === 'outgoing' ? (
        <div className="message-item__right">
          <div className="message-item__outgoing">
            <TimeAndStatus status={status} time={time} />
            {additionalPart}
            <div className="message-item__outgoing__chat">
              <MessageCaption
                type={type}
                subtype={subtype}
                userName={userName}
              />
              <div
                className={cn(null, {
                  'reply-forward-message':
                    subtype === 'reply' || subtype === 'forward',
                })}
              >
                {children}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="message-item__incoming-mes">
          {avatar}
          <div className="message-item__incoming">
            <MessageCaption type={type} subtype={subtype} userName={userName} />
            <div className="message-item__incoming__chat">
              <div className="message-item__incoming__chat__bubble">
                {subtype === 'reply' || subtype === 'forward' ? (
                  <div className="reply-forward-message">{children}</div>
                ) : (
                  children
                )}
                {bottomPart}
              </div>
              {additionalPart}
              <TimeAndStatus time={time} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
