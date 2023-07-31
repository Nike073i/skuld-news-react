import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { getUserAuthData } from 'entities/User';
import { useSelector } from 'react-redux';
import cls from './SidebarItem.module.scss';
import { SidebarItemType } from '../../model/items';

interface SidebarItemProps {
    item: SidebarItemType;
    collapsed: boolean;
}

export const SidebarItem = memo((props: SidebarItemProps) => {
    const {
        item,
        collapsed,
    } = props;
    const isAuth = useSelector(getUserAuthData);
    const { t } = useTranslation();
    if (item.authOnly && !isAuth) return null;
    return (
        <AppLink
            to={item.path}
            theme={AppLinkTheme.SECONDARY}
            className={classNames(cls.item, { [cls.collapsed]: collapsed }, [])}
        >
            <item.Icon className={cls.icon} />
            <span className={cls.link}>
                {t(item.textKey)}
            </span>
        </AppLink>
    );
});
