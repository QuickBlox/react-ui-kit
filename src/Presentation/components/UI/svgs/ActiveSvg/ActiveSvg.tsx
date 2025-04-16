import React from 'react';
import { FunctionTypeVoidToVoid } from '../../../../../CommonTypes/BaseViewModel';
import './ActiveSvg.scss';

type ActiveSvgContainerProps = {
  content: React.ReactNode;
  onTouch?: FunctionTypeVoidToVoid;
  onClick?: FunctionTypeVoidToVoid;
  disabled?: boolean;
};
// eslint-disable-next-line react/function-component-definition
const ActiveSvg = ({
  content,
  onTouch,
  onClick,
  disabled = false,
}: ActiveSvgContainerProps) => {
  return (
    <div
      className="active-svg-container"
      style={{ cursor: disabled ? 'default' : 'pointer' }}
      onTouchStart={(event: React.TouchEvent) => {
        // eslint-disable-next-line no-unused-expressions
        onTouch && typeof onTouch === 'function' && !disabled
          ? onTouch()
          : () => {
              console.log('touched');
            };
        event.preventDefault();
      }}
      onClick={() => {
        // eslint-disable-next-line no-unused-expressions
        onClick && typeof onClick === 'function' && !disabled
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
