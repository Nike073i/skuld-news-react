import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator';
import LoginForm from './LoginForm';

const meta = {
    title: 'features/LoginForm',
    component: LoginForm,
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
    decorators: [StoreDecorator({ loginSchema: { username: 'username', password: 'password' } })],
};

export const Dark: Story = {
    decorators: [StoreDecorator({ loginSchema: { username: 'username', password: 'password' } }), ThemeDecorator(Theme.DARK)],
};

export const withErrorLight: Story = {
    decorators: [StoreDecorator({ loginSchema: { username: 'username', password: 'password', error: 'Some error' } })],
};

export const loadingLight: Story = {
    decorators: [StoreDecorator({ loginSchema: { username: 'username', password: 'password', isLoading: true } })],
};
