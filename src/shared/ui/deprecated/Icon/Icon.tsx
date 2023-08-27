import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Icon.module.scss';

interface IconProps extends React.SVGProps<SVGSVGElement> {
    className?: string;
    Svg: React.FC<React.SVGProps<SVGSVGElement>>;
    inverted?: boolean;
}

/**
 * Устарел, используем новые компоненты из redesigned
 * @deprecated
 */
export const Icon = memo((props: IconProps) => {
    const { className, Svg, inverted, ...otherProps } = props;
    return (
        <Svg
            className={classNames(inverted ? cls.inverted : cls.icon, {}, [
                className,
            ])}
            {...otherProps}
        />
    );
});
