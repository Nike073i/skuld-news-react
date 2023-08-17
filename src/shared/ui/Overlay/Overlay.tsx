import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Overlay.module.scss';

interface OverlayProps {
    className?: string;
    onClick?: () => void;
}

export const Overlay = memo((props: OverlayProps) => {
    const { className, onClick } = props;
    const mods = {};
    return (
        <div onClick={onClick} className={classNames(cls.overlay, mods, [className])} />
    );
});
