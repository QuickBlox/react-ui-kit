import type { Meta, StoryObj } from '@storybook/react';

import Badge from './Badge';

const meta: Meta<typeof Badge> = {
  title: '@quickblox-react-ui-kit/Presentation/ui-components/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: { count: 0, limit: 99, mute: false, classNames: '' },
  argTypes: {
    count: {
      table: {
        defaultValue: {
          summary: 0,
        },
      },
      description: 'Number of unread messages',
    },
    limit: {
      table: {
        defaultValue: {
          summary: 99,
        },
      },
      description: 'Limt of message count',
    },
    mute: {
      table: {
        defaultValue: {
          summary: 'boolean',
        },
      },
      description: 'Display type Badge',
    },
    classNames: {
      table: {
        type: { summary: 'string' },
      },
      description: 'Additional classes',
    },
  },
};

export default meta;
type StoryDefault = StoryObj<typeof meta>;

export const BadgeDefault: StoryDefault = {};

export const BadgeCount: StoryDefault = {
  args: {
    count: 9,
  },
};

export const BadgeMute: StoryDefault = {
  args: {
    limit: 99,
    count: 120,
    mute: true,
  },
};
