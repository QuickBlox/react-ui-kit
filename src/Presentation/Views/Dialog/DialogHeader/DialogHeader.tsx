import './DialogHeader.scss';
import React from 'react';
import UiKitTheme from '../../../themes/UiKitTheme';

type DialogHeaderProps = {
  dialogName: string;
  renderAvatar: React.ReactNode;
  renderDialogNavigation: React.ReactNode;
  countMembers?: number;
  theme?: UiKitTheme;
};
// eslint-disable-next-line react/function-component-definition
const DialogHeader: React.FC<DialogHeaderProps> = ({
  dialogName,
  renderAvatar,
  renderDialogNavigation,
  countMembers = 0,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  theme = undefined,
}: DialogHeaderProps) => {
  // const [showDialogInformation, setShowDialogInformation] =
  //   React.useState(false);

  // eslint-disable-next-line consistent-return

  return (
    <div className="message-header-container">
      <div className="message-header-container--info-wrapper">
        <div className="message-header-container--info-wrapper__dialog-icon">
          {renderAvatar}
          {/* <GroupChat width="40" height="40" applyZoom color="#636D78" /> */}
        </div>
        <div className="message-header-container--info-wrapper__detail">
          <div className="message-header-container--info-wrapper__detail__dialog-name">
            {dialogName || 'Dialog name'}
          </div>
          <div className="message-header-container--info-wrapper__detail__dialog-members">
            {countMembers || 0} members
          </div>
        </div>
        <div className="message-header-container--info-wrapper__detail-button">
          <div
            className="message-header-container--info-wrapper__detail-button__call"
            style={{ width: '32px' }}
          >
            {/* <ActiveSvg */}
            {/*  content={<Phone width="32" height="32" applyZoom />} */}
            {/*  clickAction={() => { */}
            {/*    if (CallHandler) CallHandler(); */}
            {/*  }} */}
            {/*  touchAction={() => { */}
            {/*    if (CallHandler) CallHandler(); */}
            {/*  }} */}
            {/* /> */}
          </div>
          {renderDialogNavigation}
          {/* <div className="message-header-container--info-wrapper__detail-button__info"> */}
          {/*  <ActiveSvg */}
          {/*    content={ */}
          {/*      <InformationFill */}
          {/*        width="32" */}
          {/*        height="32" */}
          {/*        applyZoom */}
          {/*        color="var(--secondary-background)" */}
          {/*      /> */}
          {/*    } */}
          {/*    clickAction={() => { */}
          {/*      setShowDialogInformation(!showDialogInformation); */}
          {/*      if (onClickInfo) onClickInfo(); */}
          {/*    }} */}
          {/*    touchAction={() => { */}
          {/*      setShowDialogInformation(!showDialogInformation); */}
          {/*      if (onClickInfo) onClickInfo(); */}
          {/*    }} */}
          {/*  /> */}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default DialogHeader;
