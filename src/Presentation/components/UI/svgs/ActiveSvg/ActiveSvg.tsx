import React from 'react';
import { FunctionTypeVoidToVoid } from '../../../../../CommonTypes/BaseViewModel';
import './ActiveSvg.scss';

type ActiveSvgContainerProps = {
  content: React.ReactNode;
  touchAction?: FunctionTypeVoidToVoid;
  clickAction?: FunctionTypeVoidToVoid;
};
// eslint-disable-next-line react/function-component-definition
const ActiveSvg: React.FC<ActiveSvgContainerProps> = ({
  content,
  touchAction,
  clickAction,
}: ActiveSvgContainerProps) => {
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

export default ActiveSvg;
