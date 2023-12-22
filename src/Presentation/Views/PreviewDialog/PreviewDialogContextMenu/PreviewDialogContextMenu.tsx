import React from 'react';
import './PreviewDialogContextMenu.scss';
import UiKitTheme from '../../../themes/UiKitTheme';
import { MenuItem } from '../../Dialog/AIWidgets/AIWidgetActions/AIWidgetActions';
import ContextMenu from '../../Dialog/ContextMenu/ContextMenu';
import EditDots from '../../../components/UI/svgs/Icons/Actions/EditDots';
import { DialogEntity } from '../../../../Domain/entity/DialogEntity';
// eslint-disable-next-line import/named
import { FunctionDialogEntityToVoid } from '../../../../CommonTypes/BaseViewModel';

interface PreviewDialogContextMenuProps {
  theme?: UiKitTheme;
  dialog: DialogEntity;
  onLeave: FunctionDialogEntityToVoid;
  enableLeaveDialog: boolean;
}

export default function PreviewDialogContextMenu(
  props: PreviewDialogContextMenuProps,
) {
  const { theme, dialog, onLeave, enableLeaveDialog } = props;
  const menuItems: MenuItem[] = [];

  if (enableLeaveDialog) {
    menuItems.push({
      title: 'Leave Dialog',
      action: () => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        if (onLeave) onLeave(dialog);
      },
    });
  }

  return (
    <div className="dialog-context-menu">
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
