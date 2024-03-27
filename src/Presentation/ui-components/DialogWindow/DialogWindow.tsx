import React, { ReactElement } from 'react';
import { createPortal } from 'react-dom';
import cn from 'classnames';

import Header from '../Header/Header';
import { CloseSvg } from '../../icons';
import './DialogWindow.scss';

interface DialogWindowProps {
  open: boolean;
  title: string;
  children: ReactElement | ReactElement[];
  onClose?: VoidFunction;
  className?: string;
  disableActions?: boolean;
}

export default function DialogWindow({
  children,
  onClose,
  open = false,
  title,
  className,
  disableActions = false,
}: DialogWindowProps) {
  if (!open) return null;

  return createPortal(
    <div className={cn('dialog-window', className)}>
      <div className={cn('', { 'dialog-window--disable': disableActions })} />
      <div className="dialog-window__content">
        <Header
          className="dialog-window__header"
          onGoBack={onClose}
          title={title}
        >
          <CloseSvg onClick={onClose} className="dialog-window__close" />
        </Header>
        {children}
      </div>
    </div>,
    document.body,
  );
}
