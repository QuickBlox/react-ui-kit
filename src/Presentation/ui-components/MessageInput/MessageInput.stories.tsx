import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import MessageInput from './MessageInput';
import ReplyMessagePreview from './ReplyMessagePreview/ReplyMessagePreview';
import { Stubs } from '../../../Data/Stubs';

const meta: Meta<typeof MessageInput> = {
  title: '@quickblox-react-ui-kit/Presentation/ui-components/MessageInput',
  component: MessageInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    rephrase: {
      control: false,
    },
    value: {
      control: 'text',
      description: 'Input value',
    },
    onChange: {
      action: 'changed',
      description: 'Change event handler',
    },
    onSend: {
      action: 'sent',
      description: 'Send event handler',
    },
    enableVoice: {
      control: 'boolean',
      description: 'Enable voice message option',
    },
    onVoice: {
      action: 'voice activated',
      description: 'Voice event handler',
    },
    disableAttachment: {
      control: 'boolean',
      description: 'Disable attachment option',
    },
    onAttachment: {
      action: 'attachment added',
      description: 'Attachment event handler',
    },
    loading: {
      control: 'boolean',
      description: 'Enable loading state',
    },
    previewMessage: {
      description: 'Last message by type',
      control: 'select',
      options: ['Text', 'Image', 'Video', 'Audio', 'None'],
      mapping: {
        Text: (
          <ReplyMessagePreview
            messages={[Stubs.initializeMessagesWithMockData()[3]]}
            userNameSentMessage=""
            onClose={() => {
              console.log('closed');
            }}
          />
        ),
        Image: (
          <ReplyMessagePreview
            messages={[Stubs.initializeMessagesWithMockData()[0]]}
            userNameSentMessage=""
            onClose={() => {
              console.log('closed');
            }}
          />
        ),
        Video: (
          <ReplyMessagePreview
            messages={[Stubs.initializeMessagesWithMockData()[1]]}
            userNameSentMessage=""
            onClose={() => {
              console.log('closed');
            }}
          />
        ),
        Audio: (
          <ReplyMessagePreview
            messages={[Stubs.initializeMessagesWithMockData()[2]]}
            userNameSentMessage=""
            onClose={() => {
              console.log('closed');
            }}
          />
        ),
        None: undefined,
      },
    },
    className: {
      control: 'text',
      description: 'CSS class',
    },
  },
};

export default meta;

export const MessageInputDefault: StoryObj<typeof MessageInput> = {
  name: 'MessageInput Default',
  args: {
    value: '',
    enableVoice: true,
    disableAttachment: false,
    loading: false,
  },
};

export const MessageInputWithVoiceMessage: StoryObj<typeof MessageInput> = {
  name: 'MessageInput With Voice Message',
  args: {
    ...MessageInputDefault.args,
    enableVoice: true,
    onVoice: () => {
    }
  },
};

export const MessageInputWithPreview: StoryObj<typeof MessageInput> = {
  name: 'MessageInput With Preview',
  args: {
    ...MessageInputDefault.args,
    previewMessage: (
      <ReplyMessagePreview
        messages={[Stubs.initializeMessagesWithMockData()[0]]}
        userNameSentMessage=""
        onClose={() => {
          console.log('closed');
        }}
      />
    ),
  },
};

export const MessageInputLoadingState: StoryObj<typeof MessageInput> = {
  name: 'MessageInput Loading State',
  args: {
    ...MessageInputDefault.args,
    loading: true,
  },
};
