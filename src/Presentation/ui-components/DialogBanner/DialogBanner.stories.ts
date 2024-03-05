import type { Meta, StoryObj } from '@storybook/react';

import DialogBanner from './DialogBanner';

const meta = {
  title: 'DialogBanner',
  component: DialogBanner,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: { text: '' },
  argTypes: {
    text: {
      table: {
        defaultValue: {
          summary: '',
        },
      },
      description: 'Text content',
    },
    onClick: {
      description: 'click function',
      table: {
        type: { summary: 'function' },
      },
    },
  },
} satisfies Meta<typeof DialogBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DialogBannerDefault: Story = {
  args: {
    text: '3 new messages',
  },
};
