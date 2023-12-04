/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useEffect } from 'react';
import './PreviewDialog.scss';
import ColumnContainer from '../../components/containers/ColumnContainer/ColumnContainer';
import RowCenterContainer from '../../components/containers/RowCenterContainer/RowCenterContainer';
import PublicChannel from '../../components/UI/svgs/Icons/Contents/PublicChannel';
import { IconTheme } from '../../components/UI/svgs/Icons/IconsCommonTypes';
import ThemeScheme from '../../themes/ThemeScheme';
import { DialogType } from '../../../Domain/entity/DialogTypes';
import User from '../../components/UI/svgs/Icons/Contents/User';
import GroupChat from '../../components/UI/svgs/Icons/Contents/GroupChat';
import RowLeftContainer from '../../components/containers/RowLeftContainer/RowLeftContainer';
import PreviewDialogViewModel from './PreviewDialogViewModel';
import NotifyOff from '../../components/UI/svgs/Icons/Toggle/NotifyOff';
import EditDots from '../../components/UI/svgs/Icons/Actions/EditDots';
import UiKitTheme from '../../themes/UiKitTheme';
import PreviewImageFile from './PreviewImageFile/PreviewImageFile';
import PreviewAudioFile from './PreviewAudioFile/PreviewAudioFile';
import PreviewVideoFile from './PreviewVideoFile/PreviewVideoFile';
import PreviewDefaultFile from './PreviewDefaultFile/PreviewDefaultFile';
import { Creator } from '../../../Data/Creator';

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
  colorTheme?: UiKitTheme;
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

  const colorIcon = theme?.colorTheme
    ? theme?.colorTheme.mainElements()
    : 'var(--main-elements)';

  const defaultLightTheme: PreviewDialogsColorTheme = {
    backgroundColorMainSection: theme?.colorTheme
      ? theme?.colorTheme.mainBackground()
      : 'var(--main-background)', // ThemeScheme.primary_a_100,
    backgroundColorAvatarSection: theme?.colorTheme
      ? theme?.colorTheme.disabledElements()
      : 'var(--disabled-elements)', // ThemeScheme.secondary_100,
    colorAvatarIcon: theme?.colorTheme
      ? theme?.colorTheme.secondaryText()
      : 'var(--secondary-text)', // ThemeScheme.secondary_300,
    fontColorMessage: theme?.colorTheme
      ? theme?.colorTheme.inputElements()
      : 'var(--input-elements)', // ThemeScheme.secondary_500,
    fontColorTitle: theme?.colorTheme
      ? theme?.colorTheme.mainText()
      : 'var(--main-text)', // ThemeScheme.secondary_900,
    divider: theme?.colorTheme ? theme?.colorTheme.divider() : 'var(--divider)', // ThemeScheme.primary_50,
  };

  const darkDefaultTheme: PreviewDialogsColorTheme = {
    backgroundColorMainSection: theme?.colorTheme
      ? theme?.colorTheme.mainBackground()
      : 'var(--main-background)', // ThemeScheme.primary_a_100,
    backgroundColorAvatarSection: theme?.colorTheme
      ? theme?.colorTheme.disabledElements()
      : 'var(--disabled-elements)', // ThemeScheme.secondary_100,
    colorAvatarIcon: theme?.colorTheme
      ? theme?.colorTheme.secondaryText()
      : 'var(--secondary-text)', // ThemeScheme.secondary_300,
    fontColorMessage: theme?.colorTheme
      ? theme?.colorTheme.inputElements()
      : 'var(--input-elements)', // ThemeScheme.secondary_500,
    fontColorTitle: theme?.colorTheme
      ? theme?.colorTheme.mainText()
      : 'var(--main-text)', // ThemeScheme.secondary_900,
    divider: theme?.colorTheme ? theme?.colorTheme.divider() : 'var(--divider)', // ThemeScheme.secondary_400, // 'var(--color-divider)'
  };

  const hoverTheme: PreviewDialogsColorTheme = darkDefaultTheme;

  if (theme?.themeName === 'light') {
    hoverTheme.backgroundColorMainSection = theme?.colorTheme
      ? theme?.colorTheme.chatInput()
      : 'var(--chat-input)'; // ThemeScheme.primary_a_200;
    hoverTheme.divider = theme?.colorTheme
      ? theme?.colorTheme.divider()
      : 'var(--divider)'; // ThemeScheme.primary_50;
  } else {
    hoverTheme.backgroundColorMainSection = theme?.colorTheme
      ? theme?.colorTheme.fieldBorder()
      : 'var(--field-border)'; // ThemeScheme.secondary_200;
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
    hoverTheme.backgroundColorMainSection = theme?.colorTheme
      ? theme?.colorTheme.fieldBorder()
      : 'var(--field-border)'; // ThemeScheme.secondary_200;
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

  const getMessageParts = (message: string) => {
    if (
      message.includes('MediaContentEntity') ||
      message.includes('[Attachment]')
    ) {
      const messageParts = message.split('|');

      // val messageBody = "${MediaContentEntity::class.java.simpleName}|$fileName|$uid|$fileMimeType"
      // 0, 1, 2, 3
      return messageParts;
    }

    return [];
  };

  const [fileUrl, setFileUrl] = React.useState('');

  async function getFileForPreview() {
    const messageParts = getMessageParts(previewMessage || '');

    if (
      messageParts &&
      messageParts.length > 0 &&
      messageParts[3].includes('image')
    ) {
      const fileUid: string = messageParts[2];
      let tmpFileUrl: string = fileUid && QB.content.privateUrl(fileUid);
      const { blobFile } = await Creator.createBlobFromUrl(tmpFileUrl);

      tmpFileUrl = blobFile ? URL.createObjectURL(blobFile) : tmpFileUrl || '';
      setFileUrl(tmpFileUrl);
    }
  }

  useEffect(() => {
    getFileForPreview();

    return () => {
      if (fileUrl) {
        URL.revokeObjectURL(fileUrl);
      }
    };
  }, []);

  const getPreviewMessage = (message: string): JSX.Element => {
    const messageParts = getMessageParts(message);

    if (messageParts && messageParts.length > 0) {
      const fileName: string = messageParts[1];
      // const fileUid: string = messageParts[2];
      // const fileUrl: string = fileUid && QB.content.privateUrl(fileUid);
      // let fileUrl: string = fileUid && QB.content.privateUrl(fileUid);
      // const { blobFile } = await Creator.createBlobFromUrl(fileUrl);
      //
      // fileUrl = blobFile ? URL.createObjectURL(blobFile) : fileUrl || '';

      const result: JSX.Element = (
        <div className="dialog-item-preview-text">{message}</div>
      );

      if (messageParts[3].includes('audio')) {
        return <PreviewAudioFile fileName={fileName} />;
      }
      if (messageParts[3].includes('video')) {
        return <PreviewVideoFile fileName={fileName} />;
      }
      if (messageParts[3].includes('image')) {
        return <PreviewImageFile fileName={fileName} imgUrl={fileUrl} />;
      }
      if (fileName.length > 0 && fileName.includes('.')) {
        return <PreviewDefaultFile fileName={fileName} />;
      }

      return result;
    }

    if (message.includes('[Forwarded_Message]')) {
      return <div>Forwarded message</div>;
    }

    return <div>{message}</div>;
  };

  return (
    <div
      onMouseEnter={() => setHaveHover(true)}
      onMouseLeave={() => setHaveHover(false)}
      style={
        haveHover
          ? {
              ...titleDialogStyles,
              // background: hoverTheme.backgroundColorMainSection,
              background: 'var(--chat-input)',
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
                <div className="dialog-item-date-time-sent">
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
                      <EditDots
                        color={
                          theme?.colorTheme
                            ? theme?.colorTheme.mainElements()
                            : 'var(--main-elements)'
                        }
                      />
                    </div>
                  </div>
                }
                CenterContainerSize={messageMinContainer}
                CenterItem={
                  <div className="preview-dialog-container__text-left">
                    <span className="preview-dialog-container__text-concat">
                      {getPreviewMessage(previewMessage || '')}
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
                    <span className="preview-dialog-container__text-concat">
                      {getPreviewMessage(previewMessage || '')}
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
