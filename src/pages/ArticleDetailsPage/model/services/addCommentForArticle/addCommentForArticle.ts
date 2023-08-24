import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getUserAuthData } from '@/entities/User';
import { getArticleDetailsData } from '@/entities/Article';
import { fetchCommentsByArticleId } from '../fetchCommentsByArticleId/fetchCommentsByArticleId';

export const addCommentForArticle = createAsyncThunk<
    Comment,
    String,
    ThunkConfig<String>
>('articleDetailsPage/addCommentForArticle', async (text, thunkApi) => {
    const { extra, getState, dispatch, rejectWithValue } = thunkApi;
    const userData = getUserAuthData(getState());
    const article = getArticleDetailsData(getState());

    if (!userData || !text || !article) {
        return rejectWithValue('no data');
    }

    try {
        const response = await extra.api.post<Comment>('/comments', {
            articleId: article.id,
            text,
            userId: userData.id,
        });
        if (!response.data) {
            throw new Error('error');
        }
        dispatch(fetchCommentsByArticleId(article.id));
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
