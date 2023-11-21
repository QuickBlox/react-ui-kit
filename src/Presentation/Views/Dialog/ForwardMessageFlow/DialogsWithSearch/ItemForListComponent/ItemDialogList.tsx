import React from 'react';
import './ItemDialogList.scss';
import { FunctionTypeStringToVoid } from '../../../../../../CommonTypes/BaseViewModel';
import { DialogType } from '../../../../../../Domain/entity/DialogTypes';
import User from '../../../../../components/UI/svgs/Icons/Contents/User';
import GroupChat from '../../../../../components/UI/svgs/Icons/Contents/GroupChat';
import PublicChannel from '../../../../../components/UI/svgs/Icons/Contents/PublicChannel';
import UserAvatar from '../../../../EditDialog/UserAvatar/UserAvatar';
import { IconTheme } from '../../../../../components/UI/svgs/Icons/IconsCommonTypes';

type ItemDialogListProps = {
  itemName: string;
  itemAvatar: string;
  typeDialog: DialogType;
  itemId: string;
  isElementChecked: boolean;
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
        break;
      case DialogType.group:
        return (
          <GroupChat
            width="26"
            height="26"
            applyZoom
            color="var(--secondary-text)"
          />
        );
        break;
      case DialogType.public:
        return (
          <PublicChannel
            width="26"
            height="26"
            applyZoom
            color="var(--secondary-text)"
          />
        );
        break;
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
  } else {
    const iconTheme: IconTheme = { width: '40px', height: '40px' };

    return <UserAvatar urlAvatar={urlAvatar} iconTheme={iconTheme} />;
  }
};

// eslint-disable-next-line react/function-component-definition
const ItemDialogList: React.FC<ItemDialogListProps> = ({
  itemName,
  itemAvatar,
  typeDialog,
  itemId,
  isElementChecked,
  onSelect,
}: ItemDialogListProps) => {
  return (
    <div className="dialog-item-element">
      <div className="item-element-avatar">
        <div className="item-element-avatar-rectangle" />
        <div className="item-element-avatar-ellipse" />
        {renderAvatar(itemAvatar, typeDialog)}
      </div>
      <div className="dialog-item-element-subtitle">{itemName}</div>
      <div className="dialog-item-element-checkbox">
        <input
          type="checkbox"
          checked={isElementChecked}
          onChange={() => {
            onSelect(itemId);
          }}
        />
      </div>
    </div>
  );
};

export default ItemDialogList;
