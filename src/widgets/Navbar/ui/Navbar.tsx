import { classNames } from 'shared/lib/classNames/classNames';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { Modal } from 'shared/ui/Modal';
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
    portal?: HTMLElement;
}

export function Navbar(props : NavbarProps) {
    const {
        className,
        portal = document.getElementById('app'),
    } = props;
    const { t } = useTranslation();
    const [isAuthModal, setIsAuthModal] = useState(false);
    const onToggleModal = useCallback(() => {
        setIsAuthModal((prev) => !prev);
    }, []);
    return (
        <div className={classNames(cls.navbar, {}, [className])}>
            <Button
                theme={ButtonTheme.CLEAR_INVERTED}
                className={cls.links}
                onClick={onToggleModal}
            >
                {t('LogIn')}
            </Button>
            <Modal
                isOpen={isAuthModal}
                onClose={onToggleModal}
                portal={portal}
            >
                *
            </Modal>
        </div>
    );
}
