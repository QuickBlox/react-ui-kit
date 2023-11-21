import React, { useEffect, useState } from 'react';
import UiKitTheme from '../../../themes/UiKitTheme';
import ActiveSvg from '../../../components/UI/svgs/ActiveSvg/ActiveSvg';
import LoaderComponent from '../../../components/UI/Placeholders/LoaderComponent/LoaderComponent';
import { DialogViewModel } from '../DialogViewModel';
import { FunctionTypeStringToVoid } from '../../../../CommonTypes/BaseViewModel';

type MessageInputProps = {
  messageText: string;
  onChangeText: FunctionTypeStringToVoid;
  sendText: FunctionTypeStringToVoid;
  renderSendIcon: React.ReactNode;
  renderAttachment: React.ReactNode;
  isRecording: boolean;
  renderVoiceRecorder: React.ReactNode;
  renderVoiceRecordProgress: React.ReactNode;
  renderAIWidget: React.ReactNode;
  waitAIWidget: boolean;
  messagesViewModel: DialogViewModel;
  maxWidthToResizing: string;
  theme?: UiKitTheme;
};
// eslint-disable-next-line react/function-component-definition
const MessageInput: React.FC<MessageInputProps> = ({
  messageText,
  onChangeText,
  sendText,
  renderSendIcon,
  renderAttachment,
  isRecording,
  renderVoiceRecorder,
  renderVoiceRecordProgress,
  renderAIWidget,
  waitAIWidget,
  messagesViewModel,
  maxWidthToResizing,
  theme = undefined,
}: MessageInputProps) => {
  const [currentMessageText, setCurrentMessageText] =
    useState<string>(messageText);
  const [isVoiceMessage, setVoiceMessage] = useState(true);

  useEffect(() => {
    setCurrentMessageText(messageText);
  }, [messageText]);

  function sendTextMessageActions() {
    if (sendText) {
      sendText(currentMessageText);
    }
  }

  return (
    <div
      style={{
        flex: `flex: 1 1 ${maxWidthToResizing}`,
      }}
      onBlur={() => {
        if (!(currentMessageText && currentMessageText.length > 0)) {
          setVoiceMessage(true);
        }
      }}
      className="message-view-container--chat-input"
    >
      {renderAttachment}
      {/*  start InputWidgetToRightPlaceHolder */}
      {/* {InputWidgetToRightPlaceHolder && ( */}
      {/*  <div> */}
      {/*    <ActiveSvg */}
      {/*      content={InputWidgetToRightPlaceHolder.renderWidget()} */}
      {/*      clickAction={() => { */}
      {/*        console.log('click left place golder widget'); */}
      {/*        if (messagesViewModel?.loading) return; */}
      {/*        setIsRecording(!isRecording); */}
      {/*        setUseAudioWidget(true); */}
      {/*      }} */}
      {/*      touchAction={() => { */}
      {/*        console.log('touch left place golder widget'); */}
      {/*      }} */}
      {/*    /> */}
      {/*  </div> */}
      {/* )} */}
      {/* end InputWidgetToRightPlaceHolder */}
      {!isRecording && (
        <div className="input-text-message">
          <div className="type-message">
            <textarea
              style={theme ? { backgroundColor: theme.chatInput() } : {}}
              disabled={messagesViewModel?.loading}
              value={currentMessageText}
              onFocus={() => {
                setVoiceMessage(false);
              }}
              onChange={(event) => {
                // setCurrentMessageText(event.target.value);
                onChangeText(event.target.value);
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
          </div>
          {renderAIWidget}
        </div>
      )}

      {isRecording && renderVoiceRecordProgress}
      {!isVoiceMessage && !waitAIWidget && (
        <div>
          <ActiveSvg
            content={renderSendIcon}
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
      {waitAIWidget ? (
        <div
          style={{
            height: '44px',
            width: '24px',
          }}
        >
          <LoaderComponent width="24" height="24" color="var(--caption)" />
        </div>
      ) : (
        isVoiceMessage && renderVoiceRecorder
      )}
    </div>
  );
};

export default MessageInput;
