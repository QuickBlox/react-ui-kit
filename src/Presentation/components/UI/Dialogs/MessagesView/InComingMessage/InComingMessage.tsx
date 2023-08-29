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
import { loopToLimitTokens } from '../../../../../../utils/utils';
import LoaderComponent from '../../../Placeholders/LoaderComponent/LoaderComponent';
import { IChatMessage } from '../../../../../../Data/source/AISource';
import AssistAnswer from '../../../svgs/Icons/Actions/AssistAnswer';
import AIWidgetActions from '../AIWidgets/AIWidgetActions/AIWidgetActions';
import TranslateIcon from '../../../svgs/Icons/Media/Translate';
import AvatarContentIncomingUser from './AvatarContentIncomingUser/AvatarContentIncomingUser';
import { DefaultConfigurations } from '../../../../../../Data/DefaultConfigurations';

export function InComingMessage(props: {
  theme: UiKitTheme | undefined;
  senderName: string | undefined;
  message: MessageEntity;
  // element: JSX.Element;
  onLoader: () => void;
  // renderWidget: JSX.Element | undefined;
  currentUserId?: number;
  messagesToView: MessageEntity[];
  AITranslation?: AIMessageWidget;
  AIAnswerToMessage?: AIMessageWidget;
  // index?: number;
  // updateData?: (index: number, text: string) => void;
  // translationDATA?: Record<number, string>;
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [haveHover, setHaveHover] = useState(false);
  // const [openMenu, setOpenMenu] = useState(false);
  const [waitAIWidget, setWaitAIWidget] = useState<boolean>(false);
  const [waitAITranslateWidget, setWaitAITranslateWidget] =
    useState<boolean>(false);
  const [widgetTextContent, setWidgetTextContent] = useState<string>('');
  const [originalTextMessage, setOriginalTextMessage] = useState<boolean>(true);
  // const [errorAITranslate, setErrorAITranslate] = useState<boolean>(false);

  // useEffect(() => {
  //   setWaitAIWidget(false);
  //   if (
  //     props.AIRephraseMessage?.textToContent &&
  //     props.AIRephraseMessage?.textToContent.length > 0
  //   ) {
  //     setMessageTextState(props.AIRephraseMessage?.textToContent);
  //     setWidgetTextContent(props.AIRephraseMessage?.textToContent);
  //     setTimeout(() => {
  //       setWidgetTextContent('');
  //     }, 45 * 1000);
  //   }
  // }, [props.AIRephraseMessage?.textToContent]);

  useEffect(() => {
    setWaitAIWidget(false);
  }, [props.AITranslation?.textToContent]);
  //
  useEffect(() => {
    setWaitAIWidget(false);
    // if (
    //   props.AIAnswerToMessage?.textToContent &&
    //   props.AIAnswerToMessage?.textToContent.length > 0
    // ) {
    //   // setMessageTextState(props.AIAnswerToMessage?.textToContent);
    //   setWidgetTextContent(props.AIAnswerToMessage?.textToContent);
    //   setTimeout(() => {
    //     setWidgetTextContent('');
    //   }, 45 * 1000);
    // }
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

  const messageEntitiesToIChatMessageCollection = (
    messageEntities: MessageEntity[],
    currentUserId?: number,
  ): IChatMessage[] => {
    const MAX_TOKENS = 3584;
    const items = messageEntities.filter(
      (it) =>
        !it.notification_type ||
        (it.notification_type && it.notification_type.length === 0),
    );
    const messages = loopToLimitTokens(
      MAX_TOKENS,
      items,
      ({ message }) => message || '',
    ).reverse();
    const chatCompletionMessages: IChatMessage[] = messages.map(
      ({ message, sender_id }) => ({
        role: sender_id === currentUserId ? 'user' : 'assistant',
        content: message,
      }),
    );

    //
    return chatCompletionMessages;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async function sendMessageToTranslate(
    message: MessageEntity,
    messagesToView: MessageEntity[],
    currentUserId?: number,
    AITranslation?: AIMessageWidget,
    selectedLanguage?: string,
  ) {
    // setErrorAITranslate(false);
    if (!waitAITranslateWidget) {
      setWaitAITranslateWidget(true);
      await AITranslation?.textToWidget(
        message.message,
        messageEntitiesToIChatMessageCollection(messagesToView, currentUserId),
        {
          language:
            selectedLanguage ||
            DefaultConfigurations.getDefaultLanguageForAITranslate(),
          //     language: DefaultConfigurations.getDefaultLanguageForAITranslate()
          // selectedLanguage ||
          // QBConfig.configAIApi.AITranslateWidgetConfig.defaultLanguage ||
          // 'English',
        },
      )
        .then((textTranslate) => {
          // eslint-disable-next-line promise/always-return
          setWidgetTextContent(textTranslate || '');
          setWaitAITranslateWidget(false);
          setOriginalTextMessage(false);
        })
        .catch(() => {
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          // setErrorAITranslate(true);
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
      props.onLoader();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      AIAnswerToMessage?.textToWidget(
        message.message,
        messageEntitiesToIChatMessageCollection(messagesToView, currentUserId),
      );
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
              onClick={() => {
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
              }}
            >
              {originalTextMessage ? 'Show translation' : 'Show original'}
            </div>
          </div>
          <AIWidgetActions
            widgetToRender={
              <div className="icon">
                <TranslateIcon
                  width="16"
                  height="16"
                  applyZoom
                  color="var(--tertiary-elements)"
                />
              </div>
            }
            items={DefaultConfigurations.getAdditionalLanguagesForAITranslate().map(
              (item) => {
                return {
                  title: item,
                  action: () => {
                    sendMessageToTranslate(
                      mc,
                      messagesToView,
                      currentUserId,
                      AITranslate,
                      item,
                    );
                  },
                };
              },
            )}
            // items={[
            //   {
            //     title: 'English',
            //     // eslint-disable-next-line @typescript-eslint/no-empty-function
            //     action: () => {
            //       sendMessageToTranslate(
            //         mc,
            //         messagesToView,
            //         currentUserId,
            //         AITranslation,
            //         'English',
            //       );
            //     },
            //   },
            //   {
            //     title: 'Ukrainian',
            //     action: () => {
            //       sendMessageToTranslate(
            //         mc,
            //         messagesToView,
            //         currentUserId,
            //         AITranslation,
            //         'Ukrainian',
            //       );
            //     },
            //   },
            //   {
            //     title: 'Spanish',
            //     action: () => {
            //       sendMessageToTranslate(
            //         mc,
            //         messagesToView,
            //         currentUserId,
            //         AITranslation,
            //         'Spanish',
            //       );
            //     },
            //   },
            //   {
            //     title: 'Portuguese',
            //     action: () => {
            //       sendMessageToTranslate(
            //         mc,
            //         messagesToView,
            //         currentUserId,
            //         AITranslation,
            //         'Portuguese',
            //       );
            //     },
            //   },
            //   {
            //     title: 'French',
            //     action: () => {
            //       sendMessageToTranslate(
            //         mc,
            //         messagesToView,
            //         currentUserId,
            //         AITranslation,
            //         'French',
            //       );
            //     },
            //   },
            //   // {
            //   //   title: 'German',
            //   //   action: () => {},
            //   // },
            // ]}
          />
        </div>
        // <div className="widget-ai-translate-with-choice-languages-container">
        //   <div
        //     className="widget-ai-translate-with-choice-languages-container--default-language"
        //     onClick={() => {
        //       if (originalTextMessage) {
        //         sendMessageToTranslate(
        //           mc,
        //           messagesToView,
        //           currentUserId,
        //           AITranslation,
        //         );
        //       } else {
        //         setOriginalTextMessage(true);
        //         setWidgetTextContent('');
        //       }
        //     }}
        //   >
        //     {originalTextMessage ? 'Show translation' : 'Show original'}
        //   </div>
        //   <div className="widget-ai-translate-with-choice-languages-container--separator">
        //     {'      '}
        //   </div>
        //   <div className="widget-ai-translate-with-choice-languages-container--select-language">
        //     <AIWidgetActions
        //       widgetToRender={
        //         <AIWidgetIcon
        //           applyZoom
        //           color="var(--main-elements)"
        //           width="16"
        //           height="16"
        //         />
        //       }
        //       items={[
        //         {
        //           title: 'English',
        //           // eslint-disable-next-line @typescript-eslint/no-empty-function
        //           action: () => {
        //             sendMessageToTranslate(
        //               mc,
        //               messagesToView,
        //               currentUserId,
        //               AITranslation,
        //               'English',
        //             );
        //           },
        //         },
        //         {
        //           title: 'Ukrainian',
        //           action: () => {
        //             sendMessageToTranslate(
        //               mc,
        //               messagesToView,
        //               currentUserId,
        //               AITranslation,
        //               'Ukrainian',
        //             );
        //           },
        //         },
        //         {
        //           title: 'Spanish',
        //           action: () => {
        //             sendMessageToTranslate(
        //               mc,
        //               messagesToView,
        //               currentUserId,
        //               AITranslation,
        //               'Spanish',
        //             );
        //           },
        //         },
        //         {
        //           title: 'Portuguese',
        //           action: () => {
        //             sendMessageToTranslate(
        //               mc,
        //               messagesToView,
        //               currentUserId,
        //               AITranslation,
        //               'Portuguese',
        //             );
        //           },
        //         },
        //         {
        //           title: 'French',
        //           action: () => {
        //             sendMessageToTranslate(
        //               mc,
        //               messagesToView,
        //               currentUserId,
        //               AITranslation,
        //               'French',
        //             );
        //           },
        //         },
        //         // {
        //         //   title: 'German',
        //         //   action: () => {},
        //         // },
        //       ]}
        //     />
        //   </div>
        //   {waitAITranslateWidget && (
        //     <div
        //       className="widget-ai-translate-with-choice-languages-container--separator"
        //       style={{
        //         height: '16px',
        //         width: '16px',
        //       }}
        //     >
        //       <LoaderComponent
        //         width="16"
        //         height="16"
        //         color="var(--color-background-info)"
        //       />
        //     </div>
        //   )}
        //   {errorAITranslate && (
        //     <div className="widget-ai-translate-with-choice-languages-container--separator">
        //       <ErrorMessageIcon
        //         errorMessageText="OpenAI server does not response"
        //         errorsDescriptions={[]}
        //       />
        //     </div>
        //   )}
        // </div>
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
        <div className="assist-answer">
          <div
            className="icon"
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
              <AssistAnswer
                width="24"
                height="24"
                applyZoom
                color="var(--main-elements)"
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
    // <div
    //   className="message-view-container--incoming-message-wrapper"
    //   onMouseEnter={() => setHaveHover(true)}
    //   onMouseLeave={() => setHaveHover(false)}
    // >
    //   <div className="message-view-container--incoming-message-wrapper__message">
    //     <div className="message-view-container--incoming-message-wrapper__avatar">
    //       <div
    //         style={
    //           props.theme
    //             ? { backgroundColor: props.theme.disabledElements() }
    //             : {}
    //         }
    //         className="message-view-container__sender-avatar"
    //       >
    //         <User
    //           width="24"
    //           height="24"
    //           applyZoom
    //           color="var(--secondary-text)"
    //         />
    //       </div>
    //     </div>
    //     <div className="message-view-container--incoming-message-container">
    //       <div
    //         style={props.theme ? { color: props.theme.secondaryText() } : {}}
    //         className="message-view-container__sender-name"
    //       >
    //         {props.senderName || props.message.sender_id.toString()}
    //       </div>
    //       <div
    //         style={
    //           props.theme
    //             ? {
    //                 color: props.theme.mainText(),
    //                 backgroundColor: props.theme.incomingBackground(),
    //               }
    //             : {}
    //         }
    //         className="message-view-container__sender-message"
    //       >
    //         {/* eslint-disable-next-line @typescript-eslint/no-unsafe-argument */}
    //         {messageContentRender(
    //           props.message,
    //           widgetTextContent,
    //           props.theme,
    //         )}
    //       </div>
    //     </div>
    //     {haveHover || openMenu ? (
    //       <div
    //         className="message-view-container--incoming-message-wrapper--context-menu"
    //         onClick={() => {
    //           setOpenMenu(!openMenu);
    //         }}
    //       >
    //         <EditDots
    //           color={
    //             props.theme
    //               ? props.theme.secondaryText()
    //               : 'var(--secondary-text)'
    //           }
    //         />
    //         {/* {openMenu ? ( */}
    //         {/*  <DropDownMenu */}
    //         {/*    items={contextMessageMenu} */}
    //         {/*    itemsAI={contextMessageMenuAI} */}
    //         {/*  /> */}
    //         {/* ) : null} */}
    //       </div>
    //     ) : (
    //       <div
    //         style={props.theme ? { color: props.theme.mainText() } : {}}
    //         className="message-view-container__incoming-time"
    //       >
    //         {getTimeShort24hFormat(props.message.date_sent)}
    //       </div>
    //     )}
    //
    //     <div
    //       className="message-view-container__incoming-time"
    //       onClick={props.onClick}
    //     >
    //       {/* {props.renderWidget} */}
    //       {renderWidgetAIAssist(
    //         props.message,
    //         props.messagesToView,
    //         props.currentUserId,
    //         props.AITranslation,
    //         props.AIAnswerToMessage,
    //       )}
    //     </div>
    //     {waitAIWidget && (
    //       <div
    //         className="message-view-container__incoming-time"
    //         style={{
    //           height: '24px',
    //           width: '24px',
    //         }}
    //       >
    //         <LoaderComponent
    //           width="24"
    //           height="24"
    //           color="var(--color-background-info)"
    //         />
    //       </div>
    //     )}
    //   </div>
    //   <div className="message-view-container__widget-ai-translate">
    //     {renderWidgetAITranslate(
    //       props.message,
    //       props.messagesToView,
    //       props.currentUserId,
    //       props.AITranslation,
    //     )}
    //   </div>
    // </div>
  );
}
