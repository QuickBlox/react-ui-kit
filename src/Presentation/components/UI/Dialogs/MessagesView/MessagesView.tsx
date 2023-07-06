import React, { useEffect, useRef, useState } from 'react';
import './MessagesView.scss';
import { DialogEntity } from '../../../../../Domain/entity/DialogEntity';
import useQBConnection from '../../../providers/QuickBloxUIKitProvider/useQBConnection';
import ScrollableContainer from '../../../containers/ScrollableContainer/ScrollableContainer';
import { MessageEntity } from '../../../../../Domain/entity/MessageEntity';
import ChatMessageAttachmentEntity from '../../../../../Domain/entity/ChatMessageAttachmentEntity';
import { FileType } from '../../../../../Domain/entity/FileTypes';
import ImageEmpty from '../../svgs/Icons/Media/ImageEmpty';
import ImagePlay from '../../svgs/Icons/Toggle/ImagePlay';
import ColumnContainer from '../../../containers/ColumnContainer/ColumnContainer';
import ImageFile from '../../svgs/Icons/Media/ImageFile';
import { MessagesViewModel } from './MessagesViewModel';
import useMessagesViewModel from './useMessagesViewModel';
import LoaderComponent from '../../Placeholders/LoaderComponent/LoaderComponent';
import ErrorComponent from '../../Placeholders/ErrorComponent/ErrorComponent';
import HeaderMessages from './HeaderMessages/HeaderMessages';
import { FunctionTypeVoidToVoid } from '../../../../Views/Base/BaseViewModel';
import VideoAttachmentComponent from './VideoAttachmentComponent/VideoAttachmentComponent';
import ImageAttachmentComponent from './ImageAttachmentComponent/ImageAttachmentComponent';
import { DialogType } from '../../../../../Domain/entity/DialogTypes';
import { GroupDialogEntity } from '../../../../../Domain/entity/GroupDialogEntity';
import { PrivateDialogEntity } from '../../../../../Domain/entity/PrivateDialogEntity';
import { UserEntity } from '../../../../../Domain/entity/UserEntity';
import useQbDataContext from '../../../providers/QuickBloxUIKitProvider/useQbDataContext';
import { Pagination } from '../../../../../Domain/repository/Pagination';
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getDateShortFormatEU,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  formatShortTime3,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  formatShortTime4,
  getTimeShort24hFormat,
} from '../../../../../utils/DateTimeFormatter';
import User from '../../svgs/Icons/Contents/User';
import ActiveSvg from '../../svgs/ActiveSvg/ActiveSvg';
import AttachmentIcon from '../../svgs/Icons/Media/Attachment';
import SendIcon from '../../svgs/Icons/Actions/Send';
import AudioAttachmentComponent from './AudioAttachmentComponent/AudioAttachmentComponent';
import AudioFile from '../../svgs/Icons/Media/AudioFile';
import VoiceIcon from '../../svgs/Icons/Actions/Voice';
import SentStatusIcon from '../../svgs/Icons/Status/Sent';
import ViewedDelivered from '../../svgs/Icons/Status/ViewedDelivered';
import { stringifyError } from '../../../../../utils/parse';
import VoiceRecordingProgress from './VoiceRecordingProgress/VoiceRecordingProgress';
import UiKitTheme from '../../../../assets/UiKitTheme';
import { DialogsViewModel } from '../../../../Views/Dialogs/DialogViewModel';
import { HighLightLink, messageHasUrls } from './HighLightLink/HighLightLink';

type HeaderDialogsMessagesProps = {
  dialogsViewModel: DialogsViewModel;
  InformationHandler?: FunctionTypeVoidToVoid;
  maxWidthToResize?: string;
  theme?: UiKitTheme;
};

// eslint-disable-next-line react/function-component-definition
const MessagesView: React.FC<HeaderDialogsMessagesProps> = ({
  dialogsViewModel,
  InformationHandler,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  maxWidthToResize = undefined,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  theme = undefined,
}: HeaderDialogsMessagesProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const maxWidthToResizing =
    maxWidthToResize || '$message-view-container-wrapper-min-width';
  // const maxWidthToResizing = '720px'; // $message-view-container-wrapper-min-width:

  const currentContext = useQbDataContext();
  const currentUserId =
    currentContext.storage.REMOTE_DATA_SOURCE.authInformation?.userId;
  const currentUserName =
    currentContext.storage.REMOTE_DATA_SOURCE.authInformation?.userName;
  const { connectionRepository, browserOnline } = useQBConnection();
  const [dialogMessagesCount, setDialogMessageCount] = useState(100);
  const [hasMore, setHasMore] = React.useState(true);
  const [scrollUpToDown, setScrollUpToDown] = React.useState(false);
  const [messagesToView, setMessagesToView] = React.useState<MessageEntity[]>(
    [],
  );

  const messagesViewModel: MessagesViewModel = useMessagesViewModel(
    dialogsViewModel.entity?.type,
    dialogsViewModel.entity,
  );

  const { maxFileSize } = currentContext.InitParams;

  useEffect(() => {
    console.log('HAVE NEW DIALOG');
    // messagesViewModel.getMessages(new Pagination());
    messagesViewModel.entity = dialogsViewModel.entity;
    setMessagesToView([]);
  }, [dialogsViewModel.entity]);

  useEffect(() => {
    console.log('HAVE NEW ENTITY');
    messagesViewModel.getMessages(new Pagination());
  }, [messagesViewModel.entity]);
  //
  useEffect(() => {
    console.log('HAVE NEW ENTITY');
    dialogsViewModel.setWaitLoadingStatus(messagesViewModel?.loading);
  }, [messagesViewModel?.loading]);
  //
  function prepareFirstPage(initData: MessageEntity[]) {
    const firstPageSize =
      messagesViewModel.messages.length < 47
        ? messagesViewModel.messages.length
        : 47;

    // for (let i = 0; i < firstPageSize; i += 1) {
    for (let i = firstPageSize - 1; i >= 0; i -= 1) {
      initData.push(messagesViewModel.messages[i]);
    }
  }

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

  const getSenderName = (sender?: UserEntity): string | undefined => {
    if (!sender) return undefined;

    return (
      sender.full_name || sender.login || sender.email || sender.id.toString()
    );
  };

  const renderMessage = (message: MessageEntity, index: number) => {
    const SystemMessage = 'SystemMessage';
    const IncomingMessage = 'IncomingMessage';
    const OutgoingMessage = 'OutgoingMessage';

    console.log('render message: ', JSON.stringify(message), ' index: ', index);
    let messageView: JSX.Element;
    const checkMessageType = (m: MessageEntity): string => {
      if (m.notification_type && m.notification_type.length > 0) {
        return SystemMessage;
      }
      if (
        (m.sender && m.sender.id.toString() !== currentUserId?.toString()) ||
        m.sender_id.toString() !== currentUserId?.toString()
      ) {
        return IncomingMessage;
      }

      return OutgoingMessage;
    };

    const messageTypes: string = checkMessageType(message);

    const messageContentRender = (mc: MessageEntity) => {
      const messageText = <div>{mc.message}</div>;
      let messageContent: JSX.Element = messageText;

      const attachmentContentRender = (att: ChatMessageAttachmentEntity) => {
        let contentPlaceHolder: JSX.Element = <div>{att.type.toString()}</div>;

        if (att.type.toString().includes(FileType.video)) {
          contentPlaceHolder = att.file ? (
            <VideoAttachmentComponent videoFile={att.file} />
          ) : (
            <ImagePlay />
          );
        }
        if (att.type.toString().includes(FileType.audio)) {
          contentPlaceHolder = att.file ? (
            <AudioAttachmentComponent audioFile={att.file} />
          ) : (
            <AudioFile />
          );
        }
        if (att.type.toString().includes(FileType.image)) {
          contentPlaceHolder = att.file ? (
            <ImageAttachmentComponent imageFile={att.file} />
          ) : (
            <ImageEmpty />
          );
        }
        if (att.type.toString().includes(FileType.text)) {
          contentPlaceHolder = att.file ? (
            <div>TEXT</div>
          ) : (
            <ImageFile applyZoom />
          );
        }
        let contentResult: JSX.Element = (
          <div className="message-view-container--message-content-wrapper">
            {contentPlaceHolder}
          </div>
        );

        if (att.type === FileType.text) {
          contentResult = (
            <div className="message-view-container--file-message-content-wrapper">
              <div
                style={theme ? { backgroundColor: theme.caption() } : {}}
                className="message-view-container__file-message-icon"
              >
                {contentPlaceHolder}
              </div>
              <div>{att.name || 'file'}</div>
            </div>
          );
        }

        return contentResult;
      };

      if (mc.attachments && mc.attachments.length > 0) {
        messageContent = (
          <ColumnContainer maxWidth="100%">
            {mc.attachments.map((attachment) =>
              attachmentContentRender(attachment),
            )}
            {messageText}
          </ColumnContainer>
        );
      }

      if (
        messageHasUrls(mc.message) &&
        !(mc.attachments && mc.attachments.length > 0)
      ) {
        return <HighLightLink messageText={mc.message} />;
      }

      return messageContent;
    };

    if (messageTypes === SystemMessage) {
      messageView = (
        <div
          className="message-view-container--system-message-wrapper"
          key={message.id}
        >
          <div
            style={theme ? { backgroundColor: theme.disabledElements() } : {}}
            className="message-view-container--system-message-wrapper__date_container"
          >
            <div>{getDateShortFormatEU(message.date_sent)},</div>
          </div>
          {/* <div>{getTimeShort24hFormat(message.date_sent)}</div> */}
          <div>{message.message}</div>
        </div>
      );
    } else if (messageTypes === IncomingMessage) {
      messageView = (
        <div
          className="message-view-container--incoming-message-wrapper"
          key={message.id}
        >
          <div className="message-view-container--incoming-message-wrapper__avatar">
            <div
              style={theme ? { backgroundColor: theme.disabledElements() } : {}}
              className="message-view-container__sender-avatar"
            >
              <User
                width="24"
                height="24"
                applyZoom
                color="var(--secondary-text)"
              />
            </div>
          </div>
          <div className="message-view-container--incoming-message-container">
            <div
              style={theme ? { color: theme.secondaryText() } : {}}
              className="message-view-container__sender-name"
            >
              {getSenderName(message.sender) || message.sender_id.toString()}
            </div>
            <div
              style={
                theme
                  ? {
                      color: theme.mainText(),
                      backgroundColor: theme.incomingBackground(),
                    }
                  : {}
              }
              className="message-view-container__sender-message"
            >
              {messageContentRender(message)}
            </div>
          </div>
          <div
            style={theme ? { color: theme.mainText() } : {}}
            className="message-view-container__incoming-time"
          >
            {getTimeShort24hFormat(message.date_sent)}
          </div>
        </div>
      );
    } else {
      messageView = (
        <div
          className="message-view-container--outgoing-message-wrapper"
          key={message.id}
        >
          <div className="message-view-container__status-message">
            <div className="message-view-container__incoming-time">
              {message.delivered_ids && message.delivered_ids.length > 0 ? (
                <ViewedDelivered
                  width="13"
                  height="13"
                  applyZoom
                  color={theme ? theme.mainElements() : 'var(--main-elements)'}
                />
              ) : (
                <SentStatusIcon
                  width="13"
                  height="13"
                  applyZoom
                  color={theme ? theme.mainElements() : 'var(--main-elements)'}
                />
              )}
            </div>
            <div
              style={theme ? { color: theme.mainText() } : {}}
              className="message-view-container__incoming-time"
            >
              {getTimeShort24hFormat(message.date_sent)}
            </div>
          </div>

          <div
            style={
              theme
                ? {
                    color: theme.mainText(),
                    backgroundColor: theme.outgoingBackground(),
                  }
                : {}
            }
            className="message-view-container__outgoing-message"
          >
            {messageContentRender(message)}
          </div>
        </div>
      );
    }

    return messageView;
  };

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

  const [fileToSend, setFileToSend] = useState<File | null>(null);
  const [messageText, setMessageText] = useState<string>('');
  const [warningErrorText, setWarningErrorText] = useState<string>('');

  useEffect(() => {
    setWarningErrorText(messagesViewModel.typingText);
  }, [messagesViewModel.typingText]);

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

  const showErrorMessage = (errorMessage: string) => {
    setWarningErrorText(errorMessage);
    setTimeout(() => {
      setWarningErrorText('');
    }, 3000);
  };

  useEffect(() => {
    console.log('have Attachments');
    const MAXSIZE = maxFileSize || 90 * 1000000;
    const MAXSIZE_FOR_MESSAGE = MAXSIZE / (1024 * 1024);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const flag = fileToSend?.size && fileToSend?.size < MAXSIZE;

    if (fileToSend?.size && fileToSend?.size < MAXSIZE) {
      messagesViewModel.sendAttachmentMessage(fileToSend);
    } else if (fileToSend) {
      showErrorMessage(
        `file size ${fileToSend?.size} must be less then ${MAXSIZE_FOR_MESSAGE} mb.`,
      );
    }
  }, [fileToSend]);

  const [isVoiceMessage, setVoiceMessage] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  //
  const [permission, setPermission] = useState(false);

  // const [recordingStatus, setRecordingStatus] = useState('inactive');

  const [stream, setStream] = useState<MediaStream>();
  // const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>();
  const mediaRecorder = useRef<MediaRecorder>();
  const [resultAudioBlob, setResultAudioBlob] = useState<Blob>();

  const [audioChunks, setAudioChunks] = useState<Array<Blob>>([]);

  const mimeType = 'audio/webm;codecs=opus'; // audio/ogg audio/mpeg audio/webm audio/x-wav audio/mp4
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    // setRecordingStatus('recording');
    // audio/mp4;codecs=mp4a audio/webm;codecs=opus audio/webm;codecs=vp9,opus
    const mimeContent = window.MediaRecorder.isTypeSupported(
      'audio/mp4;codecs=mp4a',
    )
      ? 'audio/mp4;codecs=mp4a'
      : 'audio/webm;codecs=opus';
    /*
    this.mediaRecorder = new MediaRecorder(window.stream, {mimeType: mimeContent});
   */
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
      const audioBlob = new Blob(audioChunks, { type: mimeType });

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

  //
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
    if (resultAudioBlob) {
      const voiceMessage = blobToFile(
        resultAudioBlob,
        `${currentUserName || ''}_voice_message.webm`,
      );

      setFileToSend(voiceMessage);
    }
  }, [resultAudioBlob]);
  // test component version
  // useEffect(() => {
  //   if (isRecording) {
  //     setWarningErrorText(`Your voice is recording during for 1 minute`);
  //   } else {
  //     setWarningErrorText('');
  //   }
  // }, [isRecording]);
  // work version below:
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

  function sendTextMessageActions() {
    if (messagesViewModel?.loading) return;
    setVoiceMessage(true);
    if (messageText.length > 0 && messageText.length <= 1000) {
      const messageTextToSend = messageText;

      setMessageText('');
      messagesViewModel.sendTextMessage(messageTextToSend);
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

  return (
    <div
      style={
        maxWidthToResize
          ? {
              maxWidth: `${maxWidthToResizing}`,
              minWidth: `$message-view-container-wrapper-min-width`,
              // width: `${maxWidthToResizing}`,
              width: '100%',
            }
          : {}
      }
      className="message-view-container"
    >
      <div
        style={{
          flexGrow: `1`,
          flexShrink: `1`,
          flexBasis: `${maxWidthToResizing}`,
        }}
        className="message-view-container--header"
      >
        <HeaderMessages
          dialog={messagesViewModel.entity}
          InformationHandler={InformationHandler}
          countMembers={getCountDialogMembers(dialogsViewModel.entity)}
        />
      </div>
      <div
        style={
          theme
            ? {
                flexGrow: `1`,
                flexShrink: `1`,
                flexBasis: `${maxWidthToResizing}`,
                backgroundColor: theme.mainElements(),
              }
            : {
                flexGrow: `1`,
                flexShrink: `1`,
                flexBasis: `${maxWidthToResizing}`,
              }
        }
        className="message-view-container--information"
      >
        <div>
          connection status:
          {browserOnline ? 'online ' : 'offline '}
          {/* eslint-disable-next-line no-nested-ternary */}
          {connectionRepository.isChatConnected() === undefined
            ? 'unexpected undefined'
            : connectionRepository.isChatConnected()
            ? 'connected'
            : 'disconnected'}
        </div>
        {hasMore && (
          <div style={{ color: 'red' }}>
            unread: {dialogMessagesCount - messagesToView.length}
          </div>
        )}
        <div>{` current user id: ${currentUserId || 'no user'}`}</div>
      </div>
      <div
        style={
          theme
            ? {
                flexGrow: `1`,
                flexShrink: `1`,
                flexBasis: `${maxWidthToResizing}`,
                backgroundColor: theme.secondaryBackground(), // var(--secondary-background);
              }
            : {
                flexGrow: `1`,
                flexShrink: `1`,
                flexBasis: `${maxWidthToResizing}`,
              }
        }
        className="message-view-container--messages"
      >
        {messagesViewModel?.error && (
          <ErrorComponent
            title={messagesViewModel?.error}
            ClickActionHandler={() => {
              alert('call click retry');
            }}
          />
        )}
        {messagesViewModel &&
          messagesViewModel.messages &&
          messagesViewModel.messages.length > 0 &&
          messagesToView &&
          messagesToView.length > 0 && (
            <ScrollableContainer
              data={messagesToView}
              renderItem={renderMessage}
              onEndReached={fetchMoreData}
              onEndReachedThreshold={0.8}
              refreshing={messagesViewModel?.loading}
              autoScrollToBottom={scrollUpToDown}
            />
          )}
        {messagesViewModel?.loading && (
          <div
            style={{
              height: '44px',
              width: '44px',
            }}
          >
            <LoaderComponent
              width="44"
              height="44"
              color="var(--color-background-info)"
            />
          </div>
        )}
        <div
          style={theme ? { color: theme.mainElements() } : {}}
          className="message-view-container--warning-error"
        >
          {warningErrorText}
        </div>
      </div>

      <div
        style={{
          flex: `flex: 1 1 ${maxWidthToResizing}`,
        }}
        onBlur={() => {
          if (!(messageText && messageText.length > 0)) {
            setVoiceMessage(true);
          }
        }}
        className="message-view-container--chat-input"
      >
        <label
          htmlFor="btnUploadAttachment"
          style={{
            cursor: 'pointer',
          }}
        >
          <div>
            <ActiveSvg
              content={
                <AttachmentIcon
                  width="32"
                  height="32"
                  applyZoom
                  color={
                    theme ? theme.inputElements() : 'var(--input-elements)'
                  }
                />
              }
              clickAction={() => {
                console.log('click send message');
              }}
              touchAction={() => {
                console.log('touch send message');
              }}
            />
          </div>
          <input
            id="btnUploadAttachment"
            type="file"
            accept="image/*, audio/*, video/*, .pdf, .txt,"
            style={{ display: 'none' }}
            onChange={(event) => {
              ChangeFileHandler(event);
            }}
          />
        </label>

        {!isRecording && (
          <textarea
            style={theme ? { backgroundColor: theme.chatInput() } : {}}
            disabled={messagesViewModel?.loading}
            value={messageText}
            onFocus={() => {
              setVoiceMessage(false);
            }}
            onChange={(event) => {
              setMessageText(event.target.value);
            }}
            onInput={() => {
              messagesViewModel.sendTypingTextMessage();
            }}
            onKeyDown={(e) => {
              console.log(
                `onKeyDown: ${e.key} shift ${
                  e.shiftKey ? 'true' : 'false'
                } ctrl ${e.ctrlKey ? 'true' : 'false'}`,
              );
              if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey) {
                sendTextMessageActions();
              }
            }}
            placeholder="enter text to send"
          />
        )}

        {isRecording && (
          <VoiceRecordingProgress
            startStatus={isRecording}
            longRecInSec={60}
            ClickActionHandler={() => {
              console.log('click send voice message');
              if (messagesViewModel?.loading) return;
              setIsRecording(!isRecording);
            }}
            TouchActionHandler={() => {
              console.log('touch send voice message');
              if (messagesViewModel?.loading) return;
              setIsRecording(!isRecording);
            }}
          />
        )}

        {!isVoiceMessage && (
          <div>
            <ActiveSvg
              content={
                <SendIcon
                  width="21"
                  height="18"
                  applyZoom
                  color={theme ? theme.mainElements() : 'var(--main-elements)'}
                />
              }
              clickAction={() => {
                console.log('click send message');
                sendTextMessageActions();
              }}
              touchAction={() => {
                console.log('touch send message');
              }}
            />
          </div>
        )}
        {isVoiceMessage && (
          <div>
            <ActiveSvg
              content={
                <VoiceIcon
                  width="21"
                  height="18"
                  applyZoom
                  color={isRecording ? 'var(--error)' : 'var(--input-elements)'}
                />
              }
              clickAction={() => {
                console.log('click send voice message');
                if (messagesViewModel?.loading) return;
                setIsRecording(!isRecording);
              }}
              touchAction={() => {
                console.log('touch send message');
                if (messagesViewModel?.loading) return;
                setIsRecording(!isRecording);
              }}
            />
          </div>
        )}
      </div>
      {/* <div className="message-view-container--warning-error"> */}
      {/*  {warningErrorText} */}
      {/* </div> */}
    </div>
  );
};

export default MessagesView;
