const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: './src/index.tsx', // Точка входа для приложения
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'), // Сборка приложения в build/
    publicPath: '/', // Корректная работа React Router
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      path: require.resolve("path-browserify"), // Поддержка path-browserify
      './errors': path.resolve(__dirname, 'node_modules/media-recorder-js/src/errors.js'),
      './mimeTypes': path.resolve(__dirname, 'node_modules/media-recorder-js/src/mimeTypes.js'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              icon: true,
              esModule: false,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
  devServer: {
    historyApiFallback: true,
    hot: true,
    open: true,
    port: 3000,
    static: path.join(__dirname, 'public'),
    server: 'https',
  },
};
