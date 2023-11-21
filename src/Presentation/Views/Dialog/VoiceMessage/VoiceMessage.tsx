import React from 'react';
import ActiveSvg from '../../../components/UI/svgs/ActiveSvg/ActiveSvg';
import { FunctionTypeVoidToVoid } from '../../../../CommonTypes/BaseViewModel';

type VoiceMessageProps = {
  icon: React.ReactNode;
  onClick: FunctionTypeVoidToVoid;
};
// eslint-disable-next-line react/function-component-definition
const VoiceMessage: React.FC<VoiceMessageProps> = ({
  icon,
  onClick,
}: VoiceMessageProps) => {
  return (
    <div>
      <ActiveSvg content={icon} clickAction={onClick} touchAction={onClick} />
    </div>
  );
};

export default VoiceMessage;
