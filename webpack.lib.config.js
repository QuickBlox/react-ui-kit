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
        assetModuleFilename: '[name][ext]', // Сохраняем оригинальные имена файлов
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
          './errors': path.resolve(__dirname, 'node_modules/media-recorder-js/src/errors.js'),
          './mimeTypes': path.resolve(__dirname, 'node_modules/media-recorder-js/src/mimeTypes.js'),
        },
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
                exclude: [/node_modules/, /stories/],
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
                test: /\.svg$/i, // 🔥 Все SVG → импортируются **ТОЛЬКО** как React-компоненты
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
                test: /\.(png|jpg|jpeg|gif)$/i, // Поддержка изображений, без хеширования
                type: 'asset/resource',
            },
        ],
    },
    optimization: {
        minimize: false, // 🔥 Отключаем минимизацию JS и CSS
        splitChunks: false, // 🔥 Отключаем разделение чанков
        removeAvailableModules: false, // Оставляем модули без изменений
        removeEmptyChunks: false, // Не удаляем пустые чанки
        mergeDuplicateChunks: false, // Не объединяем дубликаты
    },
    performance: {
        hints: false, // 🔥 Отключаем предупреждения о производительности
    },
    experiments: {
        outputModule: false, // Отключаем ES-модули (так как UMD не поддерживает их)
    },
};
