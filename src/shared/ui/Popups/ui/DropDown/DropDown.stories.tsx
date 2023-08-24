import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';
import { DropDown, DropDownItem } from './DropDown';
import { Button } from '../../../Button/Button';

const trigger = <Button>Trigger button</Button>;
const items: DropDownItem[] = [
    { content: <h2>Menu item 1</h2> },
    { content: <h2>Menu item 2</h2> },
    { content: <h2>Menu item 3</h2> },
    { content: <h2>Menu item 4</h2> },
];

const meta = {
    title: 'shared/DropDown',
    component: DropDown,
    args: {
        items,
        trigger,
    },
    decorators: [
        (Story) => (
            <div style={{ padding: 125 }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof DropDown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
};
