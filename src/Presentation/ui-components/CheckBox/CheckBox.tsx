import React from 'react';
import './CheckBox.scss';
import cn from 'classnames';
import { CheckOffSvg, CheckOnSvg } from '../../icons';

interface CheckBoxProps {
  disabled: boolean;
  checked: boolean;
  onChange?: (isSelected: boolean) => void;
}

export default function CheckBox({
  disabled,
  checked,
  onChange,
}: CheckBoxProps) {
  return (
    <label
      className={cn('checkbox-field', {
        disabled,
      })}
    >
      {checked ? (
        <CheckOnSvg className="icon-checkmark" />
      ) : (
        <CheckOffSvg className="icon-check" />
      )}
      <input
        type="checkbox"
        onChange={() => onChange?.(!checked)}
        disabled={disabled}
      />
    </label>
  );
}
