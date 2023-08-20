import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';
import { ListBox, ListBoxItem } from './ListBox';

const items: ListBoxItem[] = [
    {
        value: 'first',
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
    decorators: [
        (Story) => <div style={{ padding: 250 }}><Story /></div>,
    ],
} satisfies Meta<typeof ListBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
};
