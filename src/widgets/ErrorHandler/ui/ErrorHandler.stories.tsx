import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { ErrorHandler } from './ErrorHandler';
import { Theme } from '@/shared/consts/theme';

const meta = {
    title: 'widgets/ErrorHandler',
    component: ErrorHandler,
} satisfies Meta<typeof ErrorHandler>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
    args: {
    },
};

export const Dark: Story = {
    args: {
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};
