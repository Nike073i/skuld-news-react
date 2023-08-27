import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AppLogo.module.scss';
import AppSvg from '@/shared/assets/icons/react-16.svg';
import { HStack } from '../Stack';

interface AppLogoProps {
    className?: string;
}

/**
 * Устарел, используем новые компоненты из redesigned
 * @deprecated
 */
export const AppLogo = memo((props: AppLogoProps) => {
    const { className } = props;
    const mods = {};
    return (
        <HStack
            max
            justify="center"
            className={classNames(cls.appLogoWrapper, mods, [className])}
        >
            <div className={cls.gradientBig} />
            <div className={cls.gradientSmall} />
            <AppSvg width={55} height={55} />
        </HStack>
    );
});
