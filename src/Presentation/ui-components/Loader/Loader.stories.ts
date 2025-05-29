import type { Meta, StoryObj } from '@storybook/react';

import Loader from './Loader';

const meta = {
  title: '@quickblox-react-ui-kit/Presentation/ui-components/Loader',
  component: Loader,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    className: '',
  },
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' },
      table: {
        defaultValue: {
          summary: 'md',
        },
        type: { summary: 'string' },
      },
      description: 'Size',
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
  },
} satisfies Meta<typeof Loader>;

export default meta;
type StoryDefault = StoryObj<typeof meta>;

export const LoaderDefault: StoryDefault = {};
