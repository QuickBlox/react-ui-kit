import React from 'react';
import './MessagesView.scss';
import { DialogEntity } from '../../../../../Domain/entity/DialogEntity';
import { FunctionTypeVoidToVoid } from '../../../../Views/Base/BaseViewModel';
type HeaderDialogsMessagesProps = {
    dialog: DialogEntity;
    InformationHandler?: FunctionTypeVoidToVoid;
    maxWidthToResize?: string;
};
declare const MessagesView: React.FC<HeaderDialogsMessagesProps>;
export default MessagesView;
