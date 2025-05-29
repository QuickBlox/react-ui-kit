import React from 'react';
import './ErrorToast.scss';

type ErrorToastProps = {
  messageText: string;
  // displayTimeout: number;
};

// eslint-disable-next-line react/function-component-definition
export const ErrorToast = ({
  messageText,
}: // displayTimeout,
ErrorToastProps) => {
  return (
    // <div>
    //   {messageText} - {displayTimeout}
    // </div>

    <div className="error-toast">
      <div className="translation-failed-try-again">{messageText}</div>
    </div>
  );
};
