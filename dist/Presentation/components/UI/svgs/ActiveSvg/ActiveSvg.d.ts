import React from 'react';
import { FunctionTypeVoidToVoid } from '../../../../Views/Base/BaseViewModel';
import './ActiveSvg.scss';
type ActiveSvgContainerProps = {
    content: React.ReactNode;
    touchAction?: FunctionTypeVoidToVoid;
    clickAction?: FunctionTypeVoidToVoid;
};
declare const ActiveSvg: React.FC<ActiveSvgContainerProps>;
export default ActiveSvg;
