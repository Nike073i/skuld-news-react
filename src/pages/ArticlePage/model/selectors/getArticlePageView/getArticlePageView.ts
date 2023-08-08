import { StateSchema } from 'app/providers/StoreProvider';
import { ArticleView } from 'entities/Article';

export const getArticlePageView = (state: StateSchema) => state
    .articlePageSchema?.view || ArticleView.TILE;
