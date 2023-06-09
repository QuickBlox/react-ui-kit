import './index.scss';
import MainButton, {
  TypeButton,
} from './Presentation/components/UI/Buttons/MainButton/MainButton';
import QuickBloxUIKitProvider, {
  qbDataContext,
} from './Presentation/components/providers/QuickBloxUIKitProvider/QuickBloxUIKitProvider';
import { LocalDataSource } from './Data/source/local/LocalDataSource';
import useQBConnection from './Presentation/components/providers/QuickBloxUIKitProvider/useQBConnection';
import useQbDataContext from './Presentation/components/providers/QuickBloxUIKitProvider/useQbDataContext';
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
  RemoteDataSource,
} from './Data/source/remote/RemoteDataSource';
import QuickBloxUIKitDesktopLayout from './Presentation/components/layouts/Desktop/QuickBloxUIKitDesktopLayout';
import DefaultTheme from './Presentation/assets/DefaultThemes/DefaultTheme';
import UiKitTheme from './Presentation/assets/UiKitTheme';

export {
  MainButton,
  TypeButton,
  type LoginData,
  QuickBloxUIKitProvider,
  qbDataContext,
  RemoteDataSource,
  LocalDataSource,
  useQBConnection,
  useQbDataContext,
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
};
