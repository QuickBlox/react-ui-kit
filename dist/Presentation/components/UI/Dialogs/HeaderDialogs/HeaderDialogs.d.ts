import React from 'react';
import './HeaderDialogs.scss';
import { FunctionTypeVoidToVoid } from '../../../../Views/Base/BaseViewModel';
import UiKitTheme from '../../../../assets/UiKitTheme';
type HeaderDialogsProps = {
    title?: string;
    clickSearchHandler?: FunctionTypeVoidToVoid;
    touchSearchHandler?: FunctionTypeVoidToVoid;
    ClickActionHandler?: FunctionTypeVoidToVoid;
    TouchActionHandler?: FunctionTypeVoidToVoid;
    theme?: UiKitTheme;
    settings?: any;
};
declare const HeaderDialogs: React.FC<HeaderDialogsProps>;
export default HeaderDialogs;
