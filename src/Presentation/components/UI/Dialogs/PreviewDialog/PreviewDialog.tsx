/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from 'react';
import './PreviewDialog.scss';
import ColumnContainer from '../../../containers/ColumnContainer/ColumnContainer';
import RowCenterContainer from '../../../containers/RowCenterContainer/RowCenterContainer';
import PublicChannel from '../../svgs/Icons/Contents/PublicChannel';
import { IconTheme } from '../../svgs/Icons/IconsCommonTypes';
import ThemeScheme from '../../../../assets/ThemeScheme';
import { DialogType } from '../../../../../Domain/entity/DialogTypes';
import User from '../../svgs/Icons/Contents/User';
import GroupChat from '../../svgs/Icons/Contents/GroupChat';
import RowLeftContainer from '../../../containers/RowLeftContainer/RowLeftContainer';
import PreviewDialogViewModel from './PreviewDialogViewModel';
import NotifyOff from '../../svgs/Icons/Toggle/NotifyOff';
import EditDots from '../../svgs/Icons/Actions/EditDots';
import Theme from '../../../../assets/Theme';

export type ThemeNames = 'light' | 'dark' | 'custom';
type PreviewDialogsColorTheme = {
  backgroundColorMainSection: string;
  backgroundColorAvatarSection: string;
  colorAvatarIcon: string;
  fontColorTitle: string;
  fontColorMessage: string;
  divider: string;
};
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
// eslint-disable-next-line react/function-component-definition
const PreviewDialog: React.FC<PreviewDialogsProps> = ({
  typeDialog,
  dialogViewModel,
  dialogAvatar,
  title,
  previewMessage,
  unreadMessageCount,
  message_date_time_sent,
  theme = undefined,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  additionalSettings = undefined,
}: PreviewDialogsProps) => {
  // const colorIcon = window
  //   .getComputedStyle(document.documentElement)
  //   .getPropertyValue('--color-icon')
  //   .trim();

  const colorIcon = 'var(--color-icon)';

  const defaultLightTheme: PreviewDialogsColorTheme = {
    backgroundColorMainSection: 'var(--main-background)', // ThemeScheme.primary_a_100,
    backgroundColorAvatarSection: 'var(--disabled-elements)', // ThemeScheme.secondary_100,
    colorAvatarIcon: 'var(--secondary-text)', // ThemeScheme.secondary_300,
    fontColorMessage: 'var(--input-elements)', // ThemeScheme.secondary_500,
    fontColorTitle: 'var(--main-text)', // ThemeScheme.secondary_900,
    divider: 'var(--divider)', // ThemeScheme.primary_50,
  };

  const darkDefaultTheme: PreviewDialogsColorTheme = {
    backgroundColorMainSection: 'var(--main-background)', // ThemeScheme.primary_a_100,
    backgroundColorAvatarSection: 'var(--disabled-elements)', // ThemeScheme.secondary_100,
    colorAvatarIcon: 'var(--secondary-text)', // ThemeScheme.secondary_300,
    fontColorMessage: 'var(--input-elements)', // ThemeScheme.secondary_500,
    fontColorTitle: 'var(--main-text)', // ThemeScheme.secondary_900,
    divider: 'var(--color-divider)', // ThemeScheme.secondary_400,
  };

  const hoverTheme: PreviewDialogsColorTheme = darkDefaultTheme;

  if (theme?.themeName === 'light') {
    hoverTheme.backgroundColorMainSection = 'var(--chat-input)'; // ThemeScheme.primary_a_200;
    hoverTheme.divider = 'var(--divider)'; // ThemeScheme.primary_50;
  } else {
    hoverTheme.backgroundColorMainSection = 'var(--field-border)'; // ThemeScheme.secondary_200;
  }

  const workTheme: PreviewDialogsColorTheme =
    theme?.themeName === 'light' ? defaultLightTheme : darkDefaultTheme;

  if (theme?.colorTheme) {
    workTheme.colorAvatarIcon = theme?.colorTheme.secondaryText();
    workTheme.backgroundColorAvatarSection =
      theme?.colorTheme.disabledElements();
    workTheme.backgroundColorMainSection = theme?.colorTheme.mainBackground();
    workTheme.fontColorMessage = theme?.colorTheme.inputElements();
    workTheme.fontColorTitle = theme?.colorTheme.mainText();
    workTheme.divider = theme?.colorTheme.divider();
    hoverTheme.backgroundColorMainSection = 'var(--field-border)'; // ThemeScheme.secondary_200;
  }

  const avatarSectionStyles = {
    backgroundColor: `${workTheme.backgroundColorAvatarSection}`,
  };
  const titleDialogStyles = theme?.colorTheme
    ? {
        border: `1px solid ${workTheme.divider}`,
        backgroundColor: `${workTheme.backgroundColorMainSection}`,
        color: `${workTheme.fontColorTitle}`,
      }
    : {};

  const messageDialogStyles = theme?.colorTheme
    ? { color: `${workTheme.colorAvatarIcon}` }
    : {};

  const publicIconTheme: IconTheme = {
    color: colorIcon || ThemeScheme.primary_400,
    width: '42',
    height: '42',
  };
  const itemTheme: IconTheme = {
    color: workTheme.colorAvatarIcon,
    width: '42',
    height: '42',
  };
  const previewDialogContainerStyles = [
    'preview-dialog-container',
    theme && theme.selected ? 'preview-selected' : '',
  ].join(' ');

  const avatarWrapperStyles = [
    'avatar-wrapper',
    typeDialog === DialogType.public ? 'public_avatar' : '',
  ].join(' ');
  const textWrapperContainer = [
    unreadMessageCount && unreadMessageCount > 0
      ? 'preview-dialog-container__text-left'
      : 'preview-dialog-container__text',
    previewMessage?.length && previewMessage?.length > 40 ? 'ellipsis' : '',
  ].join(' ');
  let avatar: JSX.Element;

  switch (typeDialog) {
    case DialogType.public:
      avatar = (
        <PublicChannel
          color={publicIconTheme.color}
          width={publicIconTheme.width}
          height={publicIconTheme.height}
        />
      );
      break;
    case DialogType.group:
      avatar = (
        <GroupChat
          color={itemTheme.color}
          width={itemTheme.width}
          height={itemTheme.height}
        />
      );
      break;
    case DialogType.private:
      avatar = (
        <User
          color={itemTheme.color}
          width={itemTheme.width}
          height={itemTheme.height}
        />
      );
      break;
    default:
      avatar = (
        <GroupChat
          color={itemTheme.color}
          width={itemTheme.width}
          height={itemTheme.height}
        />
      );
      break;
  }
  avatar = dialogAvatar || avatar;
  const [haveHover, setHaveHover] = React.useState(false);

  const avatarSectionContainer = {
    flexBasis: '56px',
    minWidth: '56px',
    maxWidth: '56px',
    minHeight: '56px',
    maxHeight: '56px',
  };
  const titleContainer = {
    flexBasis: '150px',
    minHeight: '20px',
    maxHeight: '20px',
    maxWidth: '150px',
    minWidth: '150px',
  };

  const badgeContainer = {
    flexBasis: '18px',
    minHeight: '29px',
    maxHeight: '29px',
    maxWidth: '18px',
    minWidth: '18px',
  };
  const badgeItemStyle = {
    width: '19px',
    height: '20px',
    borderRadius: '50%',
    backgroundColor: `${
      publicIconTheme.color ? publicIconTheme.color : 'blue'
    }`,
    color: 'white',
    fontSize: '12px',
    lineHeight: '16px',
  };
  const hoverItemStyle = {
    width: '19px',
    height: '20px',
    borderRadius: '50%',
    color: 'white',
    fontSize: '12px',
    lineHeight: '16px',
  };

  const messageMinContainer = {
    flexBasis: '182px',
    minHeight: '29px',
    maxHeight: '29px',
    maxWidth: '182px',
    minWidth: '182px',
  };

  const messageMaxContainer = {
    flexBasis: '182px',
    minHeight: '29px',
    maxHeight: '29px',
    maxWidth: '182px',
    minWidth: '182px',
  };

  return (
    <div
      onMouseEnter={() => setHaveHover(true)}
      onMouseLeave={() => setHaveHover(false)}
      style={
        haveHover
          ? {
              ...titleDialogStyles,
              background: hoverTheme.backgroundColorMainSection,
              border: `1px solid ${hoverTheme.divider}`,
            }
          : titleDialogStyles
      }
      className={previewDialogContainerStyles}
      onClick={() => {
        if (dialogViewModel && dialogViewModel.itemClickActionHandler) {
          const it = dialogViewModel?.item;

          dialogViewModel.itemClickActionHandler(it);
        }
      }}
      onTouchStart={() => {
        if (dialogViewModel && dialogViewModel.itemTouchActionHandler) {
          const it = dialogViewModel?.item;

          dialogViewModel.itemTouchActionHandler(it);
        }
      }}
    >
      <RowCenterContainer
        minWidthContainer="288px"
        minHeightContainer="56px"
        gapBetweenItem="16px"
        LeftItem={
          <div style={avatarSectionStyles} className={avatarWrapperStyles}>
            <div
              style={{
                margin: '0 auto',
              }}
            >
              <div>{avatar}</div>
            </div>
          </div>
        }
        LeftContainerSize={avatarSectionContainer}
        CenterItem={
          <ColumnContainer gapBetweenItem="3px" maxWidth="213px">
            <RowLeftContainer
              RightItem={
                <div style={{ textAlign: 'right' }}>
                  {!haveHover ? message_date_time_sent : ''}
                </div>
              }
              CenterContainerSize={titleContainer}
              CenterItem={
                <div className="row-left-layout-main-container">
                  {typeDialog === DialogType.public && (
                    <div>
                      <PublicChannel
                        color={publicIconTheme.color}
                        width="20px"
                        height="20px"
                        applyZoom
                      />
                    </div>
                  )}
                  <div className="preview-dialog-container__text-title">
                    {title}
                  </div>
                  {theme?.muted && (
                    <div>
                      <NotifyOff
                        color={publicIconTheme.color}
                        width="20px"
                        height="20px"
                        applyZoom
                      />
                    </div>
                  )}
                </div>
              }
            />
            {haveHover ? (
              <RowLeftContainer
                gapBetweenItem="7px"
                RightContainerSize={badgeContainer}
                RightItem={
                  <div>
                    <div style={hoverItemStyle}>
                      <EditDots />
                    </div>
                  </div>
                }
                CenterContainerSize={messageMinContainer}
                CenterItem={
                  <div className="preview-dialog-container__text-left">
                    <span className="preview-dialog-container__text-concat">
                      {previewMessage}
                    </span>
                  </div>
                }
              />
            ) : (
              <RowLeftContainer
                gapBetweenItem="7px"
                RightContainerSize={badgeContainer}
                RightItem={
                  unreadMessageCount && (
                    <div>
                      <div className="badge-text-style" style={badgeItemStyle}>
                        {unreadMessageCount &&
                        unreadMessageCount.toString().length > 1
                          ? '9+'
                          : unreadMessageCount}
                      </div>
                    </div>
                  )
                }
                CenterContainerSize={
                  unreadMessageCount && unreadMessageCount > 0
                    ? messageMinContainer
                    : messageMaxContainer
                }
                CenterItem={
                  <div
                    style={messageDialogStyles}
                    className={textWrapperContainer}
                  >
                    <span className="preview-d  ialog-container__text-concat">
                      {previewMessage}
                    </span>
                  </div>
                }
              />
            )}
          </ColumnContainer>
        }
        CenterContainerSize={{
          flexBasis: '50px',
          minHeight: '50px',
          maxHeight: '50px',
        }}
      />
    </div>
  );
};

export default PreviewDialog;
