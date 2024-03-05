import cn from 'classnames';

import './Badge.scss';

interface BadgeProps {
  count: number;
  limit?: number;
  mute?: boolean;
  classNames?: string;
}

export default function Badge({
  count,
  limit,
  mute = false,
  classNames,
}: BadgeProps) {
  return (
    <div className={cn('badge', { 'badge--mute': mute }, classNames)}>
      {limit && count > limit ? `${limit}+` : count}
    </div>
  );
}
