import {
  DetailedHTMLProps,
  ForwardedRef,
  InputHTMLAttributes,
  ReactElement,
  forwardRef,
  useId,
} from 'react';
import cn from 'classnames';

import { RemoveSvg } from '../../icons';
import Loader from '../Loader/Loader';
import './TextField.scss';

type HTMLInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

interface TextFieldProps extends Omit<HTMLInputProps, 'onChange'> {
  label?: string;
  icon?: ReactElement;
  loading?: boolean;
  id?: string;
  value: string;
  onChange: (value: string) => void;
}

const TextField = forwardRef(
  (
    {
      label,
      icon,
      loading = false,
      disabled = false,
      className,
      id,
      value,
      onChange,
      ...inputProps
    }: TextFieldProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const defaultId = useId();

    return (
      <div
        className={cn(
          'qb-text-field',
          {
            'qb-text-field--disabled': disabled,
          },
          className,
        )}
      >
        {label && (
          <label htmlFor={id || defaultId} className="qb-text-field__label">
            {label}
          </label>
        )}

        <div className="qb-text-field__wrapper">
          {icon && <span className="qb-text-field__icon">{icon}</span>}
          <input
            {...inputProps}
            ref={ref}
            disabled={loading || disabled}
            className="qb-text-field__input"
            id={id || defaultId}
            value={value}
            onChange={(e) => onChange(e.currentTarget.value)}
          />
          {!loading && value && (
            <RemoveSvg
              className="qb-text-field__reset"
              onClick={() => onChange('')}
            />
          )}
          {loading && !disabled && (
            <Loader size="sm" className="qb-text-field__loader" />
          )}
        </div>
      </div>
    );
  },
);

export default TextField;
