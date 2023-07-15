import { Link, LinkProps } from "react-router-dom";
import { classNames } from "shared/lib/classNames/classNames";
import cls from './AppLink.module.scss'
import { FC, PropsWithChildren } from "react";

export enum AppLinkTheme {
    PRIMARY = "primary",
    SECONDARY = 'secondary'
}

interface AppLinkProps extends LinkProps {
    className?: string,
    theme: AppLinkTheme
}

export const AppLink: FC<AppLinkProps> = (props: PropsWithChildren<AppLinkProps>) => {
    const { to, className, children, theme = AppLinkTheme.PRIMARY } = props
    return (
        <Link to={to} className={classNames(cls.appLink, {}, [className, cls[theme]])}>
            {children}
        </Link>
    )
}
