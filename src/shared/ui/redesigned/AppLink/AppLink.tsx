import { LinkProps, NavLink } from 'react-router-dom';
import { PropsWithChildren, ReactNode, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AppLink.module.scss';

export type AppLinkVariant = 'primary' | 'secondary' | 'danger';

interface AppLinkProps extends LinkProps {
    className?: string;
    variant?: AppLinkVariant;
    children?: ReactNode;
    activeClassName?: string;
}

export const AppLink = memo((props: PropsWithChildren<AppLinkProps>) => {
    const {
        to,
        className,
        children,
        variant = 'primary',
        activeClassName = '',
        ...otherProps
    } = props;
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                classNames(cls.appLink, { [activeClassName]: isActive }, [
                    className,
                    cls[variant],
                ])
            }
            {...otherProps}
        >
            {children}
        </NavLink>
    );
});
