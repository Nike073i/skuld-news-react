import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { TabItem, Tabs } from './Tabs';

const tabs: TabItem<string>[] = [
    {
        value: 'tab 1',
        content: 'text tab 1',
    },
    {
        value: 'tab 2',
        content: 'text tab 2',
    },
    {
        value: 'tab 3',
        content: 'text tab 3',
    },
];

const meta = {
    title: 'shared/Tabs',
    component: Tabs,
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        value: tabs[0].value,
        tabs,
        onTabClick: action('onTabClick'),
    },
};
