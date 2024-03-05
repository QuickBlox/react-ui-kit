import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import MessageInput from './MessageInput';
import ReplyMessagePreview from './ReplyMessagePreview/ReplyMessagePreview';
import { Stubs } from '../../../Data/Stubs';

const meta: Meta<typeof MessageInput> = {
  title: 'MessageInput',
  component: MessageInput,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
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

export const Default: StoryObj<typeof MessageInput> = {
  args: {
    value: '',
    enableVoice: false,
    disableAttachment: false,
    loading: false,
  },
};

export const WithVoiceMessage: StoryObj<typeof MessageInput> = {
  args: {
    ...Default.args,
    enableVoice: true,
  },
};

export const WithPreview: StoryObj<typeof MessageInput> = {
  args: {
    ...Default.args,
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

export const LoadingState: StoryObj<typeof MessageInput> = {
  args: {
    ...Default.args,
    loading: true,
  },
};

// Дополните примеры в соответствии с вашими требованиями
