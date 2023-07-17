import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink';
import { useTranslation } from 'react-i18next';
import { RoutePath } from 'app/providers/router';
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string
}

export function Navbar({ className }: NavbarProps) {
    const { t } = useTranslation();
    return (
        <div className={classNames(cls.navbar, {}, [className])}>
            <div className={cls.links}>
                <AppLink
                    to={RoutePath.main}
                    className={cls.mainLink}
                    theme={AppLinkTheme.SECONDARY}
                >
                    {t('MainLink')}
                </AppLink>
                <AppLink
                    to={RoutePath.about}
                    theme={AppLinkTheme.SECONDARY}
                >
                    {t('AboutLink')}
                </AppLink>
            </div>
        </div>
    );
}
