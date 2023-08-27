import { CSSProperties, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Skeleton.module.scss';

interface SkeletonProps {
    className?: string;
    height?: string | number;
    width?: string | number;
    border?: string;
}

/**
 * Устарел, используем новые компоненты из redesigned
 * @deprecated
 */
export const Skeleton = memo((props: SkeletonProps) => {
    const { className, height, width, border } = props;
    const styles: CSSProperties = {
        width,
        height,
        borderRadius: border,
    };
    const mods = {};
    return (
        <div
            className={classNames(cls.skeleton, mods, [className])}
            style={styles}
        />
    );
});
