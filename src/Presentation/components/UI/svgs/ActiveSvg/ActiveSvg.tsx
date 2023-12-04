import React from 'react';
import { FunctionTypeVoidToVoid } from '../../../../../CommonTypes/BaseViewModel';
import './ActiveSvg.scss';

type ActiveSvgContainerProps = {
  content: React.ReactNode;
  onTouch?: FunctionTypeVoidToVoid;
  onClick?: FunctionTypeVoidToVoid;
};
// eslint-disable-next-line react/function-component-definition
const ActiveSvg: React.FC<ActiveSvgContainerProps> = ({
  content,
  onTouch,
  onClick,
}: ActiveSvgContainerProps) => {
  return (
    <div
      className="active-svg-container"
      onTouchStart={() => {
        // eslint-disable-next-line no-unused-expressions
        onTouch && typeof onTouch === 'function'
          ? onTouch()
          : () => {
              console.log('touched');
            };
      }}
      onClick={() => {
        // eslint-disable-next-line no-unused-expressions
        onClick && typeof onClick === 'function'
          ? onClick()
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
