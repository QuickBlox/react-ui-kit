import React from 'react';
import './MainBoundedButton.scss';
import { FunctionTypeVoidToVoid } from '../../../../Views/Base/BaseViewModel';
type MainBoundedButtonProps = {
    title: string;
    styleBox: React.CSSProperties;
    clickHandler?: FunctionTypeVoidToVoid;
    touchHandler?: FunctionTypeVoidToVoid;
};
declare const MainBoundedButton: React.FC<MainBoundedButtonProps>;
export default MainBoundedButton;
