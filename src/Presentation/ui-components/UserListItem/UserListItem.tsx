import React from 'react';
import cn from 'classnames';

import Avatar from '../Avatar/Avatar';
import CheckBox from '../CheckBox/CheckBox';
import './UserListItem.scss';

export interface UserListItemProps {
  userName: string;
  avatarUrl?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

export default function UserListItem({
  avatarUrl,
  userName,
  checked = false,
  disabled = false,
  onChange,
  className,
}: UserListItemProps) {
  return (
    <div
      className={cn(
        'user-list-item',
        {
          'user-list-item--disabled': disabled,
        },
        className,
      )}
    >
      <div className="user-list-item__avatar">
        <Avatar src={avatarUrl} />
        <span className="user-list-item__name">{userName}</span>
      </div>
      {onChange && (
        <CheckBox onChange={onChange} disabled={disabled} checked={checked} />
      )}
    </div>
  );
}
