import './YesNoQuestion.scss';
import React from 'react';
import { FunctionTypeVoidToVoid } from '../../../../Views/Base/BaseViewModel';
type YesNoQuestionProps = {
    messageText?: string;
    ClickYesActionHandler?: FunctionTypeVoidToVoid;
    TouchYesActionHandler?: FunctionTypeVoidToVoid;
    ClickNoActionHandler?: FunctionTypeVoidToVoid;
    TouchNoActionHandler?: FunctionTypeVoidToVoid;
    yesActionCaption?: string;
    noActionCaption?: string;
};
declare const YesNoQuestionComponent: React.FC<YesNoQuestionProps>;
export default YesNoQuestionComponent;
