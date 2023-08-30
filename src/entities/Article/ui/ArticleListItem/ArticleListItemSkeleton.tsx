import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';
import { Card as CardRedesigned } from '@/shared/ui/redesigned/Card';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { ArticleView } from '../../model/consts/consts';
import cls from './ArticleListItem.module.scss';
import { toggleFeatures } from '@/shared/lib/features';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';

interface ArticleListItemSkeletonProps {
    className?: string;
    view: ArticleView;
}

export const ArticleListItemSkeleton = memo(
    (props: ArticleListItemSkeletonProps) => {
        const { className, view } = props;
        const mods = {};
        const Skeleton = toggleFeatures({
            name: 'isAppRedesigned',
            on: () => SkeletonRedesigned,
            off: () => SkeletonDeprecated,
        });
        const Card = toggleFeatures({
            name: 'isAppRedesigned',
            on: () => CardRedesigned,
            off: () => CardDeprecated,
        });

        if (view === ArticleView.LIST) {
            return (
                <div className={classNames('', mods, [className, cls[view]])}>
                    <Card className={cls.card}>
                        <div className={cls.header}>
                            <Skeleton border="50%" height={30} width={30} />
                            <Skeleton
                                width={150}
                                height={16}
                                className={cls.username}
                            />
                            <Skeleton
                                width={150}
                                height={16}
                                className={cls.date}
                            />
                        </div>
                        <Skeleton
                            width={250}
                            height={24}
                            className={cls.title}
                        />
                        <Skeleton height={200} className={cls.image} />
                        <div className={cls.footer}>
                            <Skeleton height={36} width={200} />
                        </div>
                    </Card>
                </div>
            );
        }
        return (
            <div className={classNames('', mods, [className, cls[view]])}>
                <CardDeprecated className={cls.card}>
                    <div className={cls.imageWrapper}>
                        <SkeletonDeprecated
                            width={200}
                            height={200}
                            className={cls.image}
                        />
                    </div>
                    <div className={cls.infoWrapper}>
                        <SkeletonDeprecated width={130} height={16} />
                    </div>
                    <SkeletonDeprecated
                        width={150}
                        height={16}
                        className={cls.title}
                    />
                </CardDeprecated>
            </div>
        );
    },
);
