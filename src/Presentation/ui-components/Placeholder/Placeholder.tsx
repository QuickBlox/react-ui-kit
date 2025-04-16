import React, { ReactElement } from 'react';
import cn from 'classnames';

import { RefreshSvg } from '../../icons';
import './Placeholder.scss';

interface PlaceholderProps {
  icon?: ReactElement;
  text: string | string[];
  onRetry?: VoidFunction;
  className?: string;
}

export default function Placeholder({
  icon,
  text,
  onRetry,
  className,
}: PlaceholderProps) {
  const renderText = (content: string, index?: number) => (
    <span key={index} className="placeholder__text">
      {content}
    </span>
  );

  return (
    <div className={cn('placeholder', className)}>
      {icon && <div className="placeholder__icon">{icon}</div>}
      {Array.isArray(text) ? text.map(renderText) : renderText(text)}
      {onRetry && (
        <div className="placeholder__retry">
          <RefreshSvg className="placeholder__retry-icon" onClick={onRetry} />
          Retry
        </div>
      )}
    </div>
  );
}
