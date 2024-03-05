import Dropdown from '../../Dropdown/Dropdown';
import { MessageEntity } from '../../../../Domain/entity/MessageEntity';
import { FunctionTypeMessageEntityToVoid } from '../../../../CommonTypes/BaseViewModel';
import { ReactComponent as MoreSvg } from '../../../icons/navigation/more.svg';
import { Option } from '../../Dropdown/DropdownOption';
import './MessageContextMenu.scss';

export type MessageContextMenuProps = {
  message: MessageEntity;
  enableForwarding: boolean;
  enableReplying: boolean;
  onReply: FunctionTypeMessageEntityToVoid;
  onForward: FunctionTypeMessageEntityToVoid;
};

export default function MessageContextMenu({
  message,
  enableReplying,
  enableForwarding,
  onReply,
  onForward,
}: MessageContextMenuProps) {
  function selectHandler(value: string) {
    if (value === 'Reply' && enableReplying) {
      onReply(message);
    }
    if (value === 'Forward' && enableForwarding) {
      onForward(message);
    }
  }

  const options: Option[] = [];

  if (enableReplying) {
    options.push({
      value: 'Reply',
      label: 'Reply',
    });
  }

  if (enableForwarding) {
    options.push({
      value: 'Forward',
      label: 'Forward',
    });
  }

  return (
    <div>
      {enableForwarding || enableReplying ? (
        <Dropdown
          options={options}
          disabled={false}
          onSelect={(value) => selectHandler(value)}
        >
          <div className="message-context-menu-actions">
            <MoreSvg className="message-context-menu-actions__icon" />
          </div>
        </Dropdown>
      ) : (
        <div className="message-context-menu-actions">
          <MoreSvg className="message-context-menu-actions__icon" />
        </div>
      )}
    </div>
  );
}
