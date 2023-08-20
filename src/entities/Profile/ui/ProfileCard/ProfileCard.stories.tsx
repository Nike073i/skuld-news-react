import type { Meta, StoryObj } from '@storybook/react';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';
import avatar from '@/shared/assets/tests/avatarExample.jpg';
import { ProfileCard } from './ProfileCard';

const meta = {
    title: 'entities/ProfileCard',
    component: ProfileCard,
    args: {
        data: {
            username: 'admin',
            age: 21,
            country: Country.Kazakhstan,
            lastname: 'Filippov',
            first: 'Nikita',
            city: 'Ulyanovsk',
            currency: Currency.RUB,
            avatar,
        },
        readOnly: true,
    },
} satisfies Meta<typeof ProfileCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const PrimaryDark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
};

export const WithError: Story = {
    args: {
        error: 'Some went wrong',
    },
};

export const WithErrorDark: Story = {
    args: {
        error: 'Some went wrong',
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};

export const Loading: Story = {
    args: {
        isLoading: true,
    },
};

export const LoadingDark: Story = {
    args: {
        isLoading: true,
    },
    decorators: [ThemeDecorator(Theme.DARK)],
};
