import { memo, useCallback } from 'react';
import { t } from 'i18next';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DropDown } from '@/shared/ui/Popups';
import { RoutePath } from '@/app/providers/router';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import {
    getUserAuthData, isUserAdmin, isUserManager, userActions,
} from '@/entities/User';

interface AvatarDropDownProps {
    className?: string;
}

export const AvatarDropDown = memo((props: AvatarDropDownProps) => {
    const {
        className,
    } = props;
    const mods = {};
    const isAdmin = useSelector(isUserAdmin);
    const isManager = useSelector(isUserManager);
    const authData = useSelector(getUserAuthData);

    const dispatch = useDispatch();
    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    if (!authData) {
        return null;
    }

    const isAdminPanelAvailable = isAdmin || isManager;
    return (
        <DropDown
            items={[
                ...(isAdminPanelAvailable ? [{
                    content: t('AdminLink'),
                    href: RoutePath.admin_panel,
                }] : []),
                {
                    content: t('ProfileLink'),
                    href: RoutePath.profile + authData.id,
                },
                {
                    content: t('LogOut'),
                    onClick: onLogout,
                },
            ]}
            trigger={<Avatar size={30} src={authData.avatar} />}
            className={classNames('', mods, [className])}
            direction="bottom left"
        />
    );
});