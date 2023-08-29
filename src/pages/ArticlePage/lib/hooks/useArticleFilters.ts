import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { ArticleView, ArticleSortField, ArticleType } from '@/entities/Article';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';
import { SortOrder } from '@/shared/types/sort';
import { getArticlePageSearch } from '../../model/selectors/getArticlePageSearch/getArticlePageSearch';
import { getArticlePageSortField } from '../../model/selectors/getArticlePageSortField/getArticlePageSortField';
import { getArticlePageSortOrder } from '../../model/selectors/getArticlePageSortOrder/getArticlePageSortOrder';
import { getArticlePageType } from '../../model/selectors/getArticlePageType/getArticlePageType';
import { getArticlePageView } from '../../model/selectors/getArticlePageView/getArticlePageView';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';
import { articlePageActions } from '../../model/slices/articlePageSlice';

export const useArticleFilters = () => {
    const dispatch = useAppDispatch();
    const view = useSelector(getArticlePageView);
    const order = useSelector(getArticlePageSortOrder);
    const sort = useSelector(getArticlePageSortField);
    const search = useSelector(getArticlePageSearch);
    const type = useSelector(getArticlePageType);

    const onChangeView = useCallback(
        (newView: ArticleView) => {
            dispatch(articlePageActions.setView(newView));
        },
        [dispatch],
    );

    const fetchData = useCallback(() => {
        dispatch(fetchArticlesList({ replace: true }));
    }, [dispatch]);

    const debouncedfetchData = useDebounce(fetchData, 500);

    const onChangeSort = useCallback(
        (newSort: ArticleSortField) => {
            dispatch(articlePageActions.setSort(newSort));
            dispatch(articlePageActions.setPage(1));
            fetchData();
        },
        [dispatch, fetchData],
    );

    const onChangeOrder = useCallback(
        (newOrder: SortOrder) => {
            dispatch(articlePageActions.setOrder(newOrder));
            dispatch(articlePageActions.setPage(1));
            fetchData();
        },
        [dispatch, fetchData],
    );

    const onChangeType = useCallback(
        (value: ArticleType) => {
            dispatch(articlePageActions.setType(value));
            dispatch(articlePageActions.setPage(1));
            fetchData();
        },
        [dispatch, fetchData],
    );

    const onChangeSearch = useCallback(
        (searchText: string) => {
            dispatch(articlePageActions.setSearch(searchText));
            dispatch(articlePageActions.setPage(1));
            debouncedfetchData();
        },
        [dispatch, debouncedfetchData],
    );
    return {
        view,
        sort,
        order,
        search,
        type,
        onChangeView,
        onChangeSort,
        onChangeOrder,
        onChangeSearch,
        onChangeType,
    };
};
