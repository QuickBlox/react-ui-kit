import React from 'react';
import './DesktopLayout.scss';
type LayoutItems = {
    dialogsView: React.ReactNode;
    dialogMessagesView: React.ReactNode;
    dialogInfoView: React.ReactNode;
};
declare function DesktopLayoutForMockModels({ dialogsView, dialogMessagesView, dialogInfoView, }: LayoutItems): JSX.Element;
export default DesktopLayoutForMockModels;
