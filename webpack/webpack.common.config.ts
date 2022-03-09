import * as path from 'path';
import { Configuration } from 'webpack';
import { publicPath, rendererOutputPath } from './constants';

const config: Configuration = {
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/i,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react",
                            "@babel/preset-typescript",
                        ],
                    },
                },
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                type: 'asset',
                generator: {
                    filename: 'static/images/[hash][ext][query]',
                },
            },
            {
                test: /\.(woff|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'static/images/[hash][ext][query]',
                },
            },
            {
                test: /\.(svg)$/i,
                type: 'asset',
                generator: {
                    filename: 'static/svg/[hash][ext][query]',
                },
            },
            {
                test: /\.(pdf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'static/files/[hash][ext][query]',
                },
            },
            {
                test: /\.(mp4)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'static/files/[hash][ext][query]',
                },
            },
        ],
    },
    resolve: {
        alias: {
            '@config': path.resolve(__dirname, '../src/config'),
            '@main': path.resolve(__dirname, '../src/main'),
            '@renderer': path.resolve(__dirname, '../src/renderer'),
            '@lib': path.resolve(__dirname, '../src/renderer/lib'),
            '@assets': path.resolve(__dirname, '../src/renderer/assets'),
        },
        extensions: ['.tsx', '.js', '.ts'],
    },
    devtool: 'inline-source-map',
};

export default config;