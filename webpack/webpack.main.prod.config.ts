import * as path from 'path';
import { Configuration, EnvironmentPlugin } from 'webpack';
import merge from 'webpack-merge';
import MainDevConfig from './webpack.main.dev.config';

const MainProdConfig: Configuration = merge(MainDevConfig, {
    devtool: false,
    mode: 'production',
    output: {
        path: path.join(__dirname, '../dist/main'),
        filename: 'main.prod.js',
    },
    plugins: [
        new EnvironmentPlugin({
            NODE_ENV: 'production',
        }),
    ],
});

export default MainProdConfig;
