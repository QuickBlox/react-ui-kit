import type { Meta, StoryObj } from '@storybook/react';

import Placeholder from './Placeholder';
import {
  ErrorSvg,
  PublicChannelSvg,
  ChatSvg,
  GroupChatSvg,
  MutedSvg,
  BannedSvg,
  SearchSvg,
} from '../../icons';
import Loader from '../Loader/Loader';

const meta: Meta<typeof Placeholder> = {
  title: 'Placeholder',
  component: Placeholder,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    className: '',
    onRetry: undefined,
    icon: undefined,
  },
  argTypes: {
    icon: {
      options: [
        'Public',
        'Message',
        'Members',
        'Muted',
        'Banned',
        'Search',
        'Loader',
        'Error',
      ],
      control: 'select',
      mapping: {
        Public: <PublicChannelSvg />,
        Message: <ChatSvg />,
        Members: <GroupChatSvg />,
        Muted: <MutedSvg />,
        Banned: <BannedSvg />,
        Search: <SearchSvg />,
        Loader: <Loader size="lg" />,
        Error: <ErrorSvg />,
      },
      table: {
        type: { summary: 'svg' },
      },
      description: 'Format plug svg',
    },
    onRetry: {
      table: {
        type: { summary: 'function' },
      },
      description: 'Action on re-try',
    },
    text: {
      defaultValue: {
        summary: '',
      },
      table: {
        type: { summary: 'string' },
      },
      description: 'Placeholder text',
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

export const PlaceholderDefault: StoryDefault = {
  args: {
    text: 'The are no massage',
    icon: <PublicChannelSvg />,
  },
};

export const PlaceholderError: StoryDefault = {
  args: {
    text: 'Something wrong',
    icon: <ErrorSvg />,
    onRetry: () => undefined,
  },
};
