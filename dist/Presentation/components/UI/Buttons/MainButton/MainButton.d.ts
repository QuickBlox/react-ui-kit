import React from 'react';
import './MainButton.scss';
import { FunctionTypeVoidToVoid } from '../../../../Views/Base/BaseViewModel';
export declare const TypeButton: {
    readonly default: "default";
    readonly danger: "danger";
    readonly outlined: "outlined";
    readonly text: "text";
    readonly defaultDisabled: "defaultDisabled";
};
export type ButtonArcheType = keyof typeof TypeButton;
type MainButtonProps = {
    title: string;
    typeButton?: ButtonArcheType;
    disabled?: boolean;
    styleBox?: React.CSSProperties;
    clickHandler?: FunctionTypeVoidToVoid;
    touchHandler?: FunctionTypeVoidToVoid;
};
declare const MainButton: React.FC<MainButtonProps>;
export default MainButton;
