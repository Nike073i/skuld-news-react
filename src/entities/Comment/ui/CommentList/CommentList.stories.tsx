import type { Meta, StoryObj } from '@storybook/react';
import { CommentList } from './CommentList';

const meta = {
    title: 'entities/Comment/CommentList',
    component: CommentList,
} satisfies Meta<typeof CommentList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        comments: [
            {
                id: '1',
                text: 'text 1',
                user: { id: '1', username: 'user1' },
            },
            {
                id: '2',
                text: 'text 2',
                user: { id: '2', username: 'user2' },
            },
        ],
    },
};

export const IsLoading: Story = {
    args: {
        comments: [],
        isLoading: true,
    },
};
