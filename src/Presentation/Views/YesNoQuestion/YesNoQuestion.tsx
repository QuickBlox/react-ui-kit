import './YesNoQuestion.scss';
import React from 'react';
import { FunctionTypeVoidToVoid } from '../../../CommonTypes/BaseViewModel';
import MainButton, {
  TypeButton,
} from '../../components/UI/Buttons/MainButton/MainButton';

type YesNoQuestionProps = {
  messageText?: string;
  onClickYesAction?: FunctionTypeVoidToVoid;
  OnTouchYesAction?: FunctionTypeVoidToVoid;
  onClickNoAction?: FunctionTypeVoidToVoid;
  onTouchNoAction?: FunctionTypeVoidToVoid;
  yesActionCaption?: string;
  noActionCaption?: string;
};
// eslint-disable-next-line react/function-component-definition
const YesNoQuestionComponent: React.FC<YesNoQuestionProps> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  messageText,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onClickYesAction,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  OnTouchYesAction,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onClickNoAction,
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
        <MainButton
          title={noActionCaption || 'No'}
          clickHandler={() => {
            if (onClickNoAction) {
              onClickNoAction();
            }
          }}
          typeButton={TypeButton.outlined}
        />
        <MainButton
          clickHandler={() => {
            if (onClickYesAction) {
              onClickYesAction();
            }
          }}
          title={yesActionCaption || 'Yes'}
          typeButton={TypeButton.danger}
        />
      </div>
    </div>
  );
};

export default YesNoQuestionComponent;
