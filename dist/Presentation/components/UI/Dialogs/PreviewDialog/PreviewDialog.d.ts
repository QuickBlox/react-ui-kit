import React from 'react';
import './PreviewDialog.scss';
import { DialogType } from '../../../../../Domain/entity/DialogTypes';
import PreviewDialogViewModel from './PreviewDialogViewModel';
import Theme from '../../../../assets/Theme';
export type ThemeNames = 'light' | 'dark' | 'custom';
type PreviewDialogsTheme = {
    themeName?: ThemeNames;
    colorTheme?: Theme;
    selected: boolean;
    muted: boolean;
};
type PreviewDialogSettings = {
    showAvatarSection: boolean;
    showTitleSection: boolean;
    showMessageSection: boolean;
    showPublicIconInTitle: boolean;
    showNotifyIconInTitle: boolean;
    showTimeInTitle: boolean;
    showBadgePlaceholderInMessage: boolean;
};
type PreviewDialogsProps = {
    typeDialog: DialogType;
    dialogAvatar?: JSX.Element;
    dialogViewModel?: PreviewDialogViewModel;
    title?: string;
    previewMessage?: string;
    unreadMessageCount?: number;
    message_date_time_sent?: string;
    theme?: PreviewDialogsTheme;
    additionalSettings?: PreviewDialogSettings;
};
declare const PreviewDialog: React.FC<PreviewDialogsProps>;
export default PreviewDialog;
