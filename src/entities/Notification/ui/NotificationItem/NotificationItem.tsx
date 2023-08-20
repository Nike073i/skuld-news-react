import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card, CardTheme } from '@/shared/ui/Card';
import { Text } from '@/shared/ui/Text';
import cls from './NotificationItem.module.scss';
import { Notification } from '../../model/types/notification';

interface NotificationItemProps {
    className?: string;
    item: Notification;
}

export const NotificationItem = memo((props: NotificationItemProps) => {
    const {
        className,
        item,
    } = props;
    const mods = {};
    const content = (
        <Card
            theme={CardTheme.OUTLINED}
            className={classNames(cls.notificationItem, mods, [className])}
        >
            <Text title={item.title} text={item.description} />
        </Card>
    );
    if (item.href) {
        return (
            <a
                className={cls.link}
                href={item.href}
                target="_blank"
                rel="noreferrer"
            >
                {content}
            </a>
        );
    }
    return content;
});
