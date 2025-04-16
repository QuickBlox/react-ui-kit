import React from 'react';
import { DialogListViewModel } from '../../DialogList/DialogListViewModel';
import YesNoQuestionComponent from '../../YesNoQuestion/YesNoQuestion';
import { GroupDialogEntity } from '../../../../Domain/entity/GroupDialogEntity';
import { stringifyError } from '../../../../utils/parse';
import { DialogEntity } from '../../../../Domain/entity/DialogEntity';

type LeaveDialogFlowProps = {
  dialogsViewModel: DialogListViewModel;
  dialog: DialogEntity;
};

// eslint-disable-next-line react/function-component-definition
const LeaveDialogFlow = ({
  dialogsViewModel,
  dialog,
}: LeaveDialogFlowProps) => {
  return (
    // <ColumnContainer gapBetweenItem="8px">
    <YesNoQuestionComponent
      noActionCaption="Cancel"
      yesActionCaption="Leave"
      onClickYesAction={() => {
        dialogsViewModel
          .deleteDialog(dialog as GroupDialogEntity)
          .then((result) => {
            return result;
          })
          .catch((e) => {
            console.log('exception in LeaveDialogFlow', stringifyError(e));
          });
      }}
    />
  );
};

export default LeaveDialogFlow;
