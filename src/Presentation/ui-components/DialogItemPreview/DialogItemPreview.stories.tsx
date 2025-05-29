import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import DialogItemPreview from './DialogItemPreview';
import Badge from '../Badge/Badge';
import Avatar from '../Avatar/Avatar';
import {
  ConferenceSvg,
  GroupChatSvg,
  MoreSvg,
  PublicChannelSvg,
  UserSvg,
} from '../../icons';
import PreviewFileMessage from '../PreviewFileMessage/PreviewFileMessage';
import Dropdown from '../Dropdown/Dropdown';

const meta: Meta<typeof DialogItemPreview> = {
  title: '@quickblox-react-ui-kit/Presentation/ui-components/DialogItemPreview',
  tags: ['autodocs'],
  component: DialogItemPreview,
  decorators: [],
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
  },
  argTypes: {
    avatar: {
      description: 'Avatar or Icon',
      control: 'select',
      options: ['User', 'Group', 'Conference', 'Public', 'Photo'],
      mapping: {
        User: <Avatar size="lg" icon={<UserSvg />} />,
        Group: <Avatar size="lg" icon={<GroupChatSvg />} />,
        Conference: <Avatar size="lg" icon={<ConferenceSvg />} />,
        Public: <Avatar size="lg" icon={<PublicChannelSvg />} />,
        Photo: (
          <Avatar
            size="lg"
            src="https://quickblox.com/wp-content/themes/QuickbloxTheme2021/img/chat-messaging.svg"
          />
        ),
      },
    },
    lastMessage: {
      description: 'Last message by type',
      control: 'select',
      options: ['ShortText', 'LongText', 'Image', 'File', 'None'],
      mapping: {
        ShortText: 'Hello, world!How are you?',
        LongText:
          "Hello, dear Mr. User. Thank you for choosing us. I'm here to assist with your order's delivery. Please provide your preferred address and any specific instructions. We offer standard, express, and same-day delivery in select areas. Let us know your convenience, and we'll ensure a smooth process.",
        Image: (
          <PreviewFileMessage
            name="My avatar.png"
            src="https://quickblox.com/wp-content/themes/QuickbloxTheme2021/img/chat-messaging.svg"
          />
        ),
        File: <PreviewFileMessage name="My Document.txt" />,
        None: undefined,
      },
    },
    badge: {
      description: 'Badge',
      control: 'select',
      options: ['Default', 'OverCount', 'None'],
      mapping: {
        Default: <Badge count={5} />,
        OverCount: <Badge count={15} limit={9} />,
        None: undefined,
      },
    },
    active: {
      table: {
        defaultValue: {
          summary: 'false',
        },
        type: { summary: 'boolean' },
      },
      description: 'Active',
    },
    contextMenu: {
      description: 'Context action icon',
      control: 'select',
      options: ['Default', 'Leave', 'None'],
      mapping: {
        Default: <MoreSvg />,
        Leave: (
          <Dropdown
            placement="left"
            options={[
              {
                value: 'Leave',
                label: 'Leave',
              },
            ]}
            onSelect={(value: string) => {
              console.log(value);
            }}
          >
            <MoreSvg />
          </Dropdown>
        ),
        None: undefined,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DialogItemPreviewDefault: Story = {
  name: 'DialogItemPreview Default',
  args: {
    title: 'Name',
    avatar: <Avatar size="lg" icon={<UserSvg />} />,
  },
  render: (args) => {
    // eslint-disable-next-line no-param-reassign
    args.date = args.date ? new Date(args.date!).toLocaleDateString() : new Date().toLocaleDateString();

    return <DialogItemPreview {...args} />;
  },
};

export const DialogItemPreviewFullScreen: Story = {
  name: 'DialogItemPreview FullScreen',
  args: {
    title: 'Name',
    avatar: <Avatar size="lg" icon={<UserSvg />} />,
    lastMessage:
      "Hello, dear Mr. User. Thank you for choosing us. I'm here to assist with your order's delivery. Please provide your preferred address and any specific instructions. We offer standard, express, and same-day delivery in select areas. Let us know your convenience, and we'll ensure a smooth process.",
    badge: <Badge count={5} />,
    contextMenu: <MoreSvg />,

  },
  parameters: {
    viewport: {
      defaultViewport: 'responsive',
    },
  },
  render: (args) => {
    // eslint-disable-next-line no-param-reassign
    args.date = new Date().toLocaleDateString();

    return <DialogItemPreview {...args} />;
  },
};

export const DialogItemPreviewMobileScreen: Story = {
  name: 'DialogItemPreview MobileScreen',
  args: {
    title: 'Name',
    avatar: <Avatar size="lg" icon={<UserSvg />} />,
    lastMessage:
      "Hello, dear Mr. User. Thank you for choosing us. I'm here to assist with your order's delivery. Please provide your preferred address and any specific instructions. We offer standard, express, and same-day delivery in select areas. Let us know your convenience, and we'll ensure a smooth process.",
    badge: <Badge count={5} />,
    contextMenu: <MoreSvg />,
  },
  parameters: {
    viewport: {
      defaultViewport: 'iphonese2',
    },
  },
  render: (args) => {
    // eslint-disable-next-line no-param-reassign
    args.date = args.date ? new Date(args.date!).toLocaleDateString() : new Date().toLocaleDateString();

    return <DialogItemPreview {...args} />;
  },
};

export const DialogItemPreviewMobileScreenIPad: Story = {
  name: 'DialogItemPreview MobileScreen IPad',
  args: {
    title: 'Name',
    avatar: <Avatar size="lg" icon={<UserSvg />} />,
    lastMessage:
      "Hello, dear Mr. User. Thank you for choosing us. I'm here to assist with your order's delivery. Please provide your preferred address and any specific instructions. We offer standard, express, and same-day delivery in select areas. Let us know your convenience, and we'll ensure a smooth process.",
    badge: <Badge count={5} />,
    contextMenu: <MoreSvg />,
  },
  parameters: {
    viewport: {
      defaultViewport: 'ipad',
    },
  },
  render: (args) => {
    // eslint-disable-next-line no-param-reassign
    args.date = args.date
      ? new Date(args.date!).toLocaleDateString()
      : new Date().toLocaleDateString();

    return <DialogItemPreview {...args} />;
  },
};
