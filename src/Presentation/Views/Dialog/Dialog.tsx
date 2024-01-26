import React, { useEffect, useState } from 'react';
import './Dialog.scss';
import useQBConnection from '../../providers/QuickBloxUIKitProvider/useQBConnection';
import { DialogViewModel } from './DialogViewModel';
import LoaderComponent from '../../components/UI/Placeholders/LoaderComponent/LoaderComponent';
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

  const [currentWarningErrorText, setCurrentWarningErrorText] =
    useState<string>('');

  useEffect(() => {
    setCurrentWarningErrorText(warningErrorText);
  }, [warningErrorText]);

  useEffect(() => {
    setCurrentWarningErrorText(messagesViewModel.typingText);
  }, [messagesViewModel.typingText]);

  return (
    <div
      style={
        maxWidthToResize
          ? {
              // maxWidth: `${maxWidthToResizing}`,
              // minWidth: `$message-view-container-wrapper-min-width`,
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
          // style={{
          //   flexGrow: `1`,
          //   flexShrink: `1`,
          //   flexBasis: `${maxWidthToResizing}`,
          // }}
          className="message-view-container--header"
        >
          {renderHeader}
        </div>
      )}
      {showCurrentErrorToast ? (
        // && !messagesViewModel?.loading
        <ErrorToast messageText={currentMessageErrorToast} />
      ) : null}

      <div
        style={
          theme
            ? {
                // flexGrow: `1`,
                // flexShrink: `1`,
                // flexBasis: `${maxWidthToResizing}`,
                backgroundColor: theme.secondaryBackground(), // var(--secondary-background);
                ...messagesContainerStyles,
              }
            : {
                // flexGrow: `1`,
                // flexShrink: `1`,
                // flexBasis: `${maxWidthToResizing}`,
                ...messagesContainerStyles,
              }
        }
        className="message-view-container--messages"
      >
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
    </div>
  );
};

export default Dialog;
