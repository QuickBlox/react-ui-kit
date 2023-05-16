import './HeaderMessages.scss';
import React from 'react';
import { FunctionTypeVoidToVoid } from '../../../../../Views/Base/BaseViewModel';
import { DialogEntity } from '../../../../../../Domain/entity/DialogEntity';
type HeaderMessagesProps = {
    dialog: DialogEntity;
    countMembers?: number;
    InformationHandler?: FunctionTypeVoidToVoid;
    CallHandler?: FunctionTypeVoidToVoid;
};
declare const HeaderMessages: React.FC<HeaderMessagesProps>;
export default HeaderMessages;
