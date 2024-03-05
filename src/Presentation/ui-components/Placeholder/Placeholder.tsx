import { ReactElement } from 'react';
import cn from 'classnames';

import { RefreshSvg } from '../../icons';
import './Placeholder.scss';

interface PlaceholderProps {
  icon: ReactElement;
  text: string;
  onRetry?: VoidFunction;
  className?: string;
}

export default function Placeholder({
  icon,
  text,
  onRetry,
  className,
}: PlaceholderProps) {
  return (
    <div className={cn('placeholder', className)}>
      <div className="placeholder__icon">{icon}</div>
      <span className="placeholder__text">{text}</span>
      {onRetry && (
        <div className="placeholder__retry">
          <RefreshSvg className="placeholder__retry-icon" onClick={onRetry} />
          Retry
        </div>
      )}
    </div>
  );
}
