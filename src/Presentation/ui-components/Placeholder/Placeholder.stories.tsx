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

const meta: Meta<typeof Placeholder> = {
  title: '@quickblox-react-ui-kit/Presentation/ui-components/Placeholder',
  component: Placeholder,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    text: ['Text for placeholder'],
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
        summary: [''],
      },
      table: {
        type: { summary: 'array' },
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
    icon: <PublicChannelSvg />,
  },
};

export const PlaceholderError: StoryDefault = {
  args: {
    icon: <ErrorSvg />,
    onRetry: () => undefined,
  },
};
