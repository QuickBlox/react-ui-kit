import React, { useEffect, useState } from 'react';
import './InComingMessage.scss';
import UiKitTheme from '../../../../../assets/UiKitTheme';
import { MessageEntity } from '../../../../../../Domain/entity/MessageEntity';
import { getTimeShort24hFormat } from '../../../../../../utils/DateTimeFormatter';
import ChatMessageAttachmentEntity from '../../../../../../Domain/entity/ChatMessageAttachmentEntity';
import { FileType } from '../../../../../../Domain/entity/FileTypes';
import VideoAttachmentComponent from '../VideoAttachmentComponent/VideoAttachmentComponent';
import ImagePlay from '../../../svgs/Icons/Toggle/ImagePlay';
import AudioAttachmentComponent from '../AudioAttachmentComponent/AudioAttachmentComponent';
import AudioFile from '../../../svgs/Icons/Media/AudioFile';
import ImageAttachmentComponent from '../ImageAttachmentComponent/ImageAttachmentComponent';
import ImageEmpty from '../../../svgs/Icons/Media/ImageEmpty';
import ImageFile from '../../../svgs/Icons/Media/ImageFile';
import ColumnContainer from '../../../../containers/ColumnContainer/ColumnContainer';
import { HighLightLink, messageHasUrls } from '../HighLightLink/HighLightLink';
import { AIMessageWidget } from '../AIWidgets/AIMessageWidget';
import LoaderComponent from '../../../Placeholders/LoaderComponent/LoaderComponent';
import AIWidgetActions from '../AIWidgets/AIWidgetActions/AIWidgetActions';
import TranslateIcon from '../../../svgs/Icons/Media/Translate';
import AvatarContentIncomingUser from './AvatarContentIncomingUser/AvatarContentIncomingUser';
import { DefaultConfigurations } from '../../../../../../Data/DefaultConfigurations';
import useQbInitializedDataContext from '../../../../providers/QuickBloxUIKitProvider/useQbInitializedDataContext';
import { AIUtils } from '../../../../../../utils/utils';
import BotIcon from '../../../svgs/Icons/AIWidgets/BotIcon/BotIcon';

export function InComingMessage(props: {
  theme: UiKitTheme | undefined;
  senderName: string | undefined;
  message: MessageEntity;
  onStartLoader: () => void;
  onStopLoader: () => void;
  onErrorToast: (messageError: string) => void;
  currentUserId?: number;
  messagesToView: MessageEntity[];
  AITranslation?: AIMessageWidget;
  AIAnswerToMessage?: AIMessageWidget;
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

  const messageContentRender = (
    mc: MessageEntity,
    translateText: string,
    theme: UiKitTheme | undefined,
  ) => {
    const messageText = (
      <div>
        {!originalTextMessage ? (
          <div>{widgetTextContent}</div>
        ) : (
          <div>{mc.message}</div>
        )}
      </div>
    );
    let messageContent: JSX.Element = messageText;

    const attachmentContentRender = (att: ChatMessageAttachmentEntity) => {
      let contentPlaceHolder: JSX.Element = <div>{att.type.toString()}</div>;

      if (att.type.toString().includes(FileType.video)) {
        contentPlaceHolder = att.file ? (
          <VideoAttachmentComponent videoFile={att.file} />
        ) : (
          <ImagePlay />
        );
      }
      if (att.type.toString().includes(FileType.audio)) {
        contentPlaceHolder = att.file ? (
          <AudioAttachmentComponent audioFile={att.file} />
        ) : (
          <AudioFile />
        );
      }
      if (att.type.toString().includes(FileType.image)) {
        contentPlaceHolder = att.file ? (
          <ImageAttachmentComponent imageFile={att.file} />
        ) : (
          <ImageEmpty />
        );
      }
      if (att.type.toString().includes(FileType.text)) {
        contentPlaceHolder = att.file ? (
          <div>TEXT</div>
        ) : (
          <ImageFile applyZoom />
        );
      }
      let contentResult: JSX.Element = (
        <div className="message-view-container--message-content-wrapper">
          {contentPlaceHolder}
        </div>
      );

      if (att.type === FileType.text) {
        contentResult = (
          <div className="message-view-container--file-message-content-wrapper">
            <div
              style={theme ? { backgroundColor: theme.caption() } : {}}
              className="message-view-container__file-message-icon"
            >
              {contentPlaceHolder}
            </div>
            <div>{att.name || 'file'}</div>
          </div>
        );
      }

      return contentResult;
    };

    if (mc.attachments && mc.attachments.length > 0) {
      messageContent = (
        <ColumnContainer maxWidth="100%">
          {mc.attachments.map((attachment) =>
            attachmentContentRender(attachment),
          )}
          {messageText}
        </ColumnContainer>
      );
    }

    if (
      messageHasUrls(mc.message) &&
      !(mc.attachments && mc.attachments.length > 0)
    ) {
      return <HighLightLink messageText={mc.message} />;
    }

    return messageContent;
  };

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
      setWaitAIWidget(true);
      props.onStartLoader();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      AIAnswerToMessage?.textToWidget(
        message.message,
        AIUtils.messageEntitiesToIChatMessageCollection(
          messagesToView,
          currentUserId,
          maxTokensForAnswerAssist,
        ),
      )
        .then((answerText) => {
          // eslint-disable-next-line promise/always-return
          if (answerText === 'Assist failed.') {
            props.onErrorToast('Assist failed.');
          }
          setWaitAIWidget(false);
          props.onStopLoader();
        })
        .catch(() => {
          props.onErrorToast('Assist failed.');
          setWaitAIWidget(false);
          props.onStopLoader();
        });
    }
  }

  const renderWidgetAITranslate = (
    mc: MessageEntity,
    messagesToView: MessageEntity[],
    currentUserId?: number,
    AITranslate?: AIMessageWidget,
  ) => {
    return (
      AITranslate && (
        <div className="translate">
          <div className="caption2">
            <div
              className="ai-translate-action"
              style={{
                cursor: !waitAITranslateWidget ? 'pointer' : '',
              }}
              onClick={() => {
                console.log('click translate....');
                if (!waitAITranslateWidget) {
                  if (originalTextMessage) {
                    sendMessageToTranslate(
                      mc,
                      messagesToView,
                      currentUserId,
                      AITranslate,
                    );
                  } else {
                    setOriginalTextMessage(true);
                    setWidgetTextContent('');
                  }
                }
              }}
            >
              {originalTextMessage ? 'Show translation' : 'Show original'}
            </div>
          </div>
          <AIWidgetActions
            disabled={!waitAITranslateWidget}
            widgetToRender={
              <div
                className="icon-translate"
                style={{
                  cursor: !waitAITranslateWidget ? 'pointer' : '',
                }}
              >
                <TranslateIcon
                  width="16"
                  height="16"
                  applyZoom
                  color="var(--tertiary-elements)"
                />
              </div>
            }
            items={DefaultConfigurations.getAdditionalLanguagesForAITranslate(
              currentContext.InitParams.qbConfig.configAIApi
                .AITranslateWidgetConfig,
            ).map((item) => {
              return {
                title: item,
                action: () => {
                  console.log('click translate....');
                  if (!waitAITranslateWidget) {
                    sendMessageToTranslate(
                      mc,
                      messagesToView,
                      currentUserId,
                      AITranslate,
                      item,
                    );
                  }
                },
              };
            })}
          />
        </div>
      )
    );
  };

  const renderWidgetAIAssist = (
    mc: MessageEntity,
    messagesToView: MessageEntity[],
    currentUserId?: number,
    AIAnswer?: AIMessageWidget,
  ) => {
    return (
      AIAnswer && (
        <div
          className="ai-assist-answer"
          style={{
            cursor: !waitAIWidget ? 'pointer' : '',
          }}
        >
          <div
            className="ai-assist-icon"
            onClick={() =>
              sendMessageToAIAssistAnswer(
                mc,
                messagesToView,
                currentUserId,
                AIAnswer,
              )
            }
          >
            <div
              style={{
                padding: '5px 3px 5px 3px',
                alignSelf: 'stretch',
                flex: '1',
                position: 'relative',
                overflow: 'visible',
              }}
            >
              <BotIcon
                width="24"
                height="25"
                applyZoom
                color="var(--primary)"
              />
            </div>
          </div>
        </div>
      )
    );
  };

  return (
    <div
      className="incoming-text-message"
      onMouseEnter={() => setHaveHover(true)}
      onMouseLeave={() => setHaveHover(false)}
    >
      <AvatarContentIncomingUser />
      <div className="incoming">
        <div className="name">
          <div className="caption">
            <div className="name2">
              {props.senderName || props.message.sender_id.toString()}
            </div>
          </div>
        </div>
        <div className="message">
          <div className="bubble">
            <div className="chat-bubble-background">
              {/* <div className="message-in-a-single-line"> */}
              {/* </div> */}
              {messageContentRender(
                props.message,
                widgetTextContent,
                props.theme,
              )}
            </div>
            {renderWidgetAITranslate(
              props.message,
              props.messagesToView,
              props.currentUserId,
              props.AITranslation,
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
            ? renderWidgetAIAssist(
                props.message,
                props.messagesToView,
                props.currentUserId,
                props.AIAnswerToMessage,
              )
            : null}
          <div className="caption3">
            <div className="time">
              {getTimeShort24hFormat(props.message.date_sent)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
