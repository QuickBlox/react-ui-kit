import type { Meta, StoryObj } from '@storybook/react';

import SettingsItem from './SettingsItem';
import Badge from '../Badge/Badge';
import Avatar from '../Avatar/Avatar';
import {
  CloseSvg,
  GroupChatSvg,
  NotificationsSvg,
  SearchSvg,
} from '../../icons';

const meta: Meta<typeof SettingsItem> = {
  title: '@quickblox-react-ui-kit/Presentation/ui-components/SettingsItem',
  component: SettingsItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    title: {
      table: {
        defaultValue: {
          summary: '',
        },
        type: { summary: 'string' },
      },
      description: 'Name Setting item ',
    },
    className: {
      table: {
        defaultValue: {
          summary: '',
        },
        type: { summary: 'string' },
      },
      description: 'Additional classes',
    },
    icon: {
      control: false,
      table: {
        defaultValue: {
          summary: 'svg | ReactElement',
        },
        type: { summary: 'svg | ReactElement' },
      },
      description: 'Format plug svg or React element ',
    },
    rightSection: {
      control: false,
      table: {
        defaultValue: {
          summary: 'ReactElement | ReactElement[]',
        },
        type: { summary: 'ReactElement | ReactElement[]' },
      },
      description: 'Elements for the right section',
    },
    onClick: {
      control: false,
      table: {
        defaultValue: {
          summary: 'VoidFunction',
        },
        type: { summary: 'VoidFunction' },
      },
      description: 'function onClick for icon',
    },
    children: {
      table: {
        defaultValue: {
          summary: 'ReactElement | ReactElement[]',
        },
        type: { summary: 'ReactElement | ReactElement[]' },
      },
      description: 'Elements that will be contained in the additional section',
    },
  },
};

export default meta;
type StoryDefault = StoryObj<typeof meta>;

export const SettingsItemDefault: StoryDefault = {
  name: 'SettingsItem Default',
  args: {
    title: 'Search in dialog',
    icon: (
      <SearchSvg
        style={{
          fill: '#3978FC',
        }}
      />
    ),
  },
};

export const SettingsItemNotification: StoryDefault = {
  name: 'SettingsItem Notification',
  args: {
    title: 'Notification',
    icon: (
      <NotificationsSvg
        style={{
          fill: '#3978FC',
        }}
      />
    ),
    rightSection: (
      <CloseSvg
        style={{
          cursor: 'pointer',
        }}
      />
    ),
  },
};

export const SettingsItemMembers: StoryDefault = {
  name: 'SettingsItem Members',
  args: {
    title: 'Notification',
    icon: (
      <GroupChatSvg
        style={{
          fill: '#3978FC',
        }}
      />
    ),
    rightSection: <Badge count={10} limit={99} mute />,
    children: (
      <ul
        style={{
          listStyle: 'none',
          overflow: 'hidden',
          margin: '0',
          padding: '0',
        }}
      >
        <li
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '8px 16px',
            gap: '16px',
          }}
        >
          <Avatar size="sm" /> Name
        </li>
        <li
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '8px 16px',
            gap: '16px',
          }}
        >
          <Avatar size="sm" /> Name
        </li>
        <li
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '8px 16px',
            gap: '16px',
          }}
        >
          <Avatar size="sm" /> Name
        </li>
        <li
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '8px 16px',
            gap: '16px',
          }}
        >
          <Avatar size="sm" /> Name
        </li>
      </ul>
    ),
  },
};
