import React, { useEffect, useRef, useState } from 'react';
import '../../Views/Dialog/Dialog.scss';
import { Tone } from 'qb-ai-rephrase/src/Tone';
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
import DialogHeader from '../../Views/Dialog/DialogHeader/DialogHeader';
import { DialogType } from '../../../Domain/entity/DialogTypes';
import { GroupDialogEntity } from '../../../Domain/entity/GroupDialogEntity';
import { PrivateDialogEntity } from '../../../Domain/entity/PrivateDialogEntity';
import UserAvatar from '../../Views/EditDialog/UserAvatar/UserAvatar';
import GroupChat from '../../components/UI/svgs/Icons/Contents/GroupChat';
import User from '../../components/UI/svgs/Icons/Contents/User';
import { PublicDialogEntity } from '../../../Domain/entity/PublicDialogEntity';
import PublicChannel from '../../components/UI/svgs/Icons/Contents/PublicChannel';
import MessageInput from '../../Views/Dialog/MessageInput/MessageInput';
import SendIcon from '../../components/UI/svgs/Icons/Actions/Send';
import AttachmentUploader from '../../Views/Dialog/AttachmentUploader/AttachmentUploader';
import AttachmentIcon from '../../components/UI/svgs/Icons/Media/Attachment';
import VoiceMessage from '../../Views/Dialog/VoiceMessage/VoiceMessage';
import VoiceIcon from '../../components/UI/svgs/Icons/Actions/Voice';
import VoiceRecordingProgress from '../../Views/Dialog/VoiceRecordingProgress/VoiceRecordingProgress';
import AIRephraseWidget from '../../Views/Dialog/AIWidgets/AIRephraseWidget/AIRephraseWidget';
import { DialogViewModel } from '../../Views/Dialog/DialogViewModel';
import useDialogViewModel from '../../Views/Dialog/useDialogViewModel';
import { MessageEntity } from '../../../Domain/entity/MessageEntity';
import { stringifyError } from '../../../utils/parse';
import Message from '../../Views/Dialog/Message/Message';
import ReplyMessagePreview from '../../Views/Dialog/ReplyMessagePreview/ReplyMessagePreview';
import ForwardMessageFlow from '../../Views/Dialog/ForwardMessageFlow/ForwardMessageFlow';
import { ModalContext } from '../../providers/ModalContextProvider/Modal';
import SectionList from '../../components/containers/SectionList';
import { SectionItem } from '../../components/containers/SectionList/useComponent';
import { SystemDateBanner } from '../../Views/Dialog/SystemDateBanner/SystemDateBanner';
import { formatDate } from '../../../utils/DateTimeFormatter';
import { useMobileLayout } from '../../components/containers/SectionList/hooks';
import RenderRightActions from '../../Views/Dialog/DialogHeader/RenderRightActions/RenderRightActions';
import RenderLeftActions from '../../Views/Dialog/DialogHeader/RenderLeftActions/RenderLeftActions';
import { MessageDTOMapper } from '../../../Data/source/remote/Mapper/MessageDTOMapper';
import LeaveDialogFlow from '../../Views/Flow/LeaveDialogFlow/LeaveDialogFlow';
import MembersList from '../../Views/DialogInfo/MembersList/MembersList';
import useUsersListViewModel from '../../Views/DialogInfo/UsersList/useUsersListViewModel';
import { GetUserNameFct } from '../../Views/Dialog/Message/IncomingMessage/IncomingMessage';
import { UserEntity } from '../../../Domain/entity/UserEntity';

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
      setSelectedDialog(item);
    }
  };

  const [showReplyMessage, setShowReplyMessage] = useState(false);
  const [messagesToReply, setMessagesToReply] = useState<MessageEntity[]>([]);
  const { handleModal } = React.useContext(ModalContext);
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
    const codeVersion = '0.2.8-beta.3';

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

  const getCountDialogMembers = (dialogEntity: DialogEntity): number => {
    let participants = [];

    if (dialogEntity.type === DialogType.group) {
      participants = (dialogEntity as GroupDialogEntity).participantIds;
    } else if (dialogEntity.type === DialogType.private) {
      participants = [(dialogEntity as PrivateDialogEntity).participantId];
    } else if (dialogEntity.type === DialogType.public) {
      participants = [];
    }

    return participants.length;
  };
  const userViewModel = useUsersListViewModel(selectedDialog?.entity);
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

      if (groupDialogEntity.photo) {
        return (
          <UserAvatar
            urlAvatar={groupDialogEntity.photo}
            iconTheme={{ width: '40px', height: '40px' }}
          />
        );
      }

      return (
        <div className="dh-avatar">
          <div className="dh-avatar-rectangle" />
          <div className="dh-avatar-ellipse">
            <div className="dh-avatar-contents-user">
              <GroupChat
                width="24"
                height="24"
                applyZoom
                color="var(--secondary-text)"
              />
            </div>
          </div>
        </div>
      );
    }
    if (dialogEntity.type === DialogType.private) {
      return dialogAvatarUrl ? (
        <UserAvatar
          urlAvatar={dialogAvatarUrl}
          iconTheme={{ width: '40px', height: '40px' }}
        />
      ) : (
        <div className="dh-avatar">
          <div className="dh-avatar-rectangle" />
          <div className="dh-avatar-ellipse">
            <div className="dh-avatar-contents-user">
              <User
                width="24"
                height="24"
                applyZoom
                color="var(--secondary-text)"
              />
            </div>
          </div>
        </div>
      );
    }
    if (dialogEntity.type === DialogType.public) {
      const publicDialogEntity = dialogEntity as PublicDialogEntity;

      if (publicDialogEntity.photo) {
        return (
          <UserAvatar
            urlAvatar={publicDialogEntity.photo}
            iconTheme={{ width: '40px', height: '40px' }}
          />
        );
      }

      return (
        <div className="dh-avatar">
          <div className="dh-avatar-rectangle" />
          <div className="dh-avatar-ellipse">
            <div className="dh-avatar-contents-user">
              <PublicChannel
                width="24"
                height="24"
                applyZoom
                color="var(--secondary-text)"
              />
            </div>
          </div>
        </div>
      );
    }
  };

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
  const [showErrorToast, setShowErrorToast] = useState<boolean>(false);
  const [messageErrorToast, setMessageErrorToast] = useState<string>('');

  const [dialogMessagesCount, setDialogMessageCount] = useState(100);
  const [hasMore, setHasMore] = React.useState(true);
  const [scrollUpToDown, setScrollUpToDown] = React.useState(false);
  const [messagesToView, setMessagesToView] = React.useState<MessageEntity[]>(
    [],
  );

  useEffect(() => {
    if (showErrorToast || messageErrorToast) {
      setTimeout(() => {
        setShowErrorToast(false);
        setMessageErrorToast('');
      }, 1800);
    }
  }, [showErrorToast]);

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
          setShowErrorToast(true);
          setMessageErrorToast('Message have been replied');
          // showErrorMessage('Messages have been replied');
        } else {
          setShowErrorToast(true);
          setMessageErrorToast('Message have not been replied');
          // showErrorMessage('Messages have not been replied');
        }
      })
      .catch((reason) => {
        const errorMessage = stringifyError(reason);

        setShowErrorToast(true);
        setMessageErrorToast(errorMessage);
        // showErrorMessage(errorMessage);
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
              setShowErrorToast(true);
              setMessageErrorToast(`Incorrect data`);
              // showErrorMessage(`Incorrect data`);
            }
          });
      }
    } else if (fileToSend) {
      setShowErrorToast(true);
      setMessageErrorToast(
        `file size ${fileToSend?.size} must be less then ${MAXSIZE_FOR_MESSAGE} mb.`,
      );
      // showErrorMessage(
      //   `file size ${fileToSend?.size} must be less then ${MAXSIZE_FOR_MESSAGE} mb.`,
      // );
    }
  }, [fileToSend]);

  //  const [isVoiceMessage, setVoiceMessage] = useState(true);
  const getMicrophonePermission = async () => {
    // if ('MediaRecorder' in window)
    if (window) {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });

        setPermission(true);
        setStream(mediaStream);
      } catch (err) {
        // setWarningErrorText(
        //   'The MediaRecorder API is not supported in your browser.',
        // );
        showErrorMessage(
          `The MediaRecorder API throws exception ${stringifyError(err)} .`,
        );
      }
    } else {
      // setWarningErrorText(
      //   'The MediaRecorder API is not supported in your browser.',
      // );
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
      // const localAudioChunks: any[] = [];

      if (typeof event.data === 'undefined') return;
      if (event.data.size === 0) return;
      localAudioChunks.push(event.data);
      console.log('voice data');
      // setAudioChunks(localAudioChunks);
    };

    setAudioChunks(localAudioChunks);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const stopRecording = () => {
    if (!mediaRecorder.current) return;
    // setRecordingStatus('inactive');
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
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        // AITranslation?.fileToWidget(
        //   voiceMessage,
        //   messageEntitiesToIChatMessageCollection(messagesToView),
        // );
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
          // setWarningErrorText(`Have no audio.`);
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
    console.log('HAVE NEW DIALOG');
    // messagesViewModel.getMessages(new Pagination());
    messagesViewModel.entity = dialogsViewModel.entity;
    setMessagesToView([]);
    setMessageText('');
  }, [dialogsViewModel.entity]);

  useEffect(() => {
    console.log('HAVE NEW ENTITY');
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
    // const firstPageSize =
    //   messagesViewModel.messages.length < 47
    //     ? messagesViewModel.messages.length
    //     : 47;

    const firstPageSize = messagesViewModel.messages.length;

    // for (let i = 0; i < firstPageSize; i += 1) {
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
    console.log('Messages have changed');
    setDialogMessageCount(messagesViewModel?.messages?.length || 0);
    if (messagesToView?.length === 0 && messagesViewModel.messages.length > 0) {
      // setDialogMessageCount(messagesViewModel.messages.length);
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
    console.log('dialogMessagesCount have changed');
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

  const closeModal = () => {
    handleModal(false, '', '', false, false);
  };

  const handleForward = (message: MessageEntity): void => {
    handleModal(
      true,
      <ForwardMessageFlow
        messages={[message]}
        currentDialog={selectedDialog!.entity}
        currentUserName={userName || ''}
        dialogs={dialogsViewModel.dialogs}
        onSendData={(dialogsForForward, messagesForForward, relatedText) => {
          // console.log('call send data (Forward),');
          // console.log('Dialogs: ', dialogsForForward);
          // console.log('Messages: ', messagesForForward);
          // console.log('RelatedTex: ', relatedText);
          const forwardingData: ForwardMessagesParams = {
            messagesToForward: messagesForForward,
            targetDialogs: dialogsForForward,
            relatedTextMessage:
              relatedText || MessageDTOMapper.FORWARD_MESSAGE_PREFIX,
          };

          // eslint-disable-next-line promise/catch-or-return
          messagesViewModel
            .sendForwardedMessages(forwardingData)
            .then((opResult: boolean) => {
              // eslint-disable-next-line promise/always-return
              if (opResult) {
                setShowErrorToast(true);
                setMessageErrorToast('Message have been forwarded');
                // showErrorMessage('Messages have been forwarded');
              } else {
                setShowErrorToast(true);
                setMessageErrorToast('Message have not been forwarded');
                // showErrorMessage('Messages have not been forwarded');
              }
            })
            .catch((reason) => {
              const errorMessage = stringifyError(reason);

              showErrorMessage(errorMessage);
            })
            .finally(() => {
              closeModal();
            });
        }}
      />,
      'Forward',
      false,
      false,
      {
        minHeight: '200px',
        minWidth: '380px',
        maxWidth: '380px',
        backgroundColor: 'var(--main-background)',
        // border: '3px solid red',
      },
    );
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
    // Сортировка каждого массива внутри groupMessages[date]
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

  const [showMembersDialog, setShowMembersDialog] = React.useState(false);

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
    console.log(
      `TestStage: selectedDialog: ${
        selectedDialog?.entity?.name || 'Dialog Name is empty'
      }`,
    );
    if (selectedDialog && selectedDialog.entity) {
      dialogsViewModel.entity = selectedDialog.entity;
      userViewModel.entity = selectedDialog.entity;

      setShowMembersDialog(false);
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
  // const workHeight = `calc(${uikitHeightOffset} - 128px - 16px)`;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const workHeight = `100%`;

  const leaveDialogHandler = (dialog: DialogEntity) => {
    handleModal(
      true,
      <LeaveDialogFlow dialog={dialog} dialogsViewModel={dialogsViewModel} />,
      'Leave dialog?',
      false,
      true,
    );
  };

  // eslint-disable-next-line react/prop-types
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

  return (
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
              scrollableHeight={clientHeight - 64 - 6}
              // rootStyles={{
              //   minHeight: `${clientHeight}px)`,
              //   maxHeight: `${clientHeight}px)`,
              // }}
              // messagesContainerStyles={{
              //   maxHeight: '736px !important',
              // }}
              // subHeaderContent={<CompanyLogo />}
              // upHeaderContent={<CompanyLogo />}
              dialogsViewModel={dialogsViewModel} // 1 Get 2 Update UseCase
              onDialogSelectHandler={selectDialogActions}
              onLeaveDialog={leaveDialogHandler}
              additionalSettings={{
                withoutHeader: false,
                themeHeader: theme,
                themePreview: theme,
                useSubHeader: false,
                useUpHeader: false,
              }}
              // regx={regx}
            />
          ) : null
        }
        dialogMessagesView={
          showDialogMessages &&
          selectedDialog &&
          selectedDialog.entity &&
          dialogsViewModel.entity ? (
            <Dialog
              rootStyles={{
                minHeight: `${clientHeight}px`,
                maxHeight: `${clientHeight}px`,
              }}
              messagesContainerStyles={
                isMobile
                  ? {
                      minHeight: `calc(${clientHeight}px - 128px - 16px)`,
                      maxHeight: `calc(${clientHeight}px - 128px - 16px)`,
                    }
                  : {
                      minHeight: `calc(${clientHeight}px - 128px - 1px)`, // todo: artik 29.12.2023 1px - это "подобранная наглаз" величина
                      maxHeight: `calc(${clientHeight}px - 128px - 1px)`,
                    }
              }
              messagesViewModel={messagesViewModel}
              showErrorToast={showErrorToast}
              messageErrorToast={messageErrorToast}
              warningErrorText={warningErrorText}
              // subHeaderContent={<CompanyLogo />}
              // upHeaderContent={<CompanyLogo />}
              renderHeader={
                <DialogHeader
                  dialogName={dialogsViewModel.entity.name}
                  renderAvatar={renderIconForTypeDialog(
                    dialogsViewModel.entity,
                  )}
                  renderLeftActions={
                    <RenderLeftActions
                      onClickBack={() => setSelectedDialog(undefined)}
                      theme={theme}
                    />
                  }
                  renderRightActions={
                    <RenderRightActions
                      onClickInfo={informationOpenHandler}
                      theme={theme}
                    />
                  }
                  countMembers={getCountDialogMembers(dialogsViewModel.entity)}
                  theme={theme}
                />
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
                      // <div className="date">{section.title}</div>
                      <div className="message-view-container--system-message-wrapper">
                        <div
                          style={
                            theme
                              ? { backgroundColor: theme.disabledElements() }
                              : {}
                          }
                          className="message-view-container--system-message-wrapper__date_container"
                        >
                          {/* eslint-disable-next-line @typescript-eslint/no-unsafe-call */}
                          <SystemDateBanner text={formatDate(section.title)} />
                        </div>
                      </div>
                    )}
                    renderItem={([, groupMessages]) =>
                      groupMessages.map((message) => (
                        <Message
                          theme={theme}
                          setShowErrorToast={setShowErrorToast}
                          setWaitAIWidget={setWaitAIWidget}
                          setMessageErrorToast={setMessageErrorToast}
                          AIAssistWidget={defaultAIAssistWidget!}
                          AITranslateWidget={defaultAITranslateWidget!}
                          message={message}
                          onReply={(m: MessageEntity) => {
                            handleOnReply(m);
                          }}
                          onForward={(m: MessageEntity) => {
                            handleForward(m);
                          }}
                          defaultGetSenderName={defaultGetSenderName}
                          messagesToView={messagesToView}
                          userId={userId || -1}
                          enableReplying={enableReplying}
                          enableForwarding={enableForwarding}
                        />
                      ))
                    }
                    sections={getSectionData(messagesToView)}
                  />
                )
              }
              renderReplyMessagesPreview={
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
              }
              showReplyMessage={showReplyMessage}
              renderMessageInput={
                <MessageInput
                  waitAIWidget={waitAIWidget}
                  messageText={messageText}
                  onChangeText={(text: string) => {
                    setMessageText(text);
                  }}
                  sendText={(textToSend: string) => {
                    sendTextMessageActions(textToSend);
                  }}
                  renderSendIcon={
                    <SendIcon
                      width="21"
                      height="18"
                      applyZoom
                      color={
                        theme ? theme.mainElements() : 'var(--main-elements)'
                      }
                    />
                  }
                  renderAttachment={
                    <AttachmentUploader
                      icon={
                        <AttachmentIcon
                          width="32"
                          height="32"
                          applyZoom
                          color={
                            theme
                              ? theme.inputElements()
                              : 'var(--input-elements)'
                          }
                        />
                      }
                      onChangeFile={ChangeFileHandler}
                    />
                  }
                  isRecording={isRecording}
                  renderVoiceRecorder={
                    <VoiceMessage
                      icon={
                        <VoiceIcon
                          width="21"
                          height="18"
                          applyZoom
                          color={
                            isRecording
                              ? 'var(--error)'
                              : 'var(--input-elements)'
                          }
                        />
                      }
                      onClick={() => {
                        console.log('click send voice message');
                        if (messagesViewModel?.loading) return;
                        setIsRecording(!isRecording);
                      }}
                    />
                  }
                  renderVoiceRecordProgress={
                    <VoiceRecordingProgress
                      startStatus={isRecording}
                      longRecInSec={60}
                      onClick={() => {
                        console.log('click send voice message');
                        if (messagesViewModel?.loading) return;
                        setIsRecording(!isRecording);
                      }}
                      onTouch={() => {
                        console.log('touch send voice message');
                        if (messagesViewModel?.loading) return;
                        setIsRecording(!isRecording);
                      }}
                    />
                  }
                  messagesViewModel={messagesViewModel}
                  maxWidthToResizing={maxWidthToResizing}
                  renderAIWidget={
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
                        setMessageErrorToast(e);
                      }}
                      setShowErrorToast={(e: boolean) => {
                        setShowErrorToast(e);
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
            /> // 1 Get Messages + 1 Get User by id
          ) : null
        }
        dialogInfoView={
          // 1 Get User by 1 + Get user by name
          showDialogInformation &&
          selectedDialog &&
          needDialogInformation &&
          (isAllMembersShow ? (
            <MembersList
              closeInformationHandler={() => {
                setIsAllMembersShow(false);
              }}
              members={userViewModel.users}
              maxHeight={clientHeight - 64 - 6} // todo: artik 29.12.2023 значение такое же как и в DialogList
            />
          ) : (
            <DialogInfo
              showMembersDialogInitValue={showMembersDialog}
              onShowAllMemberClick={(value: boolean) => {
                setIsAllMembersShow(value);
              }}
              users={userViewModel.users}
              rootStyles={{
                minHeight: `${clientHeight}px`,
                maxHeight: `${clientHeight}px`,
              }}
              // subHeaderContent={<CompanyLogo />}
              // upHeaderContent={<CompanyLogo />}
              dialog={selectedDialog.entity}
              dialogViewModel={dialogsViewModel}
              onCloseDialogInformationHandler={informationCloseHandler}
            />
          ))
        }
      />
    </div>
  );
};

export default QuickBloxUIKitDesktopLayout;
