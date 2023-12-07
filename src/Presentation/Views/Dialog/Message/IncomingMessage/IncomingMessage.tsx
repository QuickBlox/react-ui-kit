import React, { useEffect, useState } from 'react';
import './IncomingMessage.scss';
import UiKitTheme from '../../../../themes/UiKitTheme';
import { MessageEntity } from '../../../../../Domain/entity/MessageEntity';
import { AIMessageWidget } from '../../AIWidgets/AIMessageWidget';
import LoaderComponent from '../../../../components/UI/Placeholders/LoaderComponent/LoaderComponent';
import { DefaultConfigurations } from '../../../../../Data/DefaultConfigurations';
import useQbInitializedDataContext from '../../../../providers/QuickBloxUIKitProvider/useQbInitializedDataContext';
import { AIUtils } from '../../../../../utils/utils';
import { UserEntity } from '../../../../../Domain/entity/UserEntity';
import AvatarContentIncomingUser, {
  AvatarContentIncomingUserProps,
} from './AvatarContentIncomingUser/AvatarContentIncomingUser';
import { FunctionTypeMessageEntityToVoid } from '../../../../../CommonTypes/BaseViewModel';
import MessageContextMenu from '../MessageContextMenu/MessageContextMenu';
import AIAssistComponent from '../../AIComponents/AIAssistComponent/AIAssistComponent';
import AITranslateComponent from '../../AIComponents/AITranslateComponent/AITranslateComponent';
import MessageContentComponent from './MessageContentComponent/MessageContentComponent';
import UserAvatar from '../../../EditDialog/UserAvatar/UserAvatar';

export type GetUserNameFct = (props: {
  userId?: number;
  sender?: UserEntity;
}) => Promise<string | undefined>;

export function IncomingMessage(props: {
  theme: UiKitTheme | undefined;
  senderNameFct: GetUserNameFct;
  message: MessageEntity;
  date_sent: string;
  onReply: FunctionTypeMessageEntityToVoid;
  onForward: FunctionTypeMessageEntityToVoid;
  onStartLoader: () => void;
  // eslint-disable-next-line react/no-unused-prop-types
  onStopLoader: () => void;
  onErrorToast: (messageError: string) => void;
  currentUserId?: number;
  messagesToView: MessageEntity[];
  AITranslation?: AIMessageWidget;
  AIAnswerToMessage?: AIMessageWidget;
  userIconRenderer?: (
    props: AvatarContentIncomingUserProps,
  ) => React.ReactElement;
  enableForwarding: boolean;
  enableReplying: boolean;
  // index?: number;
  // updateData?: (index: number, text: string) => void;
  // translationDATA?: Record<number, string>;
}) {
  const currentContext = useQbInitializedDataContext();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [haveHover, setHaveHover] = useState(false);
  // const [openMenu, setOpenMenu] = useState(false);
  const [waitAIWidget, setWaitAIWidget] = useState<boolean>(false);
  const [waitAITranslateWidget, setWaitAITranslateWidget] =
    useState<boolean>(false);
  const [widgetTextContent, setWidgetTextContent] = useState<string>('');
  const [originalTextMessage, setOriginalTextMessage] = useState<boolean>(true);
  const [senderName, setSenderName] = useState<string | undefined>('');

  const disableMenu = !props.enableForwarding && !props.enableReplying;

  useEffect(() => {
    props
      .senderNameFct({
        userId: props.message.sender_id,
        sender: props.message.sender,
      })
      // eslint-disable-next-line promise/always-return
      .then((name) => {
        setSenderName(name);
      })
      .catch(() => console.log(`unexpected error: `));
  }, [props.message.sender_id]);

  // const [errorAITranslate, setErrorAITranslate] = useState<boolean>(false);

  const maxTokensForAITranslate =
    currentContext.InitParams.qbConfig.configAIApi.AITranslateWidgetConfig
      .maxTokens;
  const maxTokensForAnswerAssist =
    currentContext.InitParams.qbConfig.configAIApi.AIAnswerAssistWidgetConfig
      .maxTokens;

  useEffect(() => {
    setWaitAIWidget(false);
  }, [props.AITranslation?.textToContent]);
  //
  useEffect(() => {
    setWaitAIWidget(false);
  }, [props.AIAnswerToMessage?.textToContent]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async function sendMessageToTranslate(
    message: MessageEntity,
    messagesToView: MessageEntity[],
    currentUserId?: number,
    AITranslation?: AIMessageWidget,
    selectedLanguage?: string,
  ) {
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

      // setWidgetTextContent(textTranslate || '');
      // setWaitAITranslateWidget(false);
      // setOriginalTextMessage(false);
    }
  }

  function sendMessageToAIAssistAnswer(
    message: MessageEntity,
    messagesToView: MessageEntity[],
    currentUserId?: number,
    AIAnswerToMessage?: AIMessageWidget,
  ) {
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
  }

  return (
    <div>
      <div
        className="incoming-forward-message"
        // onMouseEnter={() => setHaveHover(true)}
        // onMouseLeave={() => setHaveHover(false)}
      >
        <div className="incoming-message-avatar-wrap">
          <div className="incoming-message-avatar">
            <div className="incoming-message-avatar-rectangle" />
            {/* eslint-disable-next-line no-nested-ternary */}
            {props.userIconRenderer ? (
              props.userIconRenderer({
                userId: props.currentUserId as number,
              })
            ) : props.message.sender && props.message.sender.photo ? (
              <UserAvatar
                urlAvatar={props.message.sender.photo}
                iconTheme={{ width: '40px', height: '40px' }}
              />
            ) : (
              <AvatarContentIncomingUser />
            )}
          </div>
        </div>
        <div className="incoming-message-incoming">
          <div className="incoming-message-incoming-name">
            <div className="incoming-message-incoming-name-caption">
              <div className="incoming-message-incoming-name-caption-forward">
                <div className="incoming-message-incoming-name-caption-forward-from-name">
                  {senderName || props.message.sender_id.toString()}
                </div>
              </div>
            </div>
          </div>
          <div className="incoming-message-incoming-message">
            <div className="incoming-message-incoming-bubble">
              <div className="incoming-message-incoming-bubble-background">
                <div className="incoming-message-incoming-bubble-background-line">
                  <MessageContentComponent
                    theme={props.theme}
                    messageEntity={props.message}
                    originalTextMessage={originalTextMessage}
                    widgetTextContent={widgetTextContent}
                  />
                </div>
              </div>
              {props.AITranslation && (
                <AITranslateComponent
                  onTranslate={(language) => {
                    sendMessageToTranslate(
                      props.message,
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
            <div className="incoming-ai-transcribe">
              {
                // haveHover &&
                !disableMenu ? (
                  <MessageContextMenu
                    theme={props.theme}
                    message={props.message}
                    onReply={props.onReply}
                    onForward={props.onForward}
                    enableReplying={props.enableReplying}
                    enableForwarding={props.enableForwarding}
                  />
                ) : null
              }
              {waitAITranslateWidget ? (
                <div className="incoming-assist-answer">
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
                          props.message,
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
            <div className="incoming-message-incoming-message-caption">
              <div className="incoming-message-incoming-message-caption-time">
                {props.date_sent}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
