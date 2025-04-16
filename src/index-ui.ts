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
  FunctionTypeMessageEntityToVoid,
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
import AvatarContentIncomingUser, {
  AvatarContentIncomingUserProps,
} from './Presentation/Views/Dialog/Message/IncomingMessage/AvatarContentIncomingUser/AvatarContentIncomingUser';

import {
  GetUserNameFct,
  IncomingMessage,
} from './Presentation/Views/Dialog/Message/IncomingMessage/IncomingMessage';
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

import { DefaultConfigurations } from './Data/DefaultConfigurations';
import { DialogType } from './Domain/entity/DialogTypes';
import { GroupDialogEntity } from './Domain/entity/GroupDialogEntity';
import { PublicDialogEntity } from './Domain/entity/PublicDialogEntity';
import { MessageEntity } from './Domain/entity/MessageEntity';
import {
  getDateForDialog,
  getTimeShort24hFormat,
} from './utils/DateTimeFormatter';
import ReplyMessagePreview from './Presentation/ui-components/MessageInput/ReplyMessagePreview/ReplyMessagePreview';
import ForwardMessageFlow from './Presentation/Views/Dialog/ForwardMessageFlow/ForwardMessageFlow';
import SectionList from './Presentation/components/containers/SectionList';
import { SectionItem } from './Presentation/components/containers/SectionList/useComponent';
import MembersList from './Presentation/Views/DialogInfo/MembersList/MembersList';
import PreviewDialog from './Presentation/Views/PreviewDialog/PreviewDialog';
import CreateNewDialogFlow from './Presentation/Views/Flow/CreateDialogFlow/CreateNewDialogFlow';

import {
  GroupChatSvg,
  InformationSvg,
  PublicChannelSvg,
  UserSvg,
  NewChatSvg,
  SearchSvg,
  ChatSvg,
} from './Presentation/icons';
import { MessageDTOMapper } from './Data/source/remote/Mapper/MessageDTOMapper';
import AITranslate from './Presentation/Views/Dialog/AIComponents/AITranslate/AITranslate';
import TextBubble from './Presentation/ui-components/Message/Bubble/TextBubble/TextBubble';
import AIAssist from './Presentation/Views/Dialog/AIComponents/AIAssist/AIAssist';
import MessageContextMenu from './Presentation/Views/Dialog/Message/MessageContextMenu/MessageContextMenu';
import AttachmentBubble from './Presentation/ui-components/Message/Bubble/AttachmentBubble/AttachmentBubble';
import {
  HighLightLink,
  messageHasUrls,
} from './Presentation/Views/Dialog/Message/HighLightLink/HighLightLink';
import AIAssistComponent from './Presentation/Views/Dialog/AIComponents/AIAssistComponent/AIAssistComponent';
import AITranslateComponent from './Presentation/Views/Dialog/AIComponents/AITranslateComponent/AITranslateComponent';
import AIWidgetActions from './Presentation/Views/Dialog/AIWidgets/AIWidgetActions/AIWidgetActions';
import SliderMenu from './Presentation/Views/Dialog/AIWidgets/SliderMenu';
import ContextMenu from './Presentation/Views/Dialog/ContextMenu/ContextMenu';
import DialogHeader from './Presentation/Views/Dialog/DialogHeader/DialogHeader';
import DialogBackIcon from './Presentation/Views/Dialog/DialogHeader/DialogBackIcon/DialogBackIcon';
import DialogInfoIcon from './Presentation/Views/Dialog/DialogHeader/DialogInfoIcon/DialogInfoIcon';
import { DropDownMenu } from './Presentation/Views/Dialog/DropDownMenu/DropDownMenu';
import { ItemDropDownMenu } from './Presentation/Views/Dialog/DropDownMenu/ItemDropDownMenu/ItemDropDownMenu';
import { ErrorToast } from './Presentation/Views/Dialog/ErrorToast/ErrorToast';
import InputForForwarding from './Presentation/Views/Dialog/ForwardMessageFlow/InputForForwarding/InputForForwarding';
import ForwardMessagePreview from './Presentation/Views/Dialog/ForwardMessageFlow/ForwardMessagePreview/ForwardMessagePreview';
import DialogsWithSearch from './Presentation/Views/Dialog/ForwardMessageFlow/DialogsWithSearch/DialogsWithSearch';
import SearchComponent from './Presentation/Views/Dialog/ForwardMessageFlow/DialogsWithSearch/SearchComponent/SearchComponent';
import DialogListItem from './Presentation/Views/Dialog/ForwardMessageFlow/DialogsWithSearch/DialogListItem/DialogListItem';
import InputMessage from './Presentation/Views/Dialog/InputMessage/InputMessage';
import OutgoingRepliedMessage from './Presentation/Views/Dialog/Message/OutgoingRepliedMessage/OutgoingRepliedMessage';
import { OutgoingMessage } from './Presentation/Views/Dialog/Message/OutgoingMessage/OutgoingMessage';
import OutgoingForwardedMessage from './Presentation/Views/Dialog/Message/OutgoinForwardedMessage/OutgoinForwardedMessage';
import MessageAttachment from './Presentation/Views/Dialog/Message/MessageAttachment/MessageAttachment';
import VideoAttachment from './Presentation/Views/Dialog/Message/MessageAttachment/VideoAttachment/VideoAttachment';
import ImageAttachment from './Presentation/Views/Dialog/Message/MessageAttachment/ImageAttachment/ImageAttachment';
import DefaultAttachment from './Presentation/Views/Dialog/Message/MessageAttachment/DefaultAttachment/DefaultAttachment';
import AudioAttachment from './Presentation/Views/Dialog/Message/MessageAttachment/AudioAttachment/AudioAttachment';
import IncomingRepliedMessage from './Presentation/Views/Dialog/Message/IncomingRepliedMessage/IncomingRepliedMessage';
import MessageContentComponent from './Presentation/Views/Dialog/Message/IncomingMessage/MessageContentComponent/MessageContentComponent';
import IncomingForwardedMessage from './Presentation/Views/Dialog/Message/IncomingForwardedMessage/IncomingForwardedMessage';
import { SystemDateBanner } from './Presentation/Views/Dialog/SystemDateBanner/SystemDateBanner';
import { SystemMessageBanner } from './Presentation/Views/Dialog/SystemMessageBanner/SystemMessageBanner';
import VoiceMessage from './Presentation/Views/Dialog/VoiceMessage/VoiceMessage';
import UsersList from './Presentation/Views/DialogInfo/UsersList/UsersList';
import UserSingle from './Presentation/Views/DialogInfo/UsersList/SingleUser/SingleUser';
import DialogMembersButton from './Presentation/Views/DialogInfo/DialogMemberButton/DialogMembersButton';
import DialogListHeader from './Presentation/Views/DialogListHeader/DialogListHeader';
import EditDialog from './Presentation/Views/EditDialog/EditDialog';
import UserAvatar from './Presentation/Views/EditDialog/UserAvatar/UserAvatar';
import LeaveDialogFlow from './Presentation/Views/Flow/LeaveDialogFlow/LeaveDialogFlow';
import CreateDialog from './Presentation/Views/Flow/CreateDialog/CreateDialog';
import InviteMembers from './Presentation/Views/InviteMembers/InviteMembers';
import NotFoundContent from './Presentation/Views/InviteMembers/NotFoundContent/NotFoundContent';
import SingleUserWithCheckBox from './Presentation/Views/InviteMembers/InviteUsersList/SingleUserWithCheckBox/SingleUserWithCheckBox';
import PreviewDialogContextMenu from './Presentation/Views/PreviewDialog/PreviewDialogContextMenu/PreviewDialogContextMenu';
import YesNoQuestionComponent from './Presentation/Views/YesNoQuestion/YesNoQuestion';

export {
  AttachmentBubble,
  messageHasUrls,
  type FunctionTypeMessageEntityToVoid,
  MessageDTOMapper,
  getTimeShort24hFormat,
  TextBubble,
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
  type DialogEntity,
  BaseViewModel,
  QuickBloxUIKitDesktopLayout,
  DefaultTheme,
  type UiKitTheme,
  type AIMessageWidget,
  AISource,
  type IChatMessage,
  AIWidgetIcon,
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
  SectionList,
  type SectionItem,
  GroupChatSvg,
  InformationSvg,
  PublicChannelSvg,
  UserSvg,
  NewChatSvg,
  SearchSvg,
  ChatSvg,
  useQuickBloxUIKit,
  AIAssist,
  AIAssistComponent,
  AITranslate,
  AITranslateComponent,
  AIRephraseWidget,
  AIWidgetActions,
  ErrorMessageIcon,
  SliderMenu,
  ContextMenu,
  DialogHeader,
  DialogBackIcon,
  DialogInfoIcon,
  DropDownMenu,
  ItemDropDownMenu,
  ErrorToast,
  ForwardMessageFlow,
  InputForForwarding,
  ForwardMessagePreview,
  DialogsWithSearch,
  SearchComponent,
  DialogListItem,
  InputMessage,
  Message,
  OutgoingRepliedMessage,
  OutgoingMessage,
  OutgoingForwardedMessage,
  MessageAttachment,
  VideoAttachment,
  ImageAttachment,
  DefaultAttachment,
  AudioAttachment,
  IncomingRepliedMessage,
  IncomingMessage,
  MessageContentComponent,
  AvatarContentIncomingUser,
  IncomingForwardedMessage,
  HighLightLink,
  MessageContextMenu,
  MessageItem,
  SystemDateBanner,
  SystemMessageBanner,
  VoiceMessage,
  Dialog,
  DialogInfo,
  UsersList,
  UserSingle,
  MembersList,
  DialogMembersButton,
  DialogList,
  DialogListHeader,
  EditDialog,
  UserAvatar,
  LeaveDialogFlow,
  CreateNewDialogFlow,
  CreateDialog,
  InviteMembers,
  NotFoundContent,
  SingleUserWithCheckBox,
  PreviewDialog,
  PreviewDialogContextMenu,
  YesNoQuestionComponent,
};
