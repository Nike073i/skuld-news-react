import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { ListBox, ListBoxItem } from './ListBox';

const items: ListBoxItem[] = [
    {
        value: 'first long value item string',
        content: 'first element',
    },
    {
        value: 'second',
        content: 'second element',
        disabled: true,
    },
    {
        value: 'third',
        content: 'third element',
    },
];

const meta = {
    title: 'shared/ListBox',
    component: ListBox,
    args: {
        items,
        value: items[0].value,
    },
} satisfies Meta<typeof ListBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
};
