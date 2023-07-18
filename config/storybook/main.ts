import type { StorybookConfig } from '@storybook/react-webpack5';
import { Configuration, RuleSetRule } from 'webpack';
import path from 'path';
import { BuildPaths } from '../build/types/config';
import buildSvgLoader from '../build/loaders/buildSvgLoader';
import buildCssLoader from '../build/loaders/buildCssLoader';

const config: StorybookConfig = {
    stories: ['../../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-onboarding',
        '@storybook/addon-interactions',
    ],
    framework: '@storybook/react-webpack5',
    webpackFinal: async (config: Configuration) => {
        const paths: BuildPaths = {
            build: '',
            html: '',
            src: path.resolve(__dirname, '..', '..', 'src'),
            entry: '',
        };
        config!.resolve!.modules!.push(paths.src);
        config!.resolve!.extensions!.push('.ts', '.tsx');

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
        return config;
    },
};

export default config;
