import { Mods, classNames } from 'shared/lib/classNames/classNames';
import React, {
    ReactNode, useCallback, useEffect, useRef, useState,
} from 'react';
import { useTheme } from 'app/providers/ThemeProvider';
import { Portal } from '../Portal/Portal';
import cls from './Modal.module.scss';
import { Overlay } from '../Overlay/Overlay';

interface ModalProps {
    className?: string;
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    portal?: HTMLElement;
    lazy?: boolean;
}

export const Modal = (props: ModalProps) => {
    const {
        className,
        children,
        isOpen,
        onClose,
        portal = document.getElementById('app') ?? document.body,
        lazy,
    } = props;

    const { theme } = useTheme();

    const ANIMATION_DELAY = 300;

    const [isClosing, setIsClosing] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout>>();

    const closeHandler = useCallback(() => {
        if (onClose) {
            setIsClosing(true);
            timerRef.current = setTimeout(() => {
                onClose();
                setIsClosing(false);
            }, ANIMATION_DELAY);
        }
    }, [onClose]);

    const onKeydown = useCallback((event: globalThis.KeyboardEvent): any => {
        if (event.key === 'Escape') {
            closeHandler();
        }
    }, [closeHandler]);

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
        }
    }, [isOpen]);
    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', onKeydown);
        }
        return () => {
            clearTimeout(timerRef.current);
            window.removeEventListener('keydown', onKeydown);
        };
    }, [isOpen, onKeydown]);

    const mods: Mods = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing,
    };
    if (lazy && !isMounted) {
        return null;
    }
    return (
        <Portal element={portal}>
            <div className={classNames(cls.modal, mods, [className, theme])}>
                <Overlay onClick={closeHandler} />
                <div className={cls.content}>
                    {children}
                </div>
            </div>
        </Portal>
    );
};
