import * as path from 'path';

export const PORT: number = 8080;
export const rendererOutputPath = path.join(__dirname, '../dist/renderer/');
export const publicPath = process.env.NODE_ENV === 'production' ? '/' : `http://localhost:${PORT}/`;