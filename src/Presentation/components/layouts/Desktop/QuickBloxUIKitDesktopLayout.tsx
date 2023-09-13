import React, { useEffect, useState } from 'react';
import useQbInitializedDataContext from '../../providers/QuickBloxUIKitProvider/useQbInitializedDataContext';
import { DialogEntity } from '../../../../Domain/entity/DialogEntity';
import { DialogsViewModel } from '../../../Views/Dialogs/DialogViewModel';
import DialogsComponent from '../../../Views/Dialogs/Dialogs';
import DialogInformation from '../../UI/Dialogs/DialogInformation/DialogInformation';
import DesktopLayout from './DesktopLayout';
import MessagesView from '../../UI/Dialogs/MessagesView/MessagesView';
import useDialogsViewModel from '../../../Views/Dialogs/useDialogsViewModel';
import { Pagination } from '../../../../Domain/repository/Pagination';
import UiKitTheme from '../../../assets/UiKitTheme';
import BaseViewModel from '../../../Views/Base/BaseViewModel';
import { AIMessageWidget } from '../../UI/Dialogs/MessagesView/AIWidgets/AIMessageWidget';
import UseDefaultAIAssistAnswerWidget from '../../UI/Dialogs/MessagesView/AIWidgets/UseDefaultAIAssistAnswerWidget';
import UseDefaultAITranslateWidget from '../../UI/Dialogs/MessagesView/AIWidgets/UseDefaultAITranslateWidget';
import UseDefaultAIRephraseMessageWidget from '../../UI/Dialogs/MessagesView/AIWidgets/UseDefaultAIRephraseMessageWidget';
import { DefaultConfigurations } from '../../../../Data/DefaultConfigurations';
import UseDefaultAIAssistAnswerWidgetWithProxy from '../../UI/Dialogs/MessagesView/AIWidgets/UseDefaultAIAssistAnswerWidgetWithProxy';
import UseDefaultAITranslateWidgetWithProxy from '../../UI/Dialogs/MessagesView/AIWidgets/UseDefaultAITranslateWidgetWithProxy';
import UseDefaultAIRephraseMessageWidgetWithProxy from '../../UI/Dialogs/MessagesView/AIWidgets/UseDefaultAIRephraseMessageWidgetWithProxy';

type AIWidgetPlaceHolder = {
  enabled: boolean;
  default: boolean;
  AIWidget?: AIMessageWidget;
};

type QuickBloxUIKitDesktopLayoutProps = {
  theme?: UiKitTheme;
  AIRephrase?: AIWidgetPlaceHolder;
  AITranslate?: AIWidgetPlaceHolder;
  AIAssist?: AIWidgetPlaceHolder;
};

const QuickBloxUIKitDesktopLayout: React.FC<
  QuickBloxUIKitDesktopLayoutProps
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,react/function-component-definition
> = ({
  theme = undefined,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  AITranslate = undefined,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  AIRephrase = undefined,
  AIAssist = undefined,
}: QuickBloxUIKitDesktopLayoutProps) => {
  console.log('create QuickBloxUIKitDesktopLayout');
  const [selectedDialog, setSelectedDialog] =
    React.useState<BaseViewModel<DialogEntity>>();

  const currentContext = useQbInitializedDataContext();
  const QBConfig =
    currentContext.InitParams.qbConfig ||
    DefaultConfigurations.getDefaultQBConfig();
  // const eventMessaging = useEventMessagesRepository();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const userName =
    currentContext.storage.REMOTE_DATA_SOURCE.authInformation?.userName;
  const userId =
    currentContext.storage.REMOTE_DATA_SOURCE.authInformation?.userId;
  const sessionToken =
    currentContext.storage.REMOTE_DATA_SOURCE.authInformation?.sessionToken;

  const dialogsViewModel: DialogsViewModel =
    useDialogsViewModel(currentContext);

  let defaultAIEditMessageWidget = AIRephrase?.AIWidget; // useDefaultTextInputWidget();
  let defaultAITranslateWidget = AITranslate?.AIWidget;
  let defaultAIAnswerToMessageWidget = AIAssist?.AIWidget;

  const getAIAssistAnswer = (): void => {
    if (AIAssist?.enabled && !AIAssist?.default) {
      defaultAIAnswerToMessageWidget = AIAssist.AIWidget;
    } else if (
      AIAssist?.enabled ||
      QBConfig.configAIApi.AIAnswerAssistWidgetConfig.useDefault
    ) {
      if (
        !QBConfig.configAIApi.AIAnswerAssistWidgetConfig.useDefault ||
        (AIAssist && !AIAssist?.default)
      ) {
        defaultAIAnswerToMessageWidget = undefined;
      } else {
        const { apiKey } = QBConfig.configAIApi.AIAnswerAssistWidgetConfig;
        let token = '';
        const proxyConfig: ProxyConfig =
          QBConfig.configAIApi.AIAnswerAssistWidgetConfig.proxyConfig ||
          DefaultConfigurations.getDefaultProxyConfig();

        if (apiKey) {
          token = apiKey;
          defaultAIAnswerToMessageWidget = UseDefaultAIAssistAnswerWidget({
            ...proxyConfig,
            apiKeyOrSessionToken: token,
          });
        } else {
          token =
            QBConfig.configAIApi.AIAnswerAssistWidgetConfig.proxyConfig
              .sessionToken ||
            sessionToken ||
            '';
          defaultAIAnswerToMessageWidget =
            UseDefaultAIAssistAnswerWidgetWithProxy({
              ...proxyConfig,
              apiKeyOrSessionToken: token,
            });
        }
      }
    }
  };
  const getAITranslate = (): void => {
    if (AITranslate?.enabled && !AITranslate?.default) {
      defaultAITranslateWidget = AITranslate.AIWidget;
    } else if (
      AITranslate?.enabled ||
      QBConfig.configAIApi.AITranslateWidgetConfig.useDefault
    ) {
      if (
        !QBConfig.configAIApi.AITranslateWidgetConfig.useDefault ||
        (AITranslate && !AITranslate?.default)
      ) {
        defaultAITranslateWidget = undefined;
      } else {
        const { apiKey } = QBConfig.configAIApi.AITranslateWidgetConfig;
        let token = '';
        const proxyConfig: ProxyConfig =
          QBConfig.configAIApi.AITranslateWidgetConfig.proxyConfig ||
          DefaultConfigurations.getDefaultProxyConfig();

        if (apiKey) {
          token = apiKey;
          defaultAITranslateWidget = UseDefaultAITranslateWidget({
            ...proxyConfig,
            apiKeyOrSessionToken: token,
          });
        } else {
          token =
            QBConfig.configAIApi.AITranslateWidgetConfig.proxyConfig
              .sessionToken ||
            sessionToken ||
            '';
          defaultAITranslateWidget = UseDefaultAITranslateWidgetWithProxy({
            ...proxyConfig,
            apiKeyOrSessionToken: token,
          });
        }
      }
    }
  };
  const getAIRephrase = (): void => {
    if (AIRephrase?.enabled && !AIRephrase?.default) {
      defaultAIEditMessageWidget = AIRephrase.AIWidget;
    } else if (
      AIRephrase?.enabled ||
      QBConfig.configAIApi.AIRephraseWidgetConfig.useDefault
    ) {
      if (
        !QBConfig.configAIApi.AIRephraseWidgetConfig.useDefault ||
        (AIRephrase && !AIRephrase?.default)
      ) {
        defaultAIEditMessageWidget = undefined;
      } else {
        const { apiKey } = QBConfig.configAIApi.AIRephraseWidgetConfig;
        let token = '';
        const proxyConfig: ProxyConfig =
          QBConfig.configAIApi.AIRephraseWidgetConfig.proxyConfig ||
          DefaultConfigurations.getDefaultProxyConfig();

        if (apiKey) {
          token = apiKey;
          defaultAIEditMessageWidget = UseDefaultAIRephraseMessageWidget({
            ...proxyConfig,
            apiKeyOrSessionToken: token,
          });
        } else {
          token =
            QBConfig.configAIApi.AIRephraseWidgetConfig.proxyConfig
              .sessionToken ||
            sessionToken ||
            '';
          defaultAIEditMessageWidget =
            UseDefaultAIRephraseMessageWidgetWithProxy({
              ...proxyConfig,
              apiKeyOrSessionToken: token,
            });
        }
      }
    }
  };

  getAITranslate();
  getAIRephrase();
  getAIAssistAnswer();

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
            AIRephrase={defaultAIEditMessageWidget}
            AITranslate={defaultAITranslateWidget}
            AIAssist={defaultAIAnswerToMessageWidget}
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
