import { EntityState } from '@reduxjs/toolkit';
import { Article, ArticleView } from 'entities/Article';

export interface ArticlePageSchema extends EntityState<Article> {
    isLoading?: boolean;
    error?: string;
    view: ArticleView;

    // pagination
    limit?: number;
    page: number;
    hasMore: boolean;

    _inited: boolean;
}
