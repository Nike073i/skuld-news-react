import { ReactNode, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card, CardTheme } from '../Card/Card';
import cls from './Tabs.module.scss';

export interface TabItem<T extends string> {
    value: T;
    content: ReactNode;
}

interface TabsProps<T extends string> {
    className?: string;
    tabs: TabItem<T>[];
    value: T;
    onTabClick?: (tab: TabItem<T>) => void;
}

/**
 * Устарел, используем новые компоненты из redesigned
 * @deprecated
 */
export const Tabs = <T extends string>(props: TabsProps<T>) => {
    const { className, tabs, value, onTabClick } = props;
    const onTabClickHandle = useCallback(
        (tab: TabItem<T>) => () => {
            onTabClick?.(tab);
        },
        [onTabClick],
    );

    const mods = {};
    return (
        <div className={classNames(cls.tabs, mods, [className])}>
            {tabs.map((tab) => (
                <Card
                    theme={
                        tab.value === value
                            ? CardTheme.NORMAL
                            : CardTheme.OUTLINED
                    }
                    className={cls.tab}
                    key={tab.value}
                    onClick={onTabClickHandle(tab)}
                >
                    {tab.content}
                </Card>
            ))}
        </div>
    );
};
