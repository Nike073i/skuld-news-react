import type { Meta, StoryObj } from '@storybook/react';
import { CommentCard } from './CommentCard';
import { FeaturesFlagsDecorator } from '@/shared/config/storybook/FeaturesFlagsDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator';

const normalArgs = {
    comment: {
        id: '1',
        text: 'text 1',
        user: { id: '1', username: 'user1' },
    },
};

const meta = {
    title: 'entities/Comment/CommentCard',
    component: CommentCard,
} satisfies Meta<typeof CommentCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: normalArgs,
};

export const PrimaryRedesigned: Story = {
    args: normalArgs,
    decorators: [FeaturesFlagsDecorator({ isAppRedesigned: true })],
};

export const isLoading: Story = {
    args: {
        ...normalArgs,
        isLoading: true,
    },
};

export const isLoadingRedesigned: Story = {
    args: {
        ...normalArgs,
        isLoading: true,
    },
    decorators: [NewDesignDecorator],
};
