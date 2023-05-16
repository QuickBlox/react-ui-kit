import React from 'react';
import { FunctionTypeVoidToVoid } from '../../../../Views/Base/BaseViewModel';
type ActiveButtonContainerProps = {
    content: React.ReactNode;
    touchAction?: FunctionTypeVoidToVoid;
    clickAction?: FunctionTypeVoidToVoid;
};
declare const ActiveButton: React.FC<ActiveButtonContainerProps>;
export default ActiveButton;
