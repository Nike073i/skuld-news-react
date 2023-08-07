import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator';
import ArticlePage from './ArticlePage';

const meta = {
    title: 'pages/ArticlePage',
    component: ArticlePage,
    decorators: [
        StoreDecorator({}),
    ],
} satisfies Meta<typeof ArticlePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
};
