import { StateSchema } from '@/app/providers/StoreProvider';
import { ArticleSortField } from '@/entities/Article';

export const getArticlePageSortField = (state: StateSchema) => state
    .articlePageSchema?.sort ?? ArticleSortField.CREATED;
