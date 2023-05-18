import React from 'react';
import './MessagesView.scss';
import { DialogEntity } from '../../../../../Domain/entity/DialogEntity';
import { FunctionTypeVoidToVoid } from '../../../../Views/Base/BaseViewModel';
import UiKitTheme from '../../../../assets/UiKitTheme';
type HeaderDialogsMessagesProps = {
    dialog: DialogEntity;
    InformationHandler?: FunctionTypeVoidToVoid;
    maxWidthToResize?: string;
    theme?: UiKitTheme;
};
declare const MessagesView: React.FC<HeaderDialogsMessagesProps>;
export default MessagesView;
