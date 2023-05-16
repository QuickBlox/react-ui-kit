import React from 'react';
import { FunctionTypeVoidToVoid } from '../../../../Views/Base/BaseViewModel';

type ActiveButtonContainerProps = {
  content: React.ReactNode;
  touchAction?: FunctionTypeVoidToVoid;
  clickAction?: FunctionTypeVoidToVoid;
};
// eslint-disable-next-line react/function-component-definition
const ActiveButton: React.FC<ActiveButtonContainerProps> = ({
  content,
  touchAction,
  clickAction,
}: ActiveButtonContainerProps) => {
  return (
    <div
      className="active-svg-container"
      onTouchStart={() => {
        // eslint-disable-next-line no-unused-expressions
        touchAction && typeof touchAction === 'function'
          ? touchAction()
          : () => {
              console.log('touched');
            };
      }}
      onClick={() => {
        // eslint-disable-next-line no-unused-expressions
        clickAction && typeof clickAction === 'function'
          ? clickAction()
          : () => {
              console.log('clicked');
            };
      }}
    >
      {content}
    </div>
  );
};

export default ActiveButton;
