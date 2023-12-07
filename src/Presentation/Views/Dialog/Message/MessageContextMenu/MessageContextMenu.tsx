import React from 'react';
import './MessageContextMenu.scss';
import ContextMenu from '../../ContextMenu/ContextMenu';
import EditDots from '../../../../components/UI/svgs/Icons/Actions/EditDots';
import UiKitTheme from '../../../../themes/UiKitTheme';
import { MessageEntity } from '../../../../../Domain/entity/MessageEntity';
import { FunctionTypeMessageEntityToVoid } from '../../../../../CommonTypes/BaseViewModel';
import { MenuItem } from '../../AIWidgets/AIWidgetActions/AIWidgetActions';

interface MessageContextMenuProps {
  theme?: UiKitTheme;
  message: MessageEntity;
  onReply: FunctionTypeMessageEntityToVoid;
  onForward: FunctionTypeMessageEntityToVoid;
  enableForwarding: boolean;
  enableReplying: boolean;
}

export default function MessageContextMenu(props: MessageContextMenuProps) {
  const {
    theme,
    message,
    onReply,
    onForward,
    enableForwarding,
    enableReplying,
  } = props;
  const menuItems: MenuItem[] = [];

  if (enableReplying) {
    menuItems.push({
      title: 'Reply',
      action: () => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        if (onReply) onReply(message);
      },
    });
  }
  if (enableForwarding) {
    menuItems.push({
      title: 'Forward',
      action: () => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        if (onForward) onForward(message);
      },
    });
  }

  return (
    <div className="message-context-menu">
      <ContextMenu
        widgetToRender={
          <EditDots
            color={theme ? theme.secondaryText() : 'var(--secondary-text)'}
          />
        }
        items={menuItems}
      />
    </div>
  );
}
