import React, { FC } from "react";
import './MyInput.scss';
export interface MyInputProps {
    children?: React.ReactNode;
    placeholer: string;
    label: string;
    big: boolean;
}
declare const MyInput: FC<MyInputProps>;
export default MyInput;
