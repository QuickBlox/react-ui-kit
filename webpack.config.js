const path = require('path');
// const packageInfo = require('./package.json');

module.exports = {
    mode: 'development',
    entry: './src/index-ui.ts',
    devtool: 'source-map',
    output: {
        // filename: "research-ui-react-library-" +
        //     packageInfo.version + ".js",
        filename: "index-ui.js",
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: "umd",
        clean: true
    },
    resolve: {
        extensions: ['.ts', '.tsx'],
        alias: {
            './errors': path.resolve(__dirname, 'node_modules/media-recorder-js/src/errors.js'),
            './mimeTypes': path.resolve(__dirname, 'node_modules/media-recorder-js/src/mimeTypes.js'),
        },
    },
    externals: {
        "react": "react",
        "react-dom": "react-dom",
        "quickblox/quickblox": "quickblox/quickblox",
    },
    module: {
        rules: [
            {
                test: [/\.css$/i],
                use: [
                    // Creates style nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'),
                            sassOptions: {
                                quietDeps: true, // Отключает устаревшие предупреждения
                            },
                        },
                    },
                ],
            },
            {
                test: [/\.s[ac]ss$/i],
                use: [
                    // Creates style nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(ts|tsx)?$/,

                use: {
                    loader: 'ts-loader',
                    options: {
                        compilerOptions: {
                            noEmit: false,
                        },
                    }

                },

                exclude: ['/node_modules/', '/src/__tests__'],
            },
            {
              test: /\.svg$/i,
              issuer: /\.[jt]sx?$/,
              use: ['@svgr/webpack', 'url-loader'],
            },
        ],
    }
};
