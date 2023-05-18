import './HeaderMessages.scss';
import React from 'react';
import { FunctionTypeVoidToVoid } from '../../../../../Views/Base/BaseViewModel';
import { DialogEntity } from '../../../../../../Domain/entity/DialogEntity';
import GroupChat from '../../../svgs/Icons/Contents/GroupChat';
import Phone from '../../../svgs/Icons/Actions/Phone';
import InformationFill from '../../../svgs/Icons/Status/InformationFill';
import ActiveSvg from '../../../svgs/ActiveSvg/ActiveSvg';
import { DialogType } from '../../../../../../Domain/entity/DialogTypes';
import { GroupDialogEntity } from '../../../../../../Domain/entity/GroupDialogEntity';
import UserAvatar from '../../EditDialog/UserAvatar/UserAvatar';
import User from '../../../svgs/Icons/Contents/User';
import { PublicDialogEntity } from '../../../../../../Domain/entity/PublicDialogEntity';
import PublicChannel from '../../../svgs/Icons/Contents/PublicChannel';
import UiKitTheme from '../../../../../assets/UiKitTheme';

type HeaderMessagesProps = {
  dialog: DialogEntity;
  countMembers?: number;
  InformationHandler?: FunctionTypeVoidToVoid;
  CallHandler?: FunctionTypeVoidToVoid;
  theme?: UiKitTheme;
};
// eslint-disable-next-line react/function-component-definition
const HeaderMessages: React.FC<HeaderMessagesProps> = ({
  dialog,
  countMembers = 0,
  InformationHandler,
  CallHandler,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  theme = undefined,
}: HeaderMessagesProps) => {
  // TODO: check showDialogInformation, add handler for close DialogInformation
  const [showDialogInformation, setShowDialogInformation] =
    React.useState(false);

  // eslint-disable-next-line consistent-return
  const renderIconForTypeDialog = (dialogEntity: DialogEntity) => {
    if (dialogEntity.type === DialogType.group) {
      const groupDialogEntity = dialogEntity as GroupDialogEntity;

      if (groupDialogEntity.photo) {
        return (
          <UserAvatar
            urlAvatar={groupDialogEntity.photo}
            iconTheme={{ width: '40px', height: '40px' }}
          />
        );
      }

      return (
        <GroupChat
          width="24"
          height="24"
          applyZoom
          color="var(--secondary-text)"
        />
      );
    }
    if (dialogEntity.type === DialogType.private) {
      return (
        <User width="24" height="24" applyZoom color="var(--secondary-text)" />
      );
    }
    if (dialogEntity.type === DialogType.public) {
      const publicDialogEntity = dialogEntity as PublicDialogEntity;

      if (publicDialogEntity.photo) {
        return (
          <UserAvatar
            urlAvatar={publicDialogEntity.photo}
            iconTheme={{ width: '40px', height: '40px' }}
          />
        );
      }

      return (
        <PublicChannel
          width="24"
          height="24"
          applyZoom
          color="var(--secondary-text)"
        />
      );
    }
  };

  return (
    <div className="message-header-container">
      <div className="message-header-container--info-wrapper">
        <div className="message-header-container--info-wrapper__dialog-icon">
          {renderIconForTypeDialog(dialog)}
          {/* <GroupChat width="40" height="40" applyZoom color="#636D78" /> */}
        </div>
        <div className="message-header-container--info-wrapper__detail">
          <div className="message-header-container--info-wrapper__detail__dialog-name">
            {dialog?.name || 'Dialog name'}
          </div>
          <div className="message-header-container--info-wrapper__detail__dialog-members">
            {countMembers || 0} members
          </div>
        </div>
        <div className="message-header-container--info-wrapper__detail-button">
          <div className="message-header-container--info-wrapper__detail-button__call">
            <ActiveSvg
              content={<Phone width="32" height="32" applyZoom />}
              clickAction={() => {
                if (CallHandler) CallHandler();
              }}
              touchAction={() => {
                if (CallHandler) CallHandler();
              }}
            />
          </div>
          <div className="message-header-container--info-wrapper__detail-button__info">
            <ActiveSvg
              content={
                <InformationFill
                  width="32"
                  height="32"
                  applyZoom
                  color="var(--secondary-background)"
                />
              }
              clickAction={() => {
                setShowDialogInformation(!showDialogInformation);
                if (InformationHandler) InformationHandler();
              }}
              touchAction={() => {
                setShowDialogInformation(!showDialogInformation);
                if (InformationHandler) InformationHandler();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderMessages;
