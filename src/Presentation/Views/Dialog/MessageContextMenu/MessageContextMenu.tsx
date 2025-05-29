import Dropdown from '../../../ui-components/Dropdown/Dropdown';
import { MessageEntity } from '../../../../Domain/entity/MessageEntity';
import { FunctionTypeMessageEntityToVoid } from '../../../../CommonTypes/BaseViewModel';
import { ReactComponent as MoreSvg } from '../../../icons/navigation/more.svg';
import { Option } from '../../../ui-components/Dropdown/DropdownOption';
import './MessageContextMenu.scss';

export type MessageContextMenuProps = {
  message: MessageEntity;
  enableForwarding: boolean;
  enableReplying: boolean;
  onReply: FunctionTypeMessageEntityToVoid;
  onForward: FunctionTypeMessageEntityToVoid;
  disableActions?: boolean;
};

export default function MessageContextMenu({
  message,
  enableReplying,
  enableForwarding,
  onReply,
  onForward,
  disableActions = false,
}: MessageContextMenuProps) {
  function selectHandler(value: string) {
    if (!disableActions) {
      if (value === 'Reply' && enableReplying) {
        onReply(message);
      }
      if (value === 'Forward' && enableForwarding) {
        onForward(message);
      }
    }
  }

  // const [disabled, setDisabled] = useState(disableActions);

  // useEffect(() => {
  //   setDisabled(disableActions);
  // }, [disableActions]);

  const options: Option[] = [];

  if (enableReplying) {
    options.push({
      value: 'Reply',
      label: 'Reply',
      disabled: disableActions,
    });
  }

  if (enableForwarding) {
    options.push({
      value: 'Forward',
      label: 'Forward',
    });
  }

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {enableForwarding || enableReplying ? (
        <Dropdown
          options={options}
          disabled={disableActions}
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
    </>
  );
}
