import './ForwardMessageFlow.scss';
import React, { useState } from 'react';
import { DialogEntity } from '../../../../Domain/entity/DialogEntity';
import { MessageEntity } from '../../../../Domain/entity/MessageEntity';
import ForwardMessagePreview from './ForwardMessagePreview/ForwardMessagePreview';
import DialogsWithSearch from './DialogsWithSearch/DialogsWithSearch';
import InputForForwarding from './InputForForwarding/InputForForwarding';

// ForwardMessageFlow -  !!! NEW name this component
//! !! Where render errors!!!!
type ForwardMessageFlowProps = {
  messages: MessageEntity[];
  dialogs: DialogEntity[];
  currentDialog: DialogEntity;
  currentUserName: string;
  onSendData: (
    dialogs: DialogEntity[],
    messages: MessageEntity[],
    relatedText: string,
  ) => void;
  // forwardedMessages: MessageEntity[];
  //   // renderDialogsWithSearch: React.ReactNode; -- delete and remove call DialogsWithSearch component into this component
  //   // dialogs: DialogEntity[] - input params
  //  // currentDialog: DialogEntity - input params
  //     /*
  //     DialogsWithSearch
  //       onSelect => return selected dialogs
  //      */
  // renderForwardMessage: React.ReactNode;  // -- delete and remove call ForwardMessage component into this component
  //   // forwardedMessages: MessageEntity[] - input params
  //   // renderMessageInput: React.ReactNode; -- delete and remove call MessageInput component into this component
  //                               // add handlers for MessageInput in this component
  //                                       // onSendText
  //                                       // onSendAttachment
  //                                       // onSendVoice
  //                                       // onRephrase ???
  //
  //   // Add State this component:
  //   // selectedDialogs - list dialog ForForwarding
  //
  //   //after....
  // // renderUsersWithSearch: React.ReactNode;
};

// eslint-disable-next-line react/function-component-definition
const ForwardMessageFlow: React.FC<ForwardMessageFlowProps> = ({
  messages,
  dialogs,
  currentDialog,
  currentUserName,
  onSendData,
}: ForwardMessageFlowProps) => {
  const [activeChatsTab, setActiveChatsTab] = useState(true);
  const [selectedDialogs, setSelectedDialogs] = useState(['0']);
  const [inputText, setInputText] = useState('');

  const userName = currentUserName;
  const sendMessageHandler = () => {
    const dialogsForSend: DialogEntity[] = dialogs.filter((item) =>
      selectedDialogs.includes(item.id),
    );

    onSendData(dialogsForSend, messages, inputText);
  };

  return (
    <div className="forward-message-flow">
      <div className="forward-message-flow-tabs">
        <div
          className="forward-message-flow-tabs-buttons"
          onClick={() => {
            setActiveChatsTab(!activeChatsTab);
          }}
        >
          <div
            className={
              activeChatsTab ? 'active-tab-button' : 'no-active-tab-button'
            }
          >
            <div
              className={
                activeChatsTab
                  ? 'active-tab-button-content'
                  : 'no-active-tab-button-content'
              }
            >
              Chats
            </div>
          </div>
          <div
            className={
              !activeChatsTab ? 'active-tab-button' : 'no-active-tab-button'
            }
            style={{ display: 'none' }}
          >
            <div
              className={
                !activeChatsTab
                  ? 'active-tab-button-content'
                  : 'no-active-tab-button-content'
              }
            >
              Contacts
            </div>
          </div>
        </div>
        <svg
          className="forward-message-flow-tabs-buttons-divider"
          width="332"
          height="0"
        />
      </div>
      <DialogsWithSearch
        dialogs={dialogs}
        currentDialog={currentDialog}
        selectedDialogs={selectedDialogs}
        onSelect={(idItem) => {
          const newSelectedDialogs = [idItem];

          setSelectedDialogs(newSelectedDialogs);
        }}
      />
      <div className="forward-message-flow-message-input">
        <div className="forward-message-flow-message-input-row">
          <ForwardMessagePreview
            messages={messages}
            userNameSentMessage={userName}
          />
        </div>
        <InputForForwarding
          inputText={inputText}
          onChange={(s) => setInputText(s)}
          onSend={sendMessageHandler}
        />
      </div>
    </div>
  );
};

export default ForwardMessageFlow;
