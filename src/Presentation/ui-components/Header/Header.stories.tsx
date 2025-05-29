import type { Meta, StoryObj } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import Header from './Header';
import {
  GroupChatSvg,
  UserSvg,
  PublicChannelSvg,
  CloseSvg,
  InformationSvg,
  SearchSvg,
  NewChatSvg,
} from '../../icons';
import Avatar from '../Avatar/Avatar';

const meta: Meta = {
  title: '@quickblox-react-ui-kit/Presentation/ui-components/Header',
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
      control: false,
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
