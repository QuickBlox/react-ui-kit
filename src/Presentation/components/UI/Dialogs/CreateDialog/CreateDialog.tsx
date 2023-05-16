import React from 'react';
import './CreateDialog.scss';
import ColumnContainer from '../../../containers/ColumnContainer/ColumnContainer';
import Chat from '../../svgs/Icons/Contents/Chat';
import GroupChat from '../../svgs/Icons/Contents/GroupChat';
import PublicChannel from '../../svgs/Icons/Contents/PublicChannel';
import { FunctionTypeVoidToVoid } from '../../../../Views/Base/BaseViewModel';
import ActiveButton from '../../Buttons/ActiveButton/ActiveButton';

type CreateDialogProps = {
  createPrivateDialogClickHandler: FunctionTypeVoidToVoid;
  createPrivateDialogTouchHandler: FunctionTypeVoidToVoid;
  createGroupDialogClickHandler: FunctionTypeVoidToVoid;
  createGroupDialogTouchHandler: FunctionTypeVoidToVoid;
  createPublicDialogClickHandler: FunctionTypeVoidToVoid;
  createPublicDialogTouchHandler: FunctionTypeVoidToVoid;
};
// eslint-disable-next-line react/function-component-definition,@typescript-eslint/no-unused-vars
const CreateDialog: React.FC<CreateDialogProps> = ({
  createPrivateDialogClickHandler,
  createPrivateDialogTouchHandler,
  createGroupDialogClickHandler,
  createGroupDialogTouchHandler,
  createPublicDialogClickHandler,
  createPublicDialogTouchHandler,
}) => {
  return (
    <ColumnContainer gapBetweenItem="8px">
      <ActiveButton
        content={
          <div className="create-dialog-container--btn-wrapper">
            <div className="create-dialog-container--btn-wrapper__icon">
              <Chat width="24" height="24" applyZoom />
            </div>
            <div className="create-dialog-container--btn-wrapper__text">
              Private
            </div>
          </div>
        }
        clickAction={createPrivateDialogClickHandler}
        touchAction={createPrivateDialogTouchHandler}
      />

      <ActiveButton
        content={
          <div className="create-dialog-container--btn-wrapper">
            <div className="create-dialog-container--btn-wrapper__icon">
              <GroupChat width="32" height="32" applyZoom />
            </div>
            <div className="create-dialog-container--btn-wrapper__text">
              Group
            </div>
          </div>
        }
        clickAction={createGroupDialogClickHandler}
        touchAction={createGroupDialogTouchHandler}
      />

      <ActiveButton
        content={
          <div className="create-dialog-container--btn-wrapper">
            <div className="create-dialog-container--btn-wrapper__icon">
              <PublicChannel width="32" height="32" applyZoom />
            </div>
            <div className="create-dialog-container--btn-wrapper__text">
              Public
            </div>
          </div>
        }
        clickAction={createPublicDialogClickHandler}
        touchAction={createPublicDialogTouchHandler}
      />
    </ColumnContainer>
  );
};

export default CreateDialog;
