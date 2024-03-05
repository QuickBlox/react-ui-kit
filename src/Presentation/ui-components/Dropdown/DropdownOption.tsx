import { ReactElement } from 'react';

export interface Option {
  value: string;
  label: string;
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
}

interface DropdownOptionProps extends Option {
  onSelect: (value: string) => void;
}

export default function DropdownOption({
  label,
  value,
  leftIcon,
  rightIcon,
  onSelect,
}: DropdownOptionProps) {
  return (
    <li className="dropdown__option" onClick={() => onSelect(value)}>
      <span className="dropdown__label">
        {leftIcon}
        {label}
      </span>
      {rightIcon}
    </li>
  );
}
