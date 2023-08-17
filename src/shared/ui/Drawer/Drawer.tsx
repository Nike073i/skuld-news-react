import { ReactNode, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Drawer.module.scss';
import { Portal } from '../Portal/Portal';
import { Overlay } from '../Overlay/Overlay';

interface DrawerProps {
    className?: string;
    children: ReactNode;
    isOpen?: boolean;
    portal?: HTMLElement;
    onClose?: () => void;
}

export const Drawer = memo((props: DrawerProps) => {
    const {
        className,
        children,
        isOpen,
        portal = document.getElementById('app') ?? document.body,
        onClose,
    } = props;
    const mods = {
        [cls.opened]: isOpen,
    };
    return (
        <Portal element={portal}>
            <div className={classNames(cls.drawer, mods, [className])}>
                <Overlay onClick={onClose} />
                <div className={cls.content}>
                    {children}
                </div>
            </div>
        </Portal>
    );
});
