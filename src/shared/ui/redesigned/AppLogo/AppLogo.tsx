import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AppLogo.module.scss';
import AppSvg from '@/shared/assets/icons/react-16.svg';
import { HStack } from '../../deprecated/Stack';

interface AppLogoProps {
    className?: string;
    size?: number;
}

export const AppLogo = memo((props: AppLogoProps) => {
    const { className, size = 50 } = props;
    const mods = {};
    return (
        <HStack
            max
            justify="center"
            className={classNames(cls.appLogoWrapper, mods, [className])}
        >
            <div className={cls.gradientBig} />
            <div className={cls.gradientSmall} />
            <AppSvg width={size} height={size} color="black" />
        </HStack>
    );
});
