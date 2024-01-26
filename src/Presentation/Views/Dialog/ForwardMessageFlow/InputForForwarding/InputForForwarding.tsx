import React from 'react';
import './InputForForwarding.scss';
import {
  FunctionTypeStringToVoid,
  FunctionTypeVoidToVoid,
} from '../../../../../CommonTypes/BaseViewModel';
import ActiveSvg from '../../../../components/UI/svgs/ActiveSvg/ActiveSvg';
import SendIcon from '../../../../components/UI/svgs/Icons/Actions/Send';

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
        <ActiveSvg
          content={<SendIcon width="24" height="24" />}
          onClick={onSend}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default InputForForwarding;
