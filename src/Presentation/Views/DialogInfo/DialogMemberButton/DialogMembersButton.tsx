import React from 'react';
import './DialogMembersButton.scss';
import { FunctionTypeVoidToVoid } from '../../../../CommonTypes/BaseViewModel';
import ActiveButton from '../../../components/UI/Buttons/ActiveButton/ActiveButton';

type DialogMembersButtonProps = {
  content: string;
  clickHandler: FunctionTypeVoidToVoid;
  touchHandler: FunctionTypeVoidToVoid;
};
// eslint-disable-next-line react/function-component-definition,@typescript-eslint/no-unused-vars
const DialogMembersButton = ({
  content,
  clickHandler,
  touchHandler,
}:DialogMembersButtonProps) => {
  return (
    <ActiveButton
      content={<div className="dialog-members-btn">{content}</div>}
      clickAction={clickHandler}
      touchAction={touchHandler}
    />
  );
};

export default DialogMembersButton;
