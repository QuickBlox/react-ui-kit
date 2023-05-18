import './HeaderMessages.scss';
import React from 'react';
import { FunctionTypeVoidToVoid } from '../../../../../Views/Base/BaseViewModel';
import { DialogEntity } from '../../../../../../Domain/entity/DialogEntity';
import UiKitTheme from '../../../../../assets/UiKitTheme';
type HeaderMessagesProps = {
    dialog: DialogEntity;
    countMembers?: number;
    InformationHandler?: FunctionTypeVoidToVoid;
    CallHandler?: FunctionTypeVoidToVoid;
    theme?: UiKitTheme;
};
declare const HeaderMessages: React.FC<HeaderMessagesProps>;
export default HeaderMessages;
