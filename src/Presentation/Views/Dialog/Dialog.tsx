import React, { useEffect, useState } from 'react';
import './Dialog.scss';
import useQBConnection from '../../providers/QuickBloxUIKitProvider/useQBConnection';
import { DialogViewModel } from './DialogViewModel';
import LoaderComponent from '../../components/UI/Placeholders/LoaderComponent/LoaderComponent';
import ErrorComponent from '../../components/UI/Placeholders/ErrorComponent/ErrorComponent';
import UiKitTheme from '../../themes/UiKitTheme';
import { ErrorToast } from './ErrorToast/ErrorToast';

type DialogProps = {
  messagesViewModel: DialogViewModel;
  maxWidthToResize?: string;
  warningErrorText: string;
  showErrorToast: boolean;
  messageErrorToast: string;
  renderHeader: React.ReactNode;
  renderMessageList: React.ReactNode;
  renderReplyMessagesPreview: React.ReactNode;
  showReplyMessage: boolean;
  renderMessageInput: React.ReactNode;
  theme?: UiKitTheme;
  headerContent?: React.ReactNode; // TODO : need refactor for adaptive
  rootStyles?: React.CSSProperties;
  messagesContainerStyles?: React.CSSProperties;
};

// eslint-disable-next-line react/function-component-definition
const Dialog: React.FC<DialogProps> = ({
  messagesViewModel,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  maxWidthToResize = undefined,
  warningErrorText,
  showErrorToast,
  messageErrorToast,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  renderHeader,
  renderMessageList,
  renderReplyMessagesPreview,
  showReplyMessage,
  renderMessageInput,
  theme = undefined,
  headerContent = undefined,
  rootStyles = {},
  messagesContainerStyles = {},
}: DialogProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const maxWidthToResizing =
    maxWidthToResize || '$message-view-container-wrapper-min-width';
  // const maxWidthToResizing = '720px'; // $message-view-container-wrapper-min-width:

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { connectionRepository, browserOnline } = useQBConnection();

  //  const [showReplyMessage, setShowReplyMessage] = useState(false);
  const [showCurrentErrorToast, setShowCurrentErrorToast] =
    useState<boolean>(showErrorToast);
  const [currentMessageErrorToast, setCurrentMessageErrorToast] =
    useState<string>(messageErrorToast);

  useEffect(() => {
    setShowCurrentErrorToast(showErrorToast);
  }, [showErrorToast]);

  useEffect(() => {
    setCurrentMessageErrorToast(messageErrorToast);
  }, [messageErrorToast]);

  useEffect(() => {
    if (showCurrentErrorToast || currentMessageErrorToast) {
      setTimeout(() => {
        setShowCurrentErrorToast(false);
        setCurrentMessageErrorToast('');
      }, 18000);
    }
  }, [showCurrentErrorToast]);

  const [currentWarningErrorText, setCurrentWarningErrorText] =
    useState<string>('');

  useEffect(() => {
    setCurrentWarningErrorText(warningErrorText);
  }, [warningErrorText]);

  useEffect(() => {
    setCurrentWarningErrorText(messagesViewModel.typingText);
  }, [messagesViewModel.typingText]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const startReplyMessageFrowHandler = () => {
  //   setShowReplyMessage(true);
  // };

  return (
    <div
      style={
        maxWidthToResize
          ? {
              maxWidth: `${maxWidthToResizing}`,
              minWidth: `$message-view-container-wrapper-min-width`,
              // width: `${maxWidthToResizing}`,
              width: '100%',
              ...rootStyles,
            }
          : rootStyles
      }
      className="message-view-container"
    >
      {headerContent || (
        <div
          style={{
            flexGrow: `1`,
            flexShrink: `1`,
            flexBasis: `${maxWidthToResizing}`,
          }}
          className="message-view-container--header"
        >
          {/* <DialogHeader */}
          {/*  dialog={messagesViewModel.entity} */}
          {/*  onClickInfo={onDialogInformationHandler} */}
          {/*  countMembers={getCountDialogMembers(dialogsViewModel.entity)} */}
          {/* /> */}
          {renderHeader}
        </div>
      )}
      {/* <div */}
      {/*  style={{ */}
      {/*    flexGrow: `1`, */}
      {/*    flexShrink: `1`, */}
      {/*    flexBasis: `${maxWidthToResizing}`, */}
      {/*  }} */}
      {/*  className="message-view-container--header" */}
      {/* > */}
      {/*  {useUpContent && upHeaderContent} */}
      {/*  <DialogHeader */}
      {/*    dialog={messagesViewModel.entity} */}
      {/*    onClickInfo={onDialogInformationHandler} */}
      {/*    countMembers={getCountDialogMembers(dialogsViewModel.entity)} */}
      {/*  /> */}
      {/*  {useSubContent && subHeaderContent} */}
      {/* </div> */}
      {showCurrentErrorToast && !messagesViewModel?.loading ? (
        <ErrorToast messageText={currentMessageErrorToast} />
      ) : null}

      {/* <div */}
      {/*  style={{ */}
      {/*    flexGrow: `1`, */}
      {/*    flexShrink: `1`, */}
      {/*    flexBasis: `${maxWidthToResizing}`, */}
      {/*  }} */}
      {/*  className="message-view-container--information" */}
      {/* > */}
      {/*  <div> */}
      {/*    connection status: */}
      {/*    {browserOnline ? 'online ' : 'offline '} */}
      {/*    /!* eslint-disable-next-line no-nested-ternary *!/ */}
      {/*    {connectionRepository.isChatConnected() === undefined */}
      {/*      ? 'unexpected undefined' */}
      {/*      : connectionRepository.isChatConnected() */}
      {/*      ? 'connected' */}
      {/*      : 'disconnected'} */}
      {/*  </div> */}
      {/*  {hasMore && ( */}
      {/*    <div style={{ color: 'red' }}> */}
      {/*      unread: {dialogMessagesCount - messagesToView.length} */}
      {/*    </div> */}
      {/*  )} */}
      {/*  <div>{` current user id: ${currentUserId || 'no user'}`}</div> */}
      {/* </div> */}
      {/* version 2 start */}
      {/* <div */}
      {/*  style={ */}
      {/*    theme */}
      {/*      ? { */}
      {/*          flexGrow: `1`, */}
      {/*          flexShrink: `1`, */}
      {/*          flexBasis: `${maxWidthToResizing}`, */}
      {/*          backgroundColor: theme.mainElements(), */}
      {/*        } */}
      {/*      : { */}
      {/*          flexGrow: `1`, */}
      {/*          flexShrink: `1`, */}
      {/*          flexBasis: `${maxWidthToResizing}`, */}
      {/*        } */}
      {/*  } */}
      {/*  className="message-view-container--information" */}
      {/* > */}
      {/*  <div> */}
      {/*    connection status: */}
      {/*    {browserOnline ? 'online ' : 'offline '} */}
      {/*    /!* eslint-disable-next-line no-nested-ternary *!/ */}
      {/*    {connectionRepository.isChatConnected() === undefined */}
      {/*      ? 'unexpected undefined' */}
      {/*      : connectionRepository.isChatConnected() */}
      {/*      ? 'connected' */}
      {/*      : 'disconnected'} */}
      {/*  </div> */}
      {/*  {hasMore && ( */}
      {/*    <div style={{ color: 'red' }}> */}
      {/*      unread: {dialogMessagesCount - messagesToView.length} */}
      {/*    </div> */}
      {/*  )} */}
      {/*  <div>{` current user id: ${currentUserId || 'no user'}`}</div> */}
      {/* </div> */}
      {/* version 2 end */}
      <div
        style={
          theme
            ? {
                flexGrow: `1`,
                flexShrink: `1`,
                flexBasis: `${maxWidthToResizing}`,
                backgroundColor: theme.secondaryBackground(), // var(--secondary-background);
                ...messagesContainerStyles,
              }
            : {
                flexGrow: `1`,
                flexShrink: `1`,
                flexBasis: `${maxWidthToResizing}`,
                ...messagesContainerStyles,
              }
        }
        className="message-view-container--messages"
      >
        {messagesViewModel?.error && !messagesViewModel.loading && (
          <ErrorComponent
            title={messagesViewModel?.error}
            ClickActionHandler={() => {
              alert('call click retry');
            }}
          />
        )}
        {renderMessageList}
        {/* {(messagesViewModel?.loading || waitAIWidget) && ( */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
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
        </div>

        <div
          style={theme ? { color: theme.mainElements() } : {}}
          className="message-view-container--warning-error"
        >
          {currentWarningErrorText}
        </div>
        {showReplyMessage ? renderReplyMessagesPreview : null}
      </div>

      {renderMessageInput}
      {/* <div */}
      {/* style={{ */}
      {/*   flex: `flex: 1 1 ${maxWidthToResizing}`, */}
      {/* }} */}
      {/* onBlur={() => { */}
      {/*   if (!(messageText && messageText.length > 0)) { */}
      {/*     setVoiceMessage(true); */}
      {/*   } */}
      {/* }} */}
      {/* className="message-view-container--chat-input" */}
      {/* > */}
      {/* <label */}
      {/*   htmlFor="btnUploadAttachment" */}
      {/*   style={{ */}
      {/*     cursor: 'pointer', */}
      {/*   }} */}
      {/* > */}
      {/*   <div> */}
      {/*     <ActiveSvg */}
      {/*       content={ */}
      {/*         <AttachmentIcon */}
      {/*           width="32" */}
      {/*           height="32" */}
      {/*           applyZoom */}
      {/*           color={ */}
      {/*             theme ? theme.inputElements() : 'var(--input-elements)' */}
      {/*           } */}
      {/*         /> */}
      {/*       } */}
      {/*       clickAction={() => { */}
      {/*         console.log('click send message'); */}
      {/*       }} */}
      {/*       touchAction={() => { */}
      {/*         console.log('touch send message'); */}
      {/*       }} */}
      {/*     /> */}
      {/*   </div> */}
      {/*   <input */}
      {/*     id="btnUploadAttachment" */}
      {/*     type="file" */}
      {/*     accept="image/*, audio/*, video/*, .pdf, .txt, .apk, .zip, .ipa, .ppt, .pptx, .doc, .docx, .xls, .xlsx, .json, .log" */}
      {/*     style={{ display: 'none' }} */}
      {/*     onChange={(event) => { */}
      {/*       ChangeFileHandler(event); */}
      {/*     }} */}
      {/*   /> */}
      {/* </label> */}
      {/* /!*  start InputWidgetToRightPlaceHolder *!/ */}
      {/* /!* {InputWidgetToRightPlaceHolder && ( *!/ */}
      {/* /!*  <div> *!/ */}
      {/* /!*    <ActiveSvg *!/ */}
      {/* /!*      content={InputWidgetToRightPlaceHolder.renderWidget()} *!/ */}
      {/* /!*      clickAction={() => { *!/ */}
      {/* /!*        console.log('click left place golder widget'); *!/ */}
      {/* /!*        if (messagesViewModel?.loading) return; *!/ */}
      {/* /!*        setIsRecording(!isRecording); *!/ */}
      {/* /!*        setUseAudioWidget(true); *!/ */}
      {/* /!*      }} *!/ */}
      {/* /!*      touchAction={() => { *!/ */}
      {/* /!*        console.log('touch left place golder widget'); *!/ */}
      {/* /!*      }} *!/ */}
      {/* /!*    /> *!/ */}
      {/* /!*  </div> *!/ */}
      {/* /!* )} *!/ */}
      {/* /!* end InputWidgetToRightPlaceHolder *!/ */}
      {/* {!isRecording && ( */}
      {/*   <div className="input-text-message"> */}
      {/*     <div className="type-message"> */}
      {/*       <textarea */}
      {/*         style={theme ? { backgroundColor: theme.chatInput() } : {}} */}
      {/*         disabled={messagesViewModel?.loading} */}
      {/*         value={messageText} */}
      {/*         onFocus={() => { */}
      {/*           setVoiceMessage(false); */}
      {/*         }} */}
      {/*         onChange={(event) => { */}
      {/*           setMessageText(event.target.value); */}
      {/*         }} */}
      {/*         onInput={() => { */}
      {/*           messagesViewModel.sendTypingTextMessage(); */}
      {/*         }} */}
      {/*         onKeyDown={(e) => { */}
      {/*           console.log( */}
      {/*             `onKeyDown: ${e.key} shift ${ */}
      {/*               e.shiftKey ? 'true' : 'false' */}
      {/*             } ctrl ${e.ctrlKey ? 'true' : 'false'}`, */}
      {/*           ); */}
      {/*           if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey) { */}
      {/*             sendTextMessageActions(); */}
      {/*           } */}
      {/*         }} */}
      {/*         placeholder="enter text to send" */}
      {/*       /> */}
      {/*     </div> */}
      {/*     <div className="right"> */}
      {/*       {AIRephrase && ( */}
      {/*         <div */}
      {/*           className="icon" */}
      {/*           style={{ */}
      {/*             cursor: !waitAIWidget ? 'pointer' : '', */}
      {/*           }} */}
      {/*         > */}
      {/*           <AIWidgetActions */}
      {/*             widgetToRender={ */}
      {/*               <ToneIcon */}
      {/*                 width="24" */}
      {/*                 height="24" */}
      {/*                 applyZoom */}
      {/*                 color={theme ? theme.mainText() : 'var(--main-text)'} */}
      {/*               /> */}
      {/*             } */}
      {/*             items={getAIEditingMessagesItems()} */}
      {/*           /> */}
      {/*         </div> */}
      {/*       )} */}
      {/*     </div> */}
      {/*   </div> */}
      {/* )} */}

      {/* {isRecording && ( */}
      {/*   <VoiceRecordingProgress */}
      {/*     startStatus={isRecording} */}
      {/*     longRecInSec={60} */}
      {/*     onClick={() => { */}
      {/*       console.log('click send voice message'); */}
      {/*       if (messagesViewModel?.loading) return; */}
      {/*       setIsRecording(!isRecording); */}
      {/*     }} */}
      {/*     onTouch={() => { */}
      {/*       console.log('touch send voice message'); */}
      {/*       if (messagesViewModel?.loading) return; */}
      {/*       setIsRecording(!isRecording); */}
      {/*     }} */}
      {/*   /> */}
      {/* )} */}
      {/* {!isVoiceMessage && !waitAIWidget && ( */}
      {/*   <div> */}
      {/*     <ActiveSvg */}
      {/*       content={ */}
      {/*         <SendIcon */}
      {/*           width="21" */}
      {/*           height="18" */}
      {/*           applyZoom */}
      {/*           color={theme ? theme.mainElements() : 'var(--main-elements)'} */}
      {/*         /> */}
      {/*       } */}
      {/*       clickAction={() => { */}
      {/*         console.log('click send message'); */}
      {/*         sendTextMessageActions(); */}
      {/*       }} */}
      {/*       touchAction={() => { */}
      {/*         console.log('touch send message'); */}
      {/*       }} */}
      {/*     /> */}
      {/*   </div> */}
      {/* )} */}
      {/* {waitAIWidget ? ( */}
      {/*   <div */}
      {/*     style={{ */}
      {/*       height: '44px', */}
      {/*       width: '24px', */}
      {/*     }} */}
      {/*   > */}
      {/*     <LoaderComponent width="24" height="24" color="var(--caption)" /> */}
      {/*   </div> */}
      {/* ) : ( */}
      {/*   isVoiceMessage && ( */}
      {/*     <div> */}
      {/*       <ActiveSvg */}
      {/*         content={ */}
      {/*           <VoiceIcon */}
      {/*             width="21" */}
      {/*             height="18" */}
      {/*             applyZoom */}
      {/*             color={ */}
      {/*               isRecording ? 'var(--error)' : 'var(--input-elements)' */}
      {/*             } */}
      {/*           /> */}
      {/*         } */}
      {/*         clickAction={() => { */}
      {/*           console.log('click send voice message'); */}
      {/*           if (messagesViewModel?.loading) return; */}
      {/*           setIsRecording(!isRecording); */}
      {/*         }} */}
      {/*         touchAction={() => { */}
      {/*           console.log('touch send message'); */}
      {/*           if (messagesViewModel?.loading) return; */}
      {/*           setIsRecording(!isRecording); */}
      {/*         }} */}
      {/*       /> */}
      {/*     </div> */}
      {/*   ) */}
      {/* )} */}
      {/* </div> */}

      {/* <div className="message-view-container--warning-error"> */}
      {/*  {widgetTextContent} */}
      {/* </div> */}
    </div>
  );
};

export default Dialog;
