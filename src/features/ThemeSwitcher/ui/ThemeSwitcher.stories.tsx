import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { ThemeSwitcher } from './ThemeSwitcher';
import { Theme } from '@/shared/consts/theme';
import { FeaturesFlagsDecorator } from '@/shared/config/storybook/FeaturesFlagsDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';

const meta = {
    title: 'shared/ThemeSwitcher',
    component: ThemeSwitcher,
    decorators: [StoreDecorator({})],
} satisfies Meta<typeof ThemeSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {};

export const Dark: Story = {
    decorators: [
        ThemeDecorator(Theme.DARK),
        FeaturesFlagsDecorator({ isAppRedesigned: false }),
    ],
};
