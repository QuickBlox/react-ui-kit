import type { Meta, StoryObj } from '@storybook/react';

import MessageSeparator from './MessageSeparator';

const meta = {
  title: 'MessageSeparator',
  component: MessageSeparator,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: { text: '', type: 'date' },
  argTypes: {
    text: {
      table: {
        defaultValue: {
          summary: '',
        },
      },
      description: 'Text content',
    },
    type: {
      description: 'type content',
      type: 'function',
      options: ['none', 'date', 'system'],
      control: { type: 'select' },
      table: {
        defaultValue: {
          summary: "'date'",
        },
        type: { summary: 'string' },
      },
    },
  },
} satisfies Meta<typeof MessageSeparator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MessageSeparatorDate: Story = {
  args: {
    text: '2024-01-26T00:00:00.000Z',
    type: 'date',
  },
};

export const MessageSeparatorSystem: Story = {
  args: {
    text: 'User created chat',
    type: 'system',
  },
};

/*
const meta: Meta = {
  title: 'Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
  },
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Dialog title',
    },
    avatar: {
      description: 'Avatar or Icon',
      type: 'function',
      options: ['None', 'User', 'Group', 'Public', 'Photo'],
      control: 'select',
      mapping: {
        None: undefined,
        User: <Avatar icon={<UserSvg />} />,
        Group: <Avatar icon={<GroupChatSvg />} />,
        Public: <Avatar icon={<PublicChannelSvg />} />,
        Photo: (
          <Avatar src="https://quickblox.com/wp-content/themes/QuickbloxTheme2021/img/chat-messaging.svg" />
        ),
      },
    },
    badge: {
      description: 'Badge or dialog status',
    },
    children: {
      type: 'function',
      options: ['None', 'SingleIcon', 'MultiplyIcons', 'Close'],
      control: 'select',
      mapping: {
        None: undefined,
        SingleIcon: <InformationSvg />,
        MultiplyIcons: [<SearchSvg />, <NewChatSvg />],
        Close: <CloseSvg />,
      },
      table: {
        type: { summary: 'svg' },
      },
      description: 'Additional content: list of icons',
    },
    onGoBack: {
      action: 'clicked back button',
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

export const HeaderDefault: StoryObj<typeof Header> = {
  args: {
    title: 'Default Dialog desktop',
  },
  parameters: { layout: 'centered' },
};
export const HeaderWithAvatar: StoryObj<typeof Header> = {
  args: {
    title: 'Default Dialog desktop',
    avatar: <Avatar icon={<UserSvg />} />,
  },
  parameters: { layout: 'centered' },
};
export const HeaderWithAvatarAndBack: StoryObj<typeof Header> = {
  args: {
    title: 'Default Dialog mobile',
    avatar: <Avatar icon={<UserSvg />} />,
    onGoBack: () => {
      window.alert('onGoBack');
    },
  },
  parameters: { viewport: { defaultViewport: 'iphonese2' } },
};
export const HeaderWithOneChildrenIcon: StoryObj<typeof Header> = {
  args: {
    title: 'Default Dialog desktop',
    avatar: <Avatar icon={<UserSvg />} />,
    children: <CloseSvg />,
    onGoBack: undefined,
  },
  parameters: { layout: 'centered' },
};
export const HeaderWithTwoChildrenIcon: StoryObj<typeof Header> = {
  args: {
    title: 'Default Dialog desktop',
    avatar: <Avatar icon={<UserSvg />} />,
    children: [<SearchSvg />, <NewChatSvg />],
    onGoBack: undefined,
  },
  parameters: { layout: 'centered' },
};

 */
