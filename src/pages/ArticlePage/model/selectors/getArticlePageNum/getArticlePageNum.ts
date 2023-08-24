import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticlePageNum = (state: StateSchema) =>
    state.articlePageSchema?.page || 1;
