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
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            limit: 11920,
                            name: 'img/[name]_[hash:7].[ext]',
                            // outputPath: rendererOutputPath,
                            publicPath,
                        },
                    }
                ]
            },
            {
                test: /\.(woff|svg|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'fonts/[name]_[hash:7].[ext]',
                            // outputPath: rendererOutputPath,
                            publicPath,
                        },
                    }
                ]
            },
            {
                test: /\.pdf*$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'files/[name].[ext]',
                            outputPath: rendererOutputPath,
                            publicPath,
                        },
                    }
                ]
            },
        ],
    },
    resolve: {
        alias: {
            '@main': path.resolve(__dirname, '../src/main'),
            '@renderer': path.resolve(__dirname, '../src/renderer'),
            '@lib': path.resolve(__dirname, '../src/renderer/lib'),
        },
        extensions: ['.tsx', '.js', '.ts'],
    },
    devtool: 'inline-source-map',
};

export default config;