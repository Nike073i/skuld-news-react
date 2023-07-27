import { Link, LinkProps } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import { PropsWithChildren, ReactNode, memo } from 'react';
import cls from './AppLink.module.scss';

export enum AppLinkTheme {
    PRIMARY = 'primary',
    SECONDARY = 'secondary'
}

interface AppLinkProps extends LinkProps {
    className?: string,
    theme: AppLinkTheme,
    children?: ReactNode,
}

export const AppLink = memo((props: PropsWithChildren<AppLinkProps>) => {
    const {
        to, className, children, theme = AppLinkTheme.PRIMARY,
    } = props;
    return (
        <Link to={to} className={classNames(cls.appLink, {}, [className, cls[theme]])}>
            {children}
        </Link>
    );
});
