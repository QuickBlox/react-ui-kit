import React, { useEffect, useState } from 'react';
// import { Configuration, OpenAIApi } from 'openai';
import useQbInitializedDataContext from '../../providers/QuickBloxUIKitProvider/useQbInitializedDataContext';
import { DialogEntity } from '../../../../Domain/entity/DialogEntity';
import { DialogsViewModel } from '../../../Views/Dialogs/DialogViewModel';
import DialogsComponent from '../../../Views/Dialogs/Dialogs';
import DialogInformation from '../../UI/Dialogs/DialogInformation/DialogInformation';
import DesktopLayout from './DesktopLayout';
import MessagesView from '../../UI/Dialogs/MessagesView/MessagesView';
import useDialogsViewModel from '../../../Views/Dialogs/useDialogsViewModel';
import { Pagination } from '../../../../Domain/repository/Pagination';
// import { SubscribeToDialogEventsUseCase } from '../../../../Domain/use_cases/SubscribeToDialogEventsUseCase';
// import useEventMessagesRepository from '../../providers/QuickBloxUIKitProvider/useEventMessagesRepository';
// import EventMessageType from '../../../../Domain/entity/EventMessageType';
// import { NotificationTypes } from '../../../../Domain/entity/NotificationTypes';
// import { stringifyError } from '../../../../utils/parse';
// import { DialogEventInfo } from '../../../../Domain/entity/DialogEventInfo';
import UiKitTheme from '../../../assets/UiKitTheme';
import BaseViewModel from '../../../Views/Base/BaseViewModel';
// import { InputWidget } from '../../UI/Dialogs/MessagesView/InputWidget/InputWidget';
// import useDefaultTextInputWidget from '../../UI/Dialogs/MessagesView/InputWidget/UseDefaultTextInputWidget';
// import useDefaultVoiceInputWidget from '../../UI/Dialogs/MessagesView/InputWidget/useDefaultVoiceInputWidget';
// import UseDefaultIncomingMessageWidget from '../../UI/Dialogs/MessagesView/InputWidget/UseDefaultIncomingMessageWidget';
// import CompanyLogo from '../TestStage/CompanyLogo/CompanyLogo';

type QuickBloxUIKitDesktopLayoutProps = {
  theme?: UiKitTheme;
  // InputWidgetToLeftPlaceHolder?: InputWidget;
  // InputWidgetToRightPlaceHolder?: InputWidget;
  // IncomingMessageWidgetToRightPlaceHolder?: InputWidget;
};

const QuickBloxUIKitDesktopLayout: React.FC<
  QuickBloxUIKitDesktopLayoutProps
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,react/function-component-definition
> = ({ theme = undefined }: QuickBloxUIKitDesktopLayoutProps) => {
  console.log('create QuickBloxUIKitDesktopLayout');
  const [selectedDialog, setSelectedDialog] =
    React.useState<BaseViewModel<DialogEntity>>();

  const currentContext = useQbInitializedDataContext();
  // const eventMessaging = useEventMessagesRepository();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const userName =
    currentContext.storage.REMOTE_DATA_SOURCE.authInformation?.userName;
  const userId =
    currentContext.storage.REMOTE_DATA_SOURCE.authInformation?.userId;

  const dialogsViewModel: DialogsViewModel =
    useDialogsViewModel(currentContext);

  // let defaultLeftPlaceHolderInputWidget = InputWidgetToLeftPlaceHolder; // useDefaultTextInputWidget();
  //
  // if (!defaultLeftPlaceHolderInputWidget) {
  //   defaultLeftPlaceHolderInputWidget = useDefaultTextInputWidget();
  // }
  // const defaultRightPlaceHolderInputWidget =
  //   InputWidgetToRightPlaceHolder || useDefaultVoiceInputWidget();
  // let defaultIncomingMessageWidget = IncomingMessageWidgetToRightPlaceHolder;
  //
  // if (!defaultIncomingMessageWidget) {
  //   const apiKey = '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'; // Замените на ваш реальный ключ API
  //
  //   const openAIConfiguration = new Configuration({
  //     apiKey,
  //   });
  //
  //   const openAIApi = new OpenAIApi(openAIConfiguration);
  //
  //   defaultIncomingMessageWidget = UseDefaultIncomingMessageWidget({
  //     openAIApi,
  //   });
  // }

  const selectDialogActions = (item: BaseViewModel<DialogEntity>): void => {
    if (!dialogsViewModel.loading) {
      setSelectedDialog(item);
    }
  };
  // const subscribeToDialogEventsUseCase: SubscribeToDialogEventsUseCase =
  //   new SubscribeToDialogEventsUseCase(eventMessaging, 'TestStage');

  // инициализация СДК и загрузка тестовых данных, запуск пинга - может не быть
  // todo: добавить метод в контекст
  const isAuthProcessed = (): boolean => {
    console.log('call isAuthProcessed');
    const result =
      currentContext.storage.REMOTE_DATA_SOURCE.needInit === false &&
      currentContext.storage.REMOTE_DATA_SOURCE.authProcessed &&
      currentContext.storage.CONNECTION_REPOSITORY.needInit === false;

    console.log(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `initialValue.REMOTE_DATA_SOURCE_MOCK.needInit: ${currentContext.storage.REMOTE_DATA_SOURCE.needInit}`,
    );
    console.log(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `initialValue.REMOTE_DATA_SOURCE_MOCK.authProcessed: ${currentContext.storage.REMOTE_DATA_SOURCE.authProcessed}`,
    );

    console.log(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `initialValue.CONNECTION_REPOSITORY.needInit: ${currentContext.storage.CONNECTION_REPOSITORY.needInit}`,
    );

    return result;
  };

  useEffect(() => {
    console.log('TestStage: GET DATA ');
    console.log(
      `auth data: ${JSON.stringify(
        currentContext.InitParams.loginData,
      )} at ${new Date().toLocaleTimeString()}`,
    );
    if (isAuthProcessed()) {
      console.log('auth is completed, CAN GET DATA');
      const pagination: Pagination = new Pagination();

      dialogsViewModel?.getDialogs(pagination);
    }

    return () => {
      console.log('TestStage: USE EFFECT release');
      dialogsViewModel.release();
    };
  }, []); // сейчас это выполняется один раз при старте, а нужно каждый раз при смене пользователя

  // const dialogsEventHandler = (dialogInfo: DialogEventInfo) => {
  //   console.log('call dialogsEventHandler in QuickBloxUIKitDesktopLayout');
  //   if (dialogInfo.eventMessageType === EventMessageType.SystemMessage) {
  //     switch (dialogInfo.notificationTypes) {
  //       case NotificationTypes.DELETE_LEAVE_DIALOG: {
  //         if (
  //           dialogInfo.messageInfo &&
  //           dialogInfo.messageInfo.sender_id === userId
  //         ) {
  //           setSelectedDialog(undefined);
  //         }
  //
  //         break;
  //       }
  //       default: {
  //         const pagination: Pagination = new Pagination();
  //
  //         dialogsViewModel?.getDialogs(pagination);
  //         break;
  //       }
  //     }
  //   }
  // };

  useEffect(() => {
    console.log('TestStage: GET DATA AFTER User data has CHANGED');
    console.log(
      `auth is ${JSON.stringify(
        currentContext.InitParams.loginData,
      )} at ${new Date().toLocaleTimeString()}`,
    );

    if (isAuthProcessed()) {
      console.log('auth is completed, FETCH DATA');
      const pagination: Pagination = new Pagination();

      dialogsViewModel?.getDialogs(pagination);
      //
      // console.log('auth is completed, subscribe');
      //
      // subscribeToDialogEventsUseCase
      //   .execute(dialogsEventHandler)
      //   .catch((reason) => {
      //     console.log(stringifyError(reason));
      //   });
      // //
      // console.log('subscribe is completed, go');
    }
  }, [currentContext.InitParams]);

  useEffect(() => {
    console.log(
      `TestStage: selectedDialog: ${
        selectedDialog?.entity?.name || 'Dialog Name is empty'
      }`,
    );
    if (selectedDialog && selectedDialog.entity) {
      dialogsViewModel.entity = selectedDialog.entity;
    }
  }, [selectedDialog]);

  useEffect(() => {
    console.log(
      `Clear selected dialog: ${
        selectedDialog?.entity?.name || 'Dialog Name is empty'
      }`,
    );
    if (!dialogsViewModel.entity) {
      setSelectedDialog(undefined);
    }
  }, [dialogsViewModel.entity]);

  const [needDialogInformation, setNeedDialogInformation] = useState(true);
  const informationCloseHandler = (): void => {
    setNeedDialogInformation(false);
  };
  const informationOpenHandler = (): void => {
    setNeedDialogInformation(true);
  };

  return (
    <DesktopLayout
      theme={theme}
      dialogsView={
        <DialogsComponent
          // subHeaderContent={<CompanyLogo />}
          // upHeaderContent={<CompanyLogo />}
          dialogsViewModel={dialogsViewModel} // 1 Get 2 Update UseCase
          onDialogSelectHandler={selectDialogActions}
          additionalSettings={{
            withoutHeader: false,
            themeHeader: theme,
            themePreview: theme,
            useSubHeader: false,
            useUpHeader: false,
          }}
        />
      }
      dialogMessagesView={
        selectedDialog && selectedDialog.entity && dialogsViewModel.entity ? (
          <MessagesView
            // subHeaderContent={<CompanyLogo />}
            // upHeaderContent={<CompanyLogo />}
            dialogsViewModel={dialogsViewModel}
            onDialogInformationHandler={informationOpenHandler}
            maxWidthToResize={
              selectedDialog && needDialogInformation ? undefined : '1040px'
            }
            // InputWidgetToLeftPlaceHolder={defaultLeftPlaceHolderInputWidget}
            // InputWidgetToRightPlaceHolder={defaultRightPlaceHolderInputWidget}
            // IncomingMessageWidgetToRightPlaceHolder={
            //   defaultIncomingMessageWidget
            // }
            theme={theme}
          /> // 1 Get Messages + 1 Get User by Id
        ) : (
          <div
            style={{
              minHeight: '799px',
              minWidth: '1040px',
              border: '1px solid var(--divider)',
              margin: '0 auto',
            }}
          >
            You login as {userName}({userId}). Select chat to start
            conversation.
          </div>
        )
      }
      dialogInfoView={
        // 1 Get User by 1 + Get user by name
        <div>
          {selectedDialog && needDialogInformation && (
            <DialogInformation
              // subHeaderContent={<CompanyLogo />}
              // upHeaderContent={<CompanyLogo />}
              dialog={selectedDialog.entity}
              dialogViewModel={dialogsViewModel}
              onCloseDialogInformationHandler={informationCloseHandler}
            />
          )}
        </div>
      }
    />
  );
};

export default QuickBloxUIKitDesktopLayout;
