import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Button from './Button';

const meta = {
  title: '@quickblox-react-ui-kit/Presentation/ui-components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    disabled: false,
    loading: false,
    className: '',
    children: 'Button',
  },
  argTypes: {
    variant: {
      options: ['default', 'outlined', 'danger', 'text'],
      control: { type: 'select' },
      table: {
        defaultValue: {
          summary: "'default'",
        },
        type: { summary: 'string' },
      },
      description: 'Button style',
    },
    disabled: {
      table: {
        defaultValue: {
          summary: 'false',
        },
        type: { summary: 'boolean' },
      },
      description: 'Active',
    },
    loading: {
      table: {
        defaultValue: {
          summary: 'false',
        },
        type: { summary: 'boolean' },
      },
      description: 'Loading',
    },
    className: {
      table: {
        defaultValue: {
          summary: 'string',
        },
        type: { summary: 'string' },
      },
      description: 'Additional classes',
    },
    children: {
      table: {
        defaultValue: {
          summary: undefined,
        },
        type: { summary: 'ReactElement | string | number' },
      },
      description: 'Primary content',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type StoryDefault = StoryObj<typeof meta>;

export const ButtonDefault: StoryDefault = {};

export const ButtonOutline: StoryDefault = {
  args: {
    variant: 'outlined',
    children: 'Button',
  },
};

export const ButtonDanger: StoryDefault = {
  args: {
    variant: 'danger',
    children: 'Button',
  },
};

export const ButtonText: StoryDefault = {
  args: {
    variant: 'text',
    children: 'Button',
  },
};
