/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useEffect, useState } from 'react';
import './PreviewDialog.scss';
import PublicChannel from '../../components/UI/svgs/Icons/Contents/PublicChannel';
import { IconTheme } from '../../components/UI/svgs/Icons/IconsCommonTypes';
import ThemeScheme from '../../themes/ThemeScheme';
import { DialogType } from '../../../Domain/entity/DialogTypes';
import User from '../../components/UI/svgs/Icons/Contents/User';
import GroupChat from '../../components/UI/svgs/Icons/Contents/GroupChat';
import PreviewDialogViewModel from './PreviewDialogViewModel';
import UiKitTheme from '../../themes/UiKitTheme';
import PreviewImageFile from './PreviewImageFile/PreviewImageFile';
import PreviewAudioFile from './PreviewAudioFile/PreviewAudioFile';
import PreviewVideoFile from './PreviewVideoFile/PreviewVideoFile';
import PreviewDefaultFile from './PreviewDefaultFile/PreviewDefaultFile';
import { Creator } from '../../../Data/Creator';
import UserAvatar from '../EditDialog/UserAvatar/UserAvatar';
import PreviewDialogContextMenu from './PreviewDialogContextMenu/PreviewDialogContextMenu';
import { DialogEntity } from '../../../Domain/entity/DialogEntity';
import { MessageDTOMapper } from '../../../Data/source/remote/Mapper/MessageDTOMapper';
import { FunctionTypeDialogEntityToVoid } from '../../../CommonTypes/BaseViewModel';
import { PrivateDialogEntity } from '../../../Domain/entity/PrivateDialogEntity';
import useUsersListViewModel from '../DialogInfo/UsersList/useUsersListViewModel';

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
  onLeaveDialog: FunctionTypeDialogEntityToVoid;
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
  onLeaveDialog,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  additionalSettings = undefined,
}: PreviewDialogsProps) => {
  const [dialogAvatarUrl, setDialogAvatarUrl] = React.useState('');

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
  let avatar: JSX.Element;

  switch (typeDialog) {
    case DialogType.public:
      avatar = (
        <div className="dialog-preview-avatar-ellipse">
          <div className="dpa-contents-user">
            <PublicChannel
              color={publicIconTheme.color}
              width={publicIconTheme.width}
              height={publicIconTheme.height}
            />
          </div>
        </div>
      );
      break;
    case DialogType.group:
      avatar = (
        <div className="dialog-preview-avatar-ellipse">
          <div className="contents-user">
            <GroupChat
              color={itemTheme.color}
              width={itemTheme.width}
              height={itemTheme.height}
            />
          </div>
        </div>
      );
      break;
    case DialogType.private:
      avatar = dialogAvatarUrl ? (
        <UserAvatar
          urlAvatar={dialogAvatarUrl}
          iconTheme={{ width: '55px', height: '55px' }}
        />
      ) : (
        <div className="dialog-preview-avatar-ellipse">
          <div className="contents-user">
            <User
              color={itemTheme.color}
              width={itemTheme.width}
              height={itemTheme.height}
            />
          </div>
        </div>
      );
      break;
    default:
      avatar = (
        <div className="dialog-preview-avatar-ellipse">
          <div className="contents-user">
            <GroupChat
              color={itemTheme.color}
              width={itemTheme.width}
              height={itemTheme.height}
            />
          </div>
        </div>
      );
      break;
  }
  avatar = dialogAvatar || avatar;
  const [haveHover, setHaveHover] = React.useState(false);

  const getMessageParts = (message: string) => {
    return MessageDTOMapper.getMessageParts(message);
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
  const userViewModel = useUsersListViewModel(dialogViewModel?.item.entity);

  const getUserAvatarByUid = async () => {
    let result = '';
    const participants: Array<number> =
      dialogViewModel?.entity &&
      dialogViewModel?.entity.type === DialogType.private
        ? [
            (dialogViewModel?.entity as unknown as PrivateDialogEntity)
              .participantId,
          ]
        : [];
    const senderUser = await userViewModel.getUserById(participants[0]);

    result = senderUser?.photo || '';

    return result;
  };

  async function getDialogPhotoFileForPreview() {
    const tmpFileUrl: string = await getUserAvatarByUid();

    if (tmpFileUrl && tmpFileUrl.length > 0) {
      setDialogAvatarUrl(tmpFileUrl);
    }
  }

  useEffect(() => {
    getFileForPreview();
    getDialogPhotoFileForPreview();

    return () => {
      if (fileUrl) {
        URL.revokeObjectURL(fileUrl);
      }
      if (dialogAvatarUrl) {
        URL.revokeObjectURL(dialogAvatarUrl);
      }
    };
  }, []);

  const trimFileName = (fileName: string): string => {
    if (fileName.length > 16) {
      return `${fileName.substring(0, 15)}... .${fileName.slice(
        (Math.max(0, fileName.lastIndexOf('.')) || Infinity) + 1,
      )}`;
    }

    return fileName;
  };

  const getPreviewMessage = (message: string): JSX.Element => {
    const messageParts = getMessageParts(message);

    if (messageParts && messageParts.length > 0) {
      const fileName: string = messageParts[1];

      const result: JSX.Element = (
        <div className="dialog-item-preview-text">{message}</div>
      );

      if (messageParts[3].includes('audio')) {
        return <PreviewAudioFile fileName={trimFileName(fileName)} />;
      }
      if (messageParts[3].includes('video')) {
        return <PreviewVideoFile fileName={trimFileName(fileName)} />;
      }
      if (messageParts[3].includes('image')) {
        return (
          <PreviewImageFile
            fileName={trimFileName(fileName)}
            imgUrl={fileUrl}
          />
        );
      }
      if (fileName.length > 0 && fileName.includes('.')) {
        return <PreviewDefaultFile fileName={trimFileName(fileName)} />;
      }

      return result;
    }

    if (message.includes(MessageDTOMapper.FORWARD_MESSAGE_PREFIX)) {
      return <div>Forwarded message</div>;
    }
    if (message.includes(MessageDTOMapper.REPLY_MESSAGE_PREFIX)) {
      return <div>Replied Message</div>;
    }

    return (
      <div>
        {message.split(' ').length >= 1 && message.split(' ')[0].length < 23
          ? message
          : `${message.substring(0, 25)} ...`}
      </div>
    );
  };

  const LONG_TAP_DURATION = 2000; // in milliseconds
  const VERY_LONG_TAP_DURATION = 3800; // in milliseconds

  const [touchDuration, setTouchDuration] = useState(0);
  let touchTimer: NodeJS.Timeout | null = null;

  const handleTouchStart = () => {
    // Если предыдущий таймер еще активен, отменяем его
    if (touchTimer !== null) {
      clearTimeout(touchTimer);
    }

    // Запуск нового таймера
    touchTimer = setTimeout(() => {
      setTouchDuration(Date.now());
    }, VERY_LONG_TAP_DURATION);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleTouchEndOrCancel = (event: React.TouchEvent) => {
    // Если таймер был установлен, отменяем его
    if (touchTimer !== null) {
      clearTimeout(touchTimer);

      if (Date.now() - touchDuration > VERY_LONG_TAP_DURATION) {
        console.log('Very long tap detected');
        // Call context menu here
      } else if (Date.now() - touchDuration > LONG_TAP_DURATION) {
        console.log('Long tap detected');
        // Select the element here
        if (dialogViewModel && dialogViewModel.itemTouchActionHandler) {
          const it = dialogViewModel?.item;

          dialogViewModel.itemTouchActionHandler(it);
        }
      } else {
        console.log('Short tap detected');
        // Do something for short taps here
      }

      // Reset touchDuration
      setTouchDuration(0);

      // Prevent unwanted click events after touch ends
      // event.preventDefault();
    }
  };

  return (
    <div
      className="dialog-preview-container"
      style={
        haveHover
          ? {
              background: 'var(--divider)',
            }
          : {}
      }
      onMouseEnter={() => setHaveHover(true)}
      onMouseLeave={() => setHaveHover(false)}
    >
      <div className="dialog-preview-container-left">
        <div
          className="dialog-preview"
          onClick={() => {
            console.log('CLICK detected in PreviewDialog');
            if (dialogViewModel && dialogViewModel.itemClickActionHandler) {
              const it = dialogViewModel?.item;

              dialogViewModel.itemClickActionHandler(it);
            }
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEndOrCancel}
          onTouchCancel={handleTouchEndOrCancel}
        >
          <div className="dialog-preview-avatar">{avatar}</div>
          <div className="dialog-preview-text">
            <div className="dialog-preview-text-subtitle">
              <div className="dialog-preview-text-subtitle-caption-name">
                {title}
              </div>
              <div className="dialog-preview-text-subtitle-caption2-time">
                {message_date_time_sent}
              </div>
            </div>
            <div className="dialog-preview-text-subtitle-message">
              <div className="dialog-preview-text-subtitle-text">
                {getPreviewMessage(previewMessage || '')}
              </div>
              {unreadMessageCount! > 0 && (
                <div className="dialog-preview-text-subtitle-message-badge">
                  <div className="dialog-preview-text-subtitle-message-badge-v">
                    {unreadMessageCount}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="dialog-preview-container-right">
        <div className="dialog-preview-icon-close">
          <PreviewDialogContextMenu
            dialog={dialogViewModel?.entity as DialogEntity}
            // onLeave={() => console.log('call leave dialog')}
            onLeave={() =>
              onLeaveDialog(dialogViewModel?.entity as DialogEntity)
            }
            enableLeaveDialog
          />
        </div>
      </div>
    </div>
  );
};

export default PreviewDialog;
