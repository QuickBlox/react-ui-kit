import './DialogHeader.scss';
import React from 'react';
import UiKitTheme from '../../../themes/UiKitTheme';

type DialogHeaderProps = {
  dialogName: string;
  renderAvatar: React.ReactNode;
  renderLeftActions: React.ReactNode;
  renderRightActions: React.ReactNode;
  countMembers?: number;
  theme?: UiKitTheme;
};
// eslint-disable-next-line react/function-component-definition
const DialogHeader: React.FC<DialogHeaderProps> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  dialogName,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  renderAvatar,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  renderLeftActions,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  renderRightActions,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  countMembers = 0,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  theme = undefined,
}: DialogHeaderProps) => {
  // eslint-disable-next-line consistent-return

  return (
    <div>
      <div className="dialog-header">
        <div className="dialog-header-left">
          {renderLeftActions}
          <div className="dialog-header-left-headline">
            <div className="dialog-header-left-avatar-and-name">
              {renderAvatar}
              <div className="dialog-header-dialog-name">
                {dialogName || 'Dialog name'}
              </div>
              {/* <div className="message-header-container--info-wrapper__detail__dialog-members"> */}
              {/*  {countMembers || 0} members */}
              {/* </div> */}
            </div>
          </div>
          {renderRightActions}
        </div>
        {/* <div>R</div> */}
      </div>
      <div className="dialog-header-line" />
    </div>
  );
};

export default DialogHeader;
