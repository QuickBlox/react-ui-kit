import React from 'react';
import './SingleUserWithCheckBox.scss';
import { UserEntity } from '../../../../../../../Domain/entity/UserEntity';
export type FunctionTypeUserEntityToVoid = (item: UserEntity, checkedStatus: boolean) => void;
type SingleUserWithCheckBoxProps = {
    user: UserEntity;
    isElementChecked: boolean;
    isDisabled: boolean;
    checkedHandler: FunctionTypeUserEntityToVoid;
    keyValue?: number;
};
declare const SingleUserWithCheckBox: React.FC<SingleUserWithCheckBoxProps>;
export default SingleUserWithCheckBox;
