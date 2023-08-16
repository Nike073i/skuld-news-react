import webpack from 'webpack';
import buildCssLoader from './loaders/buildCssLoader';
import { BuildOptions } from './types/config';
import buildSvgLoader from './loaders/buildSvgLoader';
import buildBabelLoader from './loaders/buildBabelLoader';

export default function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
    const { isDev } = options;
    const cssLoader = buildCssLoader(isDev);
    const svgLoader = buildSvgLoader();

    const fileLoader = {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
    };

    const codeBabelLoader = buildBabelLoader({ ...options, isTsx: false });
    const tsxCodeBabelLoader = buildBabelLoader({ ...options, isTsx: true });

    return [
        codeBabelLoader,
        tsxCodeBabelLoader,
        cssLoader,
        svgLoader,
        fileLoader,
    ];
}
