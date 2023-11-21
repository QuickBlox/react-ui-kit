import './ItemDropDownMenu.scss';
import React from 'react';
import { FunctionTypeVoidToVoid } from '../../../../../CommonTypes/BaseViewModel';

type ItemDropDownMenuProps = {
  item: string;
  icon?: React.ReactNode;
  touchAction?: FunctionTypeVoidToVoid;
  clickAction?: FunctionTypeVoidToVoid;
};

// eslint-disable-next-line react/function-component-definition
export const ItemDropDownMenu: React.FC<ItemDropDownMenuProps> = ({
  item,
  icon,
  touchAction,
  clickAction,
}: ItemDropDownMenuProps) => {
  return (
    <div
      className="item-drop-down-menu-container"
      onTouchStart={() => {
        // eslint-disable-next-line no-unused-expressions
        touchAction && typeof touchAction === 'function'
          ? touchAction()
          : () => {
              console.log('item menu touched');
            };
      }}
      onClick={() => {
        // eslint-disable-next-line no-unused-expressions
        clickAction && typeof clickAction === 'function'
          ? clickAction()
          : () => {
              console.log('item menu clicked');
            };
      }}
    >
      <span className="item-drop-down-menu-container--title">{item}</span>
      <div className="item-drop-down-menu-container--icon">{icon}</div>
    </div>
  );
};
