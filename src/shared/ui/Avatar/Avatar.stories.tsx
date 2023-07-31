import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Avatar } from './Avatar';
import AvatarImg from './avatarExample.jpg';

const meta = {
    title: 'shared/Avatar',
    component: Avatar,
    args: {
        src: AvatarImg,
        size: 150,
    },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
};

export const Small: Story = {
    args: {
        size: 50,
    },
};
export const Medium: Story = {
    args: {
        size: 250,
    },
};
