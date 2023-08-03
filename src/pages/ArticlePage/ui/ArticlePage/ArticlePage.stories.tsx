import type { Meta, StoryObj } from '@storybook/react';
import ArticlePage from './ArticlePage';

const meta = {
    title: 'pages/ArticlePage',
    component: ArticlePage,
} satisfies Meta<typeof ArticlePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
};
