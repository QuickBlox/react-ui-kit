import React from 'react';
import './CreateDialog.scss';
import ColumnContainer from '../../../components/containers/ColumnContainer/ColumnContainer';
import Chat from '../../../components/UI/svgs/Icons/Contents/Chat';
import GroupChat from '../../../components/UI/svgs/Icons/Contents/GroupChat';
import PublicChannel from '../../../components/UI/svgs/Icons/Contents/PublicChannel';
import { FunctionTypeVoidToVoid } from '../../../../CommonTypes/BaseViewModel';
import ActiveButton from '../../../components/UI/Buttons/ActiveButton/ActiveButton';

type CreateDialogProps = {
  createPrivateDialogOnClick: FunctionTypeVoidToVoid;
  createPrivateDialogOnTouch: FunctionTypeVoidToVoid;
  createGroupDialogOnClick: FunctionTypeVoidToVoid;
  createGroupDialogOnTouch: FunctionTypeVoidToVoid;
  createPublicDialogOnClick: FunctionTypeVoidToVoid;
  createPublicDialogOnTouch: FunctionTypeVoidToVoid;
  allowPublicDialogCreation: boolean;
};
// eslint-disable-next-line react/function-component-definition,@typescript-eslint/no-unused-vars
const CreateDialog = ({
  createPrivateDialogOnClick,
  createPrivateDialogOnTouch,
  createGroupDialogOnClick,
  createGroupDialogOnTouch,
  createPublicDialogOnClick,
  createPublicDialogOnTouch,
  allowPublicDialogCreation = false,
}:CreateDialogProps) => {
  return (
    <div className="create-dialog-container">
      <ColumnContainer gapBetweenItem="8px">
        <ActiveButton
          content={
            <div className="item-type-dialog">
              <div className="item-type-dialog-icon">
                <Chat width="24" height="24" applyZoom />
              </div>
              <div className="item-type-dialog-name">Private</div>
            </div>
          }
          clickAction={createPrivateDialogOnClick}
          touchAction={createPrivateDialogOnTouch}
        />
        <ActiveButton
          content={
            <div className="item-type-dialog">
              <div className="item-type-dialog-icon">
                <GroupChat width="32" height="32" applyZoom />
              </div>
              <div className="item-type-dialog-name">Group</div>
            </div>
          }
          clickAction={createGroupDialogOnClick}
          touchAction={createGroupDialogOnTouch}
        />
          {allowPublicDialogCreation && (
        <ActiveButton
          content={
            <div className="item-type-dialog">
              <div className="item-type-dialog-icon">
                <PublicChannel width="32" height="32" applyZoom />
              </div>
              <div className="item-type-dialog-name">Public</div>
            </div>
          }
          clickAction={createPublicDialogOnClick}
          touchAction={createPublicDialogOnTouch}
        />
          )}
      </ColumnContainer>
    </div>

  );
};

export default CreateDialog;
