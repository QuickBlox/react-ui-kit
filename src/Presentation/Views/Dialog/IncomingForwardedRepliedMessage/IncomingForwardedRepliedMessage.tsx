import React, { useEffect, useState } from 'react';
import './IncomingForwardedRepliedMessage.scss';
import { MessageEntity } from '../../../../Domain/entity/MessageEntity';
import ReplyFilled from '../../../components/UI/svgs/Icons/Actions/ReplyFilled';
import ForwardFilled from '../../../components/UI/svgs/Icons/Actions/ForwardFilled';
import MessageContextMenu from '../ContextMenu/MessageContextMenu/MessageContextMenu';
import UiKitTheme from '../../../themes/UiKitTheme';
import { FunctionTypeMessageEntityToVoid } from '../../../../CommonTypes/BaseViewModel';
import { DefaultConfigurations } from '../../../../Data/DefaultConfigurations';
import AITranslateComponent from '../AIComponents/AITranslateComponent/AITranslateComponent';
import useQbInitializedDataContext from '../../../providers/QuickBloxUIKitProvider/useQbInitializedDataContext';
import { AIMessageWidget } from '../AIWidgets/AIMessageWidget';
import AIAssistComponent from '../AIComponents/AIAssistComponent/AIAssistComponent';
import { AIUtils } from '../../../../utils/utils';
import MessageContentComponent from '../IncomingMessage/MessageContentComponent/MessageContentComponent';

function IncomingForwardedRepliedMessage(props: {
  theme: UiKitTheme | undefined;
  // senderNameFct: GetUserNameFct;
  messages: MessageEntity[];
  onReply: FunctionTypeMessageEntityToVoid;
  onForward: FunctionTypeMessageEntityToVoid;
  repliedUserName: string;
  renderOringinalMessage: React.ReactNode;
  typeMessage: string;
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
  // userIconRenderer?: (
  //   props: AvatarContentIncomingUserProps,
  // ) => React.ReactElement;
  // index?: number;
  // updateData?: (index: number, text: string) => void;
  // translationDATA?: Record<number, string>;
}) {
  const currentContext = useQbInitializedDataContext();

  const disableMenu = !props.enableForwarding && !props.enableReplying;

  const [haveHover, setHaveHover] = useState(false);
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
          props.onErrorToast('Assist failed.');
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
            props.onErrorToast('Translation failed.');
          }
          setWaitAITranslateWidget(false);
          setOriginalTextMessage(false);
        })
        .catch(() => {
          props.onErrorToast('Translation failed.');
          setWaitAITranslateWidget(false);
          setOriginalTextMessage(true);
        });
    }
  };

  return (
    <div>
      <div className="incoming-replied-text-message">
        <div className="incoming-replied-text-message-avatar" />
        <div className="incoming-replied-text-message-info">
          <div className="incoming-replied-text-message-info-name">
            <div className="incoming-replied-text-message-info-name-caption">
              <div className="incoming-replied-text-message-info-name-caption-reply">
                <div className="incoming-replied-text-message-info-name-caption-reply-icon">
                  {props.typeMessage === 'forward' ? (
                    <ForwardFilled
                      width="16"
                      height="16"
                      color="var(--caption)"
                    />
                  ) : (
                    <ReplyFilled
                      width="16"
                      height="16"
                      color="var(--caption)"
                    />
                  )}
                </div>
                <div className="incoming-replied-text-message-info-name-caption-reply-to-name">
                  {props.typeMessage === 'forward'
                    ? `Forwarded from ${props.repliedUserName}`
                    : `Replied to ${props.repliedUserName}`}
                </div>
              </div>
            </div>
          </div>
          {props.messages.map((item) => (
            <div
              className="incoming-replied-text-message-info-message"
              onMouseEnter={() => setHaveHover(true)}
              onMouseLeave={() => setHaveHover(false)}
            >
              <div className="incoming-replied-text-message-info-message-bubble">
                <div className="incoming-replied-text-message-info-message-b">
                  <div className="incoming-replied-text-message-info-message-line">
                    {/* {!originalTextMessage ? widgetTextContent : item.message} */}
                    <MessageContentComponent
                      theme={props.theme}
                      mc={item}
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
              {props.AIAnswerToMessage && (
                <AIAssistComponent
                  onAssistAnswer={() => {
                    sendMessageToAIAssistAnswer(
                      item,
                      props.messagesToView,
                      props.currentUserId,
                      props.AIAnswerToMessage,
                    );
                    console.log('call AIAssist');
                  }}
                  waitAIWidget={waitAIWidget}
                />
              )}
              {haveHover && !disableMenu ? (
                <MessageContextMenu
                  theme={props.theme}
                  message={item}
                  onReply={props.onReply}
                  onForward={props.onForward}
                  enableReplying={props.enableReplying}
                  enableForwarding={props.enableForwarding}
                />
              ) : null}
            </div>
          ))}
        </div>
      </div>
      {props.renderOringinalMessage}
    </div>
  );
}

export default IncomingForwardedRepliedMessage;
