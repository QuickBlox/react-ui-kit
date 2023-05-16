import React from 'react';
import './SwitchButton.scss';
import { FunctionTypeVoidToVoid } from '../../../../Views/Base/BaseViewModel';
type SwitchButtonProps = {
    disabled?: boolean;
    styleBox?: React.CSSProperties;
    clickHandler?: FunctionTypeVoidToVoid;
    touchHandler?: FunctionTypeVoidToVoid;
};
declare const SwitchButton: React.FC<SwitchButtonProps>;
export default SwitchButton;
