import type { Meta, StoryObj } from '@storybook/react';
import { Flex } from './Flex';

const children = (
    <>
        <h1>Element 1</h1>
        <h1>Element 2</h1>
        <h1>Element 3</h1>
        <h1>Element 4</h1>
        <h1>Element 5</h1>
    </>
);

const meta = {
    title: 'shared/Flex',
    component: Flex,
    args: {
        children,
    },
} satisfies Meta<typeof Flex>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Row: Story = {};
export const Column: Story = {
    args: {
        direction: 'column',
    },
};

export const RowGap4: Story = {
    args: {
        gap: '4',
    },
};

export const ColumnGap4: Story = {
    args: {
        gap: '4',
        direction: 'column',
    },
};
