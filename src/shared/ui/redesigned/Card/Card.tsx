import React, { HTMLAttributes, PropsWithChildren } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Card.module.scss';

export type CardVariant = 'normal' | 'outlined' | 'light';
export type CardPadding = '0' | '8' | '16' | '24';
export type CardBorder = 'round' | 'standart' | 'partial';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    variant?: CardVariant;
    fullWidth?: boolean;
    padding?: CardPadding;
    border?: CardBorder;
}

const mapPaddingToClass: Record<CardPadding, string> = {
    0: 'gap_0',
    8: 'gap_8',
    16: 'gap_16',
    24: 'gap_24',
};

export const Card: React.FC<PropsWithChildren<CardProps>> = (
    props: PropsWithChildren<CardProps>,
) => {
    const {
        className,
        children,
        variant = 'normal',
        fullWidth,
        padding = '8',
        border = 'standart',
        ...otherProps
    } = props;
    const mods = {
        [cls.fullWidth]: fullWidth,
    };
    const paddingClass = mapPaddingToClass[padding];
    return (
        <div
            className={classNames(cls.card, mods, [
                className,
                cls[variant],
                cls[paddingClass],
                cls[border],
            ])}
            {...otherProps}
        >
            {children}
        </div>
    );
};
