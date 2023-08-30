import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleFilters.module.scss';
import { Card } from '@/shared/ui/redesigned/Card';
import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { ArticleSortField, ArticleType } from '@/entities/Article';
import { SortOrder } from '@/shared/types/sort';
import { Input } from '@/shared/ui/redesigned/Input';
import SearchIcon from '@/shared/assets/icons/search.svg';
import { Icon } from '@/shared/ui/redesigned/Icon';

interface ArticleFiltersProps {
    className?: string;
    sort: ArticleSortField;
    order: SortOrder;
    type: ArticleType;
    search: string;
    onChangeSort: (newSort: ArticleSortField) => void;
    onChangeOrder: (newOrder: SortOrder) => void;
    onChangeType: (newType: ArticleType) => void;
    onChangeSearch: (search: string) => void;
}

export const ArticleFilters = memo((props: ArticleFiltersProps) => {
    const {
        className,
        sort,
        order,
        search,
        type,
        onChangeOrder,
        onChangeSearch,
        onChangeSort,
        onChangeType,
    } = props;
    const mods = {};
    const { t } = useTranslation('article');
    return (
        <Card
            className={classNames(cls.articleFilters, mods, [className])}
            padding="24"
        >
            <VStack gap="32">
                <Input
                    onChange={onChangeSearch}
                    value={search}
                    placeholder={t('Search')}
                    addonLeft={<Icon Svg={SearchIcon} />}
                />
                <ArticleTypeTabs
                    value={type}
                    onChangeType={onChangeType}
                    className={cls.tabs}
                />
                <ArticleSortSelector
                    sort={sort}
                    order={order}
                    onChangeOrder={onChangeOrder}
                    onChangeSort={onChangeSort}
                />
            </VStack>
        </Card>
    );
});
