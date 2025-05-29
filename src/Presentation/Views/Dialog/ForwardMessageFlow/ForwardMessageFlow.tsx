import './ForwardMessageFlow.scss';
import React, { useState } from 'react';
import { DialogEntity } from '../../../../Domain/entity/DialogEntity';
import { MessageEntity } from '../../../../Domain/entity/MessageEntity';
import ForwardMessagePreview from './ForwardMessagePreview/ForwardMessagePreview';
import DialogsWithSearch from './DialogsWithSearch/DialogsWithSearch';
import InputForForwarding from './InputForForwarding/InputForForwarding';

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
  disableActions: boolean;
};

// eslint-disable-next-line react/function-component-definition
const ForwardMessageFlow: React.FC<ForwardMessageFlowProps> = ({
  messages,
  dialogs,
  currentDialog,
  currentUserName,
  onSendData,
  disableActions,
}: ForwardMessageFlowProps) => {
  const [activeChatsTab, setActiveChatsTab] = useState(true);
  const [selectedDialogs, setSelectedDialogs] = useState<string[]>([]);
  const [inputText, setInputText] = useState('');

  const userName = currentUserName;
  const sendMessageHandler = () => {
    if (!disableActions) {
      const dialogsForSend: DialogEntity[] = dialogs.filter((item) =>
        selectedDialogs.includes(item.id),
      );

      onSendData(dialogsForSend, messages, inputText);
    }
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
              activeChatsTab ? 'no-active-tab-button' : 'active-tab-button'
            }
            style={{ display: 'none' }}
          >
            <div
              className={
                activeChatsTab
                  ? 'no-active-tab-button-content'
                  : 'active-tab-button-content'
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
          disabled={selectedDialogs.length === 0 || disableActions}
        />
      </div>
    </div>
  );
};

export default ForwardMessageFlow;
