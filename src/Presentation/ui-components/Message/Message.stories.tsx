import React, { ReactElement } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

import Message, { MessageProps } from './Message';
import TextBubble from './Bubble/TextBubble/TextBubble';
import FileBubble from './Bubble/FileBubble/FileBubble';
import ImageBubble from './Bubble/ImageBubble/ImageBubble';
import AudioBubble from './Bubble/AudioBubble/AudioBubble';
import VideoBubble from './Bubble/VideoBubble/VideoBubble';
import AITranslate from './AITranslate/AITranslate';
import AIAssist from './AIAssist/AIAssist';

function createBubbleByType(
  type: 'incoming' | 'outgoing',
  children?: ReactElement,
) {
  const isTextBubbleType = children?.type === TextBubble;
  const isFileBubbleType = children?.type === FileBubble;
  const isImageBubbleType = children?.type === ImageBubble;
  const isAudioBubbleType = children?.type === AudioBubble;
  const isVideoBubbleType = children?.type === VideoBubble;

  if (isTextBubbleType) {
    return (
      <TextBubble
        text="The QuickBlox UIKit for React is a comprehensive user interface kit specifically designed for building chat applications. It provides a collection of pre-built components, modules, and utilities that simplify the process of creating chat applications."
        type={type}
      />
    );
  }
  if (isFileBubbleType) {
    return (
      <FileBubble
        title="00b5563-small-qb-logo-docs-white-9px.png"
        href="https://files.readme.io/00b5563-small-qb-logo-docs-white-9px.png"
        type={type}
      />
    );
  }
  if (isImageBubbleType) {
    return (
      <ImageBubble
        title="QuickBlox"
        href="https://files.readme.io/00b5563-small-qb-logo-docs-white-9px.png"
      />
    );
  }
  if (isAudioBubbleType) {
    return (
      <AudioBubble
        title="1.mp3"
        href="//samplelib.com/lib/preview/mp3/sample-3s.mp3"
        audioFileType="mp3"
        fileUid="12345678901234544"
        type={type}
      />
    );
  }
  if (isVideoBubbleType) {
    return (
      <VideoBubble
        title="QuickBlox"
        href="https://www.youtube.com/watch?v=0QFqNjhP-wM"
      />
    );
  }

  return undefined;
}

function getChildrenByType(type: string, children?: ReactElement) {
  if ((type === 'incoming' || type === 'outgoing') && children) {
    return createBubbleByType(type, children);
  }

  return undefined;
}
// const meta: Meta<typeof Message> = {
const meta: Meta<MessageProps> = {
  title: 'Message',
  component: Message,
  decorators: [
    (StoryFn, context) => {
      const { type, children } = context.args;
      const modifiedArgs = {
        ...context.args,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        children: getChildrenByType(type, children),
      };

      return <StoryFn {...context} args={modifiedArgs} />;
    },
  ],
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
  },
  args: {
    userName: 'Nate',
    time: '16:58',
    type: 'incoming',
    status: undefined,
    enableSelect: true,
    isSelect: false,
    disabled: false,
    // bottomPart: (
    //   <AITranslate
    //     languagesForAITranslate={['UA', 'Eng', 'Fr', 'Ger', 'pl']}
    //     onClickOriginalText={() => {
    //       console.log('orig');
    //     }}
    //     originalTextMessage={false}
    //     waitAIWidget={false}
    //     onTranslate={() => {
    //       console.log('translate');
    //     }}
    //   />
    // ),
    // additionalPart: (
    //   <AIAssist
    //     onAssistAnswer={() => {
    //       console.log('ai-assist');
    //     }}
    //     waitAIWidget={false}
    //   />
    // ),
  },
  argTypes: {
    type: {
      control: 'radio',
      options: ['incoming', 'outgoing'],
    },
    children: {
      description: 'Message bubble',
      control: 'select',
      options: [
        'TextMessage',
        'FileMessage',
        'ImageMessage',
        'AudioMessage',
        'VideoMessage',
      ],
      mapping: {
        TextMessage: (
          <TextBubble
            text="The QuickBlox UIKit for React is a comprehensive user interface kit specifically designed for building chat applications. It provides a collection of pre-built components, modules, and utilities that simplify the process of creating chat applications."
            type="incoming"
          />
        ),
        FileMessage: (
          <FileBubble
            title="00b5563-small-qb-logo-docs-white-9px.png"
            href="https://files.readme.io/00b5563-small-qb-logo-docs-white-9px.png"
            type="incoming"
          />
        ),
        ImageMessage: (
          <ImageBubble
            title="QuickBlox"
            href="https://files.readme.io/00b5563-small-qb-logo-docs-white-9px.png"
          />
        ),
        AudioMessage: (
          <AudioBubble
            title="1.mp3"
            href="//samplelib.com/lib/preview/mp3/sample-3s.mp3"
            audioFileType="mp3"
            fileUid="12345678901234544"
            type="incoming"
          />
        ),
        VideoMessage: (
          <VideoBubble
            title="QuickBlox"
            href="https://www.youtube.com/watch?v=0QFqNjhP-wM"
          />
        ),
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const MessageText: Story = {
  args: {
    children: <TextBubble text="Test Message" type="incoming" />,
  },
};

export const MessageImage: Story = {
  args: {
    children: (
      <ImageBubble
        title="QuickBlox"
        href="https://files.readme.io/0a66fe7-SreenModulesDialogList.png"
      />
    ),
  },
};

// export const MessageVideo: Story = {
//   args: {
//     children: (
//       <VideoBubble
//         title="QuickBlox"
//         href="https://www.youtube.com/watch?v=0QFqNjhP-wM"
//       />
//     ),
//   },
// };

export const MessageFile: Story = {
  args: {
    children: (
      <FileBubble
        type="incoming"
        title="QuickBlox"
        href="https://raw.githubusercontent.com/QuickBlox/react-ui-kit/main/README.md"
      />
    ),
  },
};

export const MessageTextWithAIfeatures: Story = {
  args: {
    children: <TextBubble text="Test Message" type="incoming" />,
    bottomPart: (
      <AITranslate
        languagesForAITranslate={[
          'English',
          'French',
          'Portuguese',
          'German',
          'Ukrainian',
        ]}
        onClickOriginalText={() => {
          console.log('orig');
        }}
        defaultLanguageForAITranslate="English"
        originalTextMessage={false}
        waitAIWidget={false}
        onTranslate={() => {
          console.log('translate');
        }}
      />
    ),
    additionalPart: (
      <AIAssist
        onAssistAnswer={() => {
          console.log('ai-assist');
        }}
        waitAIWidget={false}
      />
    ),
  },
};
