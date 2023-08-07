import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ArticleList, ArticleView, ArticleViewSelector } from 'entities/Article';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader';
import { useInitialEffect } from 'shared/lib/hooks/useInitalEffect/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';
import cls from './ArticlePage.module.scss';
import { articlePageActions, articlePageReducer, getArticles } from '../../model/slices/articlePageSlice';
import { getArticlePageIsLoading } from '../../model/selectors/getArticlePageIsLoading/getArticlePageIsLoading';
import { getArticlePageError } from '../../model/selectors/getArticlePageError/getArticlePageError';
import { getArticlePageView } from '../../model/selectors/getArticlePageView/getArticlePageView';

interface ArticlePageProps {
    className?: string;
}

const reducers: ReducersList = {
    articlePageSchema: articlePageReducer,
};

const ArticlePage = memo((props: ArticlePageProps) => {
    const {
        className,
    } = props;
    const mods = {};
    const { t } = useTranslation('article');
    const dispatch = useAppDispatch();
    const articles = useSelector(getArticles.selectAll);
    const isLoading = useSelector(getArticlePageIsLoading);
    const error = useSelector(getArticlePageError);
    const view = useSelector(getArticlePageView);

    useInitialEffect(() => {
        dispatch(fetchArticlesList());
        dispatch(articlePageActions.initState());
    });

    const onChangeView = useCallback((newView: ArticleView) => {
        dispatch(articlePageActions.setView(newView));
    }, [dispatch]);
    return (
        <DynamicModuleLoader reducers={reducers}>
            <div className={classNames(cls.articlePage, mods, [className])}>
                <ArticleViewSelector view={view} onViewClick={onChangeView} />
                <ArticleList isLoading={isLoading} articles={articles} view={view} />
            </div>
        </DynamicModuleLoader>
    );
});

export default ArticlePage;
