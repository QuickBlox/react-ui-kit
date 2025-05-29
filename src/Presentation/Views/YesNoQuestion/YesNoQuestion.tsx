import './YesNoQuestion.scss';
import React from 'react';
import { FunctionTypeVoidToVoid } from '../../../CommonTypes/BaseViewModel';
import { Button } from '../../ui-components';

type YesNoQuestionProps = {
  messageText?: string;
  onClickYesAction?: FunctionTypeVoidToVoid;
  OnTouchYesAction?: FunctionTypeVoidToVoid;
  onTouchNoAction?: FunctionTypeVoidToVoid;
  yesActionCaption?: string;
  noActionCaption?: string;
};
// eslint-disable-next-line react/function-component-definition
const YesNoQuestionComponent = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  messageText,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onClickYesAction,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  OnTouchYesAction,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onTouchNoAction,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  yesActionCaption = undefined,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  noActionCaption = undefined,
}: YesNoQuestionProps) => {
  return (
    <div>
      <div className="ynq-dialog-actions">
        <Button title={noActionCaption || 'No'} variant="outlined" />
        <Button
          title={yesActionCaption || 'Yes'}
          variant="danger"
          onClick={() => {
            if (onClickYesAction) {
              onClickYesAction();
            }
          }}
        />
      </div>
    </div>
  );
};

export default YesNoQuestionComponent;
