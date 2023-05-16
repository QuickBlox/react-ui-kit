import React from 'react';
import './DesktopLayout.scss';

type LayoutItems = {
  dialogsView: React.ReactNode;
  dialogMessagesView: React.ReactNode;
  dialogInfoView: React.ReactNode;
};
function DesktopLayoutForMockModels({
  dialogsView,
  dialogMessagesView,
  dialogInfoView,
}: LayoutItems) {
  return (
    <div className="desktop-layout-main-container">
      <div className="desktop-layout-main-container__item-left">
        {dialogsView}
      </div>
      <div className="desktop-layout-main-container__item-center">
        {dialogMessagesView}
      </div>
      {dialogInfoView && (
        <div className="desktop-layout-main-container__item-right">
          {dialogInfoView}
        </div>
      )}
    </div>
  );
}

export default DesktopLayoutForMockModels;
