import React from 'react';
import { JSX } from 'react';
import cn from 'classnames';
import ColumnContainer from '../../components/containers/ColumnContainer/ColumnContainer';
import { DialogEntity } from '../../../Domain/entity/DialogEntity';
import { useMobileLayout } from '../../components/containers/SectionList/hooks';
import './DialogList.scss';
import BaseViewModel from '../../../CommonTypes/BaseViewModel';

type DialogListProps = {
  onDialogSelected: (
    dialog: BaseViewModel<DialogEntity>,
    index: number,
  ) => void;
  renderHeader: JSX.Element | null; // Заменяем ReactNode
  renderFilter?: JSX.Element | null; // Заменяем ReactNode
  renderDialogList: (
    handleSelectDialog: (
      dialog: BaseViewModel<DialogEntity>,
      index: number,
    ) => void,
  ) => JSX.Element | JSX.Element[] | null; // Заменяем ReactNode
  scrollableHeight?: number;
  canScrolling?: boolean;
};

// eslint-disable-next-line react/function-component-definition
const DialogList = ({
  onDialogSelected,
  renderHeader,
  renderFilter,
  renderDialogList,
  scrollableHeight = 736,
  canScrolling = false,
}: DialogListProps) => {
  const [isMobile] = useMobileLayout();

  return (
    <div className="dialog-list">
      <ColumnContainer maxWidth={isMobile ? '100%' : '320px'}>
        <div className="dialog-list-header">{renderHeader}</div>
        {renderFilter}

        <div
          className={cn('scroll-box', {
            'dialog-list__scrolling': canScrolling,
          })}
          style={{ maxHeight: 'initial', height: 'initial' }}
          ref={(el) => {
            if (el) {
              el.style.setProperty(
                'max-height',
                `${scrollableHeight}px`,
                'important',
              );
              el.style.setProperty(
                'height',
                `${scrollableHeight}px`,
                'important',
              );
            }
          }}
        >
          {renderDialogList(onDialogSelected)}
        </div>
      </ColumnContainer>
    </div>
  );
};

export default DialogList;
