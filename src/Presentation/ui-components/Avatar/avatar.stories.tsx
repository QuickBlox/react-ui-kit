import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import {
  GroupChatSvg,
  UserSvg,
  ConferenceSvg,
  PublicChannelSvg,
} from '../../icons';
import Avatar from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: '@quickblox-react-ui-kit/Presentation/ui-components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    size: 'md',
  },
  argTypes: {
    icon: {
      type: 'function',
      options: ['User', 'Group', 'Conference', 'Public'],
      control: 'select',
      mapping: {
        User: <UserSvg />,
        Group: <GroupChatSvg />,
        Conference: <ConferenceSvg />,
        Public: <PublicChannelSvg />,
      },
      table: {
        type: { summary: 'svg' },
      },
      description: 'Format plug svg',
    },
    size: {
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
      control: { type: 'select' },
      table: {
        defaultValue: {
          summary: 'md',
        },
        type: { summary: 'string' },
      },
      description: 'Size',
    },
    src: {
      table: {
        type: { summary: 'url' },
      },
      description: 'Avatar image source',
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

export const AvatarDefault: StoryDefault = {};

export const AvatarIcon: StoryDefault = {
  args: {
    icon: <UserSvg />,
  },
};

export const AvatarImage: StoryDefault = {
  args: {
    src: 'https://quickblox.com/wp-content/themes/QuickbloxTheme2021/img/chat-messaging.svg',
    // src: 'https://cdn-ikpjoif.nitrocdn.com/WZsqFPiehrtwFaaeJNQAQZrkRMgaTuyL/assets/images/optimized/rev-83f47e6/quickblox.com/wp-content/themes/QuickbloxTheme2021/img/custom-white-label-solution.jpg',
  },
};
