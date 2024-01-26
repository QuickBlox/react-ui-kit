import './YesNoQuestion.scss';
import React from 'react';
import { FunctionTypeVoidToVoid } from '../../../CommonTypes/BaseViewModel';
import MainButton, {
  TypeButton,
} from '../../components/UI/Buttons/MainButton/MainButton';

type YesNoQuestionProps = {
  messageText?: string;
  ClickYesActionHandler?: FunctionTypeVoidToVoid;
  TouchYesActionHandler?: FunctionTypeVoidToVoid;
  ClickNoActionHandler?: FunctionTypeVoidToVoid;
  TouchNoActionHandler?: FunctionTypeVoidToVoid;
  yesActionCaption?: string;
  noActionCaption?: string;
};
// eslint-disable-next-line react/function-component-definition
const YesNoQuestionComponent: React.FC<YesNoQuestionProps> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  messageText,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ClickYesActionHandler,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  TouchYesActionHandler,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ClickNoActionHandler,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  TouchNoActionHandler,
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
            if (ClickNoActionHandler) {
              ClickNoActionHandler();
            }
          }}
          typeButton={TypeButton.outlined}
        />
        <MainButton
          clickHandler={() => {
            if (ClickYesActionHandler) {
              ClickYesActionHandler();
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
