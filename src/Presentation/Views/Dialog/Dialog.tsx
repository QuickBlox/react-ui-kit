import React, { useEffect, useState } from 'react';
import './Dialog.scss';
import { DialogViewModel } from './DialogViewModel';
import UiKitTheme from '../../themes/UiKitTheme';
import Loader from '../../ui-components/Loader/Loader';

type DialogProps = {
  messagesViewModel: DialogViewModel;
  maxWidthToResize?: string;
  warningErrorText: string;
  // showErrorToast: boolean;
  // messageErrorToast: string;
  renderHeader: React.ReactNode;
  renderMessageList: React.ReactNode;
  renderMessageInput: React.ReactNode;
  theme?: UiKitTheme;
  headerContent?: React.ReactNode;
  rootStyles?: React.CSSProperties;
  messagesContainerStyles?: React.CSSProperties;
};

// eslint-disable-next-line react/function-component-definition
const Dialog: React.FC<DialogProps> = ({
  messagesViewModel,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  maxWidthToResize = undefined,
  warningErrorText,
  // showErrorToast,
  // messageErrorToast,
  renderHeader,
  renderMessageList,
  renderMessageInput,
  theme = undefined,
  headerContent = undefined,
  rootStyles = {},
  messagesContainerStyles = {},
}: DialogProps) => {
  // const [showCurrentErrorToast, setShowCurrentErrorToast] =
  //   useState<boolean>(showErrorToast);
  // const [currentMessageErrorToast, setCurrentMessageErrorToast] =
  //   useState<string>(messageErrorToast);

  // useEffect(() => {
  //   setShowCurrentErrorToast(showErrorToast);
  // }, [showErrorToast]);
  //
  // useEffect(() => {
  //   setCurrentMessageErrorToast(messageErrorToast);
  // }, [messageErrorToast]);

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
              width: '100%',
              ...rootStyles,
            }
          : rootStyles
      }
      className="message-view-container"
    >
      {headerContent || (
        <div className="message-view-container--header">{renderHeader}</div>
      )}
      {/* {showCurrentErrorToast ? ( */}
      {/*  <ErrorToast messageText={currentMessageErrorToast} /> */}
      {/* ) : null} */}

      <div
        style={
          theme
            ? {
                backgroundColor: theme.secondaryBackground(), // var(--secondary-background);
                ...messagesContainerStyles,
              }
            : {
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
            <Loader size="md" className="message-view-container__loader" />
          )}
        </div>

        <div
          style={theme ? { color: theme.mainElements() } : {}}
          className="message-view-container--warning-error"
        >
          {currentWarningErrorText}
        </div>
      </div>

      {renderMessageInput}
    </div>
  );
};

export default Dialog;
