import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-webpack5-compiler-swc',
    '@storybook/addon-onboarding',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  webpackFinal: async (config) => {
    // ✅ Гарантируем, что module и module.rules существуют
    if (!config.module) {
      config.module = { rules: [] };
    }
    if (!config.module.rules) {
      config.module.rules = [];
    }

    // ✅ Удаляем встроенные Storybook'ом правила для SVG и других медиафайлов
    config.module.rules = config.module.rules.filter(
      (rule) =>
        rule &&
        typeof rule === 'object' &&
        'test' in rule &&
        rule.test instanceof RegExp &&
        !rule.test.toString().includes(
          '(svg|ico|jpg|jpeg|png|apng|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)'
        )
    );

    // ✅ Поддержка SVG как React-компонентов (если импортируется с `?react`)
    config.module.rules.unshift({
      test: /\.svg$/i,
      oneOf: [
        {
          resourceQuery: /react/, // 🔥 `?react` → импорт как React-компонент
          use: [
            {
              loader: '@svgr/webpack',
              options: {
                icon: true,
                esModule: true,
              },
            },
          ],
        },
        {
          // 🔥 Обычные импорты SVG без `?react` → обрабатываются как файлы
          type: 'asset/resource',
        },
      ],
    });

    // ✅ Восстанавливаем обработку PNG, JPG, шрифтов и других медиафайлов
    config.module.rules.push({
      test: /\.(png|jpg|jpeg|gif|woff|woff2|eot|ttf)$/i,
      type: 'asset/resource',
    });

    // ✅ Поддержка SCSS/SASS
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
    });

    // ✅ Поддержка Babel для JS/TS файлов
    config.module.rules.push({
      test: /\.(ts|tsx|js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
      },
    });

    // ✅ Поддержка alias
    if (!config.resolve) {
      config.resolve = {};
    }
    config.resolve = {
      ...config.resolve,
      extensions: ['.tsx', '.ts', '.js', '.jsx', '.scss', '.css', '.svg'],
      alias: {
        ...config.resolve?.alias,
        path: require.resolve('path-browserify'),
      },
    };

    return config;
  },
};

export default config;
