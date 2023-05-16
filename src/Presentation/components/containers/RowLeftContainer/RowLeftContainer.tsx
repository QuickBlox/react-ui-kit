import React from 'react';
import './RowLeftContainer.scss';

export type RowLeftContainerProps = {
  LeftItem?: React.ReactNode;
  CenterItem?: React.ReactNode;
  RightItem?: React.ReactNode;
  gapBetweenItem?: string;
  minWidthContainer?: string;
  minHeightContainer?: string;
  LeftContainerSize?: {
    flexBasis: string;
    minWidth: string;
    maxWidth: string;
    minHeight: string;
    maxHeight: string;
  };
  CenterContainerSize?: {
    flexBasis: string;
    minWidth?: string;
    maxWidth?: string;
    minHeight: string;
    maxHeight: string;
  };
  RightContainerSize?: {
    flexBasis: string;
    minWidth: string;
    maxWidth: string;
    minHeight: string;
    maxHeight: string;
  };
};

// eslint-disable-next-line react/function-component-definition
const RowLeftContainer: React.FC<RowLeftContainerProps> = ({
  LeftItem,
  CenterItem,
  RightItem,
  gapBetweenItem,
  minWidthContainer,
  minHeightContainer,
  LeftContainerSize,
  CenterContainerSize,
  RightContainerSize,
}: RowLeftContainerProps) => {
  const gapBetweenStyles = gapBetweenItem ? { gap: gapBetweenItem } : {};

  const widthStyles = minWidthContainer
    ? { ...gapBetweenStyles, minWidth: minWidthContainer }
    : gapBetweenStyles;

  const containerStyles = minHeightContainer
    ? { ...widthStyles, minHeight: minHeightContainer }
    : widthStyles;

  const leftContainerStyles = LeftContainerSize || {};

  const centerContainerStyles = CenterContainerSize || {};

  const rightContainerStyles = RightContainerSize || {};

  return (
    <div style={containerStyles} className="row-left-layout-main-container">
      {LeftItem && (
        <div
          style={leftContainerStyles}
          className="row-left-layout-main-container__item-left"
        >
          {LeftItem}
        </div>
      )}
      <div
        style={centerContainerStyles}
        className="row-left-layout-main-container__item-center"
      >
        {CenterItem}
      </div>
      {RightItem && (
        <div
          style={rightContainerStyles}
          className="row-left-layout-main-container__item-right"
        >
          {RightItem}
        </div>
      )}
    </div>
  );
};

export default RowLeftContainer;

/*
 *
 *
 *
 *
 * */
