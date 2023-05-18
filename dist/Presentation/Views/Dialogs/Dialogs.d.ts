import React from 'react';
import './Dialogs.scss';
import { FunctionTypeViewModelToVoid } from '../Base/BaseViewModel';
import { ThemeNames } from '../../components/UI/Dialogs/PreviewDialog/PreviewDialog';
import { DialogsViewModel } from './DialogViewModel';
import { DialogEntity } from '../../../Domain/entity/DialogEntity';
import UiKitTheme from '../../assets/UiKitTheme';
type DialogsComponentSettings = {
    themeName?: ThemeNames;
    withoutHeader?: boolean;
    useSubHeader?: boolean;
    themeHeader?: UiKitTheme;
    themePreview?: UiKitTheme;
};
type DialogsProps = {
    header?: React.ReactNode;
    subHeaderContent?: React.ReactNode;
    itemSelectHandler?: FunctionTypeViewModelToVoid<DialogEntity>;
    dialogsViewModel: DialogsViewModel;
    additionalSettings?: DialogsComponentSettings;
};
declare const DialogsComponent: React.FC<DialogsProps>;
export default DialogsComponent;
