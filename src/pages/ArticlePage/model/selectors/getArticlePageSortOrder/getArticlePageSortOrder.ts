import { StateSchema } from 'app/providers/StoreProvider';

export const getArticlePageSortOrder = (state: StateSchema) => state
    .articlePageSchema?.order ?? 'asc';
