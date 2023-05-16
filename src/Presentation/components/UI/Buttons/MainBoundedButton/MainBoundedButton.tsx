import React from 'react';
import './MainBoundedButton.scss';
import { FunctionTypeVoidToVoid } from '../../../../Views/Base/BaseViewModel';

type MainBoundedButtonProps = {
  title: string;
  styleBox: React.CSSProperties;
  clickHandler?: FunctionTypeVoidToVoid;
  touchHandler?: FunctionTypeVoidToVoid;
};
// eslint-disable-next-line react/function-component-definition,@typescript-eslint/no-unused-vars
const MainBoundedButton: React.FC<MainBoundedButtonProps> = ({
  title,
  styleBox,
  clickHandler,
  touchHandler,
}) => {
  return (
    <button
      type="button"
      style={styleBox}
      onClick={clickHandler}
      onTouchStart={touchHandler}
    >
      {title}
    </button>
  );
};

export default MainBoundedButton;
