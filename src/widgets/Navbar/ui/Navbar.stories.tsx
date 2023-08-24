import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';
import { Navbar } from './Navbar';
import exampleAvatar from '@/shared/assets/tests/avatarExample.jpg';
import { Theme } from '@/shared/consts/theme';

const meta = {
    title: 'widgets/Navbar',
    component: Navbar,
    decorators: [StoreDecorator({})],
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {};

export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
};

export const AuthNavbar: Story = {
    decorators: [
        StoreDecorator({ user: { authData: { avatar: exampleAvatar } } }),
    ],
};
