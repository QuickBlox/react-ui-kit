import React from 'react';
import './SingleUserWithCheckBox.scss';
import { UserEntity } from '../../../../../Domain/entity/UserEntity';
import ActiveSvg from '../../../../components/UI/svgs/ActiveSvg/ActiveSvg';
import User from '../../../../components/UI/svgs/Icons/Contents/User';

export type FunctionTypeUserEntityToVoid = (
  item: UserEntity,
  checkedStatus: boolean,
) => void;

type SingleUserWithCheckBoxProps = {
  user: UserEntity;
  isElementChecked: boolean;
  isDisabled: boolean;
  checkedHandler: FunctionTypeUserEntityToVoid;
  keyValue?: number;
};
// eslint-disable-next-line react/function-component-definition,@typescript-eslint/no-unused-vars
const SingleUserWithCheckBox: React.FC<SingleUserWithCheckBoxProps> = ({
  user,
  checkedHandler,
  isElementChecked,
  keyValue,
  isDisabled = false,
}) => {
  function getChecked(index: number | undefined) {
    const result = isElementChecked; // || isUserChecked;

    console.log(index);

    return result;
  }

  return (
    <div key={keyValue} className="user-single-container-chbox--wrapper">
      <div className="user-single-container-chbox--wrapper__icon">
        <ActiveSvg
          content={
            <div className="user-single-container-chbox--wrapper__icon__content">
              <User
                width="26"
                height="26"
                applyZoom
                color="var(--tertiary-elements)"
              />
            </div>
          }
          onClick={() => {
            console.log('user click...');
          }}
          onTouch={() => {
            console.log('user touch...');
          }}
        />
      </div>
      <div className="user-single-container-chbox--wrapper__username">
        {`${user?.full_name || user?.login || user?.email || user?.id}`}
      </div>
      <div className="user-single-container-chbox--wrapper__select">
        <input
          type="checkbox"
          checked={getChecked(keyValue)}
          disabled={isDisabled}
          onChange={() => {
            console.log('have check in SingleUserWithCheckBox');
            const newStatus = !isElementChecked;

            if (checkedHandler) {
              checkedHandler(user, newStatus);
            }
          }}
        />
      </div>
    </div>
  );
};

export default SingleUserWithCheckBox;
