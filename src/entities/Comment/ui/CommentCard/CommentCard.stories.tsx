import type { Meta, StoryObj } from '@storybook/react';
import { CommentCard } from './CommentCard';

const meta = {
    title: 'entities/Comment/CommentCard',
    component: CommentCard,
} satisfies Meta<typeof CommentCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        comment: {
            id: '1',
            text: 'text 1',
            user: { id: '1', username: 'user1' },
        },
    },
};

export const isLoading: Story = {
    args: {
        comment: {
            id: '1',
            text: 'text 1',
            user: { id: '1', username: 'user1' },
        },
        isLoading: true,
    },
};
