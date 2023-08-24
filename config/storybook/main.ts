import type { StorybookConfig } from '@storybook/react-webpack5';
import { Configuration, DefinePlugin, RuleSetRule } from 'webpack';
import path from 'path';
import { BuildPaths } from '../build/types/config';
import buildSvgLoader from '../build/loaders/buildSvgLoader';
import buildCssLoader from '../build/loaders/buildCssLoader';

const config: StorybookConfig = {
    stories: ['../../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-onboarding',
        '@storybook/addon-interactions',
        'storybook-addon-mock',
        'storybook-addon-themes',
    ],
    framework: '@storybook/react-webpack5',
    webpackFinal: async (config: Configuration) => {
        const paths: BuildPaths = {
            build: '',
            html: '',
            src: path.resolve(__dirname, '..', '..', 'src'),
            entry: '',
            locales: path.resolve(__dirname, '..', '..', 'public', 'locales'),
            buildLocales: path.resolve(
                __dirname,
                '..',
                '..',
                'build',
                'locales',
            ),
        };
        config!.resolve!.modules!.push(paths.src);
        config!.resolve!.extensions!.push('.ts', '.tsx');
        config!.resolve!.alias = {
            ...config!.resolve!.alias,
            '@': paths.src,
        };

        // eslint-disable-next-line no-param-reassign
        config!.module!.rules = config!.module!.rules!.map(
            // @ts-ignore
            (rule: RuleSetRule) => {
                if (/svg/.test(rule.test as string)) {
                    return { ...rule, exclude: /\.svg$/i };
                }

                return rule;
            },
        );

        config!.module!.rules!.push(buildSvgLoader());
        config!.module!.rules!.push(buildCssLoader(true));
        config!.plugins!.push(
            new DefinePlugin({
                __IS_DEV__: JSON.stringify(true),
                __API__: JSON.stringify('https://testapi.ru'),
                __PROJECT__: JSON.stringify('storybook'),
            }),
        );

        return config;
    },
};

export default config;
