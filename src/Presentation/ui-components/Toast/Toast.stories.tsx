import type { Meta, StoryObj } from '@storybook/react';
import { toast } from 'react-toastify';

import ToastProvider from './ToastProvider';
import Button from '../Button/Button';

const meta: Meta<typeof ToastProvider> = {
  title: '@quickblox-react-ui-kit/Presentation/ui-components/Toast',
  component: ToastProvider,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    children: undefined,
  },
  argTypes: {
    children: {
      table: {
        defaultValue: {
          summary: 'ReactNode',
        },
        type: { summary: 'ReactNode' },
      },
      description: 'Children',
    },
  },
};

export default meta;
type StoryDefault = StoryObj<typeof meta>;

function ToastExample() {
  const handleOnClick = () => {
    toast('Toast message', {
      position: 'top-center',
      autoClose: 5000,
    });
  };

  return (
    <ToastProvider>
      <Button onClick={handleOnClick}>Children</Button>
    </ToastProvider>
  );
}

export const ToastDefault: StoryDefault = {
  render: () => <ToastExample />,
};
