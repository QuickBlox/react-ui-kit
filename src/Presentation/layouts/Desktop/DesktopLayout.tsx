import React from 'react';
import './DesktopLayout.scss';
import UiKitTheme from '../../themes/UiKitTheme';

type LayoutItems = {
  dialogsView: React.ReactNode;
  dialogMessagesView: React.ReactNode;
  dialogInfoView: React.ReactNode;
  theme?: UiKitTheme;
};
function DesktopLayout({
  dialogsView,
  dialogMessagesView,
  dialogInfoView,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  theme = undefined,
}: LayoutItems) {
  const mainContainerStyles = theme
    ? {
        color: theme.mainText(),
        backgroundColor: theme.mainBackground(),
        border: `1px solid ${theme.divider()}`,
      }
    : {};

  return (
    <div style={mainContainerStyles} className="desktop-layout-main-container">
      <div
        style={mainContainerStyles}
        className="desktop-layout-main-container__item-left"
      >
        {dialogsView}
      </div>
      <div
        style={mainContainerStyles}
        className="desktop-layout-main-container__item-center"
      >
        {dialogMessagesView}
      </div>
      {dialogInfoView && (
        <div
          style={mainContainerStyles}
          className="desktop-layout-main-container__item-right"
        >
          {dialogInfoView}
        </div>
      )}
    </div>
  );
}

export default DesktopLayout;
