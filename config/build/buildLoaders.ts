import webpack from 'webpack';
import buildCssLoader from './loaders/buildCssLoader';
import { BuildOptions } from './types/config';
import buildSvgLoader from './loaders/buildSvgLoader';

export default function buildLoaders({ isDev }: BuildOptions): webpack.RuleSetRule[] {
    const typescriptLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    };
    const cssLoader = buildCssLoader(isDev);
    const svgLoader = buildSvgLoader();

    const fileLoader = {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
    };

    const babelLoader = {
        test: /\.(js|jsx|tsx)$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env'],
            },
        },
    };
    return [
        babelLoader,
        typescriptLoader,
        cssLoader,
        svgLoader,
        fileLoader,
    ];
}
