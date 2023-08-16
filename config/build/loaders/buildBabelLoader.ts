import babelRemovePropsPlugin from '../../babel/babelRemovePropsPlugin';
import { BuildOptions } from '../types/config';

interface BuildBabelLoaderOptions extends BuildOptions {
    isTsx?: boolean;
}

export default function buildBabelLoader(props: BuildBabelLoaderOptions) {
    const { isTsx } = props;
    return {
        test: isTsx ? /\.(jsx|tsx)$/ : /\.(js|ts)$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env'],
                plugins: [
                    [
                        '@babel/plugin-transform-typescript',
                        {
                            isTsx,
                        },
                    ],
                    '@babel/plugin-transform-runtime',
                    isTsx && [
                        babelRemovePropsPlugin,
                        {
                            props: ['data-testid'],
                        },
                    ],
                ].filter(Boolean),
            },
        },
    };
}
