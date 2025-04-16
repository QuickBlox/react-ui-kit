import React, { ReactElement, useState } from 'react';
import cn from 'classnames';

import { DownSvg } from '../../icons';
import './SettingsItem.scss';

interface SettingsItemProps {
  icon: ReactElement;
  title: string;
  rightSection?: ReactElement | ReactElement[];
  children?: ReactElement | ReactElement[];
  className?: string;
  onClick?: VoidFunction;
}

export default function SettingsItem({
  icon,
  title,
  rightSection,
  children,
  className,
  onClick,
}: SettingsItemProps) {
  const [isShow, setIsShow] = useState(false);

  return (
    <div onClick={onClick} className={cn('settings-item', className)}>
      <div className="settings-item__body">
        <div className="settings-item__left-section">
          <span className="settings-item__icon">{icon}</span>
          <span className="settings-item__title">{title}</span>
        </div>
        <div className="settings-item__right-section">
          {rightSection}
          {children && (
            <DownSvg
              className={cn('settings-item__arrow', {
                'settings-item__arrow--opened': isShow,
              })}
              onClick={() => setIsShow(!isShow)}
            />
          )}
        </div>
      </div>
      {children && (
        <div
          className={cn('settings-item__children', {
            'settings-item__children--opened': isShow,
          })}
        >
          {children}
        </div>
      )}
    </div>
  );
}
