/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useEffect } from 'react';
import './PreviewDialog.scss';
import { DialogType } from '../../../Domain/entity/DialogTypes';
import PreviewDialogViewModel from './PreviewDialogViewModel';
import UiKitTheme from '../../themes/UiKitTheme';
import { Creator } from '../../../Data/Creator';
import { DialogEntity } from '../../../Domain/entity/DialogEntity';
import { MessageDTOMapper } from '../../../Data/source/remote/Mapper/MessageDTOMapper';
import { FunctionTypeDialogEntityToVoid } from '../../../CommonTypes/BaseViewModel';
import { PrivateDialogEntity } from '../../../Domain/entity/PrivateDialogEntity';
import useUsersListViewModel from '../DialogInfo/UsersList/useUsersListViewModel';
import PreviewFileMessage from '../../ui-components/PreviewFileMessage/PreviewFileMessage';
import Badge from '../../ui-components/Badge/Badge';
import DialogItemPreview from '../../ui-components/DialogItemPreview/DialogItemPreview';
import Dropdown from '../../ui-components/Dropdown/Dropdown';
import { GroupChatSvg, MoreSvg, PublicChannelSvg, UserSvg } from '../../icons';
import Avatar from '../../ui-components/Avatar/Avatar';
import { getQB } from '../../../qb-api-calls';

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
  disableActions?: boolean;
};
// eslint-disable-next-line react/function-component-definition
const PreviewDialog = ({
  typeDialog,
  dialogViewModel,
  dialogAvatar,
  title,
  previewMessage,
  unreadMessageCount,
  message_date_time_sent,
  theme = undefined,
  onLeaveDialog,
  disableActions = false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  additionalSettings = undefined,
}: PreviewDialogsProps) => {
  const [dialogAvatarUrl, setDialogAvatarUrl] = React.useState('');

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

  let avatar: JSX.Element;

  switch (typeDialog) {
    case DialogType.public:
      avatar = <Avatar size="lg" icon={<PublicChannelSvg />} />;
      break;
    case DialogType.group:
      avatar = <Avatar size="lg" icon={<GroupChatSvg />} />;
      break;
    case DialogType.private:
      avatar = <Avatar size="lg" icon={<UserSvg />} src={dialogAvatarUrl} />;
      break;
    default:
      avatar = <Avatar size="lg" icon={<GroupChatSvg />} />;
      break;
  }
  avatar = dialogAvatar || avatar;

  const getMessageParts = (message: string) => {
    return MessageDTOMapper.getMessageParts(message);
  };

  const [fileUrl, setFileUrl] = React.useState('');
  const [messageContentParts, setMessageContentParts] = React.useState<
    string[]
  >([]);

  async function getFileForPreview() {
    const messageParts = getMessageParts(previewMessage || '');
    const QB = getQB();

    setMessageContentParts(messageParts);

    if (
      messageParts &&
      messageParts.length > 0 && messageParts[3] &&
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

    if (participants.length > 0) {
      const senderUser = await userViewModel.getUserById(participants[0]);

      result = senderUser?.photo || '';
    }

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

  useEffect(() => {
    getFileForPreview();

    return () => {
      if (fileUrl) {
        URL.revokeObjectURL(fileUrl);
      }
    };
  }, [previewMessage]);

  const trimFileName = (fileName: string): string => {
    if (fileName.length > 16) {
      return `${fileName.substring(0, 15)}... .${fileName.slice(
        (Math.max(0, fileName.lastIndexOf('.')) || Infinity) + 1,
      )}`;
    }

    return fileName;
  };

  const getPreviewMessage = (message: string): JSX.Element | string => {
    if (messageContentParts && messageContentParts.length > 0) {
      const [, fileName, , type] = messageContentParts;

      if (type && type.includes('audio')) {
        return (
          <PreviewFileMessage type="audio" name={trimFileName(fileName)} />
        );
      }
      if (type && type.includes('video')) {
        return (
          <PreviewFileMessage type="video" name={trimFileName(fileName)} />
        );
      }
      if (type && type.includes('image')) {
        return (
          <PreviewFileMessage name={trimFileName(fileName)} src={fileUrl} />
        );
      }
      if (fileName && fileName.length > 0 && fileName.includes('.')) {
        return <PreviewFileMessage name={trimFileName(fileName)} />;
      }

      return message;
    }

    if (message.includes(MessageDTOMapper.FORWARD_MESSAGE_PREFIX)) {
      return <div>Forwarded message</div>;
    }
    if (message.includes(MessageDTOMapper.REPLY_MESSAGE_PREFIX)) {
      return <div>Replied Message</div>;
    }

    return message;
  };

  return (
    <DialogItemPreview
      className="dialog-item-preview-border"
      active={theme?.selected}
      avatar={avatar}
      title={title || ''}
      date={message_date_time_sent || ''}
      lastMessage={getPreviewMessage(previewMessage || '')}
      badge={
        unreadMessageCount && unreadMessageCount > 0 ? (
          <Badge count={unreadMessageCount} mute={false} limit={9} />
        ) : undefined
      }
      contextMenu={
        <Dropdown
          options={[
            {
              value: 'Leave',
              label: 'Leave',
              disabled: disableActions,
            },
          ]}
          disabled={disableActions}
          onSelect={(value: string) => {
            if (value === 'Leave') {
              onLeaveDialog(dialogViewModel?.entity as DialogEntity);
            }
          }}
          placement="left"
        >
          <div className="dialog-preview-container-context-menu">
            <MoreSvg className="" />
          </div>
        </Dropdown>
      }
      onClick={() => {
        if (dialogViewModel && dialogViewModel.itemClickActionHandler) {
          dialogViewModel.itemClickActionHandler(dialogViewModel?.item);
        }
      }}
    />
  );
};

export default PreviewDialog;
