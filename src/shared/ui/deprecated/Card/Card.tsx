import React, { HTMLAttributes, PropsWithChildren } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Card.module.scss';

export enum CardTheme {
    NORMAL = 'normal',
    OUTLINED = 'outlined',
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    theme?: CardTheme;
    fullWidth?: boolean;
}

/**
 * Устарел, используем новые компоненты из redesigned
 * @deprecated
 */
export const Card: React.FC<PropsWithChildren<CardProps>> = (
    props: PropsWithChildren<CardProps>,
) => {
    const {
        className,
        children,
        theme = CardTheme.NORMAL,
        fullWidth,
        ...otherProps
    } = props;
    const mods = {
        [cls.fullWidth]: fullWidth,
    };
    return (
        <div
            className={classNames(cls.card, mods, [className, cls[theme]])}
            {...otherProps}
        >
            {children}
        </div>
    );
};
