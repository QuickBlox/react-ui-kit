import type { Meta, StoryObj } from '@storybook/react';
import PreviewFileMessage from './PreviewFileMessage';

const meta: Meta<typeof PreviewFileMessage> = {
  title: 'PreviewFileMessage',
  tags: ['autodocs'],
  component: PreviewFileMessage,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: {
      options: ['document', 'audio', 'video'],
      control: { type: 'select' },
      table: {
        defaultValue: {
          summary: 'document',
        },
        type: { summary: 'string' },
      },
      description: 'File type',
    },
    name: {
      table: {
        type: { summary: 'string' },
      },
      description: 'Name of the file',
    },
    className: {
      table: {
        type: { summary: 'string' },
      },
      description: 'Additional classes',
    },
  },
};

export default meta;
type StoryDefault = StoryObj<typeof meta>;

export const PreviewFileMessageDefault: StoryDefault = {
  args: {
    name: 'text document.txt',
  },
};

export const PreviewFileMessageAudio: StoryDefault = {
  args: {
    type: 'audio',
    name: 'audio.mp3',
  },
};

export const PreviewFileMessageVideo: StoryDefault = {
  args: {
    type: 'video',
    name: 'video.mp4',
  },
};

export const PreviewFileMessageImage: StoryDefault = {
  args: {
    src: 'https://quickblox.com/wp-content/themes/QuickbloxTheme2021/img/chat-messaging.svg',
    name: 'screenshot.jpg',
  },
};
