import React, { useEffect, useState } from 'react';
import './IncomingForwardedMessage.scss';
import AvatarContentIncomingUser, {
  AvatarContentIncomingUserProps,
} from '../IncomingMessage/AvatarContentIncomingUser/AvatarContentIncomingUser';
import UiKitTheme from '../../../../themes/UiKitTheme';
import { MessageEntity } from '../../../../../Domain/entity/MessageEntity';
import { FunctionTypeMessageEntityToVoid } from '../../../../../CommonTypes/BaseViewModel';
import { AIMessageWidget } from '../../AIWidgets/AIMessageWidget';
import useQbInitializedDataContext from '../../../../providers/QuickBloxUIKitProvider/useQbInitializedDataContext';
import { AIUtils } from '../../../../../utils/utils';
import { DefaultConfigurations } from '../../../../../Data/DefaultConfigurations';
import ForwardFilled from '../../../../components/UI/svgs/Icons/Actions/ForwardFilled';
import MessageContentComponent from '../IncomingMessage/MessageContentComponent/MessageContentComponent';
import AITranslateComponent from '../../AIComponents/AITranslateComponent/AITranslateComponent';
import MessageContextMenu from '../MessageContextMenu/MessageContextMenu';
import LoaderComponent from '../../../../components/UI/Placeholders/LoaderComponent/LoaderComponent';
import AIAssistComponent from '../../AIComponents/AIAssistComponent/AIAssistComponent';

function IncomingForwardedMessage(props: {
  theme?: UiKitTheme;
  // senderNameFct: GetUserNameFct;
  messages: MessageEntity[];
  date_sent: string;
  userIconRenderer?: (
    props: AvatarContentIncomingUserProps,
  ) => React.ReactElement;
  onReply: FunctionTypeMessageEntityToVoid;
  onForward: FunctionTypeMessageEntityToVoid;
  repliedUserName: string;
  renderOringinalMessage: React.ReactNode;
  AITranslation?: AIMessageWidget;
  AIAnswerToMessage?: AIMessageWidget;
  onStartLoader: () => void;
  // eslint-disable-next-line react/no-unused-prop-types
  onStopLoader: () => void;
  onErrorToast: (messageError: string) => void;
  currentUserId?: number;
  messagesToView: MessageEntity[];
  enableForwarding: boolean;
  enableReplying: boolean;
}) {
  const currentContext = useQbInitializedDataContext();

  const disableMenu = !props.enableForwarding && !props.enableReplying;

  // const [haveHover, setHaveHover] = useState(false);
  const [widgetTextContent, setWidgetTextContent] = useState<string>('');
  const [originalTextMessage, setOriginalTextMessage] = useState<boolean>(true);
  const [waitAITranslateWidget, setWaitAITranslateWidget] =
    useState<boolean>(false);
  const [waitAIWidget, setWaitAIWidget] = useState<boolean>(false);

  useEffect(() => {
    setWaitAIWidget(false);
  }, [props.AITranslation?.textToContent]);

  useEffect(() => {
    setWaitAIWidget(false);
  }, [props.AIAnswerToMessage?.textToContent]);

  const maxTokensForAITranslate =
    currentContext.InitParams.qbConfig.configAIApi.AITranslateWidgetConfig
      .maxTokens;
  const maxTokensForAnswerAssist =
    currentContext.InitParams.qbConfig.configAIApi.AIAnswerAssistWidgetConfig
      .maxTokens;

  const sendMessageToAIAssistAnswer = (
    message: MessageEntity,
    messagesToView: MessageEntity[],
    currentUserId?: number,
    AIAnswerToMessage?: AIMessageWidget,
  ) => {
    if (!waitAIWidget) {
      // setWaitAIWidget(true);
      props.onStartLoader();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      AIAnswerToMessage?.textToWidget(
        message.message,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-call
        AIUtils.messageEntitiesToIChatMessageCollection(
          messagesToView,
          currentUserId,
          maxTokensForAnswerAssist,
        ),
      )
        // eslint-disable-next-line promise/always-return
        .then(() => {
          // setWaitAITranslateWidget(false);
          props.onStopLoader();
        })
        .catch(() => {
          props.onErrorToast('Assist failed. Try again.');
          // setWaitAITranslateWidget(false);
          props.onStopLoader();
        });
    }
  };

  const sendMessageToTranslate = async (
    message: MessageEntity,
    messagesToView: MessageEntity[],
    currentUserId?: number,
    AITranslation?: AIMessageWidget,
    selectedLanguage?: string,
  ) => {
    if (!waitAITranslateWidget) {
      setWaitAITranslateWidget(true);
      await AITranslation?.textToWidget(
        message.message,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-call
        AIUtils.messageEntitiesToIChatMessageCollection(
          messagesToView,
          currentUserId,
          maxTokensForAITranslate,
        ),
        {
          language:
            selectedLanguage ||
            DefaultConfigurations.getDefaultLanguageForAITranslate(
              currentContext.InitParams.qbConfig.configAIApi
                .AITranslateWidgetConfig,
            ),
        },
      )
        .then((textTranslate) => {
          // eslint-disable-next-line promise/always-return
          setWidgetTextContent(textTranslate || '');
          // eslint-disable-next-line promise/always-return
          if (textTranslate === 'Translation failed.') {
            props.onErrorToast('Translation failed. Try again.');
          }
          setWaitAITranslateWidget(false);
          setOriginalTextMessage(false);
        })
        .catch(() => {
          props.onErrorToast('Translation failed. Try again.');
          setWaitAITranslateWidget(false);
          setOriginalTextMessage(true);
        });
    }
  };

  return (
    <div>
      {props.messages.map((item) => (
        <div
          className="incoming-forward-message"
          // onMouseEnter={() => setHaveHover(true)}
          // onMouseLeave={() => setHaveHover(false)}
        >
          <div className="incoming-forward-message-avatar-wrap">
            <div className="incoming-forward-message-avatar">
              <div className="incoming-forward-message-avatar-rectangle" />
              {props.userIconRenderer ? (
                props.userIconRenderer({
                  userId: props.currentUserId as number,
                })
              ) : (
                <AvatarContentIncomingUser />
              )}
            </div>
          </div>
          <div className="incoming-forward-message-incoming">
            <div className="incoming-forward-message-incoming-name">
              <div className="incoming-forward-message-incoming-name-caption">
                <div className="incoming-forward-message-incoming-name-caption-forward">
                  <div className="incoming-forward-message-incoming-name-caption-forward-icon">
                    <ForwardFilled
                      width="16"
                      height="16"
                      color="var(--caption)"
                    />
                  </div>
                  <div className="incoming-forward-message-incoming-name-caption-forward-from-name">
                    Forwarded from {props.repliedUserName}
                  </div>
                </div>
              </div>
            </div>
            <div className="incoming-forward-message-incoming-message">
              <div className="incoming-forward-message-incoming-bubble">
                <div className="incoming-forward-message-incoming-bubble-background">
                  <div className="incoming-forward-message-incoming-bubble-background-line">
                    <MessageContentComponent
                      theme={props.theme}
                      messageEntity={item}
                      originalTextMessage={originalTextMessage}
                      widgetTextContent={widgetTextContent}
                    />
                  </div>
                </div>
                {props.AITranslation && (
                  <AITranslateComponent
                    onTranslate={(language) => {
                      sendMessageToTranslate(
                        item,
                        props.messagesToView,
                        props.currentUserId,
                        props.AITranslation,
                        language,
                      );
                    }}
                    onClickOriginalText={() => {
                      setOriginalTextMessage(true);
                      setWidgetTextContent('');
                    }}
                    originalTextMessage={originalTextMessage}
                    waitAITranslateWidget={waitAITranslateWidget}
                    languagesForAITranslate={DefaultConfigurations.getAdditionalLanguagesForAITranslate(
                      currentContext.InitParams.qbConfig.configAIApi
                        .AITranslateWidgetConfig,
                    )}
                  />
                )}
              </div>
              <div className="incoming-forward-ai-transcribe">
                {
                  // haveHover &&
                  !disableMenu ? (
                    <MessageContextMenu
                      theme={props.theme}
                      message={item}
                      onReply={props.onReply}
                      onForward={props.onForward}
                      enableReplying={props.enableReplying}
                      enableForwarding={props.enableForwarding}
                    />
                  ) : null
                }
                {waitAITranslateWidget ? (
                  <div className="assist-answer">
                    <div className="icon">
                      <div>
                        <LoaderComponent
                          width="24"
                          height="24"
                          applyZoom
                          color="var(--caption)"
                        />
                      </div>
                    </div>
                  </div>
                ) : null}
                {!waitAITranslateWidget
                  ? props.AIAnswerToMessage && (
                      <AIAssistComponent
                        onAssistAnswer={() => {
                          sendMessageToAIAssistAnswer(
                            item,
                            props.messagesToView,
                            props.currentUserId,
                            props.AIAnswerToMessage,
                          );
                        }}
                        waitAIWidget={waitAIWidget}
                      />
                    )
                  : null}
              </div>
              <div className="incoming-forward-message-incoming-message-caption">
                <div className="incoming-forward-message-incoming-message-caption-time">
                  {props.date_sent}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div>{props.renderOringinalMessage}</div>
    </div>
  );
}

export default IncomingForwardedMessage;
