import React from 'react';
import { FunctionTypeStringToVoid } from '../../../../../../CommonTypes/BaseViewModel';
import { DialogType } from '../../../../../../Domain/entity/DialogTypes';
import User from '../../../../../components/UI/svgs/Icons/Contents/User';
import GroupChat from '../../../../../components/UI/svgs/Icons/Contents/GroupChat';
import PublicChannel from '../../../../../components/UI/svgs/Icons/Contents/PublicChannel';
import UserAvatar from '../../../../EditDialog/UserAvatar/UserAvatar';
import { IconTheme } from '../../../../../components/UI/svgs/Icons/IconsCommonTypes';
import CheckBox from '../../../../../ui-components/CheckBox/CheckBox';
import './DialogListItem.scss';

type DialogListItemProps = {
  name: string;
  avatar: string;
  typeDialog: DialogType;
  id: string;
  checked: boolean;
  onSelect: FunctionTypeStringToVoid;
};

const renderAvatar = (urlAvatar: string, typeDialog: DialogType) => {
  if (urlAvatar.length < 1 || urlAvatar === 'null') {
    switch (typeDialog) {
      case DialogType.private:
        return (
          <User
            width="26"
            height="26"
            applyZoom
            color="var(--secondary-text)"
          />
        );
      case DialogType.group:
        return (
          <GroupChat
            width="26"
            height="26"
            applyZoom
            color="var(--secondary-text)"
          />
        );
      case DialogType.public:
        return (
          <PublicChannel
            width="26"
            height="26"
            applyZoom
            color="var(--secondary-text)"
          />
        );
      default:
        return (
          <User
            width="26"
            height="26"
            applyZoom
            color="var(--secondary-text)"
          />
        );
    }
  }
  const iconTheme: IconTheme = { width: '40px', height: '40px' };

  return <UserAvatar urlAvatar={urlAvatar} iconTheme={iconTheme} />;
};

// eslint-disable-next-line react/function-component-definition
const DialogListItem = ({
  name,
  avatar,
  typeDialog,
  id,
  checked,
  onSelect,
}: DialogListItemProps) => {
  return (
    <div className="dialog-item-element">
      <div className="dialog-item-element-avatar">
        {renderAvatar(avatar, typeDialog)}
      </div>
      <div className="dialog-item-element-subtitle">{name}</div>
      <CheckBox onChange={() => onSelect(id)} disabled={false} checked={checked} />
    </div>
  );
};

export default DialogListItem;
