import { classNames } from 'shared/lib/classNames/classNames';
import React, { HTMLAttributes, PropsWithChildren } from 'react';
import cls from './Card.module.scss';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
}

export const Card: React.FC<PropsWithChildren<CardProps>> = (props: PropsWithChildren<CardProps>) => {
    const {
        className,
        children,
        ...otherProps
    } = props;
    const mods = {};
    return (
        <div
            className={classNames(cls.card, mods, [className])}
            {...otherProps}
        >
            {children}
        </div>
    );
};
