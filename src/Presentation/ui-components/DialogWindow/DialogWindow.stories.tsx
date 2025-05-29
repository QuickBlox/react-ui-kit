import React from 'react';
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import DialogWindow from './DialogWindow';
import Button from '../Button/Button';

const meta: Meta<typeof DialogWindow> = {
  title: '@quickblox-react-ui-kit/Presentation/ui-components/DialogWindow',
  component: DialogWindow,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    children: undefined,
    open: false,
    title: '',
    className: '',
    onClose: undefined,
  },
  argTypes: {
    title: {
      table: {
        defaultValue: {
          summary: '',
        },
        type: { summary: 'string' },
      },
      description: 'Title for modal window',
    },
    children: {
      table: {
        defaultValue: {
          summary: 'ReactNode',
        },
        type: { summary: 'ReactElement | ReactElement[]' },
      },
      description: 'Primary content',
    },
    open: {
      table: {
        defaultValue: {
          summary: 'false',
        },
        type: { summary: 'boolean' },
      },
      description: 'Open modal window',
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
    onClose: {
      table: {
        type: { summary: 'VoidFunction' },
      },
      description: 'closes the modal window',
    },
    disableActions: {
      table: {
        defaultValue: {
          summary: 'false',
        },
        type: { summary: 'boolean' },
      },
    }
  },
};

export default meta;
type StoryDefault = StoryObj<typeof meta>;

function DialogWindowExample() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOnChange = () => {
    setIsOpen((state) => !state);
  };

  return (
    <div>
      <Button onClick={handleOnChange} type="button">
        Button
      </Button>
      <DialogWindow open={isOpen} title="Headline" onClose={handleOnChange}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginTop: '48px',
            gap: '8px',
          }}
        >
          <Button variant="outlined" onClick={handleOnChange}>
            Button
          </Button>
          <Button variant="danger" onClick={handleOnChange}>
            Button
          </Button>
        </div>
      </DialogWindow>
    </div>
  );
}

export const DialogWindowDefault: StoryDefault = {
  name: 'DialogWindow Default',
  render: () => <DialogWindowExample />,
};
