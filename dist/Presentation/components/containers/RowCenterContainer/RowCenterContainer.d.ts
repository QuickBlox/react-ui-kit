import React from 'react';
import './RowCenterContainer.scss';
export type RowCenterContainerProps = {
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
declare const RowCenterContainer: React.FC<RowCenterContainerProps>;
export default RowCenterContainer;
