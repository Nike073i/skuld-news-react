import { StateSchema } from 'app/providers/StoreProvider';

export const getArticlePageView = (state: StateSchema) => state
    .articlePageSchema?.view;
