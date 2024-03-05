import { ReactElement } from 'react';
import cn from 'classnames';
import { FunctionTypeVoidToVoid } from '../../../CommonTypes/BaseViewModel';
import './DialogItemPreview.scss';

export type DialogItemPreviewProps = {
  avatar: ReactElement;
  title: string;
  active?: boolean;
  date?: string;
  lastMessage?: ReactElement | string;
  badge?: ReactElement;
  contextMenu?: ReactElement;
  onClick?: FunctionTypeVoidToVoid;
  className?: string;
};

// eslint-disable-next-line react/function-component-definition
const DialogItemPreview: React.FC<DialogItemPreviewProps> = ({
  avatar,
  title,
  date,
  active,
  lastMessage,
  badge,
  contextMenu,
  onClick,
  className,
}: DialogItemPreviewProps) => {
  // eslint-disable-next-line consistent-return
  return (
    <div
      className={cn(
        'dialog-item-preview',
        { 'dialog-item-preview--active': active },
        className,
      )}
      onClick={onClick}
    >
      {avatar}
      <div className="dialog-item-preview__content">
        <div className="dialog-item-preview__content-top">
          <span className="dialog-item-preview__content-top-title">
            {title}
          </span>
          {date && (
            <span className="dialog-item-preview__content-top-date">
              {date}
            </span>
          )}
        </div>
        <div className="dialog-item-preview__content-bottom">
          <div className="dialog-item-preview__content-bottom-message">
            {lastMessage}
          </div>
          <div className="dialog-item-preview__content-bottom-controls">
            {badge}
            {contextMenu && (
              <div className="dialog-item-preview__content-bottom-controls-menu">
                {contextMenu}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DialogItemPreview;
