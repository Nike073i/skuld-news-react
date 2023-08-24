import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticlePageLimit = (state: StateSchema) =>
    state.articlePageSchema?.limit || 9;
