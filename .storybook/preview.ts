import type { Preview } from '@storybook/react';
import { fn } from '@storybook/test';
import '../src/index.scss';

const preview: Preview = {
  parameters: {
    actions: {
      onClick: fn(),
      onChange: fn(),
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewMode: 'docs',
  },
};

export default preview;
