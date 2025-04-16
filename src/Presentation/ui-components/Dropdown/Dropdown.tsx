import React, {
  ReactElement,
  useEffect,
  useRef,
  useState,
  MouseEvent as ReactMouseEvent,
} from 'react';
import cn from 'classnames';

import DropdownOption, { Option } from './DropdownOption';
import './Dropdown.scss';

export interface DropDownProps {
  options: Option[];
  disabled?: boolean;
  children?: ReactElement | string | number;
  onSelect: (value: string) => void;
  className?: string;
  placement?: 'topRight' | 'bottomRight' | 'left';
}

export default function Dropdown({
  options,
  disabled = false,
  onSelect,
  className,
  children,
  placement = 'bottomRight',
}: DropDownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggleOpen = (
    e: ReactMouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    setIsOpen((state) => !state);
  };

  const handleSelect = (value: string) => {
    onSelect(value);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleBlur = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        e.target instanceof Node &&
        !dropdownRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen)
      document.addEventListener('click', handleBlur, {
        capture: true,
      });

    return () => document.removeEventListener('click', handleBlur);
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className={cn('qb-dropdown', className)}>
      <button
        type="button"
        className="qb-dropdown__toggle"
        onClick={handleToggleOpen}
      >
        {children}
      </button>
      <ul
        className={cn('qb-dropdown__menu', `qb-dropdown__menu--${placement}`, {
          'qb-dropdown__menu--opened': isOpen,
        })}
      >
        {options.map(({ label, value, leftIcon, rightIcon }) => (
          <DropdownOption
            label={label}
            value={value}
            disabled={disabled}
            onSelect={handleSelect}
            leftIcon={leftIcon}
            rightIcon={rightIcon}
            key={value}
          />
        ))}
      </ul>
    </div>
  );
}
