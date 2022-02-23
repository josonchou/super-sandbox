import * as path from 'path';
import { Configuration, DefinePlugin, EnvironmentPlugin } from 'webpack';
import merge from 'webpack-merge';
import nodeExternals from 'webpack-node-externals';
import commonConfig from './webpack.common.config';
import { publicPath, PORT } from './constants';

const MainDevConfig: Configuration = merge(commonConfig, {
    devtool: false,
    mode: 'development',
    target: 'node',
    entry: path.join(__dirname, '../src/main/index.ts'),
    output: {
        path: path.join(__dirname, '../dist/main'),
        filename: 'main.dev.js',
    },
    externals: [nodeExternals()], // 排除Node模块
    plugins: [
        new EnvironmentPlugin({
            NODE_ENV: 'development',
        }),
        new DefinePlugin({
            DEV_ENTRY: JSON.stringify(`${publicPath}`),
        }),
    ],
    node: {
        __dirname: false,
        __filename: false,
    },
});

export default MainDevConfig;
