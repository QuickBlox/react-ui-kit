import React from 'react';
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactElement } from 'react';
import cn from 'classnames';

import Loader from '../Loader/Loader';
import './Button.scss';

type HTMLButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

interface ButtonProps extends HTMLButtonProps {
  variant?: 'default' | 'outlined' | 'danger' | 'text';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  children?: ReactElement | string | number;
}

export default function Button({
  variant = 'default',
  className,
  disabled = false,
  loading = false,
  children,
  ...rest
}: ButtonProps) {
  return (
    // eslint-disable-next-line react/button-has-type
    <button
      className={cn(
        'qb-button',
        `qb-button--${variant}`,
        { 'qb-button--disabled': disabled },
        className,
      )}
      disabled={disabled || loading}
      {...rest}
    >
      {loading && !disabled ? (
        <Loader
          className={cn('qb-button__loader', `qb-button__loader--${variant}`)}
        />
      ) : (
        children
      )}
    </button>
  );
}
