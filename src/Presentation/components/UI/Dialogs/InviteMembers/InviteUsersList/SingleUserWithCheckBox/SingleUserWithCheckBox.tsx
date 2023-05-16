import React from 'react';
import './SingleUserWithCheckBox.scss';
import { UserEntity } from '../../../../../../../Domain/entity/UserEntity';
import ActiveSvg from '../../../../svgs/ActiveSvg/ActiveSvg';
import User from '../../../../svgs/Icons/Contents/User';

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
  // const [isUserChecked, setIsUserChecked] =
  //   React.useState<boolean>(isElementChecked);

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
          clickAction={() => {
            console.log('user click...');
          }}
          touchAction={() => {
            console.log('user touch...');
          }}
        />
      </div>
      <div className="user-single-container-chbox--wrapper__username">
        {`${user?.full_name || user?.login || user?.email || user?.id} - ${
          user?.id
        }`}
        {/* {`${user?.full_name} - ${user?.id} - ${ */}
        {/*  isElementChecked ? 'true' : 'false' */}
        {/* }`} */}
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
