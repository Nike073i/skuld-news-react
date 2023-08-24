import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { SortOrder } from '@/shared/types/sort';
import { ArticleSortField, ArticleType } from '@/entities/Article';
import { getArticlePageInited } from '../../selectors/getArticlePageInited/getArticlePageInited';
import { articlePageActions } from '../../slices/articlePageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

export const initArticlesPage = createAsyncThunk<
    void,
    URLSearchParams,
    ThunkConfig<string>
>('articlesPage/initArticlesPage', (searchParams, thunkApi) => {
    const { getState, dispatch } = thunkApi;

    const inited = getArticlePageInited(getState());
    if (!inited) {
        const orderFromUrl = searchParams.get('order') as SortOrder;
        if (orderFromUrl) {
            dispatch(articlePageActions.setOrder(orderFromUrl));
        }
        const sortFromUrl = searchParams.get('sort') as ArticleSortField;
        if (sortFromUrl) {
            dispatch(articlePageActions.setSort(sortFromUrl));
        }
        const searchFromUrl = searchParams.get('search');
        if (searchFromUrl) {
            dispatch(articlePageActions.setSearch(searchFromUrl));
        }
        const typeFromUrl = searchParams.get('type') as ArticleType;
        if (typeFromUrl) {
            dispatch(articlePageActions.setType(typeFromUrl));
        }
        dispatch(articlePageActions.initState());
        dispatch(fetchArticlesList({}));
    }
});
