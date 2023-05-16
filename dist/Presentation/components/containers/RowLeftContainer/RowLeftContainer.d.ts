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
declare const RowLeftContainer: React.FC<RowLeftContainerProps>;
export default RowLeftContainer;
