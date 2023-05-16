import React from 'react';
import './RowRightContainer.scss';
export type RowRightContainerProps = {
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
declare const RowRightContainer: React.FC<RowRightContainerProps>;
export default RowRightContainer;
