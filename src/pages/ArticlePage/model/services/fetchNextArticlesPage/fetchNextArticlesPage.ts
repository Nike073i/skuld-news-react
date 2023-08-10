import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getArticlePageHasMore } from '../../selectors/getArticlePageHasMore/getArticlePageHasMore';
import { getArticlePageNum } from '../../selectors/getArticlePageNum/getArticlePageNum';
import { getArticlePageIsLoading } from '../../selectors/getArticlePageIsLoading/getArticlePageIsLoading';
import { articlePageActions } from '../../slices/articlePageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

export const fetchNextArticlesList = createAsyncThunk<
    void,
    void, ThunkConfig<string>
>(
    'articlePage/fetchNextArticlesList',
    async (_, thunkApi) => {
        const { getState, dispatch } = thunkApi;

        const hasMore = (getArticlePageHasMore(getState()));
        const page = (getArticlePageNum(getState()));
        const isLoading = (getArticlePageIsLoading(getState()));

        if (hasMore && !isLoading) {
            dispatch(articlePageActions.setPage(page + 1));
            dispatch(fetchArticlesList({}));
        }
    },
);
