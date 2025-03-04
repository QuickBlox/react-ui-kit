import './index.scss';

import MainButton, {
  TypeButton,
} from './Presentation/components/UI/Buttons/MainButton/MainButton';
import QuickBloxUIKitProvider, {
  qbDataContext,
  QBDataContextType,
} from './Presentation/providers/QuickBloxUIKitProvider/QuickBloxUIKitProvider';
import { LocalDataSource } from './Data/source/local/LocalDataSource';
import useQBConnection from './Presentation/providers/QuickBloxUIKitProvider/useQBConnection';
import useQbInitializedDataContext from './Presentation/providers/QuickBloxUIKitProvider/useQbInitializedDataContext';
import useEventMessagesRepository from './Presentation/providers/QuickBloxUIKitProvider/useEventMessagesRepository';
import { DialogListViewModel } from './Presentation/Views/DialogList/DialogListViewModel';
import useDialogListViewModel from './Presentation/Views/DialogList/useDialogListViewModel';
import { SubscribeToDialogEventsUseCase } from './Domain/use_cases/SubscribeToDialogEventsUseCase';
import { Pagination } from './Domain/repository/Pagination';
import { DialogEventInfo } from './Domain/entity/DialogEventInfo';
import EventMessageType from './Domain/entity/EventMessageType';
import { NotificationTypes } from './Domain/entity/NotificationTypes';
import { stringifyError } from './utils/parse';
import DesktopLayout from './Presentation/layouts/Desktop/DesktopLayout';
import DialogList from './Presentation/Views/DialogList/DialogList';
import Dialog from './Presentation/Views/Dialog/Dialog';
import DialogInfo from './Presentation/Views/DialogInfo/DialogInfo';
import { DialogEntity } from './Domain/entity/DialogEntity';
import BaseViewModel, {
  FunctionTypeViewModelToVoid,
} from './CommonTypes/BaseViewModel';
import {
  LoginData,
  AuthorizationData,
  RemoteDataSource,
} from './Data/source/remote/RemoteDataSource';
import QuickBloxUIKitDesktopLayout from './Presentation/layouts/Desktop/QuickBloxUIKitDesktopLayout';
import DefaultTheme from './Presentation/themes/DefaultThemes/DefaultTheme';
import UiKitTheme from './Presentation/themes/UiKitTheme';
import useQbUIKitDataContext from './Presentation/providers/QuickBloxUIKitProvider/useQbUIKitDataContext';
import { AIMessageWidget } from './Presentation/Views/Dialog/AIWidgets/AIMessageWidget';
import { AISource, IChatMessage } from './Data/source/AISource';
import AIWidgetIcon from './Presentation/components/UI/svgs/Icons/AIWidgets/AIWidget';
import ErrorMessageIcon from './Presentation/Views/Dialog/AIWidgets/ErrorMessageIcon';
import PreviewDialogViewModel from './Presentation/Views/PreviewDialog/PreviewDialogViewModel';
import { AvatarContentIncomingUserProps } from './Presentation/Views/Dialog/Message/IncomingMessage/AvatarContentIncomingUser/AvatarContentIncomingUser';

import { GetUserNameFct } from './Presentation/Views/Dialog/Message/IncomingMessage/IncomingMessage';
import {
  AIWidgetPlaceHolder,
  QuickBloxUIKitProps,
  QuickBloxUIKitDesktopLayoutProps,
} from './CommonTypes/CommonTypes';

import useQuickBloxUIKit from './hooks/useQuickBloxUIKit';
import MessageItem from './Presentation/Views/Dialog/MessageItem/MessageItem';
import AIRephraseWidget from './Presentation/Views/Dialog/AIWidgets/AIRephraseWidget/AIRephraseWidget';

import './Presentation/Views/Dialog/Dialog.scss';
import './Presentation/Views/Dialog/DialogHeader/DialogInfoIcon/DialogInfoIcon.scss';


import {
  Avatar,
  Badge,
  Button,
  CheckBox,
  DialogBanner,
  DialogItemPreview,
  DialogWindow,
  TextField,
  ToastProvider,
  UserListItem,
  Dropdown,
  Header,
  Loader,
  Message,
  MessageInput,
  MessageSeparator,
  Placeholder,
  PreviewFileMessage,
  SettingsItem,
} from './Presentation/ui-components';

// ✅ **Добавлены недостающие компоненты**
import { DefaultConfigurations } from './Data/DefaultConfigurations';
import { DialogType } from './Domain/entity/DialogTypes';
import { GroupDialogEntity } from './Domain/entity/GroupDialogEntity';
import { PublicDialogEntity } from './Domain/entity/PublicDialogEntity';
import { MessageEntity } from './Domain/entity/MessageEntity';
import { getDateForDialog } from './utils/DateTimeFormatter';
import ReplyMessagePreview from './Presentation/ui-components/MessageInput/ReplyMessagePreview/ReplyMessagePreview';
import ForwardMessageFlow from './Presentation/Views/Dialog/ForwardMessageFlow/ForwardMessageFlow';
import SectionList from './Presentation/components/containers/SectionList';
import { SectionItem } from './Presentation/components/containers/SectionList/useComponent';
import MembersList from './Presentation/Views/DialogInfo/MembersList/MembersList';
import PreviewDialog from './Presentation/Views/PreviewDialog/PreviewDialog';
import CreateNewDialogFlow from './Presentation/Views/Flow/CreateDialogFlow/CreateNewDialogFlow';

// ✅ **Добавлены недостающие иконки**
import {
  GroupChatSvg,
  InformationSvg,
  PublicChannelSvg,
  UserSvg,
  NewChatSvg,
  SearchSvg,
  ChatSvg,
} from './Presentation/icons';

export {
  Avatar,
  Badge,
  Button,
  CheckBox,
  DialogBanner,
  DialogItemPreview,
  DialogWindow,
  Dropdown,
  Header,
  Loader,
  Message,
  MessageInput,
  MessageSeparator,
  Placeholder,
  PreviewFileMessage,
  SettingsItem,
  TextField,
  ToastProvider,
  UserListItem,
  MainButton,
  TypeButton,
  type LoginData,
  type AuthorizationData,
  QuickBloxUIKitProvider,
  qbDataContext,
  type QBDataContextType,
  RemoteDataSource,
  LocalDataSource,
  useQBConnection,
  useQbInitializedDataContext,
  useQbUIKitDataContext,
  useEventMessagesRepository,
  type DialogListViewModel,
  useDialogListViewModel,
  SubscribeToDialogEventsUseCase,
  Pagination,
  type DialogEventInfo,
  EventMessageType,
  NotificationTypes,
  stringifyError,
  DesktopLayout,
  DialogList,
  Dialog,
  DialogInfo,
  type DialogEntity,
  BaseViewModel,
  QuickBloxUIKitDesktopLayout,
  DefaultTheme,
  type UiKitTheme,
  type AIMessageWidget,
  AISource,
  type IChatMessage,
  AIWidgetIcon,
  ErrorMessageIcon,
  PreviewDialogViewModel,
  type FunctionTypeViewModelToVoid,
  type AvatarContentIncomingUserProps,
  type GetUserNameFct,
  type AIWidgetPlaceHolder,
  type QuickBloxUIKitProps,
  type QuickBloxUIKitDesktopLayoutProps,
  DefaultConfigurations,
  DialogType,
  GroupDialogEntity,
  PublicDialogEntity,
  type MessageEntity,
  getDateForDialog,
  ReplyMessagePreview,
  ForwardMessageFlow,
  SectionList,
  type SectionItem,
  MembersList,
  PreviewDialog,
  CreateNewDialogFlow,
  GroupChatSvg,
  InformationSvg,
  PublicChannelSvg,
  UserSvg,
  NewChatSvg,
  SearchSvg,
  ChatSvg,
  useQuickBloxUIKit,
  MessageItem,
  AIRephraseWidget
};
