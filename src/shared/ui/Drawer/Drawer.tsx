import { ReactNode, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useModal } from 'shared/lib/hooks/useModal/useModal';
import cls from './Drawer.module.scss';
import { Portal } from '../Portal/Portal';
import { Overlay } from '../Overlay/Overlay';

interface DrawerProps {
    className?: string;
    children: ReactNode;
    isOpen?: boolean;
    portal?: HTMLElement;
    onClose?: () => void;
    lazy?: boolean;
}

export const Drawer = memo((props: DrawerProps) => {
    const {
        className,
        children,
        isOpen,
        portal = document.getElementById('app') ?? document.body,
        onClose,
        lazy,
    } = props;

    const { close, isClosing, isMounted } = useModal({ animationDelay: 300, onClose, isOpen });

    if (lazy && !isMounted) {
        return null;
    }

    const mods = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing,
    };
    return (
        <Portal element={portal}>
            <div className={classNames(cls.drawer, mods, [className])}>
                <Overlay onClick={close} />
                <div className={cls.content}>
                    {children}
                </div>
            </div>
        </Portal>
    );
});
