import { memo, useMemo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Select, SelectOption } from 'shared/ui/Select/Select';
import { useTranslation } from 'react-i18next';
import { SortOrder } from 'shared/types';
import { ArticleSortField } from '../../model/types/article';
import cls from './ArticleSortSelector.module.scss';

interface ArticleSortSelectorProps {
    className?: string;
    sort: ArticleSortField;
    order: SortOrder;
    onChangeOrder?: (newOrder: SortOrder) => void;
    onChangeSort?: (newSort: ArticleSortField) => void;
}

export const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {
    const {
        className,
        sort,
        order,
        onChangeOrder,
        onChangeSort,
    } = props;
    const mods = {};
    const { t } = useTranslation('article');
    const orderOptions = useMemo<SelectOption<SortOrder>[]>(() => [
        {
            value: 'asc',
            content: t('Ascending'),
        },
        {
            value: 'desc',
            content: t('Descending'),
        },
    ], [t]);
    const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(() => [
        {
            value: ArticleSortField.CREATED,
            content: t('CreationDate'),
        },
        {
            value: ArticleSortField.TITLE,
            content: t('Title'),
        },
        {
            value: ArticleSortField.VIEWS,
            content: t('Views'),
        },
    ], [t]);

    return (
        <div className={classNames(cls.articleSortSelector, mods, [className])}>
            <Select<ArticleSortField>
                value={sort}
                options={sortFieldOptions}
                label={t('SortBy')}
                onChange={onChangeSort}
            />
            <Select<SortOrder>
                value={order}
                options={orderOptions}
                label={t('By')}
                onChange={onChangeOrder}
                className={cls.order}
            />
        </div>
    );
});
