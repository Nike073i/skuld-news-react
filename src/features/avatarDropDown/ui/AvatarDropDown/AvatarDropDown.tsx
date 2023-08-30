import { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DropDown as DropDownDeprecated } from '@/shared/ui/deprecated/Popups';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import {
    getUserAuthData,
    isUserAdmin,
    isUserManager,
    userActions,
} from '@/entities/User';
import {
    getRouteAdmin,
    getRouteProfile,
    getRouteSettings,
} from '@/shared/consts/router';
import { ToggleFeatures } from '@/shared/lib/features';
import { DropDown } from '@/shared/ui/redesigned/Popups';
import { Avatar } from '@/shared/ui/redesigned/Avatar';

interface AvatarDropDownProps {
    className?: string;
}

export const AvatarDropDown = memo((props: AvatarDropDownProps) => {
    const { className } = props;
    const mods = {};
    const isAdmin = useSelector(isUserAdmin);
    const isManager = useSelector(isUserManager);
    const authData = useSelector(getUserAuthData);
    const { t } = useTranslation();

    const dispatch = useDispatch();
    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    if (!authData) {
        return null;
    }

    const isAdminPanelAvailable = isAdmin || isManager;
    const items = [
        ...(isAdminPanelAvailable
            ? [
                  {
                      content: t('AdminLink'),
                      href: getRouteAdmin(),
                  },
              ]
            : []),
        {
            content: t('ProfileLink'),
            href: getRouteProfile(authData.id),
        },
        {
            content: t('SettingsLink'),
            href: getRouteSettings(),
        },
        {
            content: t('LogOut'),
            onClick: onLogout,
        },
    ];

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <DropDown
                    items={items}
                    trigger={<Avatar size={40} src={authData.avatar} />}
                    className={classNames('', mods, [className])}
                    direction="bottom left"
                />
            }
            off={
                <DropDownDeprecated
                    items={items}
                    trigger={
                        <AvatarDeprecated
                            size={30}
                            fallbackInverted
                            src={authData.avatar}
                        />
                    }
                    className={classNames('', mods, [className])}
                    direction="bottom left"
                />
            }
        />
    );
});
