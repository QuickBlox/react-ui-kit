import React from 'react';
import './MessageContextMenu.scss';
import ContextMenu from '../ContextMenu';
import EditDots from '../../../../components/UI/svgs/Icons/Actions/EditDots';
import UiKitTheme from '../../../../themes/UiKitTheme';
import { MessageEntity } from '../../../../../Domain/entity/MessageEntity';
import { FunctionTypeMessageEntityToVoid } from '../../../../../CommonTypes/BaseViewModel';
import { MenuItem } from '../../AIWidgets/AIWidgetActions/AIWidgetActions';

function MessageContextMenu(props: {
  theme: UiKitTheme | undefined;
  message: MessageEntity;
  onReply: FunctionTypeMessageEntityToVoid;
  onForward: FunctionTypeMessageEntityToVoid;
  enableForwarding: boolean;
  enableReplying: boolean;
}) {
  const menuItems: MenuItem[] = [];

  if (props.enableReplying) {
    menuItems.push({
      title: 'Reply',
      action: () => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        if (props.onReply) props.onReply(props.message);
      },
    });
  }
  if (props.enableForwarding) {
    menuItems.push({
      title: 'Forward',
      action: () => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        if (props.onForward) props.onForward(props.message);
      },
    });
  }

  return (
    <div className="message-context-menu">
      <ContextMenu
        widgetToRender={
          <EditDots
            color={
              props.theme
                ? props.theme.secondaryText()
                : 'var(--secondary-text)'
            }
          />
        }
        items={menuItems}
      />
    </div>
  );
}

export default MessageContextMenu;
