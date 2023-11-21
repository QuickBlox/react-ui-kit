import React from 'react';
import './MainButton.scss';
import { FunctionTypeVoidToVoid } from '../../../../../CommonTypes/BaseViewModel';

export const TypeButton = {
  default: 'default',
  danger: 'danger',
  outlined: 'outlined',
  text: 'text',
  defaultDisabled: 'defaultDisabled',
} as const;

// 'enum like' "TS type" creation
export type ButtonArcheType = keyof typeof TypeButton;
type MainButtonProps = {
  title: string;
  typeButton?: ButtonArcheType;
  disabled?: boolean;
  // loading?: boolean;
  styleBox?: React.CSSProperties;
  clickHandler?: FunctionTypeVoidToVoid;
  touchHandler?: FunctionTypeVoidToVoid;
};

// eslint-disable-next-line react/function-component-definition,@typescript-eslint/no-unused-vars
const MainButton: React.FC<MainButtonProps> = ({
  title,
  typeButton = TypeButton.default,
  disabled = false,
  // loading = false,
  styleBox,
  clickHandler,
  touchHandler,
}) => {
  const StyleButton: Record<string, string> = {};

  StyleButton[TypeButton.default] = 'main-button';
  StyleButton[TypeButton.defaultDisabled] = 'main-disabled-button';
  StyleButton[TypeButton.danger] = 'danger-button';
  StyleButton[TypeButton.outlined] = 'secondary-button';
  StyleButton[TypeButton.text] = 'secondary-button';

  const mainClassName = [StyleButton[typeButton]].join(' ');

  return (
    <button
      className={
        disabled ? StyleButton[TypeButton.defaultDisabled] : mainClassName
      }
      type="button"
      style={styleBox}
      onClick={clickHandler}
      onTouchStart={touchHandler}
      disabled={disabled}
      // loading={loading}
    >
      {title}
    </button>
  );
};

export default MainButton;
