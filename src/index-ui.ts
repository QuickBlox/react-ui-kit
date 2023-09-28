import './index.scss';
import MainButton, {
  TypeButton,
} from './Presentation/components/UI/Buttons/MainButton/MainButton';
import QuickBloxUIKitProvider, {
  qbDataContext,
  QBDataContextType,
} from './Presentation/components/providers/QuickBloxUIKitProvider/QuickBloxUIKitProvider';
import { LocalDataSource } from './Data/source/local/LocalDataSource';
import useQBConnection from './Presentation/components/providers/QuickBloxUIKitProvider/useQBConnection';
import useQbInitializedDataContext from './Presentation/components/providers/QuickBloxUIKitProvider/useQbInitializedDataContext';
import useEventMessagesRepository from './Presentation/components/providers/QuickBloxUIKitProvider/useEventMessagesRepository';
import { DialogsViewModel } from './Presentation/Views/Dialogs/DialogViewModel';
import useDialogsViewModel from './Presentation/Views/Dialogs/useDialogsViewModel';
import { SubscribeToDialogEventsUseCase } from './Domain/use_cases/SubscribeToDialogEventsUseCase';
import { Pagination } from './Domain/repository/Pagination';
import { DialogEventInfo } from './Domain/entity/DialogEventInfo';
import EventMessageType from './Domain/entity/EventMessageType';
import { NotificationTypes } from './Domain/entity/NotificationTypes';
import { stringifyError } from './utils/parse';
import DesktopLayout from './Presentation/components/layouts/Desktop/DesktopLayout';
import DialogsComponent from './Presentation/Views/Dialogs/Dialogs';
import MessagesView from './Presentation/components/UI/Dialogs/MessagesView/MessagesView';
import DialogInformation from './Presentation/components/UI/Dialogs/DialogInformation/DialogInformation';
import { DialogEntity } from './Domain/entity/DialogEntity';
import BaseViewModel from './Presentation/Views/Base/BaseViewModel';
import {
  LoginData,
  AuthorizationData,
  RemoteDataSource,
} from './Data/source/remote/RemoteDataSource';
import QuickBloxUIKitDesktopLayout from './Presentation/components/layouts/Desktop/QuickBloxUIKitDesktopLayout';
import DefaultTheme from './Presentation/assets/DefaultThemes/DefaultTheme';
import UiKitTheme from './Presentation/assets/UiKitTheme';
import useQbUIKitDataContext from './Presentation/components/providers/QuickBloxUIKitProvider/useQbUIKitDataContext';
import { AIMessageWidget } from './Presentation/components/UI/Dialogs/MessagesView/AIWidgets/AIMessageWidget';
import { AISource, IChatMessage } from './Data/source/AISource';
import AIWidgetIcon from './Presentation/components/UI/svgs/Icons/AIWidgets/AIWidget';
import ErrorMessageIcon from './Presentation/components/UI/Dialogs/MessagesView/AIWidgets/ErrorMessageIcon';
import PreviewDialogViewModel from './Presentation/components/UI/Dialogs/PreviewDialog/PreviewDialogViewModel';
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
  type DialogsViewModel,
  useDialogsViewModel,
  SubscribeToDialogEventsUseCase,
  Pagination,
  type DialogEventInfo,
  EventMessageType,
  NotificationTypes,
  stringifyError,
  DesktopLayout,
  DialogsComponent,
  MessagesView,
  DialogInformation,
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
};

export type FunctionTypeViewModelToVoid<TResult> = ( // had trouble with this re-exporting this one
  it: BaseViewModel<TResult>,
) => void;