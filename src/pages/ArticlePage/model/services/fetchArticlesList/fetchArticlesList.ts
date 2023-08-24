import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Article, ArticleType } from '@/entities/Article';
import { addQueryParams } from '@/shared/lib/url/addQueryParams/addQueryParams';
import { getArticlePageLimit } from '../../selectors/getArticlePageLimit/getArticlePageLimit';
import { getArticlePageNum } from '../../selectors/getArticlePageNum/getArticlePageNum';
import { getArticlePageSearch } from '../../selectors/getArticlePageSearch/getArticlePageSearch';
import { getArticlePageSortField } from '../../selectors/getArticlePageSortField/getArticlePageSortField';
import { getArticlePageSortOrder } from '../../selectors/getArticlePageSortOrder/getArticlePageSortOrder';
import { getArticlePageType } from '../../selectors/getArticlePageType/getArticlePageType';

interface FetchArticlesListProps {
    replace?: boolean;
}

export const fetchArticlesList = createAsyncThunk<
    Article[],
    FetchArticlesListProps,
    ThunkConfig<string>
>('articlePage/fetchArticleList', async (props, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;
    const order = getArticlePageSortOrder(getState());
    const sort = getArticlePageSortField(getState());
    const search = getArticlePageSearch(getState());
    const page = getArticlePageNum(getState());
    const type = getArticlePageType(getState());

    const limit = getArticlePageLimit(getState());
    try {
        addQueryParams({
            sort,
            order,
            search,
            type,
        });
        const response = await extra.api.get<Article[]>('/articles', {
            params: {
                _expand: 'user',
                _limit: limit,
                _page: page,
                _sort: sort,
                _order: order,
                q: search,
                type: type === ArticleType.ALL ? undefined : type,
            },
        });
        if (!response.data) {
            throw new Error();
        }
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
