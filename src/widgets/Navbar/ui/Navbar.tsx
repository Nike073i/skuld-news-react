import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    Button as ButtonDeprecated,
    ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { LoginModal } from '@/features/AuthByUsername';
import { getUserAuthData } from '@/entities/User';
import { Text as TextDeprecated, TextTheme } from '@/shared/ui/deprecated/Text';
import {
    AppLink as AppLinkDeprecated,
    AppLinkTheme,
} from '@/shared/ui/deprecated/AppLink';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { NotificationButton } from '@/features/notificationButton';
import { AvatarDropDown } from '@/features/avatarDropDown';
import cls from './Navbar.module.scss';
import { getRouteArticleCreate } from '@/shared/consts/router';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';
import { Button } from '@/shared/ui/redesigned/Button';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo((props: NavbarProps) => {
    const { className } = props;
    const portal = document.getElementById('app') || document.body;
    const { t } = useTranslation();
    const [isAuthModal, setIsAuthModal] = useState(false);
    const authData = useSelector(getUserAuthData);

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    const onShowModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);
    const mainClass = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => cls.navbarRedesigned,
        off: () => cls.navbar,
    });
    if (authData) {
        return (
            <header className={classNames(mainClass, {}, [className])}>
                <ToggleFeatures
                    feature="isAppRedesigned"
                    on={
                        <HStack gap="16" className={cls.actions}>
                            <NotificationButton />
                            <AvatarDropDown />
                        </HStack>
                    }
                    off={
                        <>
                            <TextDeprecated
                                className={cls.appName}
                                title={t('LogoText')}
                                theme={TextTheme.INVERTED}
                            />
                            <AppLinkDeprecated
                                to={getRouteArticleCreate()}
                                theme={AppLinkTheme.SECONDARY}
                            >
                                {t('CreateArticle')}
                            </AppLinkDeprecated>
                            <HStack gap="16" className={cls.actions}>
                                <NotificationButton />
                                <AvatarDropDown />
                            </HStack>
                        </>
                    }
                />
            </header>
        );
    }
    return (
        <header className={classNames(mainClass, {}, [className])}>
            <ToggleFeatures
                feature="isAppRedesigned"
                off={
                    <ButtonDeprecated
                        theme={ButtonTheme.CLEAR_INVERTED}
                        className={cls.links}
                        onClick={onShowModal}
                    >
                        {t('LogIn')}
                    </ButtonDeprecated>
                }
                on={
                    <Button
                        variant="clear"
                        className={cls.links}
                        onClick={onShowModal}
                    >
                        {t('LogIn')}
                    </Button>
                }
            />
            {isAuthModal && (
                <LoginModal
                    isOpen={isAuthModal}
                    onClose={onCloseModal}
                    portal={portal}
                />
            )}
        </header>
    );
});
