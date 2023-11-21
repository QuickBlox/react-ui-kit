import React, { useEffect, useState } from 'react';
import './IncomingMessage.scss';
import UiKitTheme from '../../../themes/UiKitTheme';
import { MessageEntity } from '../../../../Domain/entity/MessageEntity';
import { getTimeShort24hFormat } from '../../../../utils/DateTimeFormatter';
import { AIMessageWidget } from '../AIWidgets/AIMessageWidget';
import LoaderComponent from '../../../components/UI/Placeholders/LoaderComponent/LoaderComponent';
import { DefaultConfigurations } from '../../../../Data/DefaultConfigurations';
import useQbInitializedDataContext from '../../../providers/QuickBloxUIKitProvider/useQbInitializedDataContext';
import { AIUtils } from '../../../../utils/utils';
import { UserEntity } from '../../../../Domain/entity/UserEntity';
import AvatarContentIncomingUser, {
  AvatarContentIncomingUserProps,
} from './AvatarContentIncomingUser/AvatarContentIncomingUser';
import { FunctionTypeMessageEntityToVoid } from '../../../../CommonTypes/BaseViewModel';
import MessageContextMenu from '../ContextMenu/MessageContextMenu/MessageContextMenu';
import AIAssistComponent from '../AIComponents/AIAssistComponent/AIAssistComponent';
import AITranslateComponent from '../AIComponents/AITranslateComponent/AITranslateComponent';
import MessageContentComponent from './MessageContentComponent/MessageContentComponent';

export type GetUserNameFct = (props: {
  userId?: number;
  sender?: UserEntity;
}) => Promise<string | undefined>;

export function IncomingMessage(props: {
  theme: UiKitTheme | undefined;
  senderNameFct: GetUserNameFct;
  message: MessageEntity;
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
    <div
      className="incoming-text-message"
      onMouseEnter={() => setHaveHover(true)}
      onMouseLeave={() => setHaveHover(false)}
    >
      {props.userIconRenderer ? (
        props.userIconRenderer({ userId: props.message.sender_id })
      ) : (
        <AvatarContentIncomingUser />
      )}
      <div className="incoming">
        <div className="name">
          <div className="caption">
            <div className="name2">
              {senderName || props.message.sender_id.toString()}
            </div>
          </div>
        </div>
        <div className="message">
          <div className="bubble">
            <div className="chat-bubble-background">
              <div className="message-in-a-single-line">
                <MessageContentComponent
                  theme={props.theme}
                  mc={props.message}
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
          {waitAITranslateWidget ? (
            <div className="assist-answer">
              <div className="icon">
                <div
                  style={{
                    padding: '5px 3px 5px 3px',
                    alignSelf: 'stretch',
                    flex: '1',
                    position: 'relative',
                    overflow: 'visible',
                  }}
                >
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
          {/* {haveHover && !waitAIWidget && !waitAITranslateWidget */}
          {!waitAITranslateWidget
            ? props.AIAnswerToMessage && (
                <AIAssistComponent
                  onAssistAnswer={() =>
                    sendMessageToAIAssistAnswer(
                      props.message,
                      props.messagesToView,
                      props.currentUserId,
                      props.AIAnswerToMessage,
                    )
                  }
                  waitAIWidget={waitAIWidget}
                />
              )
            : null}
          <div className="caption3">
            <div className="time">
              {getTimeShort24hFormat(props.message.date_sent)}
            </div>
          </div>
          {haveHover && !disableMenu ? (
            <MessageContextMenu
              theme={props.theme}
              message={props.message}
              onReply={props.onReply}
              onForward={props.onForward}
              enableReplying={props.enableReplying}
              enableForwarding={props.enableForwarding}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
