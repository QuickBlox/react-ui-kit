import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import '../../Views/Dialog/Dialog.scss';
import '../../Views/Dialog/DialogHeader/DialogInfoIcon/DialogInfoIcon.scss';
import { toast } from 'react-toastify';
import { DialogEntity } from '../../../Domain/entity/DialogEntity';
import DialogList from '../../Views/DialogList/DialogList';
import DialogInfo from '../../Views/DialogInfo/DialogInfo';
import DesktopLayout from './DesktopLayout';
import Dialog from '../../Views/Dialog/Dialog';
import BaseViewModel from '../../../CommonTypes/BaseViewModel';
import { DefaultConfigurations } from '../../../Data/DefaultConfigurations';
import { DialogType } from '../../../Domain/entity/DialogTypes';
import { GroupDialogEntity } from '../../../Domain/entity/GroupDialogEntity';
import { PublicDialogEntity } from '../../../Domain/entity/PublicDialogEntity';
import { MessageEntity } from '../../../Domain/entity/MessageEntity';
import { getDateForDialog } from '../../../utils/DateTimeFormatter';
import ReplyMessagePreview from '../../ui-components/MessageInput/ReplyMessagePreview/ReplyMessagePreview';
import ForwardMessageFlow from '../../Views/Dialog/ForwardMessageFlow/ForwardMessageFlow';
import SectionList from '../../components/containers/SectionList';
import { SectionItem } from '../../components/containers/SectionList/useComponent';
import MembersList from '../../Views/DialogInfo/MembersList/MembersList';
import PreviewDialogViewModel from '../../Views/PreviewDialog/PreviewDialogViewModel';
import PreviewDialog from '../../Views/PreviewDialog/PreviewDialog';
import Header from '../../ui-components/Header/Header';
import Avatar from '../../ui-components/Avatar/Avatar';
import {
  GroupChatSvg,
  InformationSvg,
  PublicChannelSvg,
  UserSvg,
  NewChatSvg,
  SearchSvg,
  ChatSvg,
} from '../../icons';

import Loader from '../../ui-components/Loader/Loader';
import TextField from '../../ui-components/TextField/TextField';
import Button from '../../ui-components/Button/Button';
import DialogWindow from '../../ui-components/DialogWindow/DialogWindow';
import MessageInput from '../../ui-components/MessageInput/MessageInput';
import AIRephraseWidget from '../../Views/Dialog/AIWidgets/AIRephraseWidget/AIRephraseWidget';
import MessageItem from '../../Views/Dialog/MessageItem/MessageItem';
import { MessageSeparator, Placeholder } from '../../ui-components';
import ToastProvider from '../../ui-components/Toast/ToastProvider';
import CreateNewDialogFlow from '../../Views/Flow/CreateDialogFlow/CreateNewDialogFlow';
import useQuickBloxUIKit from '../../../hooks/useQuickBloxUIKit';
import { QuickBloxUIKitDesktopLayoutProps } from '../../../CommonTypes/CommonTypes';

const QuickBloxUIKitDesktopLayout: React.FC<
  QuickBloxUIKitDesktopLayoutProps
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,react/function-component-definition
> = ({
  theme = undefined,
  AITranslate = undefined,
  AIRephrase = undefined,
  AIAssist = undefined,
  uikitHeightOffset = '0px',
}: QuickBloxUIKitDesktopLayoutProps) => {
  const {
    constants: {
      maxWidthToResizing,
      workHeight,
      messagesContainerMobileHeight,
      messagesContainerHeight,
      clientContainerHeight,
      dialogListScrollableHeight,
    },
    data: {
      isOnline,
      isMobile,
      selectedDialog,
      dialogAvatarUrl,
      showDialogList,
      showDialogMessages,
      showDialogInformation,
      needDialogInformation,
      isRecording,
      messageText,
      isLeaving,
      waitAIWidget,
      defaultAIRephraseWidget,
      defaultAITranslateWidget,
      defaultAIAssistWidget,
      maxTokensForAIRephrase,
      rephraseTones,
      enableForwarding,
      enableReplying,
      userName,
      currentUserId,
      forwardMessage,
      warningErrorText,
      isAllMembersShow,
      scrollUpToDown,
      needRefresh,
      forwardMessageModal,
      showReplyMessage,
      messagesToReply,
      isOpen,
      newModal,
    },
    models: {
      dialogsViewModel,
      messagesViewModel,
      userViewModel,
      currentContext,
    },
    handlers: {
      setSelectedDialog,
      handleLeaveDialog,
      setForwardMessage,
      informationCloseHandler,
      informationOpenHandler,
      setIsRecording,
      setIsAllMembersShow,
      fetchMoreData,
      sendTextMessageActions,
      ChangeFileHandler,
      handleOnReply,
      handleSendData,
      handleHeightChange,
      leaveDialogHandler,
      createDialogHandler,
      closeReplyMessageFlowHandler,
      setMessageText,
      setWaitAIWidget,
      handleDialogOnClick,
    },
  } = useQuickBloxUIKit({
    AIRephrase,
    AITranslate,
    AIAssist,
    uikitHeightOffset,
  });

  // eslint-disable-next-line consistent-return
  const renderIconForTypeDialog = (dialogEntity: DialogEntity) => {
    if (dialogEntity.type === DialogType.group) {
      const groupDialogEntity = dialogEntity as GroupDialogEntity;

      return (
        <Avatar
          src={groupDialogEntity.photo || ''}
          icon={<GroupChatSvg />}
          size="md"
        />
      );
    }
    if (dialogEntity.type === DialogType.private) {
      return <Avatar src={dialogAvatarUrl} icon={<UserSvg />} size="md" />;
    }
    if (dialogEntity.type === DialogType.public) {
      const publicDialogEntity = dialogEntity as PublicDialogEntity;

      return (
        <Avatar
          src={publicDialogEntity.photo}
          icon={<PublicChannelSvg />}
          size="md"
        />
      );
    }
  };

  function getSectionData(messages2View: MessageEntity[]) {
    const groupMessages: { [date: string]: MessageEntity[] } = {};
    const reversedMessages = [...messages2View].reverse();

    reversedMessages.forEach((message) => {
      const date = new Date(message.created_at);

      date.setUTCHours(0, 0, 0, 0);

      const dateString = date.toISOString();

      groupMessages[dateString] = [
        ...(groupMessages[dateString] || []),
        message,
      ];
    });
    Object.keys(groupMessages).forEach((date) => {
      groupMessages[date].sort((a, b) => a.date_sent - b.date_sent);
    });
    const sections: SectionItem<MessageEntity>[] = Object.keys(groupMessages)
      .sort((a, b) => a.localeCompare(b))
      .map((date) => ({
        title: date,
        data: { [date]: groupMessages[date] },
      }));
    // const sections: SectionItem<MessageEntity>[] = Object.keys(
    //   groupMessages,
    // ).map((date) => ({
    //   title: date,
    //   data: { [date]: groupMessages[date] },
    // }));

    return sections;
  }

  const [showSearchDialogs, setShowSearchDialogs] = React.useState(false);
  const [nameDialogForSearch, setNameDialogForSearch] = React.useState('');
  const dialogs: PreviewDialogViewModel[] = [];
  const [dialogsToView, setDialogsToView] = React.useState<
    PreviewDialogViewModel[]
  >([]);
  //
  const [selectedItem, setSelectedItem] = React.useState<
    BaseViewModel<DialogEntity> | undefined
  >(undefined);
  const [pointerEventsValue, setPointerEventsValue] = useState<'auto' | 'none'>(
    'auto',
  );

  const pointerEventsRef = useRef<'auto' | 'none'>('auto');

  let timeout: number | null = null;

  useEffect(() => {
    return () => {
      if (timeout !== null) {
        clearTimeout(timeout);
        timeout = null;
      }
    };
  }, []);

  useEffect(() => {
    if (dialogsViewModel.loading) {
      pointerEventsRef.current = 'none';
      setPointerEventsValue('none');

      if (timeout !== null) {
        clearTimeout(timeout);
      }

      timeout = window.setTimeout(() => {
        console.warn('Forced unlock after 12 seconds due to loading timeout.');
        pointerEventsRef.current = 'auto';
        setPointerEventsValue('auto');

        // Ensure loading status is reset
        dialogsViewModel.setWaitLoadingStatus(false);

        timeout = null;
      }, 12000);
    } else {
      if (timeout !== null) {
        clearTimeout(timeout);
        timeout = null;
      }

      pointerEventsRef.current = 'auto';
      setPointerEventsValue('auto');

      // Ensure loading status is reset on successful load
      dialogsViewModel.setWaitLoadingStatus(false);
    }
  }, [dialogsViewModel.loading]);

  // previous version
  // let timeout: NodeJS.Timeout | number | undefined;
  //
  // useEffect(() => {
  //   return () => {
  //     if (timeout) {
  //       clearTimeout(timeout);
  //     }
  //   };
  // }, []);
  //
  // useEffect(() => {
  //
  //   if (dialogsViewModel.loading) {
  //     setPointerEventsValue('none');
  //
  //     timeout = setTimeout(() => {
  //       console.warn('Forced unlock after 12 seconds due to loading timeout.');
  //       setPointerEventsValue('auto');
  //     }, 12000);
  //   } else {
  //     setPointerEventsValue('auto');
  //   }
  //
  // }, [dialogsViewModel.loading]);

  useEffect(() => {
    if (pointerEventsValue === 'auto') {
      dialogsViewModel.setWaitLoadingStatus(false);
    }
  }, [pointerEventsValue]);

  const selectDialogActions = (item: BaseViewModel<DialogEntity>): void => {
    if (
      isOnline &&
      (pointerEventsValue !== 'none' ||
        pointerEventsRef.current === 'auto' ||
        !dialogsViewModel.loading)
    ) {
      setSelectedDialog(item.entity);
    }
  };

  const handleSelectedDialog = (
    dialog: BaseViewModel<DialogEntity>,
    index: number,
  ) => {
    //
    setDialogsToView((prevState) => {
      const newState = prevState.map((el) => {
        // eslint-disable-next-line no-param-reassign
        el.isSelected = false;

        return el;
      });

      newState[index].isSelected = true;

      return newState;
    });
    //
  };

  useEffect(() => {
    dialogs.slice(0);

    dialogsViewModel?.dialogs.forEach((entity) => {
      const pw: PreviewDialogViewModel = new PreviewDialogViewModel(
        (it) => {
          if (selectDialogActions) {
            setSelectedItem(it);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            selectDialogActions(it);
          }
        },
        (it) => {
          if (selectDialogActions) {
            setSelectedItem(it);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            selectDialogActions(it);
          }
        },
        entity,
      );

      if (
        (selectedItem && selectedItem.entity.id === entity.id) ||
        (dialogsViewModel.entity && dialogsViewModel.entity.id === entity.id)
      ) {
        pw.isSelected = true;
      }
      dialogs.push(pw);
    });

    setDialogsToView(dialogs);
  }, [dialogsViewModel?.dialogs, dialogsViewModel.entity]);
  //
  const searchedDialogs = nameDialogForSearch
    ? dialogsToView.filter(({ entity }) =>
        entity.name.toUpperCase().includes(nameDialogForSearch.toUpperCase()),
      )
    : dialogsToView;

  function getMessageDateTimeSent(item: PreviewDialogViewModel): string {
    let dateInt = 0;
    let formattedValue = '';

    if (item.entity.lastMessage.dateSent) {
      dateInt = item.entity.lastMessage.dateSent;
      if (Number.isNaN(dateInt)) {
        return formattedValue;
      }
      formattedValue = getDateForDialog(dateInt * 1000);
    }

    return formattedValue;
  }

  const getDialogAvatar = (
    currentDialog: PreviewDialogViewModel,
  ): JSX.Element | undefined => {
    let AvatarComponent: JSX.Element | undefined;

    if (
      currentDialog.entity.type === DialogType.group ||
      currentDialog.entity.type === DialogType.public
    ) {
      const imagePhoto = (currentDialog.entity as GroupDialogEntity).photo;

      AvatarComponent = imagePhoto ? (
        <Avatar size="lg" src={imagePhoto} />
      ) : undefined;
    }

    return AvatarComponent;
  };

  //
  const renderDialogItem = (
    dlg: PreviewDialogViewModel,
    index: number,
    handleSelectDialog: (
      dialog: BaseViewModel<DialogEntity>,
      index: number,
    ) => void,
  ) => {
    return (
      <div
        key={dlg.entity.id}
        onClick={() => handleSelectDialog(dlg, index)}
        style={{
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          pointerEvents: pointerEventsValue || 'auto',
        }}
      >
        <PreviewDialog
          typeDialog={dlg.entity.type || DialogType.group}
          dialogViewModel={dlg}
          theme={{
            themeName: 'light',
            selected: selectedDialog?.id === dlg.entity.id,
            colorTheme: theme,
            muted: false,
          }}
          title={`${dlg.entity.name || ''}`}
          unreadMessageCount={dlg.entity.unreadMessageCount || undefined}
          message_date_time_sent={getMessageDateTimeSent(dlg)}
          previewMessage={dlg.entity.lastMessage.text}
          dialogAvatar={getDialogAvatar(dlg)}
          onLeaveDialog={leaveDialogHandler}
        />
      </div>
    );
  };

  return (
    <ToastProvider>
      <div className="qb-uikit-layout">
        <div
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
            zIndex: '100',
            display:
              isLeaving || (messagesViewModel && messagesViewModel.loading)
                ? 'block'
                : 'none',
          }}
        />
        <DesktopLayout
          mainContainerStyles={{
            minHeight: workHeight,
            maxHeight: workHeight,
          }}
          onHeightChange={handleHeightChange}
          theme={theme}
          dialogsView={
            showDialogList ? (
              <DialogList
                onDialogSelected={handleSelectedDialog}
                scrollableHeight={dialogListScrollableHeight}
                canScrolling={!dialogsViewModel?.loading}
                renderHeader={
                  <Header title="Dialogs">
                    <SearchSvg
                      className="dialog-list-header__icons"
                      onClick={() => {
                        setShowSearchDialogs(!showSearchDialogs);
                        setNameDialogForSearch('');
                      }}
                    />
                    <NewChatSvg
                      className={cn('dialog-list-header__icons', {
                        'dialog-list-header__icons--disable': !isOnline,
                      })}
                      onClick={createDialogHandler}
                    />
                  </Header>
                }
                renderFilter={
                  showSearchDialogs ? (
                    <TextField
                      className="search-dialog-text-field"
                      disabled={dialogsViewModel.loading}
                      placeholder="Search"
                      icon={
                        <SearchSvg className="search-dialog-text-field__icon" />
                      }
                      value={nameDialogForSearch}
                      onChange={setNameDialogForSearch}
                    />
                  ) : null
                }
                renderDialogList={(handleSelectDialog) => (
                  <>
                    {dialogsViewModel?.loading && (
                      <div
                        className="dialog-list__loader-container"
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Loader size="md" className="dialog-list__loader" />
                      </div>
                    )}
                    {searchedDialogs.length > 0 ? (
                      searchedDialogs.map((dlg, index) =>
                        renderDialogItem(dlg, index, handleSelectDialog),
                      )
                    ) : (
                      <Placeholder
                        icon={<ChatSvg />}
                        text="There are no dialogs."
                        className="dialog-empty-chat-placeholder"
                      />
                    )}
                  </>
                )}
              />
            ) : null
          }
          dialogMessagesView={
            showDialogMessages &&
            selectedDialog &&
            selectedDialog &&
            dialogsViewModel.entity ? (
              <Dialog
                rootStyles={{
                  minHeight: clientContainerHeight,
                  maxHeight: clientContainerHeight,
                }}
                messagesContainerStyles={
                  isMobile
                    ? {
                        minHeight: messagesContainerMobileHeight,
                        maxHeight: messagesContainerMobileHeight,
                      }
                    : {
                        minHeight: messagesContainerHeight,
                        maxHeight: messagesContainerHeight,
                      }
                }
                messagesViewModel={messagesViewModel}
                warningErrorText={warningErrorText}
                // subHeaderContent={<CompanyLogo />}
                // upHeaderContent={<CompanyLogo />}
                renderHeader={
                  <Header
                    title={dialogsViewModel.entity.name}
                    avatar={renderIconForTypeDialog(dialogsViewModel.entity)}
                    onGoBack={() => setSelectedDialog(undefined)}
                    className="dialog-header__line"
                  >
                    <div className="dialog-header-right">
                      <InformationSvg
                        className="dialog-header-right__icon"
                        onClick={informationOpenHandler}
                      />
                    </div>
                  </Header>
                }
                renderMessageList={
                  messagesViewModel &&
                  messagesViewModel.messages &&
                  messagesViewModel.messages.length > 0 && (
                    <SectionList
                      resetScroll={scrollUpToDown}
                      className="messages-container"
                      onEndReached={fetchMoreData}
                      onEndReachedThreshold={0.95}
                      refreshing={needRefresh || messagesViewModel?.loading}
                      renderSectionHeader={(section) => (
                        <div className="message-view-container--system-message-wrapper">
                          <div
                            style={
                              theme
                                ? { backgroundColor: theme.disabledElements() }
                                : {}
                            }
                            className="message-view-container--system-message-wrapper__date_container"
                          >
                            <MessageSeparator
                              text={section.title}
                              type="date"
                            />
                          </div>
                        </div>
                      )}
                      renderItem={([, groupMessages], listRef) =>
                        groupMessages.map((message) => (
                          <MessageItem
                            disableAction={!isOnline}
                            avatar={
                              <Avatar
                                src={message?.sender?.photo || ''}
                                icon={<UserSvg />}
                                size="md"
                              />
                            }
                            message={message}
                            currentUserId={currentUserId || -1}
                            enableForwarding={enableForwarding}
                            enableReplying={enableReplying}
                            onReply={(m: MessageEntity) => {
                              handleOnReply(m);
                            }}
                            onForward={(m: MessageEntity) => {
                              if (isOnline) {
                                setForwardMessage(m);
                                forwardMessageModal.toggleModal();
                              }
                            }}
                            listRef={listRef}
                            AIAssistWidget={defaultAIAssistWidget}
                            AITranslateWidget={defaultAITranslateWidget}
                            languagesForAITranslate={DefaultConfigurations.getAdditionalLanguagesForAITranslate(
                              // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                              currentContext.InitParams.qbConfig.configAIApi
                                .AITranslateWidgetConfig,
                            )}
                            defaultTranslationLanguage={DefaultConfigurations.getDefaultLanguageForAITranslate(
                              // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                              currentContext.InitParams.qbConfig.configAIApi
                                .AITranslateWidgetConfig,
                            )}
                            onError={(messageError: string) => {
                              toast(messageError);
                            }}
                            messagesToView={messagesViewModel.messages}
                            maxTokens={maxTokensForAIRephrase}
                          />
                        ))
                      }
                      sections={getSectionData(messagesViewModel.messages)}
                    />
                  )
                }
                renderMessageInput={
                  <MessageInput
                    disableActions={!isOnline}
                    previewMessage={
                      showReplyMessage ? (
                        <ReplyMessagePreview
                          messages={[...messagesToReply]}
                          userNameSentMessage={
                            messagesToReply[0]?.sender?.full_name ||
                            messagesToReply[0]?.sender?.login ||
                            messagesToReply[0]?.sender?.email ||
                            messagesToReply[0]?.sender?.id.toString() ||
                            ''
                          }
                          onClose={closeReplyMessageFlowHandler}
                        />
                      ) : undefined
                    }
                    value={messageText}
                    placeholder="Type message"
                    loading={waitAIWidget || messagesViewModel?.loading}
                    onChange={(text: string) => {
                      setMessageText(text);
                    }}
                    onChanging={() => {
                      messagesViewModel.sendTypingTextMessage();
                    }}
                    onSend={(textToSend: string) => {
                      sendTextMessageActions(textToSend);
                    }}
                    onAttachment={ChangeFileHandler}
                    enableVoice={isRecording}
                    onVoice={() => {
                      if (messagesViewModel?.loading || !isOnline) return;
                      setIsRecording(!isRecording);
                    }}
                    rephrase={
                      <AIRephraseWidget
                        disableActions={!isOnline || messageText.length === 0}
                        waitAIWidget={waitAIWidget}
                        messageText={messageText}
                        theme={theme}
                        AIRephrase={defaultAIRephraseWidget}
                        setWaitAIWidget={setWaitAIWidget}
                        setPrevValueText={(prevValue) => {
                          setMessageText(prevValue);
                        }}
                        setMessageErrorToast={(e: string) => {
                          toast(e);
                        }}
                        messagesToView={messagesViewModel.messages}
                        currentUserId={currentUserId || -1}
                        maxTokensForAIRephrase={maxTokensForAIRephrase}
                        rephraseTones={rephraseTones}
                      />
                    }
                  />
                }
                maxWidthToResize={maxWidthToResizing}
                theme={theme}
              />
            ) : (
              !isMobile && (
                <div
                  className="empty-chat-placeholder"
                  style={{
                    minHeight: clientContainerHeight,
                    maxHeight: clientContainerHeight,
                  }}
                >
                  <Placeholder
                    text={['Select a chat to start messaging.']}
                    className="empty-chat-history-placeholder"
                  />
                </div>
              )
            )
          }
          dialogInfoView={
            showDialogInformation &&
            selectedDialog &&
            needDialogInformation &&
            (isAllMembersShow ? (
              <MembersList
                closeInformationHandler={() => {
                  setIsAllMembersShow(false);
                }}
                members={userViewModel.users}
                maxHeight={dialogListScrollableHeight}
              />
            ) : (
              <DialogInfo
                disableAction={!isOnline}
                onShowAllMemberClick={(value: boolean) => {
                  setIsAllMembersShow(value);
                }}
                users={userViewModel.users}
                rootStyles={{
                  minHeight: clientContainerHeight,
                  maxHeight: clientContainerHeight,
                }}
                dialog={selectedDialog}
                dialogViewModel={dialogsViewModel}
                onCloseDialogInformationHandler={informationCloseHandler}
              />
            ))
          }
        />
        <DialogWindow
          open={isOpen}
          title="Leave dialog?"
          onClose={handleDialogOnClick}
        >
          <div className="dialog-leave-container">
            <Button variant="outlined" onClick={handleDialogOnClick}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleLeaveDialog}>
              Leave
            </Button>
          </div>
        </DialogWindow>
        <DialogWindow
          title="New dialog"
          onClose={newModal.toggleModal}
          open={newModal.isOpen}
          className={
            isMobile
              ? 'dialog-list-new-dialog-mobile-container'
              : 'dialog-list-new-dialog-desktop-container'
          }
        >
          <CreateNewDialogFlow
            dialogsViewModel={dialogsViewModel}
            onCancel={newModal.toggleModal}
            onFinished={(newDialog) => {
              newModal.toggleModal();
              setSelectedDialog(newDialog);
            }}
            isOnline={isOnline}
          />
        </DialogWindow>
        {selectedDialog && (
          <DialogWindow
            title="Forward"
            open={forwardMessageModal.isOpen}
            onClose={forwardMessageModal.toggleModal}
          >
            <ForwardMessageFlow
              messages={[forwardMessage!]}
              currentDialog={selectedDialog}
              currentUserName={userName || ''}
              dialogs={dialogsViewModel.dialogs}
              onSendData={handleSendData}
              disableActions={!isOnline}
            />
          </DialogWindow>
        )}
      </div>
    </ToastProvider>
  );
};

export default QuickBloxUIKitDesktopLayout;
