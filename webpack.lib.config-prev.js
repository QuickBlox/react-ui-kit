const path = require('path');

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'src/index-ui.ts'),
  output: {
    filename: 'index-ui.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      name: 'QuickBloxUIKit',
      type: 'umd',
    },
    globalObject: 'this',
    clean: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
      root: 'React',
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom',
      root: 'ReactDOM',
    },
    'react/jsx-runtime': 'react/jsx-runtime',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: path.resolve(__dirname, 'tsconfig.buildlib.json'),
          },
        },
        exclude: [/node_modules/, /stories/]
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: 'asset/resource',
      },
    ],
  },
  experiments: {
    outputModule: false, // Убираем `outputModule: true`, так как UMD не поддерживает ES модули
  },
};
