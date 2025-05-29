import React from 'react';
import './NotFoundContent.scss';
import GroupChat from '../../../components/UI/svgs/Icons/Contents/GroupChat';

type NotFoundContentProps = {
  message: string;
};
// eslint-disable-next-line react/function-component-definition
const NotFoundContent: React.FC<NotFoundContentProps> = ({
  message,
}: NotFoundContentProps) => {
  return (
    <div className="not-found-content-container">
      <div className="not-found-content-container__icon">
        <GroupChat width="52" height="52" color="var(--caption)" />
      </div>
      <div className="not-found-content-container__message">{message}</div>
    </div>
  );
};

export default NotFoundContent;
