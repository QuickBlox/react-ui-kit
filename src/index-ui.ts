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
import { RemoteMessageDTO } from './Data/dto/message/RemoteMessageDTO';

export {
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
  type RemoteMessageDTO,
};
