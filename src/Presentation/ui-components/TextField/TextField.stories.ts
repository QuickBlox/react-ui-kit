import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import TextField from './TextField';

const meta: Meta<typeof TextField> = {
  title: '@quickblox-react-ui-kit/Presentation/ui-components/TextField',
  component: TextField,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    label: '',
    disabled: false,
    loading: false,
    className: '',
  },
  argTypes: {
    value: {
      table: {
        type: { summary: 'function' },
      },
      description: 'Value change function',
    },
    onChange: {
      table: {
        defaultValue: {
          summary: "''",
        },
        type: { summary: 'string' },
      },
      description: 'Text field label',
    },
    id: {
      table: {
        defaultValue: {
          summary: "''",
        },
        type: { summary: 'string' },
      },
      description: 'Custom id for text field',
    },
    label: {
      table: {
        defaultValue: {
          summary: "''",
        },
        type: { summary: 'string' },
      },
      description: 'Text field label',
    },
    icon: {
      control: false,
      table: {
        type: { summary: 'svg' },
      },
      description: 'Format plug svg',
    },
    loading: {
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
      description: 'Displays the load',
    },
    disabled: {
      table: {
        type: { summary: 'boolean' },
        defaultValue: {
          summary: 'false',
        },
      },
      description: 'Active',
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

export const TextFieldDefault: StoryDefault = {
  name: 'TextField Default',
};

export const TextFieldDisabled: StoryDefault = {
  name: 'TextField Disabled',
  args: {
    disabled: true,
    label: 'Text Label',
    placeholder: 'Placeholder',
  },
};

export const TextFieldReset: StoryDefault = {
  name: 'TextField Reset',
  args: {
    label: 'Text Label',
    placeholder: 'Placeholder',
    value: 'Text',
  },
};
