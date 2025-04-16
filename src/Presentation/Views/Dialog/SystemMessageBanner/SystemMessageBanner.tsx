import React from 'react';
import './SystemMessageBanner.scss';

type SystemMessageBannerProps = {
  messageText: string;
};

// eslint-disable-next-line react/function-component-definition
export const SystemMessageBanner = ({
  messageText,
}: SystemMessageBannerProps) => {
  return (
    <div className="system-message-chat-banner">
      <div className="username-join-this-chat">{messageText}</div>
    </div>
  );
};
