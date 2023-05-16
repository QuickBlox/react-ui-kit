import './YesNoQuestion.scss';
import React from 'react';
import { FunctionTypeVoidToVoid } from '../../../../Views/Base/BaseViewModel';
import ColumnContainer from '../../../containers/ColumnContainer/ColumnContainer';
import RowRightContainer from '../../../containers/RowRightContainer/RowRightContainer';
import MainButton, { TypeButton } from '../../Buttons/MainButton/MainButton';

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
    <div className="yesno-container-wrapper">
      <ColumnContainer>
        <div className="yesno-container__message-text">{messageText}</div>
        <div className="yesno-container__footer">
          <RowRightContainer
            minHeightContainer="32px"
            gapBetweenItem="8px"
            RightContainerSize={{
              flexBasis: '63px',
              minWidth: '63px',
              maxWidth: '63px',
              minHeight: '32px',
              maxHeight: '32px',
            }}
            RightItem={
              <div>
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
            }
            CenterContainerSize={{
              flexBasis: '78px',
              minWidth: '78px',
              maxWidth: '78px',
              minHeight: '32px',
              maxHeight: '32px',
            }}
            CenterItem={
              <div>
                <MainButton
                  title={noActionCaption || 'No'}
                  clickHandler={() => {
                    if (ClickNoActionHandler) {
                      ClickNoActionHandler();
                    }
                  }}
                  typeButton={TypeButton.outlined}
                />
              </div>
            }
          />
        </div>
      </ColumnContainer>
    </div>
  );
};

export default YesNoQuestionComponent;
