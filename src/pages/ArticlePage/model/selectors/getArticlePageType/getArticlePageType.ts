import { StateSchema } from 'app/providers/StoreProvider';
import { ArticleType } from 'entities/Article';

export const getArticlePageType = (state: StateSchema) => state
    .articlePageSchema?.type ?? ArticleType.ALL;
