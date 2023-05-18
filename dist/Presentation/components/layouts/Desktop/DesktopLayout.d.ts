import React from 'react';
import './DesktopLayout.scss';
type LayoutItems = {
    dialogsView: React.ReactNode;
    dialogMessagesView: React.ReactNode;
    dialogInfoView: React.ReactNode;
};
declare function DesktopLayout({ dialogsView, dialogMessagesView, dialogInfoView, }: LayoutItems): import("react/jsx-runtime").JSX.Element;
export default DesktopLayout;
