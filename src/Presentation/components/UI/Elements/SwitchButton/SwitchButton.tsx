import React from 'react';
import './SwitchButton.scss';
import { FunctionTypeVoidToVoid } from '../../../../../CommonTypes/BaseViewModel';

type SwitchButtonProps = {
  disabled?: boolean;
  styleBox?: React.CSSProperties;
  clickHandler?: FunctionTypeVoidToVoid;
  touchHandler?: FunctionTypeVoidToVoid;
};

// eslint-disable-next-line react/function-component-definition
const SwitchButton: React.FC<SwitchButtonProps> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  disabled = false,
  styleBox,
  clickHandler,
  touchHandler,
}) => {
  return (
    <div
      style={styleBox}
      onClick={() => {
        console.log('click on SwitchButton');
        if (typeof clickHandler === 'function') {
          clickHandler();
        }
      }}
      onTouchStart={() => {
        if (touchHandler) touchHandler();
      }}
    >
      <label className="switch">
        <input type="checkbox" />
        <span className="slider round" />
      </label>
    </div>
  );
};

/*
() => {
              console.log('clicked theme');
              document.documentElement.setAttribute('data-theme', 'dark');
              changeThemeActions();
            }
 */
export default SwitchButton;
