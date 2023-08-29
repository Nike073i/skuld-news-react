import { memo } from 'react';
import { ArticleFilters } from '@/widgets/ArticleFilters';
import { useArticleFilters } from '../../lib/hooks/useArticleFilters';

interface FilterContainerProps {
    className?: string;
}

export const FilterContainer = memo((props: FilterContainerProps) => {
    const { className } = props;
    const {
        sort,
        order,
        search,
        type,
        onChangeOrder,
        onChangeSearch,
        onChangeSort,
        onChangeType,
    } = useArticleFilters();
    return (
        <ArticleFilters
            className={className}
            onChangeOrder={onChangeOrder}
            onChangeSearch={onChangeSearch}
            onChangeSort={onChangeSort}
            onChangeType={onChangeType}
            sort={sort}
            order={order}
            type={type}
            search={search}
        />
    );
});
