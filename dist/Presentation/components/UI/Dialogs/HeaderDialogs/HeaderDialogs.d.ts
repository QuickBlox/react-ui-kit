import React from 'react';
import './HeaderDialogs.scss';
import { FunctionTypeVoidToVoid } from '../../../../Views/Base/BaseViewModel';
import Theme from '../../../../assets/Theme';
type HeaderDialogsProps = {
    title?: string;
    clickSearchHandler?: FunctionTypeVoidToVoid;
    touchSearchHandler?: FunctionTypeVoidToVoid;
    ClickActionHandler?: FunctionTypeVoidToVoid;
    TouchActionHandler?: FunctionTypeVoidToVoid;
    theme?: Theme;
    settings?: any;
};
declare const HeaderDialogs: React.FC<HeaderDialogsProps>;
export default HeaderDialogs;
