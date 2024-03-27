import cn from 'classnames';
import {
  FunctionTypeStringToVoid,
  FunctionTypeVoidToVoid,
} from '../../../../../CommonTypes/BaseViewModel';
import { SendSvg } from '../../../../icons';
import './InputForForwarding.scss';

type InputForForwardingProps = {
  inputText: string;
  onChange: FunctionTypeStringToVoid;
  onSend: FunctionTypeVoidToVoid;
  disabled?: boolean;
};

// eslint-disable-next-line react/function-component-definition
const InputForForwarding: React.FC<InputForForwardingProps> = ({
  inputText,
  onChange,
  onSend,
  disabled = false,
}: InputForForwardingProps) => {
  return (
    <div className="forwarding-message-input">
      <div className="forwarding-message-input-input">
        <textarea
          className="forwarding-message-input-input-type-message"
          value={inputText}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          placeholder="Type message"
        />
      </div>
      <div className="forwarding-message-input-icon-send">
        <SendSvg
          className={cn('forwarding-message-input-icon-send__icon__send', {
            'forwarding-message-input-icon-send__icon--disable': disabled,
          })}
          onClick={onSend}
        />
      </div>
    </div>
  );
};

export default InputForForwarding;
