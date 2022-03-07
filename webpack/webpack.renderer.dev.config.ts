import * as path from 'path';
import { Configuration, EnvironmentPlugin, HotModuleReplacementPlugin } from 'webpack';
import merge from 'webpack-merge';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import { spawn } from 'child_process';
import commonConfig from './webpack.common.config';
import { publicPath, PORT, rendererOutputPath } from './constants';

const RenderDevConfig: Configuration = merge(commonConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
    target: 'electron-renderer',
    output: {
        publicPath,
        path: rendererOutputPath,
        filename: '[name].dev.js',
    },
    entry: {
        "martina": path.join(__dirname, '../src/renderer/app.tsx'),
    },
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
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
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
                    'style-loader',
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
                    'style-loader',
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
                    'style-loader',
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
            },
        ],
    },
    plugins: [
        new EnvironmentPlugin({
            NODE_ENV: 'development',
        }),
        new HTMLWebpackPlugin({
            template: path.join(__dirname, '../src/renderer/document.ejs'),
            chunks: ['manifest', 'vendor', 'martina']
        }),
        new HotModuleReplacementPlugin(),
        new ForkTsCheckerWebpackPlugin({
            async: false,
        }),
        new ESLintPlugin({
            extensions: ["js", "jsx", "ts", "tsx"],
            emitWarning: false,
        }),
    ],
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    devServer: {
        // static: path.join(__dirname, "build"),
        // publicPath,
        historyApiFallback: true,
        port: PORT,
        compress: true,
        // noInfo: false,
        // stats: 'errors-only',
        // inline: true,
        // lazy: false,
        hot: true,
        headers: {'Access-Control-Allow-Origin': '*'},
        static: path.join(__dirname, '../dist/renderer'),
        // contentBase: path.join(__dirname, '../dist/renderer'),
        // before() {
        //     // 渲染进程启动后，启动主进程
        //     console.log('Start main process...');
        //     // spawn('npm', ['run', 'dev-main'], {
        //     //     shell: true,
        //     //     env: process.env,
        //     //     stdio: 'inherit',
        //     // })
        //     // .on('close', code => process.exit(code))
        //     // .on('error', spawnError => console.error(spawnError));
        // },
        onListening(srv: any) {
            if (!srv) {
                throw new Error('webpack-dev-server is not defined');
            }
            if (process.env.NO_ELECTRON === '1') {
                return;
            }
            const port = srv.server.address().port;
            console.log('Renderer Is Running on port: ', port);
            console.log('Start main process...');
            spawn('npm', ['run', 'dev-main'], {
                shell: true,
                env: process.env,
                stdio: 'inherit',
            })
            .on('close', (code: number) => process.exit(code))
            .on('error', (err: Error) => console.log(err));
        }
    },
});

export default RenderDevConfig;