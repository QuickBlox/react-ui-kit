import React from 'react';
import { DialogListViewModel } from '../../DialogList/DialogListViewModel';
import YesNoQuestionComponent from '../../YesNoQuestion/YesNoQuestion';
import { GroupDialogEntity } from '../../../../Domain/entity/GroupDialogEntity';
import { stringifyError } from '../../../../utils/parse';
import { DialogEntity } from '../../../../Domain/entity/DialogEntity';
import { ModalContext } from '../../../providers/ModalContextProvider/Modal';

type LeaveDialogFlowProps = {
  dialogsViewModel: DialogListViewModel;
  dialog: DialogEntity;
};

// eslint-disable-next-line react/function-component-definition
const LeaveDialogFlow: React.FC<LeaveDialogFlowProps> = ({
  dialogsViewModel,
  dialog,
}: LeaveDialogFlowProps) => {
  const { handleModal } = React.useContext(ModalContext);
  const closeModal = () => {
    handleModal(false, '', '', false, false);
  };

  return (
    // <ColumnContainer gapBetweenItem="8px">
    <YesNoQuestionComponent
      noActionCaption="Cancel"
      yesActionCaption="Leave"
      onClickYesAction={() => {
        dialogsViewModel
          .deleteDialog(dialog as GroupDialogEntity)
          .then((result) => {
            if (result) closeModal();

            return result;
          })
          .catch((e) => {
            console.log('exception in LeaveDialogFlow', stringifyError(e));
          });
      }}
      onClickNoAction={() => {
        closeModal();
      }}
    />
  );
};

export default LeaveDialogFlow;
