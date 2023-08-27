import type { Meta, StoryObj } from '@storybook/react';
import { Theme } from '@/shared/consts/theme';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Modal } from './Modal';

const meta = {
    title: 'shared/Modal',
    component: Modal,
    args: {
        isOpen: true,
        children:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Culpa minima libero ut numquam, pariatur expedita voluptate possimus laudantium',
    },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
};
