const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const config = {
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js',
        publicPath: '/',
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 9000,
        hot: true,
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss', '.svg'],
        alias: {
            '@images': path.resolve(__dirname, 'src/public/images'),
            '@icons': path.resolve(__dirname, 'src/public/icons'),
        },
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react'],
                        },
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                        },
                    },
                ],
            },
            {
                test: /\.module\.s?css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[name]__[local]--[hash:base64:5]',
                            },
                        },
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.s?css$/,
                exclude: /\.module\.s?css$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                        },
                    },
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/public/index.html',
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [{ from: './src/public/assets', to: 'assets' }],
        }),
    ],
};

module.exports = config;
