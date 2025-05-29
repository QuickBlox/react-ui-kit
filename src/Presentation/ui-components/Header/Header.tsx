import React, { Children, ReactElement } from 'react';
import cn from 'classnames';
import { FunctionTypeVoidToVoid } from '../../../CommonTypes/BaseViewModel';
import { BackSvg } from '../../icons';
import './Header.scss';

export type HeaderProps = {
  title: string;
  avatar?: ReactElement;
  badge?: ReactElement;
  children?: ReactElement | ReactElement[];
  onGoBack?: FunctionTypeVoidToVoid;
  className?: string;
};

// eslint-disable-next-line react/function-component-definition
const Header: React.FC<HeaderProps> = ({
  title,
  avatar,
  badge,
  children,
  onGoBack,
  className,
}: HeaderProps) => {
  return (
    <div className={cn('dialog-header', className)}>
      {onGoBack && (
        <BackSvg
          className="dialog-header__icon dialog-header__back"
          onClick={onGoBack}
        />
      )}
      <div className="dialog-header__body">
        <div className="dialog-header__body-left">
          {avatar}
          <span className="dialog-header__title">{title}</span>
          {badge}
        </div>
        {children && (
          <div className="dialog-header__body-right">
            {Children.map(children, (child) => (
              <span className="dialog-header__icon">{child}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
