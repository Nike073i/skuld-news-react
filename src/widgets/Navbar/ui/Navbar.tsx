import { classNames } from "shared/lib/classNames/classNames";
import cls from './Navbar.module.scss'
import { AppLink } from "shared/ui/AppLinkl";
import { AppLinkTheme } from "shared/ui/AppLinkl/ui/AppLink";

interface NavbarProps {
    className?: string
}

export function Navbar({ className }: NavbarProps) {
    return (
        <div className={classNames(cls.navbar, {}, [className])}>
            <div className={cls.links}>
                <AppLink to='/' className={cls.mainLink} theme={AppLinkTheme.SECONDARY}>
                    Главная
                </AppLink>
                <AppLink to='/about' theme={AppLinkTheme.SECONDARY}>
                    О сайте
                </AppLink>
            </div>
        </div>
    )
}
