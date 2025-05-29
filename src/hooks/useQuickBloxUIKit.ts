import React, { useEffect, useRef, useState } from 'react';
import '../Presentation/Views/Dialog/Dialog.scss';
import '../Presentation/Views/Dialog/DialogHeader/DialogInfoIcon/DialogInfoIcon.scss';
import { Tone } from 'qb-ai-rephrase/src/Tone';
import { toast } from 'react-toastify';
import QBMediaRecorder from 'media-recorder-js';
import useQbInitializedDataContext from '../Presentation/providers/QuickBloxUIKitProvider/useQbInitializedDataContext';
import { DialogEntity } from '../Domain/entity/DialogEntity';
import { DialogListViewModel } from '../Presentation/Views/DialogList/DialogListViewModel';
import useDialogListViewModel from '../Presentation/Views/DialogList/useDialogListViewModel';
import { Pagination } from '../Domain/repository/Pagination';
import {
  ForwardMessagesParams,
  ReplyMessagesParams,
} from '../CommonTypes/BaseViewModel';
import { AIMessageWidget } from '../Presentation/Views/Dialog/AIWidgets/AIMessageWidget';
import UseDefaultAIAssistAnswerWidget from '../Presentation/Views/Dialog/AIWidgets/UseDefaultAIAssistAnswerWidget';
import UseDefaultAITranslateWidget from '../Presentation/Views/Dialog/AIWidgets/UseDefaultAITranslateWidget';
import UseDefaultAIRephraseMessageWidget from '../Presentation/Views/Dialog/AIWidgets/UseDefaultAIRephraseMessageWidget';
import { DefaultConfigurations } from '../Data/DefaultConfigurations';
import UseDefaultAIAssistAnswerWidgetWithProxy from '../Presentation/Views/Dialog/AIWidgets/UseDefaultAIAssistAnswerWidgetWithProxy';
import UseDefaultAITranslateWidgetWithProxy from '../Presentation/Views/Dialog/AIWidgets/UseDefaultAITranslateWidgetWithProxy';
import UseDefaultAIRephraseMessageWidgetWithProxy from '../Presentation/Views/Dialog/AIWidgets/UseDefaultAIRephraseMessageWidgetWithProxy';
import { DialogType } from '../Domain/entity/DialogTypes';
import { GroupDialogEntity } from '../Domain/entity/GroupDialogEntity';
import { PrivateDialogEntity } from '../Domain/entity/PrivateDialogEntity';
import { DialogViewModel } from '../Presentation/Views/Dialog/DialogViewModel';
import useDialogViewModel from '../Presentation/Views/Dialog/useDialogViewModel';
import { MessageEntity } from '../Domain/entity/MessageEntity';
import { stringifyError } from '../utils/parse';
import { useMobileLayout } from '../Presentation/components/containers/SectionList/hooks';
import { MessageDTOMapper } from '../Data/source/remote/Mapper/MessageDTOMapper';
import useUsersListViewModel from '../Presentation/Views/DialogInfo/UsersList/useUsersListViewModel';
import useModal from './useModal';
import useQBConnection from '../Presentation/providers/QuickBloxUIKitProvider/useQBConnection';
import { ProxyConfig, QuickBloxUIKitProps } from '../CommonTypes/CommonTypes';
import EventMessageType from '../Domain/entity/EventMessageType';
import { formatFileSize } from '../utils/formatFileSize';
import UseDefaultAIAssistAnswerWidgetWithSDK from '../Presentation/Views/Dialog/AIWidgets/UseDefaultAIAssistAnswerWidgetWithSDK';
import UseDefaultAITranslateWidgetWithSDK from '../Presentation/Views/Dialog/AIWidgets/UseDefaultAITranslateWidgetWithSDK';
import { UsersListViewModel } from '../Presentation/Views/DialogInfo/UsersList/UsersListViewModel';

interface QuickBloxUIKitReturn {
  constants: {
    messagePerPage: number;
    maxFileSize?: number;
    maxWidthToResizing: string;
    workHeight: string;
    messagesContainerMobileHeight: string;
    messagesContainerHeight: string;
    clientContainerHeight: string;
    headerHeight: number;
    dialogListScrollableHeight: number;
  };
  data: {
    isOnline: boolean;
    isMobile: boolean;
    width: number;
    height: number;
    breakpoint: number;
    selectedDialog?: DialogEntity;
    dialogAvatarUrl: string;
    showDialogList: boolean;
    showDialogMessages: boolean;
    showDialogInformation: boolean;
    needDialogInformation: boolean;
    isRecording: boolean;
    stream?: MediaStream | null;
    permission: boolean;
    resultAudioBlob?: Blob | null;
    audioChunks: Blob[];
    fileToSend?: File | null;
    messageText: string;
    isLeaving: boolean;
    waitAIWidget: boolean;
    maxTokensForAIRephrase: number;
    defaultAIRephraseWidget?: AIMessageWidget;
    defaultAITranslateWidget?: AIMessageWidget;
    defaultAIAssistWidget?: AIMessageWidget;
    rephraseTones: Tone[];
    messagePerPage: number;
    enableForwarding: boolean;
    enableReplying: boolean;
    maxFileSize?: number;
    userName?: string;
    currentUserId?: number;
    sessionToken?: string;
    forwardMessage: MessageEntity | null;
    newModal: ReturnType<typeof useModal>;
    isOpen: boolean;
    warningErrorText: string;
    isAllMembersShow: boolean;
    scrollUpToDown: boolean;
    needRefresh: boolean;
    forwardMessageModal: ReturnType<typeof useModal>;
    showReplyMessage: boolean;
    messagesToReply: MessageEntity[];
  };
  models: {
    dialogsViewModel: DialogListViewModel;
    messagesViewModel: DialogViewModel;
    userViewModel: UsersListViewModel;
    currentContext: ReturnType<typeof useQbInitializedDataContext>;
  };
  handlers: {
    setSelectedDialog: (dialog: DialogEntity | undefined) => void;
    setShowDialogList: (value: boolean) => void;
    setShowDialogMessages: (value: boolean) => void;
    setShowDialogInformation: (value: boolean) => void;
    setNeedDialogInformation: (value: boolean) => void;
    handleLeaveDialog: () => void;
    leaveDialogHandler: (dialog: DialogEntity) => void;
    createDialogHandler: () => void;
    getDialogPhotoFileForPreview: () => Promise<void>;
    getMicrophonePermission: () => Promise<void>;
    startRecording: () => Promise<void>;
    stopRecording: () => void;
    setForwardMessage: (message: MessageEntity | null) => void;
    setWarningErrorText: (text: string) => void;
    setIsAllMembersShow: (value: boolean) => void;
    informationCloseHandler: () => void;
    informationOpenHandler: () => void;
    setIsRecording: (value: boolean) => void;
    fetchMoreData: () => void;
    sendTextMessageActions: (textToSend: string) => void;
    ChangeFileHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleOnReply: (message: MessageEntity) => void;
    handleSendData: (
      dialogsForForward: DialogEntity[],
      messagesForForward: MessageEntity[],
      relatedText: string,
    ) => void;
    handleHeightChange: (newHeight: number) => void;
    closeReplyMessageFlowHandler: () => void;
    setMessageText: (text: string) => void;
    setWaitAIWidget: (value: boolean) => void;
    handleDialogOnClick: () => void;
  };
}
// part 1 includes end
export default function useQuickBloxUIKit({
  AIRephrase = undefined,
  AITranslate = undefined,
  AIAssist = undefined,
  uikitHeightOffset = '0px',
}: QuickBloxUIKitProps): QuickBloxUIKitReturn {
  // 103
  // const mimeType = 'audio/webm;codecs=opus'; // audio/ogg audio/mpeg audio/webm audio/x-wav audio/mp4
  const messagePerPage = 47;

  const currentContext = useQbInitializedDataContext();
  const QBConfig =
    currentContext.InitParams.qbConfig ||
    DefaultConfigurations.getDefaultQBConfig();
  const userName =
    currentContext.storage.REMOTE_DATA_SOURCE.authInformation?.userName;
  const currentUserId =
    currentContext.storage.REMOTE_DATA_SOURCE.authInformation?.userId;
  const sessionToken =
    currentContext.storage.REMOTE_DATA_SOURCE.authInformation?.sessionToken;
  const { enableForwarding } = QBConfig.appConfig;
  const { enableReplying } = QBConfig.appConfig;
  const { maxFileSize } = currentContext.InitParams;

  const maxTokensForAIRephrase =
    currentContext.InitParams.qbConfig.configAIApi.AIRephraseWidgetConfig
      .maxTokens;

  const rephraseTones: Tone[] =
    currentContext.InitParams.qbConfig.configAIApi.AIRephraseWidgetConfig.Tones;

  let defaultAIRephraseWidget = AIRephrase?.AIWidget;
  let defaultAITranslateWidget = AITranslate?.AIWidget;
  let defaultAIAssistWidget = AIAssist?.AIWidget;

  const getAIAssistAnswer = (): void => {
    if (QBConfig.configAIApi.AIAnswerAssistWidgetConfig.smartChatAssistantId) {
      defaultAIAssistWidget = UseDefaultAIAssistAnswerWidgetWithSDK(
        currentContext.storage.REMOTE_DATA_SOURCE,
        QBConfig.configAIApi.AIAnswerAssistWidgetConfig.smartChatAssistantId,
      );
    } else if (AIAssist?.enabled && !AIAssist?.default) {
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
    if (QBConfig.configAIApi.AITranslateWidgetConfig.smartChatAssistantId) {
      defaultAITranslateWidget = UseDefaultAITranslateWidgetWithSDK(
        currentContext.storage.REMOTE_DATA_SOURCE,
        QBConfig.configAIApi.AITranslateWidgetConfig.smartChatAssistantId,
      );
    } else if (AITranslate?.enabled && !AITranslate?.default) {
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

  const dialogsViewModel: DialogListViewModel =
    useDialogListViewModel(currentContext);

  const messagesViewModel: DialogViewModel = useDialogViewModel(
    dialogsViewModel.entity?.type,
    dialogsViewModel.entity,
  );

  const [forwardMessage, setForwardMessage] = useState<MessageEntity | null>(
    null,
  );
  const forwardMessageModal = useModal();
  const [selectedDialog, setSelectedDialog] = React.useState<DialogEntity>();
  const userViewModel = useUsersListViewModel(selectedDialog);
  const [dialogAvatarUrl, setDialogAvatarUrl] = React.useState('');

  const { browserOnline, connectionStatus, connectionRepository } =
    useQBConnection();

  const [isOnline, setIsOnline] = useState<boolean>(
    browserOnline && connectionStatus,
  );

  connectionRepository.subscribe(
    (status) => {
      console.log(
        `Connection status: ${status ? 'CONNECTED' : 'DISCONNECTED'}`,
      );
      if (status) setIsOnline(true);
      else setIsOnline(false);
    },
    EventMessageType.LocalMessage,
    'DESKTOP_LAYOUT',
  );

  const [needRefresh, setNeedRefresh] = useState(false);
  const toastConnectionErrorId = React.useRef(null);

  //
  const [waitAIWidget, setWaitAIWidget] = useState<boolean>(false);
  const [messageText, setMessageText] = useState<string>('');

  const [showReplyMessage, setShowReplyMessage] = useState(false);
  const [messagesToReply, setMessagesToReply] = useState<MessageEntity[]>([]);
  const [isMobile, width, height, breakpoint] = useMobileLayout();
  const [clientHeight, setClientHeight] = useState<number>(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [scrollUpToDown, setScrollUpToDown] = React.useState(false);
  const [needDialogInformation, setNeedDialogInformation] = useState(false);
  const informationCloseHandler = (): void => {
    setNeedDialogInformation(false);
  };
  const informationOpenHandler = (): void => {
    setNeedDialogInformation(true);
  };
  //
  const maxWidthToResizing =
    selectedDialog && needDialogInformation
      ? '$message-view-container-wrapper-min-width'
      : '1040px';
  const workHeight = isMobile
    ? `calc(${height.toString()}px - ${uikitHeightOffset} - 28px)`
    : `calc(100vh - ${uikitHeightOffset} - 28px)`;
  const messagesContainerMobileHeight = showReplyMessage
    ? `calc(${clientHeight}px - 128px - 64px - 16px)`
    : `calc(${clientHeight}px - 128px - 16px)`;
  const messagesContainerHeight = showReplyMessage
    ? `calc(${clientHeight}px - 128px - 64px)`
    : `calc(${clientHeight}px - 128px - 1px)`;
  const clientContainerHeight = `${clientHeight - 5}px`;
  const headerHeight = 64;
  const dialogListScrollableHeight = clientHeight - headerHeight - 6;

  const [warningErrorText, setWarningErrorText] = useState<string>('');
  const [useAudioWidget, setUseAudioWidget] = useState<boolean>(false);
  const [fileToSend, setFileToSend] = useState<File | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [permission, setPermission] = useState(false);
  //
  const [stream, setStream] = useState<MediaStream | null>(null);
  const mediaRecorder = useRef<QBMediaRecorder | null>(null);
  const [resultAudioBlob, setResultAudioBlob] = useState<Blob | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [peerConnection, setPeerConnection] =
    useState<RTCPeerConnection | null>(null);
  //
  const newModal = useModal();
  const [dialogToLeave, setDialogToLeave] = useState<DialogEntity>();
  const [showDialogList, setShowDialogList] = useState<boolean>(true);
  const [showDialogMessages, setShowDialogMessages] = useState<boolean>(true);
  const [showDialogInformation, setShowDialogInformation] =
    useState<boolean>(false);
  const [isAllMembersShow, setIsAllMembersShow] = React.useState(false);
  const [isOpen, setIsOpen] = useState(false);

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

  const fetchMoreData = () => {
    if (messagesViewModel.pagination.hasNextPage()) {
      const newPagination = messagesViewModel.pagination;

      newPagination.perPage = messagePerPage;
      newPagination.nextPage();

      messagesViewModel.getMessages(newPagination);
    }
  };

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

    if (participants.length > 0) {
      const senderUser = await userViewModel.getUserById(participants[0]);

      result = senderUser?.photo || '';
    } else {
      result = '';
    }

    return result;
  };

  async function getDialogPhotoFileForPreview() {
    const tmpFileUrl: string = await getUserAvatarByUid();

    if (tmpFileUrl && tmpFileUrl.length > 0) {
      setDialogAvatarUrl(tmpFileUrl);
    } else {
      setDialogAvatarUrl('');
    }
  }

  const showErrorMessage = (errorMessage: string) => {
    setWarningErrorText(errorMessage);
    setTimeout(() => {
      setWarningErrorText('');
    }, 4500);
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

  // Detect browser and set MIME type
  const detectBrowserAndMimeType = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isChrome =
      /chrome/.test(userAgent) && !/edge|opr|brave/.test(userAgent);
    const isSafari = /^((?!chrome|android).)*safari/.test(userAgent);
    const isFirefox = /firefox/.test(userAgent);
    const isIOS = /iphone|ipad|ipod/.test(userAgent);

    console.log(
      `Browser detected: ${
        // eslint-disable-next-line no-nested-ternary
        isChrome
          ? 'Chrome'
          : // eslint-disable-next-line no-nested-ternary
          isSafari
          ? 'Safari'
          : // eslint-disable-next-line no-nested-ternary
          isFirefox
          ? 'Firefox'
          : isIOS
          ? 'iOS'
          : 'Other'
      }`,
    );

    const mimeTypes = {
      chrome: ['audio/webm;codecs=opus', 'audio/webm'],
      safari: ['audio/mp4', 'audio/mp4;codecs=mp4a', 'audio/aac', 'audio/wav'],
      ios: ['audio/mp4', 'audio/mp4;codecs=mp4a', 'audio/aac'],
      firefox: ['audio/ogg', 'audio/webm'],
      other: ['audio/webm', 'audio/mp4', 'audio/wav'],
    };

    // eslint-disable-next-line no-nested-ternary
    const targetMimeTypes = isIOS
      ? mimeTypes.ios
      : // eslint-disable-next-line no-nested-ternary
      isSafari
      ? mimeTypes.safari
      : // eslint-disable-next-line no-nested-ternary
      isChrome
      ? mimeTypes.chrome
      : isFirefox
      ? mimeTypes.firefox
      : mimeTypes.other;

    return (
      targetMimeTypes.find((type) => QBMediaRecorder.isTypeSupported(type)) ||
      'audio/wav'
    );
  };

  // Request microphone access and setup WebRTC
  const activateSilentAudioHack = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    gainNode.gain.value = 0.001; // Неслышный звук поддерживает аудиосессию активной
  };

  const getMicrophonePermission = async () => {
    if (!window) {
      showErrorMessage(
        'The MediaRecorder API is not supported on your platform.',
      );

      return;
    }

    // if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    //   showErrorMessage(
    //     'Your browser does not support microphone recording. Please update your browser or check permissions.'
    //   );
    //   return;
    // }

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });

      // Create WebRTC peer connection
      const pc = new RTCPeerConnection();

      mediaStream
        .getTracks()
        .forEach((track) => pc.addTrack(track, mediaStream));

      pc.ontrack = (event) => {
        setStream(event.streams[0]);
      };

      setPeerConnection(pc);
      setStream(mediaStream);
      setPermission(true);
      console.log('Microphone access granted, WebRTC connection established.');
    } catch (err) {
      console.error('Error accessing microphone:', err);

      const isIOS = /iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase());
      if (isIOS) activateSilentAudioHack();

      // Retry for iOS browsers
      if (isIOS) {
        setTimeout(async () => {
          try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({
              audio: true,
              video: false,
            });
            setPermission(true);
            setStream(mediaStream);
          } catch (retryError) {
            showErrorMessage(
              'Microphone access is not available. Please check your iOS settings.'
            );
          }
        }, 1500); // Retry after 1 second for iOS
      } else {
        showErrorMessage(
          'Microphone access is not available. Please check your browser settings.'
        );
      }
    }
  };

  // Start recording using QBMediaRecorder
  const startWebRTCRecording = async () => {
    try {
      // const audioContext = new AudioContext();
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const source = audioContext.createMediaStreamSource(stream!);
      const destination = audioContext.createMediaStreamDestination();
      source.connect(destination);

      const recorder = new QBMediaRecorder({
        mimeType: 'audio/mp4',
        timeslice: 1000, // Chunks of 1 second
        ignoreMutedMedia: true,
        onstart: () => console.log('Recording started in startWebRTCRecording'),
        onstop: (file) => {
          console.log('Final audio file:', file);
          setResultAudioBlob(file);
          setAudioChunks([]); // Clear recorded chunks
        },
        ondataavailable: (event) => {
          if (event.data.size > 0) {
            setAudioChunks((prevChunks) => [...prevChunks, event.data]);
          }
        },
      });

      mediaRecorder.current = recorder;
      recorder.start(destination.stream);
      setIsRecording(true);

      console.log('WebRTC recording started.');
    } catch (error) {
      console.error('Error starting WebRTC recording:', error);
    }
  };
  // eslint-disable-next-line @typescript-eslint/require-await
  const startRecording = async () => {
    if (!stream) return;

    // Detect browser type
    const userAgent = navigator.userAgent.toLowerCase();
    const isSafari = /^((?!chrome|android).)*safari/.test(userAgent);

    if (isSafari || !window.MediaRecorder) {
      console.log('Safari detected, using WebRTC.');
      await startWebRTCRecording();
      return;
    }

    console.log('Using QBMediaRecorder.');
    const mimeType = detectBrowserAndMimeType();

    console.log(`Selected MIME-type: ${mimeType}`);

    const recorder = new QBMediaRecorder({
      mimeType,
      timeslice: 1000, // Chunks of 1 second
      ignoreMutedMedia: true,
      onstart: () => console.log('Recording started in startRecording'),
      onstop: (file) => {
        console.log('Final audio file:', file);
        setResultAudioBlob(file);
        setAudioChunks([]); // Clear recorded chunks
      },
      ondataavailable: (event) => {
        if (event.data.size > 0) {
          setAudioChunks((prev) => [...prev, event.data]);
        }
      },
      onerror: (error) => console.error('Recording error:', error),
    });

    mediaRecorder.current = recorder;
    recorder.start(stream);
  };

  // Stop recording
  const stopRecording = () => {
    if (!mediaRecorder.current) return;

    mediaRecorder.current.stop();

    // Stop WebRTC stream
    if (peerConnection) {
      peerConnection.close();
      setPeerConnection(null);
    }
  };

  // Convert Blob to File
  const blobToFile = (blob: Blob, fileName: string): File => {
    return new File([blob], fileName, { type: blob.type });
  };


  function sendTextMessageActions(textToSend: string) {
    if (isOnline) {
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
  }

  const ChangeFileHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isOnline) {
      const reader = new FileReader();
      const file = event.currentTarget.files
        ? event.currentTarget.files[0]
        : null;

      reader.onloadend = () => {
        setFileToSend(file);
      };

      if (file !== null) reader.readAsDataURL(file);
    }
  };

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

  const handleHeightChange = (newHeight: number) => {
    console.log('The new height is:', newHeight);
    setClientHeight(newHeight);
  };

  const leaveDialogHandler = (dialog: DialogEntity) => {
    if (isOnline) {
      setDialogToLeave(dialog);
    }
  };

  const handleDialogOnClick = () => {
    if (isOpen) {
      setDialogToLeave(undefined);
    }
    setIsOpen((state) => !state);
  };

  const [isLeaving, setIsLeaving] = useState(false);
  const toastLeavingId = React.useRef(null);
  const handleLeaveDialog = () => {
    if (dialogToLeave) {
      setIsLeaving(true);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      toastLeavingId.current = toast('leaving dialog', {
        autoClose: false,
        isLoading: true,
      });
      // eslint-disable-next-line promise/catch-or-return
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
        })
        .finally(() => {
          setIsLeaving(false);
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          toast.dismiss(toastLeavingId.current);
        });
    }
  };

  const createDialogHandler = () => {
    if (isOnline) {
      newModal.toggleModal();
    }
  };

  useEffect(() => {
    const codeVersion = '0.5.0';

    console.log(`React UIKit CODE VERSION IS ${codeVersion}`);
    if (isAuthProcessed()) {
      const pagination: Pagination = new Pagination();

      dialogsViewModel?.getDialogs(pagination);
    }

    return () => {
      dialogsViewModel.release();
    };
  }, []);
  useEffect(() => {
    if (isAuthProcessed()) {
      const pagination: Pagination = new Pagination();

      dialogsViewModel?.getDialogs(pagination);
    }
  }, [currentContext.InitParams]);
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
  }, [isMobile]);

  useEffect(() => {
    if (browserOnline) {
      setIsOnline(true);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      toast.dismiss(toastConnectionErrorId.current);
    } else {
      setIsOnline(false);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/ban-ts-comment
      // @ts-ignore
      toastConnectionErrorId.current = toast('Connection ...', {
        autoClose: false,
        isLoading: true,
      });
    }
  }, [browserOnline && connectionStatus]);
  useEffect(() => {
    if (!isOnline) {
      setNeedRefresh(true);
    }
  }, [isOnline]);
  useEffect(() => {
    if (isOnline && needRefresh) {
      if (messagesViewModel.entity) {
        messagesViewModel.getMessages(new Pagination(0, messagePerPage));

        setNeedRefresh(false);
      }
    }
  }, [isOnline]);
  useEffect(() => {
    if (dialogsViewModel.entity) {
      getDialogPhotoFileForPreview().catch();
      userViewModel.entity = dialogsViewModel.entity;
    }

    return () => {
      if (dialogAvatarUrl) {
        URL.revokeObjectURL(dialogAvatarUrl);
      }
    };
  }, [dialogsViewModel.entity]);
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
  useEffect(() => {
    messagesViewModel.entity = dialogsViewModel.entity;
    // setMessagesToView([]);
    setMessageText('');
  }, [dialogsViewModel.entity]);
  useEffect(() => {
    if (userViewModel.entity) {
      userViewModel.getUsers();
    }
  }, [userViewModel.entity]);
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
    if (messagesViewModel.entity) {
      messagesViewModel.getMessages(new Pagination(0, messagePerPage));
    }
  }, [messagesViewModel.entity]);
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
      } else if (isOnline) {
        // eslint-disable-next-line promise/catch-or-return
        messagesViewModel
          .sendAttachmentMessage(fileToSend)
          .then((resultOperation) => {
            // eslint-disable-next-line promise/always-return
            if (!resultOperation) {
              toast(`Incorrect data`);
            }
          })
          .finally(() => {
            setFileToSend(null);
          });
      }
    } else if (fileToSend) {
      toast(
        `file size ${formatFileSize(
          fileToSend?.size,
        )} must be less then ${MAXSIZE_FOR_MESSAGE} mb.`,
      );
      setFileToSend(null);
    }
  }, [fileToSend]);
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
  useEffect(() => {
    if (dialogToLeave) {
      handleDialogOnClick();
    }
  }, [dialogToLeave]);

  //
  // Rendering
  //
  // 972
  return {
    constants: {
      messagePerPage,
      maxFileSize,
      maxWidthToResizing,
      workHeight,
      messagesContainerMobileHeight,
      messagesContainerHeight,
      clientContainerHeight,
      headerHeight,
      dialogListScrollableHeight,
    },
    data: {
      isOnline,
      isMobile: Boolean(isMobile),
      width: Number(width),
      height: Number(height),
      breakpoint: Number(breakpoint),
      selectedDialog,
      dialogAvatarUrl,
      showDialogList,
      showDialogMessages,
      showDialogInformation,
      needDialogInformation,
      isRecording,
      stream,
      permission,
      resultAudioBlob,
      audioChunks,
      fileToSend,
      messageText,
      isLeaving,
      waitAIWidget,
      defaultAIRephraseWidget,
      defaultAITranslateWidget,
      defaultAIAssistWidget,
      messagePerPage,
      maxTokensForAIRephrase,
      rephraseTones,
      enableForwarding,
      enableReplying,
      maxFileSize,
      userName,
      currentUserId,
      sessionToken,
      forwardMessage,
      warningErrorText,
      isAllMembersShow,
      scrollUpToDown,
      needRefresh,
      forwardMessageModal,
      newModal,
      isOpen,
      showReplyMessage,
      messagesToReply,
    },
    models: {
      dialogsViewModel,
      messagesViewModel,
      userViewModel,
      currentContext,
    },
    handlers: {
      setSelectedDialog,
      setShowDialogList,
      setShowDialogMessages,
      setShowDialogInformation,
      setNeedDialogInformation,
      handleLeaveDialog,
      getDialogPhotoFileForPreview,
      getMicrophonePermission,
      startRecording,
      stopRecording,
      setForwardMessage,
      informationCloseHandler,
      informationOpenHandler,
      setIsRecording,
      setIsAllMembersShow,
      fetchMoreData,
      sendTextMessageActions,
      ChangeFileHandler,
      handleOnReply,
      handleSendData,
      handleHeightChange,
      leaveDialogHandler,
      createDialogHandler,
      setWarningErrorText,
      closeReplyMessageFlowHandler,
      setMessageText,
      setWaitAIWidget,
      handleDialogOnClick,
    },
  };
}
