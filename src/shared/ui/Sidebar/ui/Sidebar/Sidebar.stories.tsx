import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator';
import { Sidebar } from './Sidebar';

const meta = {
    title: 'shared/Sidebar',
    component: Sidebar,
    decorators: [StoreDecorator({})],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
    decorators: [StoreDecorator({ user: { authData: {} } })],
};

export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.DARK), StoreDecorator({ user: { authData: {} } })],
};

export const NoAuth: Story = {};

export const NoAuthDark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
};
