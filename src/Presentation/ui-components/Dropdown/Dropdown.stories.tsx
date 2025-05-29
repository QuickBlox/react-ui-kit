import type { Meta, StoryObj } from '@storybook/react';

import { LocationSvg, NextSVG } from '../../icons';
import Dropdown from './Dropdown';
import Button from '../Button/Button';

const meta: Meta<typeof Dropdown> = {
  title: '@quickblox-react-ui-kit/Presentation/ui-components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    disabled: false,
    options: [
      { value: '', label: '', leftIcon: undefined, rightIcon: undefined },
    ],
    className: '',
  },
  argTypes: {
    children: {
      control: false,
      table: {
        defaultValue: {
          summary: null,
        },
        type: { summary: 'ReactElement | string | number' },
      },
      description: 'Primary content',
    },
    placement: {
      table: {
        defaultValue: {
          summary: 'bottomRight',
        },
        type: { summary: 'topRight | bottomRight | left' },
      },
      description:
        'The property that will determine where the Dropdown will appear',
    },
    className: {
      table: {
        type: { summary: 'string' },
      },
      description: 'Additional classes',
    },
    onSelect: {
      table: {
        type: { summary: 'function' },
      },
      description: 'Dropdown option selection function',
    },
    disabled: {
      table: {
        defaultValue: {
          summary: false,
        },
        type: { summary: 'boolean' },
      },
      description: 'Active',
    },
    options: {
      table: {
        defaultValue: {
          summary: 'array',
          detail: '[{ value: "", label: "" }]',
        },
        type: {
          summary: 'object',
          detail:
            '\n{\n   value: string; \n   label: string; \n   leftIcon?: ReactElement; \n   rightIcon?: ReactElement; \n} ',
        },
      },
      description: 'A set of options that can be passed to the dropdown',
    },
  },
};

export default meta;
type StoryDefault = StoryObj<typeof meta>;

export const DropdownDefault: StoryDefault = {
  args: {
    children: <Button>Button</Button>,
    disabled: false,
    options: [
      {
        value: 'Text 1',
        label: 'Text 1',
      },
      {
        value: 'Text 2',
        label: 'Text 2',
      },
      {
        value: 'Text 3',
        label: 'Text 3',
      },
    ],
  },
};

export const DropdownRightIcon = {
  args: {
    children: <Button>Button</Button>,
    disable: false,
    options: [
      {
        value: 'Text 1',
        label: 'Text 1',
        rightIcon: <NextSVG style={{ width: '18px', height: '18px' }} />,
      },
      {
        value: 'Text 2',
        label: 'Text 2',
        rightIcon: <NextSVG style={{ width: '18px', height: '18px' }} />,
      },
      {
        value: 'Text 3',
        label: 'Text 3',
        rightIcon: <NextSVG style={{ width: '18px', height: '18px' }} />,
      },
    ],
  },
};

export const DropdownLeftIcon = {
  args: {
    children: <Button>Button</Button>,
    disable: false,
    options: [
      {
        value: 'Text 1',
        label: 'Text 1',
        leftIcon: <LocationSvg style={{ width: '18px', height: '18px' }} />,
      },
      {
        value: 'Text 2',
        label: 'Text 2',
        leftIcon: <LocationSvg style={{ width: '18px', height: '18px' }} />,
      },
      {
        value: 'Text 3',
        label: 'Text 3',
        leftIcon: <LocationSvg style={{ width: '18px', height: '18px' }} />,
      },
    ],
  },
};
