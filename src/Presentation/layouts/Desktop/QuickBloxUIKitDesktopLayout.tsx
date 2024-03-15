import React, { useEffect, useRef, useState } from 'react';
import '../../Views/Dialog/Dialog.scss';
import '../../Views/Dialog/DialogHeader/DialogInfoIcon/DialogInfoIcon.scss';
import { Tone } from 'qb-ai-rephrase/src/Tone';
import { toast } from 'react-toastify';
import useQbInitializedDataContext from '../../providers/QuickBloxUIKitProvider/useQbInitializedDataContext';
import { DialogEntity } from '../../../Domain/entity/DialogEntity';
import { DialogListViewModel } from '../../Views/DialogList/DialogListViewModel';
import DialogList from '../../Views/DialogList/DialogList';
import DialogInfo from '../../Views/DialogInfo/DialogInfo';
import DesktopLayout from './DesktopLayout';
import Dialog from '../../Views/Dialog/Dialog';
import useDialogListViewModel from '../../Views/DialogList/useDialogListViewModel';
import { Pagination } from '../../../Domain/repository/Pagination';
import UiKitTheme from '../../themes/UiKitTheme';
import BaseViewModel, {
  ForwardMessagesParams,
  ReplyMessagesParams,
} from '../../../CommonTypes/BaseViewModel';
import { AIMessageWidget } from '../../Views/Dialog/AIWidgets/AIMessageWidget';
import UseDefaultAIAssistAnswerWidget from '../../Views/Dialog/AIWidgets/UseDefaultAIAssistAnswerWidget';
import UseDefaultAITranslateWidget from '../../Views/Dialog/AIWidgets/UseDefaultAITranslateWidget';
import UseDefaultAIRephraseMessageWidget from '../../Views/Dialog/AIWidgets/UseDefaultAIRephraseMessageWidget';
import { DefaultConfigurations } from '../../../Data/DefaultConfigurations';
import UseDefaultAIAssistAnswerWidgetWithProxy from '../../Views/Dialog/AIWidgets/UseDefaultAIAssistAnswerWidgetWithProxy';
import UseDefaultAITranslateWidgetWithProxy from '../../Views/Dialog/AIWidgets/UseDefaultAITranslateWidgetWithProxy';
import UseDefaultAIRephraseMessageWidgetWithProxy from '../../Views/Dialog/AIWidgets/UseDefaultAIRephraseMessageWidgetWithProxy';
import { DialogType } from '../../../Domain/entity/DialogTypes';
import { GroupDialogEntity } from '../../../Domain/entity/GroupDialogEntity';
import { PrivateDialogEntity } from '../../../Domain/entity/PrivateDialogEntity';
import { PublicDialogEntity } from '../../../Domain/entity/PublicDialogEntity';
import { DialogViewModel } from '../../Views/Dialog/DialogViewModel';
import useDialogViewModel from '../../Views/Dialog/useDialogViewModel';
import { MessageEntity } from '../../../Domain/entity/MessageEntity';
import { stringifyError } from '../../../utils/parse';
import ReplyMessagePreview from '../../ui-components/MessageInput/ReplyMessagePreview/ReplyMessagePreview';
import ForwardMessageFlow from '../../Views/Dialog/ForwardMessageFlow/ForwardMessageFlow';
import SectionList from '../../components/containers/SectionList';
import { SectionItem } from '../../components/containers/SectionList/useComponent';
import { useMobileLayout } from '../../components/containers/SectionList/hooks';
import { MessageDTOMapper } from '../../../Data/source/remote/Mapper/MessageDTOMapper';
import MembersList from '../../Views/DialogInfo/MembersList/MembersList';
import useUsersListViewModel from '../../Views/DialogInfo/UsersList/useUsersListViewModel';
import { GetUserNameFct } from '../../Views/Dialog/Message/IncomingMessage/IncomingMessage';
import { UserEntity } from '../../../Domain/entity/UserEntity';
import Header from '../../ui-components/Header/Header';
import Avatar from '../../ui-components/Avatar/Avatar';
import {
  GroupChatSvg,
  InformationSvg,
  PublicChannelSvg,
  UserSvg,
} from '../../icons';
import Button from '../../ui-components/Button/Button';
import DialogWindow from '../../ui-components/DialogWindow/DialogWindow';
import MessageInput from '../../ui-components/MessageInput/MessageInput';
import AIRephraseWidget from '../../Views/Dialog/AIWidgets/AIRephraseWidget/AIRephraseWidget';
import MessageItem from '../../Views/Dialog/MessageItem/MessageItem';
import { MessageSeparator, Placeholder } from '../../ui-components';
import ToastProvider from '../../ui-components/Toast/ToastProvider';
import CreateNewDialogFlow from '../../Views/Flow/CreateDialogFlow/CreateNewDialogFlow';
import useModal from '../../../hooks/useModal';

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
  uikitHeightOffset?: string;
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  uikitHeightOffset = '0px',
}: QuickBloxUIKitDesktopLayoutProps) => {
  console.log('create QuickBloxUIKitDesktopLayout');
  const [forwardMessage, setForwardMessage] = useState<null | MessageEntity>();
  const forwardMessageModal = useModal();
  const [selectedDialog, setSelectedDialog] = React.useState<DialogEntity>();

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
  // const currentUserName =
  //  currentContext.storage.REMOTE_DATA_SOURCE.authInformation?.userName;
  const sessionToken =
    currentContext.storage.REMOTE_DATA_SOURCE.authInformation?.sessionToken;

  const dialogsViewModel: DialogListViewModel =
    useDialogListViewModel(currentContext);

  let defaultAIRephraseWidget = AIRephrase?.AIWidget; // useDefaultTextInputWidget();
  let defaultAITranslateWidget = AITranslate?.AIWidget;
  let defaultAIAssistWidget = AIAssist?.AIWidget;

  const getAIAssistAnswer = (): void => {
    if (AIAssist?.enabled && !AIAssist?.default) {
      defaultAIAssistWidget = AIAssist.AIWidget;
    } else if (
      AIAssist?.enabled ||
      QBConfig.configAIApi.AIAnswerAssistWidgetConfig.useDefault
    ) {
      if (
        !QBConfig.configAIApi.AIAnswerAssistWidgetConfig.useDefault ||
        (AIAssist && !AIAssist?.default)
      ) {
        defaultAIAssistWidget = undefined;
      } else {
        const { apiKey } = QBConfig.configAIApi.AIAnswerAssistWidgetConfig;
        let token = '';
        const proxyConfig: ProxyConfig =
          QBConfig.configAIApi.AIAnswerAssistWidgetConfig.proxyConfig ||
          DefaultConfigurations.getDefaultProxyConfig();

        if (apiKey) {
          token = apiKey;
          defaultAIAssistWidget = UseDefaultAIAssistAnswerWidget({
            ...proxyConfig,
            apiKeyOrSessionToken: token,
          });
        } else {
          token = sessionToken || '';
          defaultAIAssistWidget = UseDefaultAIAssistAnswerWidgetWithProxy({
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
          token = sessionToken || '';
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
      defaultAIRephraseWidget = AIRephrase.AIWidget;
    } else if (
      AIRephrase?.enabled ||
      QBConfig.configAIApi.AIRephraseWidgetConfig.useDefault
    ) {
      if (
        !QBConfig.configAIApi.AIRephraseWidgetConfig.useDefault ||
        (AIRephrase && !AIRephrase?.default)
      ) {
        defaultAIRephraseWidget = undefined;
      } else {
        const { apiKey } = QBConfig.configAIApi.AIRephraseWidgetConfig;
        let token = '';
        const proxyConfig: ProxyConfig =
          QBConfig.configAIApi.AIRephraseWidgetConfig.proxyConfig ||
          DefaultConfigurations.getDefaultProxyConfig();

        if (apiKey) {
          token = apiKey;
          defaultAIRephraseWidget = UseDefaultAIRephraseMessageWidget({
            ...proxyConfig,
            apiKeyOrSessionToken: token,
          });
        } else {
          token = sessionToken || '';
          defaultAIRephraseWidget = UseDefaultAIRephraseMessageWidgetWithProxy({
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

  const { enableForwarding } = QBConfig.appConfig;
  const { enableReplying } = QBConfig.appConfig;

  const selectDialogActions = (item: BaseViewModel<DialogEntity>): void => {
    if (!dialogsViewModel.loading) {
      setSelectedDialog(item.entity);
    }
  };

  const [showReplyMessage, setShowReplyMessage] = useState(false);
  const [messagesToReply, setMessagesToReply] = useState<MessageEntity[]>([]);
  const [isMobile, width, height, breakpoint] = useMobileLayout();
  const [clientHeight, setClientHeight] = useState<number>(0);

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
    const codeVersion = '0.3.0';

    console.log(`React UIKit CODE VERSION IS ${codeVersion}`);
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
  }, []);

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
    }
  }, [currentContext.InitParams]);

  // const getCountDialogMembers = (dialogEntity: DialogEntity): number => {
  //   let participants = [];
  //
  //   if (dialogEntity.type === DialogType.group) {
  //     participants = (dialogEntity as GroupDialogEntity).participantIds;
  //   } else if (dialogEntity.type === DialogType.private) {
  //     participants = [(dialogEntity as PrivateDialogEntity).participantId];
  //   } else if (dialogEntity.type === DialogType.public) {
  //     participants = [];
  //   }
  //
  //   return participants.length;
  // };
  const userViewModel = useUsersListViewModel(selectedDialog);
  const [dialogAvatarUrl, setDialogAvatarUrl] = React.useState('');
  const getUserAvatarByUid = async () => {
    let result = '';
    const participants: Array<number> =
      dialogsViewModel?.entity &&
      dialogsViewModel?.entity.type === DialogType.private
        ? [
            (dialogsViewModel?.entity as unknown as PrivateDialogEntity)
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
    getDialogPhotoFileForPreview();

    return () => {
      if (dialogAvatarUrl) {
        URL.revokeObjectURL(dialogAvatarUrl);
      }
    };
  }, [dialogsViewModel.entity]);
  // eslint-disable-next-line consistent-return
  const renderIconForTypeDialog = (dialogEntity: DialogEntity) => {
    if (dialogEntity.type === DialogType.group) {
      const groupDialogEntity = dialogEntity as GroupDialogEntity;

      return (
        <Avatar
          src={groupDialogEntity.photo || ''}
          icon={<GroupChatSvg />}
          size="md"
        />
      );
    }
    if (dialogEntity.type === DialogType.private) {
      return <Avatar src={dialogAvatarUrl} icon={<UserSvg />} size="md" />;
    }
    if (dialogEntity.type === DialogType.public) {
      const publicDialogEntity = dialogEntity as PublicDialogEntity;

      return (
        <Avatar
          src={publicDialogEntity.photo}
          icon={<PublicChannelSvg />}
          size="md"
        />
      );
    }
  };

  useEffect(() => {
    console.log(
      `Clear selected dialog: ${
        selectedDialog?.name || 'Dialog Name is empty'
      }`,
    );
    if (!dialogsViewModel.entity) {
      setSelectedDialog(undefined);
    }
  }, [dialogsViewModel.entity]);

  const [needDialogInformation, setNeedDialogInformation] = useState(false);
  const informationCloseHandler = (): void => {
    setNeedDialogInformation(false);
  };
  const informationOpenHandler = (): void => {
    setNeedDialogInformation(true);
  };
  //
  const maxTokensForAIRephrase =
    currentContext.InitParams.qbConfig.configAIApi.AIRephraseWidgetConfig
      .maxTokens;

  const rephraseTones: Tone[] =
    currentContext.InitParams.qbConfig.configAIApi.AIRephraseWidgetConfig.Tones;

  const { maxFileSize } = currentContext.InitParams;
  //
  const [waitAIWidget, setWaitAIWidget] = useState<boolean>(false);
  const [messageText, setMessageText] = useState<string>('');

  // must re-create as result dialog changing
  const messagesViewModel: DialogViewModel = useDialogViewModel(
    dialogsViewModel.entity?.type,
    dialogsViewModel.entity,
  );

  const [warningErrorText, setWarningErrorText] = useState<string>('');
  // const [showErrorToast, setShowErrorToast] = useState<boolean>(false);
  // const [messageErrorToast, setMessageErrorToast] = useState<string>('');

  const [dialogMessagesCount, setDialogMessageCount] = useState(100);
  const [hasMore, setHasMore] = React.useState(true);
  const [scrollUpToDown, setScrollUpToDown] = React.useState(false);
  const [messagesToView, setMessagesToView] = React.useState<MessageEntity[]>(
    [],
  );

  const [useAudioWidget, setUseAudioWidget] = useState<boolean>(false);

  const [fileToSend, setFileToSend] = useState<File | null>(null);

  const [isRecording, setIsRecording] = useState(false);
  //
  const [permission, setPermission] = useState(false);

  // const [recordingStatus, setRecordingStatus] = useState('inactive');

  const [stream, setStream] = useState<MediaStream>();
  // const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>();
  const mediaRecorder = useRef<MediaRecorder>();
  const [resultAudioBlob, setResultAudioBlob] = useState<Blob>();

  const [audioChunks, setAudioChunks] = useState<Array<Blob>>([]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const mimeType = 'audio/webm;codecs=opus'; // audio/ogg audio/mpeg audio/webm audio/x-wav audio/mp4
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const showErrorMessage = (errorMessage: string) => {
    setWarningErrorText(errorMessage);
    setTimeout(() => {
      setWarningErrorText('');
    }, 3000);
  };

  const closeReplyMessageFlowHandler = () => {
    setMessagesToReply([]);
    setShowReplyMessage(false);
  };

  const repliedActions = (replyData: ReplyMessagesParams): void => {
    // eslint-disable-next-line promise/catch-or-return
    messagesViewModel
      .sendReplyMessages(replyData)
      .then((opResult: boolean) => {
        // eslint-disable-next-line promise/always-return
        if (opResult) {
          toast('Message have been replied');
        } else {
          toast('Message have not been replied');
        }
      })
      .catch((reason) => {
        const errorMessage = stringifyError(reason);

        toast(errorMessage);
      })
      .finally(() => {
        setMessageText('');
        closeReplyMessageFlowHandler();
      });
  };

  useEffect(() => {
    const MAXSIZE = maxFileSize || 90 * 1000000;
    const MAXSIZE_FOR_MESSAGE = MAXSIZE / (1024 * 1024);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const flag = fileToSend?.size && fileToSend?.size < MAXSIZE;

    if (fileToSend?.size && fileToSend?.size < MAXSIZE) {
      if (showReplyMessage && messagesToReply?.length > 0) {
        const replyData: ReplyMessagesParams = {
          messagesToReply,
          relatedFileMessage: fileToSend,
          relatedTextMessage:
            messageText || MessageDTOMapper.REPLY_MESSAGE_PREFIX,
        };

        repliedActions(replyData);
      } else {
        // eslint-disable-next-line promise/catch-or-return
        messagesViewModel
          .sendAttachmentMessage(fileToSend)
          .then((resultOperation) => {
            // eslint-disable-next-line promise/always-return
            if (!resultOperation) {
              toast(`Incorrect data`);
            }
          });
      }
    } else if (fileToSend) {
      toast(
        `file size ${fileToSend?.size} must be less then ${MAXSIZE_FOR_MESSAGE} mb.`,
      );
    }
  }, [fileToSend]);

  //  const [isVoiceMessage, setVoiceMessage] = useState(true);
  const getMicrophonePermission = async () => {
    if (window) {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });

        setPermission(true);
        setStream(mediaStream);
      } catch (err) {
        showErrorMessage(
          `The MediaRecorder API throws exception ${stringifyError(err)} .`,
        );
      }
    } else {
      showErrorMessage(
        'The MediaRecorder API is not supported in your browser.',
      );
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/require-await
  const startRecording = async () => {
    if (!stream) return;
    const mimeTypes = [
      'audio/aac',
      'audio/mp4',
      'audio/mpeg',
      'audio/ogg',
      'audio/wav',
      'audio/webm',
      'audio/3gpp',
      'audio/flac',
      'audio/x-aiff',
      'audio/x-m4a',
    ];

    console.log('MIME TYPES: ');
    mimeTypes.forEach((mType) => {
      if (MediaRecorder.isTypeSupported(mimeType)) {
        console.log(`${mType} is supported`);
      } else {
        console.log(`${mType} is not supported`);
      }
    });
    // audio/mp4;codecs=mp4a audio/webm;codecs=opus audio/webm;codecs=vp9,opus
    const mimeContent = window.MediaRecorder.isTypeSupported('audio/mp4')
      ? 'audio/mp4;codecs=mp4a'
      : 'audio/webm;codecs=opus';

    const media = new MediaRecorder(stream, { mimeType: mimeContent });

    mediaRecorder.current = media;
    mediaRecorder.current.start();

    const localAudioChunks: any[] = [];

    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === 'undefined') return;
      if (event.data.size === 0) return;
      localAudioChunks.push(event.data);
    };

    setAudioChunks(localAudioChunks);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const stopRecording = () => {
    if (!mediaRecorder.current) return;
    mediaRecorder.current.stop();

    mediaRecorder.current.onstop = () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const mimeContent = window.MediaRecorder.isTypeSupported(
        'audio/mp4;codecs=mp4a',
      )
        ? 'audio/mp4;codecs=mp4a'
        : 'audio/webm;codecs=opus';
      // const audioBlob = new Blob(audioChunks, { type: mimeContent }); // mimeType
      // const mp4Blob = new Blob(recordedChunks, { type: 'video/mp4' });

      // const audioBlob = new Blob(audioChunks, { type: 'video/mp4' }); // mimeType
      // const audioBlob = new Blob(audioChunks, { type: 'audio/mp4' }); // mimeType
      const audioBlob = new Blob(audioChunks, { type: 'audio/mp4' });

      setResultAudioBlob(audioBlob);

      setAudioChunks([]);
      //
      stream?.getAudioTracks().forEach((track) => {
        track.stop();
      });
      setPermission(false);
      //
    };
  };

  const blobToFile = (theBlob: Blob, fileName: string): File => {
    const b: any = theBlob;

    // A Blob() is almost a File() - it's just missing the two properties below which we will add
    b.lastModifiedDate = new Date();
    b.name = fileName;

    // Cast to a File() type
    const resultFile = theBlob as unknown as File;

    return resultFile;
  };

  useEffect(() => {
    const fileExt = 'mp4';

    if (resultAudioBlob) {
      const voiceMessage = blobToFile(
        resultAudioBlob,
        `${userName || ''}_voice_message.${fileExt}`,
      );

      setFileToSend(voiceMessage);
      if (useAudioWidget) {
        setUseAudioWidget(false);
      }
      //
    }
  }, [resultAudioBlob]);

  useEffect(() => {
    // setFileToSend(null);
    if (isRecording) {
      if (!permission) {
        // eslint-disable-next-line promise/catch-or-return,promise/always-return
        getMicrophonePermission().catch(() => {
          showErrorMessage(`Have no audio.`);
        });
      } else {
        // eslint-disable-next-line promise/catch-or-return,promise/always-return
        startRecording().then(() => {
          setWarningErrorText(`Your voice is recording during for 1 minutes`);
        });
      }
    } else {
      if (permission && mediaRecorder.current) {
        stopRecording();
      }
      setWarningErrorText('');
    }
  }, [isRecording]);

  useEffect(() => {
    if (isRecording && permission) {
      // eslint-disable-next-line promise/always-return,promise/catch-or-return
      startRecording().then(() => {
        setWarningErrorText(`Your voice is recording during for 1 minutes`);
      });
    }
  }, [permission]);

  useEffect(() => {
    setWaitAIWidget(false);
    if (
      defaultAIRephraseWidget?.textToContent &&
      defaultAIRephraseWidget?.textToContent.length > 0
    ) {
      setMessageText(defaultAIRephraseWidget?.textToContent);
    }
  }, [defaultAIRephraseWidget?.textToContent]);

  useEffect(() => {
    setWaitAIWidget(false);
  }, [defaultAITranslateWidget?.textToContent]);

  useEffect(() => {
    setWaitAIWidget(false);
    if (
      defaultAIAssistWidget?.textToContent &&
      defaultAIAssistWidget?.textToContent.length > 0
    ) {
      setMessageText(defaultAIAssistWidget?.textToContent);
    }
  }, [defaultAIAssistWidget?.textToContent]);

  //

  function sendTextMessageActions(textToSend: string) {
    // closeReplyMessageFlowHandler
    if (messagesViewModel?.loading) return;
    // setVoiceMessage(true);
    if (textToSend.length > 0 && textToSend.length <= 1000) {
      setMessageText('');
      if (showReplyMessage && messagesToReply?.length > 0) {
        const replyData: ReplyMessagesParams = {
          messagesToReply,
          relatedTextMessage: textToSend,
        };

        repliedActions(replyData);
      } else {
        messagesViewModel.sendTextMessage(textToSend);
        setMessageText('');
      }
      setMessageText('');
    } else {
      setWarningErrorText(
        'length of text message must be less then 1000 chars.',
      );
      setTimeout(() => {
        setWarningErrorText('');
      }, 3000);
    }
  }
  //
  useEffect(() => {
    messagesViewModel.entity = dialogsViewModel.entity;
    setMessagesToView([]);
    setMessageText('');
  }, [dialogsViewModel.entity]);

  useEffect(() => {
    if (messagesViewModel.entity) {
      messagesViewModel.getMessages(new Pagination());
    }
  }, [messagesViewModel.entity]);
  //
  useEffect(() => {
    if (!isMobile && messagesViewModel.entity) {
      dialogsViewModel.setWaitLoadingStatus(messagesViewModel?.loading);
      const timeoutId = setTimeout(() => {
        dialogsViewModel.setWaitLoadingStatus(false); // wait only for 3 sec
      }, 3000);

      return () => clearTimeout(timeoutId);
    }

    return () => {
      // Placeholder: Cleanup handler is not required
    };
  }, [messagesViewModel?.loading]);
  //
  function prepareFirstPage(initData: MessageEntity[]) {
    const firstPageSize = messagesViewModel.messages.length;

    for (let i = firstPageSize - 1; i >= 0; i -= 1) {
      initData.push(messagesViewModel.messages[i]);
    }
  }

  const ChangeFileHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    const file = event.currentTarget.files
      ? event.currentTarget.files[0]
      : null;

    reader.onloadend = () => {
      setFileToSend(file);
    };

    if (file !== null) reader.readAsDataURL(file);
  };

  const fetchMoreData = () => {
    if (messagesToView.length >= dialogMessagesCount) {
      setHasMore(false);

      return;
    }
    if (
      hasMore &&
      messagesToView.length > 0 &&
      messagesToView.length < dialogMessagesCount
    ) {
      setMessagesToView((prevState) => {
        const newState = [...prevState];

        const newMessageEntity: MessageEntity =
          messagesViewModel.messages[prevState.length];

        newState.push(newMessageEntity);
        // newState.unshift(newMessageEntity);

        return newState;
      });
    }
  };

  //
  useEffect(() => {
    setDialogMessageCount(messagesViewModel?.messages?.length || 0);
    if (messagesToView?.length === 0 && messagesViewModel.messages.length > 0) {
      const initData: MessageEntity[] = [];

      console.log(JSON.stringify(messagesViewModel.messages));
      prepareFirstPage(initData);
      setMessagesToView(initData);
    } else if (messagesViewModel.messages.length - messagesToView.length >= 1) {
      setHasMore(true);
      setScrollUpToDown(true);
    }
  }, [messagesViewModel.messages]);
  //
  useEffect(() => {
    if (messagesViewModel.messages.length - messagesToView.length >= 1) {
      fetchMoreData();
    }
  }, [dialogMessagesCount]);
  //
  //
  const maxWidthToResizing =
    selectedDialog && needDialogInformation
      ? '$message-view-container-wrapper-min-width'
      : '1040px';

  const handleOnReply = (message: MessageEntity): void => {
    setMessagesToReply([message]);
    setShowReplyMessage(true);
  };

  const handleSendData = (
    dialogsForForward: DialogEntity[],
    messagesForForward: MessageEntity[],
    relatedText: string,
  ) => {
    const forwardingData: ForwardMessagesParams = {
      messagesToForward: messagesForForward,
      targetDialogs: dialogsForForward,
      relatedTextMessage:
        relatedText || MessageDTOMapper.FORWARD_MESSAGE_PREFIX,
    };

    messagesViewModel
      .sendForwardedMessages(forwardingData)
      .then((opResult: boolean) => {
        if (opResult) {
          toast('Message have been forwarded');
        } else {
          toast('Message have not been forwarded');
        }
        forwardMessageModal.toggleModal();

        return null;
      })
      .catch((reason) => {
        const errorMessage = stringifyError(reason);

        forwardMessageModal.toggleModal();
        showErrorMessage(errorMessage);
      });
  };

  function getSectionData(messages2View: MessageEntity[]) {
    const groupMessages: { [date: string]: MessageEntity[] } = {};

    messages2View.forEach((message) => {
      const date = new Date(message.created_at);

      date.setUTCHours(0, 0, 0, 0);

      const dateString = date.toISOString();

      groupMessages[dateString] = [
        ...(groupMessages[dateString] || []),
        message,
      ];
    });
    Object.keys(groupMessages).forEach((date) => {
      groupMessages[date].sort((a, b) => a.date_sent - b.date_sent);
    });
    const sections: SectionItem<MessageEntity>[] = Object.keys(
      groupMessages,
    ).map((date) => ({
      title: date,
      data: { [date]: groupMessages[date] },
    }));

    return sections;
  }

  const [showDialogList, setShowDialogList] = useState<boolean>(true);
  const [showDialogMessages, setShowDialogMessages] = useState<boolean>(true);
  const [showDialogInformation, setShowDialogInformation] =
    useState<boolean>(false);
  //
  const [isAllMembersShow, setIsAllMembersShow] = React.useState(false);

  useEffect(() => {
    if (isMobile) {
      if (!selectedDialog) {
        setShowDialogList(true);
      } else {
        setShowDialogList(false);
      }
      const canShowMessages =
        selectedDialog && !(showDialogInformation && needDialogInformation);

      if (canShowMessages) {
        setShowDialogMessages(true);
      } else {
        setShowDialogMessages(false);
      }
      if (selectedDialog && showDialogInformation)
        setShowDialogInformation(true);
      else setShowDialogInformation(false);
    } else {
      setShowDialogList(true);
      setShowDialogMessages(true);
      setShowDialogInformation(true);
    }
    //
    const sizeChangingLogString = `SIZE INFO: height: ${height.toString()} clientHeight: ${clientHeight}  width: ${width.toString()} breakpont: ${breakpoint.toString()} isMobile:
       ${isMobile?.toString()} selectedDialog:
      ${selectedDialog ? 'true' : 'false'} showDialogMessages:
       ${showDialogMessages?.toString()} showDialogList:
       ${showDialogList?.toString()} showDialogInformation:
       ${showDialogInformation?.toString()}`;

    console.log(sizeChangingLogString);
  }, [isMobile]);

  useEffect(() => {
    if (selectedDialog && selectedDialog) {
      dialogsViewModel.entity = selectedDialog;
      userViewModel.entity = selectedDialog;

      if (isMobile) {
        setShowDialogList(false);
        setShowDialogMessages(true);
      }
    } else {
      setShowDialogList(true);
    }
  }, [selectedDialog]);

  useEffect(() => {
    if (userViewModel.entity) {
      userViewModel.getUsers();
    }
  }, [userViewModel.entity]);

  useEffect(() => {
    if (isMobile) {
      if (needDialogInformation) {
        setShowDialogMessages(false);
        setShowDialogInformation(true);
      } else {
        setShowDialogMessages(true);
        setShowDialogInformation(false);
      }
    }
  }, [needDialogInformation]);

  const handleHeightChange = (newHeight: number) => {
    console.log('The new height is:', newHeight);
    setClientHeight(newHeight);
  };
  const workHeight = isMobile
    ? `calc(${height.toString()}px - ${uikitHeightOffset} - 28px)`
    : `calc(100vh - ${uikitHeightOffset} - 28px)`;

  const [dialogToLeave, setDialogToLeave] = useState<DialogEntity>();
  const leaveDialogHandler = (dialog: DialogEntity) => {
    setDialogToLeave(dialog);
  };

  const [isOpen, setIsOpen] = useState(false);

  const handleDialogOnClick = () => {
    if (isOpen) {
      setDialogToLeave(undefined);
    }
    setIsOpen((state) => !state);
  };

  useEffect(() => {
    if (dialogToLeave) {
      handleDialogOnClick();
    }
  }, [dialogToLeave]);

  const handleLeaveDialog = () => {
    if (dialogToLeave) {
      dialogsViewModel
        .deleteDialog(dialogToLeave as GroupDialogEntity)
        .then((result) => {
          // eslint-disable-next-line promise/always-return
          if (!result) {
            toast('Dialog have not been left');
          }
          handleDialogOnClick();
        })
        .catch((e) => {
          console.log(e);
          toast("Can't leave dialog");
        });
    }
  };
  // eslint-disable-next-line react/prop-types,@typescript-eslint/no-unused-vars
  const defaultGetSenderName: GetUserNameFct = async (props: {
    userId?: number;
    sender?: UserEntity;
  }): Promise<string | undefined> => {
    let result = 'undefined user';

    // eslint-disable-next-line react/prop-types
    if (!props.sender) {
      // eslint-disable-next-line react/prop-types
      if (props.userId && props.userId > 0) {
        // eslint-disable-next-line react/prop-types,@typescript-eslint/no-unsafe-call
        const senderUser = await userViewModel.getUserById(props.userId);

        if (!senderUser) {
          return result;
        }
        result =
          senderUser.full_name ||
          senderUser.login ||
          senderUser.email ||
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          senderUser.id.toString();
      } else return result;
    } else {
      result =
        // eslint-disable-next-line react/prop-types
        props.sender.full_name ||
        // eslint-disable-next-line react/prop-types
        props.sender.login ||
        // eslint-disable-next-line react/prop-types
        props.sender.email ||
        // eslint-disable-next-line react/prop-types
        props.sender.id.toString();
    }

    return result;
  };
  const messagesContainerMobileHeight = showReplyMessage
    ? `calc(${clientHeight}px - 128px - 64px - 16px)`
    : `calc(${clientHeight}px - 128px - 16px)`;
  const messagesContainerHeight = showReplyMessage
    ? `calc(${clientHeight}px - 128px - 64px)`
    : `calc(${clientHeight}px - 128px - 1px)`;
  const clientContainerHeight = `${clientHeight - 5}px`;
  const headerHeight = 64;
  const dialogListScrollableHeight = clientHeight - headerHeight - 6;

  const newModal = useModal();

  return (
    <ToastProvider>
      <div>
        {/* <div style={{ height: '18px', border: '1px solid red' }}> */}
        {/*  h:{height},w:{width},ch:{clientHeight},wh:{workHeight} */}
        {/* </div> */}
        <DesktopLayout
          mainContainerStyles={{
            minHeight: workHeight,
            maxHeight: workHeight,
          }}
          onHeightChange={handleHeightChange}
          theme={theme}
          dialogsView={
            showDialogList ? (
              <DialogList
                scrollableHeight={dialogListScrollableHeight}
                // subHeaderContent={<CompanyLogo />}
                // upHeaderContent={<CompanyLogo />}
                dialogListViewModel={dialogsViewModel} // 1 Get 2 Update UseCase
                selectedDialog={dialogsViewModel.entity}
                onDialogSelected={selectDialogActions}
                onCreateDialog={() => newModal.toggleModal()}
                onLeaveDialog={leaveDialogHandler}
                additionalSettings={{
                  withoutHeader: false,
                  themeHeader: theme,
                  themePreview: theme,
                  useSubHeader: false,
                  useUpHeader: false,
                }}
              />
            ) : null
          }
          dialogMessagesView={
            showDialogMessages &&
            selectedDialog &&
            selectedDialog &&
            dialogsViewModel.entity ? (
              <Dialog
                rootStyles={{
                  minHeight: clientContainerHeight,
                  maxHeight: clientContainerHeight,
                }}
                messagesContainerStyles={
                  isMobile
                    ? {
                        minHeight: messagesContainerMobileHeight,
                        maxHeight: messagesContainerMobileHeight,
                      }
                    : {
                        minHeight: messagesContainerHeight,
                        maxHeight: messagesContainerHeight,
                      }
                }
                messagesViewModel={messagesViewModel}
                warningErrorText={warningErrorText}
                // subHeaderContent={<CompanyLogo />}
                // upHeaderContent={<CompanyLogo />}
                renderHeader={
                  <Header
                    title={dialogsViewModel.entity.name}
                    avatar={renderIconForTypeDialog(dialogsViewModel.entity)}
                    onGoBack={() => setSelectedDialog(undefined)}
                    className="dialog-header__line"
                  >
                    <div className="dialog-header-right">
                      <InformationSvg
                        className="dialog-header-right__icon"
                        onClick={informationOpenHandler}
                      />
                    </div>
                  </Header>
                }
                renderMessageList={
                  messagesViewModel &&
                  messagesViewModel.messages &&
                  messagesViewModel.messages.length > 0 &&
                  messagesToView &&
                  messagesToView.length > 0 && (
                    <SectionList
                      resetScroll={scrollUpToDown}
                      className="messages-container"
                      onEndReached={fetchMoreData}
                      onEndReachedThreshold={0.95}
                      refreshing={messagesViewModel?.loading}
                      renderSectionHeader={(section) => (
                        <div className="message-view-container--system-message-wrapper">
                          <div
                            style={
                              theme
                                ? { backgroundColor: theme.disabledElements() }
                                : {}
                            }
                            className="message-view-container--system-message-wrapper__date_container"
                          >
                            <MessageSeparator
                              text={section.title}
                              type="date"
                            />
                          </div>
                        </div>
                      )}
                      renderItem={([, groupMessages], listRef) =>
                        groupMessages.map((message) => (
                          <MessageItem
                            // defaultGetSenderName={defaultGetSenderName}
                            message={message}
                            userId={userId || -1}
                            enableForwarding={enableForwarding}
                            enableReplying={enableReplying}
                            onReply={(m: MessageEntity) => {
                              handleOnReply(m);
                            }}
                            onForward={(m: MessageEntity) => {
                              setForwardMessage(m);
                              forwardMessageModal.toggleModal();
                            }}
                            listRef={listRef}
                            AIAssistWidget={defaultAIAssistWidget}
                            AITranslateWidget={defaultAITranslateWidget}
                            languagesForAITranslate={DefaultConfigurations.getAdditionalLanguagesForAITranslate(
                              currentContext.InitParams.qbConfig.configAIApi
                                .AITranslateWidgetConfig,
                            )}
                            defaultTranslationLanguage={DefaultConfigurations.getDefaultLanguageForAITranslate(
                              currentContext.InitParams.qbConfig.configAIApi
                                .AITranslateWidgetConfig,
                            )}
                            onError={(messageError: string) => {
                              toast(messageError);
                            }}
                            messagesToView={messagesToView}
                            maxTokens={maxTokensForAIRephrase}
                          />
                        ))
                      }
                      sections={getSectionData(messagesToView)}
                    />
                  )
                }
                renderMessageInput={
                  <MessageInput
                    previewMessage={
                      showReplyMessage ? (
                        <ReplyMessagePreview
                          messages={[...messagesToReply]}
                          userNameSentMessage={
                            messagesToReply[0]?.sender?.full_name ||
                            messagesToReply[0]?.sender?.login ||
                            messagesToReply[0]?.sender?.email ||
                            messagesToReply[0]?.sender?.id.toString() ||
                            ''
                          }
                          onClose={closeReplyMessageFlowHandler}
                        />
                      ) : undefined
                    }
                    value={messageText}
                    placeholder="Type message"
                    loading={waitAIWidget || messagesViewModel?.loading}
                    onChange={(text: string) => {
                      setMessageText(text);
                    }}
                    onChanging={() => {
                      messagesViewModel.sendTypingTextMessage();
                    }}
                    onSend={(textToSend: string) => {
                      sendTextMessageActions(textToSend);
                    }}
                    onAttachment={ChangeFileHandler}
                    enableVoice={isRecording}
                    onVoice={() => {
                      if (messagesViewModel?.loading) return;
                      setIsRecording(!isRecording);
                    }}
                    rephrase={
                      <AIRephraseWidget
                        waitAIWidget={waitAIWidget}
                        messageText={messageText}
                        theme={theme}
                        AIRephrase={defaultAIRephraseWidget}
                        setWaitAIWidget={setWaitAIWidget}
                        setPrevValueText={(prevValue) => {
                          setMessageText(prevValue);
                        }}
                        setMessageErrorToast={(e: string) => {
                          toast(e);
                        }}
                        messagesToView={messagesToView}
                        currentUserId={userId || -1}
                        maxTokensForAIRephrase={maxTokensForAIRephrase}
                        rephraseTones={rephraseTones}
                      />
                    }
                  />
                }
                maxWidthToResize={maxWidthToResizing}
                theme={theme}
              />
            ) : (
              !isMobile && (
                <div
                  className="empty-chat-placeholder"
                  style={{
                    minHeight: clientContainerHeight,
                    maxHeight: clientContainerHeight,
                  }}
                >
                  <Placeholder
                    text={['Select a chat to start messaging.']}
                    className="empty-chat-history-placeholder"
                  />
                </div>
              )
            )
          }
          dialogInfoView={
            showDialogInformation &&
            selectedDialog &&
            needDialogInformation &&
            (isAllMembersShow ? (
              <MembersList
                closeInformationHandler={() => {
                  setIsAllMembersShow(false);
                }}
                members={userViewModel.users}
                maxHeight={dialogListScrollableHeight}
              />
            ) : (
              <DialogInfo
                onShowAllMemberClick={(value: boolean) => {
                  setIsAllMembersShow(value);
                }}
                users={userViewModel.users}
                rootStyles={{
                  minHeight: clientContainerHeight,
                  maxHeight: clientContainerHeight,
                }}
                // subHeaderContent={<CompanyLogo />}
                // upHeaderContent={<CompanyLogo />}
                dialog={selectedDialog}
                dialogViewModel={dialogsViewModel}
                onCloseDialogInformationHandler={informationCloseHandler}
              />
            ))
          }
        />
        <DialogWindow
          open={isOpen}
          title="Leave dialog?"
          onClose={handleDialogOnClick}
        >
          <div className="dialog-leave-container">
            <Button variant="outlined" onClick={handleDialogOnClick}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleLeaveDialog}>
              Leave
            </Button>
          </div>
        </DialogWindow>
        <DialogWindow
          title="New dialog"
          onClose={newModal.toggleModal}
          open={newModal.isOpen}
          className={
            isMobile
              ? 'dialog-list-new-dialog-mobile-container'
              : 'dialog-list-new-dialog-desktop-container'
          }
        >
          <CreateNewDialogFlow
            dialogsViewModel={dialogsViewModel}
            onCancel={newModal.toggleModal}
            onFinished={() => {
              newModal.toggleModal();
            }}
          />
        </DialogWindow>
        {selectedDialog && (
          <DialogWindow
            title="Forward"
            open={forwardMessageModal.isOpen}
            onClose={forwardMessageModal.toggleModal}
          >
            <ForwardMessageFlow
              messages={[forwardMessage!]}
              currentDialog={selectedDialog}
              currentUserName={userName || ''}
              dialogs={dialogsViewModel.dialogs}
              onSendData={handleSendData}
            />
          </DialogWindow>
        )}
      </div>
    </ToastProvider>
  );
};

export default QuickBloxUIKitDesktopLayout;
