import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Text, TextTheme } from './Text';

const meta = {
    title: 'shared/Text',
    component: Text,
    args: {
        title: 'Title',
        text: 'Some text here',
        theme: TextTheme.PRIMARY,
    },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PrimaryLight: Story = {};

export const PrimaryDark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
};

export const OnlyTitleLight: Story = {
    args: {
        text: undefined,
    },
};

export const OnlyTitleDark: Story = {
    args: {
        text: undefined,
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};

export const OnlyTextLight: Story = {
    args: {
        title: undefined,
    },
};

export const OnlyTextDark: Story = {
    args: {
        title: undefined,
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};

export const ErrorLight: Story = {
    args: {
        theme: TextTheme.ERROR,
    },
};

export const ErrorDark: Story = {
    args: {
        theme: TextTheme.ERROR,
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};