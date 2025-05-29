import React from 'react';
import './SystemDateBanner.scss';

type SystemDateBannerProps = {
  text: string;
};

// eslint-disable-next-line react/function-component-definition
export const SystemDateBanner: React.FC<SystemDateBannerProps> = ({
  text,
}: SystemDateBannerProps) => {
  return (
    <div className="system-date-banner-chat-banner">
      <div className="system-date-this-chat">{text}</div>
    </div>
  );
};
