import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/redesigned/Text';
import { Icon } from '@/shared/ui/redesigned/Icon';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import { Card } from '@/shared/ui/redesigned/Card';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Button } from '@/shared/ui/redesigned/Button';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { ArticleView, ArticleBlockType } from '../../../model/consts/consts';
import { ArticleTextBlock } from '../../../model/types/article';
import { getRouteArticle } from '@/shared/consts/router';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { ArticleListItemProps } from '../ArticleListItem';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import cls from './ArticleListItemRedesigned.module.scss';

export const ArticleListItemRedesigned = memo((props: ArticleListItemProps) => {
    const { className, article, view, target } = props;
    const mods = {};
    const { t } = useTranslation('article');

    const userInfo = (
        <>
            <Avatar
                size={32}
                src={article.user.avatar}
                className={cls.avatar}
            />
            <Text text={article.user.username} bold />
        </>
    );
    const views = (
        <HStack gap="8">
            <Icon Svg={EyeIcon} />
            <Text text={String(article.views)} className={cls.views} />
        </HStack>
    );

    if (view === ArticleView.LIST) {
        const textBlock = article.blocks.find(
            (block) => block.type === ArticleBlockType.TEXT,
        ) as ArticleTextBlock;
        return (
            <Card
                padding="24"
                fullWidth
                data-testid="ArticleListItem"
                className={classNames(cls.articleListItemRedesigned, {}, [
                    className,
                    cls[view],
                ])}
            >
                <VStack gap="16" max>
                    <HStack gap="8" max>
                        {userInfo}
                        <Text text={article.createdAt} />
                    </HStack>
                    <Text title={article.title} bold />
                    <Text title={article.subtitle} size="size_s" />
                    <AppImage
                        fallback={<Skeleton width="100%" height={250} />}
                        src={article.img}
                        alt={article.title}
                        className={cls.image}
                    />
                    {textBlock?.paragraphs && (
                        <Text
                            text={textBlock.paragraphs.slice(0, 2).join(' ')}
                            className={cls.textBlock}
                        />
                    )}
                    <HStack max justify="between">
                        <AppLink
                            to={getRouteArticle(article.id)}
                            target={target}
                        >
                            <Button variant="outline">
                                {t('ContinueReading')}
                            </Button>
                        </AppLink>
                        {views}
                    </HStack>
                </VStack>
            </Card>
        );
    }
    return (
        <AppLink
            data-testid="ArticleListItem"
            target={target}
            to={getRouteArticle(article.id)}
            className={classNames('', mods, [className, cls[view]])}
        >
            <Card className={cls.card} border="partial" padding="0">
                <AppImage
                    fallback={<Skeleton width="100%" height={200} />}
                    src={article.img}
                    alt={article.title}
                    className={cls.image}
                />
                <VStack className={cls.info} gap="4">
                    <Text title={article.title} className={cls.title} />
                    <VStack gap="4" className={cls.footer} max>
                        <HStack justify="between" max>
                            <Text
                                text={article.createdAt}
                                className={cls.date}
                            />
                            {views}
                        </HStack>
                        <HStack gap="4">{userInfo}</HStack>
                    </VStack>
                </VStack>
            </Card>
        </AppLink>
    );
});
