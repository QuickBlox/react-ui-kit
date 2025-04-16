import React, { ChangeEvent, ReactElement, useState } from 'react';
import cn from 'classnames';
import {
  FunctionTypeStringToVoid,
  FunctionTypeVoidToVoid,
} from '../../../CommonTypes/BaseViewModel';
import VoiceRecordingProgress from './VoiceRecordingProgress/VoiceRecordingProgress';
import AttachmentUploader from './AttachmentUploader/AttachmentUploader';
import './MessageInput.scss';
import { AttachmentSvg, SendSvg, VoiceSvg } from '../../icons';
import Loader from '../Loader/Loader';

export type MessageInputProps = {
  value: string;
  onChange?: FunctionTypeStringToVoid;
  onChanging?: FunctionTypeStringToVoid;
  onSend?: FunctionTypeStringToVoid;
  enableVoice?: boolean;
  onVoice?: FunctionTypeVoidToVoid;
  disableAttachment?: boolean;
  onAttachment: (event: React.ChangeEvent<HTMLInputElement>) => void;
  previewMessage?: ReactElement;
  rephrase?: ReactElement;
  loading?: boolean;
  placeholder?: string;
  disableActions?: boolean;
  className?: string;
};

// eslint-disable-next-line react/function-component-definition
const MessageInput = ({
  value,
  onChange,
  onChanging,
  onSend,
  enableVoice,
  onVoice,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  disableAttachment,
  onAttachment,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  previewMessage,
  rephrase,
  loading,
  placeholder,
  disableActions = false,
  className,
}: MessageInputProps) => {
  const [isVoiceMessage, setVoiceMessage] = useState(true);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };
  const handleChanging = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (onChanging) {
      onChanging(event.target.value);
    }
  };

  function sendTextMessageActions() {
    if (value && onSend) {
      onSend(value);
      if (onChange && !disableActions) {
        onChange('');
      }
    }
  }

  return (
      <div className={cn('chat-container', className)}>
        {previewMessage}
        <div
          onBlur={() => {
            if (!(value && value.length > 0)) {
              setVoiceMessage(true);
            }
          }}
          className="chat-input"
        >
          <AttachmentUploader
            disableAction={disableActions}
            icon={
              <AttachmentSvg
                className={cn('chat-container__icon', {
                  'chat-container__icon--mute': disableAttachment || loading,
                  'chat-container__icon--disable': disableActions,
                })}
              />
            }
            onChangeFile={onAttachment}
          />
          {!enableVoice && (
            <div className="input-text-message type-message">
            <textarea
              disabled={loading}
              value={value}
              onFocus={() => {
                setVoiceMessage(false);
              }}
              onChange={handleChange}
              onInput={handleChanging}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey) {
                  sendTextMessageActions();
                }
              }}
              placeholder={placeholder || 'Type message'}
            />
              {rephrase}
            </div>
          )}

          {enableVoice && (
            <VoiceRecordingProgress
              startStatus={enableVoice}
              longRecInSec={60}
              onClick={() => {
                if (onVoice) {
                  onVoice();
                }
              }}
            />
          )}
          {!isVoiceMessage && !loading && (
            <div className="chat-container__send-icon">
              <SendSvg
                className={cn('chat-container__icon__send', {
                  'chat-container__icon--mute': loading,
                  'chat-container__icon--disable': disableActions,
                })}
                onClick={() => {
                  sendTextMessageActions();
                }}
              />
            </div>
          )}
          {loading ? (
            <Loader size="sm" className="chat-container__loader" />
          ) : (
            isVoiceMessage && (
              <VoiceSvg
                className={cn('chat-container__icon', {
                  'chat-container__icon--red': enableVoice,
                  'chat-container__icon--disable': disableActions,
                })}
                onClick={() => {
                  if (onVoice) {
                    onVoice();
                  }
                }}
              />
            )
          )}
        </div>
      </div>

  );
};

export default MessageInput;
