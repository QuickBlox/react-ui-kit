import React from 'react';
import './ColumnContainer.scss';
import { ContainerProps } from '../../../layouts/LayoutCommonTypes';

// eslint-disable-next-line react/function-component-definition
const ColumnContainer: React.FC<ContainerProps> = ({
  children,
  gapBetweenItem,
  maxWidth,
}: ContainerProps) => {
  const containerStyles = gapBetweenItem ? { gap: gapBetweenItem } : {};

  const resumeStyles = maxWidth
    ? { ...containerStyles, width: maxWidth }
    : containerStyles;

  return (
    <div style={resumeStyles} className="column-container">
      {children}
    </div>
  );
};

export default ColumnContainer;
