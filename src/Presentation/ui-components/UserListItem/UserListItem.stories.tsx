import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import UserListItem from './UserListItem';
import ScrollableContainer from '../../components/containers/ScrollableContainer/ScrollableContainer';

const meta = {
  title: 'User List Item',
  component: UserListItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    className: '',
    disabled: false,
    checked: false,
    userName: '',
    avatarUrl: '',
  },
  argTypes: {
    avatarUrl: {
      table: {
        type: { summary: 'url' },
      },
      description: 'Avatar image source',
    },
    userName: {
      table: {
        type: { summary: 'string' },
        defaultValue: {
          summary: '',
        },
      },
      description: 'User name',
    },
    disabled: {
      table: {
        type: { summary: 'boolean' },
        defaultValue: {
          summary: false,
        },
      },
      description: 'Active',
    },
    checked: {
      table: {
        type: { summary: 'boolean' },
        defaultValue: {
          summary: false,
        },
      },
      description: 'Checkbox',
    },
    onChange: {
      table: {
        defaultValue: {
          summary: '(checked: boolean) => void',
        },
        type: { summary: 'function' },
      },
      description: 'Checkbox control',
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
} satisfies Meta<typeof UserListItem>;

export default meta;
type StoryDefault = StoryObj<typeof meta>;

function UserListExample() {
  const [users, setUser] = useState([
    { name: 'User 1', id: 0, checked: true },
    { name: 'User 2', id: 1, checked: false },
    { name: 'User 3', id: 2, checked: false },
    { name: 'User 4', id: 3, checked: true },
    { name: 'User 5', id: 4, checked: true },
  ]);

  const handleRenderUserListItem = (user: {
    name: string;
    id: number;
    checked: boolean;
  }) => {
    return (
      <UserListItem
        userName={user.name}
        checked={user.checked}
        onChange={(value: boolean) => {
          setUser((prevUsers) =>
            prevUsers.map((prevUser) =>
              prevUser.id === user.id
                ? { ...prevUser, checked: value }
                : prevUser,
            ),
          );
        }}
      />
    );
  };

  return (
    <ScrollableContainer
      data={users}
      renderItem={handleRenderUserListItem}
      onEndReachedThreshold={0.8}
      refreshing={false}
    />
  );
}

export const UserListItemDefault: StoryDefault = {
  args: {
    userName: 'User name',
  },
};

export const UserList: StoryDefault = {
  render: () => <UserListExample />,
};
