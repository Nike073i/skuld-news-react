import { memo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader';
import { useInitialEffect } from '@/shared/lib/hooks/useInitalEffect/useInitialEffect';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Page } from '@/widgets/Page';
import cls from './ArticlePage.module.scss';
import { articlePageReducer } from '../../model/slices/articlePageSlice';
import { fetchNextArticlesList } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';
import { ArticlePageFilters } from '../ArticlePageFilters/ArticlePageFilters';
import { ArticleInfinityList } from '../ArticleInfinityList/ArticleInfinityList';

interface ArticlePageProps {
    className?: string;
}

const reducers: ReducersList = {
    articlePageSchema: articlePageReducer,
};

const ArticlePage = memo((props: ArticlePageProps) => {
    const { className } = props;
    const mods = {};

    const [searchParams] = useSearchParams();
    const dispatch = useAppDispatch();
    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextArticlesList());
    }, [dispatch]);

    useInitialEffect(() => {
        dispatch(initArticlesPage(searchParams));
    });

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <Page
                data-testid="ArticlePage"
                onScrollEnd={onLoadNextPart}
                className={classNames(cls.articlePage, mods, [className])}
            >
                <ArticlePageFilters />
                <ArticleInfinityList className={cls.list} />
            </Page>
        </DynamicModuleLoader>
    );
});

export default ArticlePage;
