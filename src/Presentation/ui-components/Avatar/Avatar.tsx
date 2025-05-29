import React, { ReactElement } from 'react';

import cn from 'classnames';
import { UserSvg } from '../../icons';
import './Avatar.scss';

export interface AvatarProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  icon?: ReactElement;
  className?: string;
  src?: string;
}

export default function Avatar({
  icon = <UserSvg />,
  size = 'md',
  className,
  src,
}: AvatarProps) {
  if (src) {
    return (
      <div className={cn('qb-avatar', `qb-avatar--${size}`, className)}>
        <img src={src} className="qb-avatar__image" alt="Avatar" />
      </div>
    );
  }

  return (
    <div className={cn('qb-avatar', `qb-avatar--${size}`, className)}>
      {icon}
    </div>
  );
}
