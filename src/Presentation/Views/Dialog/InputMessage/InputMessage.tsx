import React, { ChangeEvent, useState } from 'react';
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
const InputMessage = ({
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
  const [isVoiceMessage, setVoiceMessage] = useState(true);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChangeText(event.target.value);
  };

  function sendTextMessageActions() {
    if (sendText) {
      sendText(messageText);
      onChangeText('');
    }
  }

  return (
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
      {renderAttachment}
      {/*  start InputWidgetToRightPlaceHolder */}
      {/* {InputWidgetToRightPlaceHolder && ( */}
      {/*  <div> */}
      {/*    <ActiveSvg */}
      {/*      content={InputWidgetToRightPlaceHolder.renderWidget()} */}
      {/*      onClick={() => { */}
      {/*        console.log('click left place golder widget'); */}
      {/*        if (messagesViewModel?.loading) return; */}
      {/*        setIsRecording(!isRecording); */}
      {/*        setUseAudioWidget(true); */}
      {/*      }} */}
      {/*      onTouch={() => { */}
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
              value={messageText}
              onFocus={() => {
                setVoiceMessage(false);
              }}
              onChange={handleChange}
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
              placeholder="Type message"
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
            onClick={() => {
              console.log('click send message');
              sendTextMessageActions();
            }}
            onTouch={() => {
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

export default InputMessage;
