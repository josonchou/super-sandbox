import * as path from 'path';
import { Configuration, EnvironmentPlugin } from 'webpack';
import merge from 'webpack-merge';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import commonConfig from './webpack.common.config';
import { rendererOutputPath } from './constants';

const RendererProdConfig: Configuration = merge(commonConfig, {
    devtool: false,
    mode: 'production',
    target: 'electron-preload',
    output: {
        publicPath: '/',
        path: rendererOutputPath,
        filename: 'static/[name].[chunkhash:8].min.js',
        chunkFilename: 'static/[name].[chunkhash:8].min.js',
        crossOriginLoading: 'anonymous',
    },
    entry: {
        "martina": path.join(__dirname, '../src/renderer/app.tsx'),
    },
    plugins: [
        new EnvironmentPlugin({
            NODE_ENV: 'production',
        }),
        new MiniCssExtractPlugin({
            filename: 'static/[name].[chunkhash:8].css',
            chunkFilename: 'static/[name].[chunkhash:8].css',
            ignoreOrder: true,
        }),
        new HTMLWebpackPlugin({
            template: path.join(__dirname, '../src/renderer/document.ejs'),
            chunks: ['manifest', 'vendor', 'bundle']
        }),
        new ForkTsCheckerWebpackPlugin({
            async: false,
        }),
        new ESLintPlugin({
            extensions: ["js", "jsx", "ts", "tsx"],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[name]__[local]--[hash:base64]',
                            },
                        },
                    }
                ]
            },
            {
                test: /\.css$/,
                include: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: false,
                        },
                    }
                ]
            },
            {
                test: /\.less$/,
                exclude: [/node_modules/, path.join(__dirname, '../src/renderer/global.less')],
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[name]__[local]--[hash:base64]',
                            },
                        },
                    },
                    {
                        loader: 'less-loader',
                    }
                ]
            },
            {
                test: /\.less$/,
                include: [/node_modules/, path.join(__dirname, '../src/renderer/global.less')],
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: false,
                        },
                    },
                    {
                        loader: 'less-loader',
                    }
                ],
            }
        ],
    },
});