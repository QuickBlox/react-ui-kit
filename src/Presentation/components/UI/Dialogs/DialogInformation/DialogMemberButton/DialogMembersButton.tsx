import React from 'react';
import './DialogMembersButton.scss';
import { FunctionTypeVoidToVoid } from '../../../../../Views/Base/BaseViewModel';
import ActiveButton from '../../../Buttons/ActiveButton/ActiveButton';

type DialogMembersButtonProps = {
  content: string;
  clickHandler: FunctionTypeVoidToVoid;
  touchHandler: FunctionTypeVoidToVoid;
};
// eslint-disable-next-line react/function-component-definition,@typescript-eslint/no-unused-vars
const DialogMembersButton: React.FC<DialogMembersButtonProps> = ({
  content,
  clickHandler,
  touchHandler,
}) => {
  return (
    <ActiveButton
      content={<div className="dialog-members-btn">{content}</div>}
      clickAction={clickHandler}
      touchAction={touchHandler}
    />
  );
};

export default DialogMembersButton;
