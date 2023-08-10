import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { ArticleDetails, ArticleList, ArticleView } from 'entities/Article';
import { useNavigate, useParams } from 'react-router-dom';
import { CommentList } from 'entities/Comment';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitalEffect/useInitialEffect';
import { AddCommentForm } from 'features/addComment';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { RoutePath } from 'app/providers/router';
import { Page } from 'widgets/Page';
import {
    fetchCommentsByArticleId,
} from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import cls from './ArticleDetailsPage.module.scss';
import { getArticleComments } from '../../model/slice/articleDetailsCommentsSlice';
import {
    getArticleDetailsCommentsIsLoading,
} from '../../model/selectors/comments';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import { getArticleRecommendations } from '../../model/slice/articleDetailsRecommendationsSlice';
import {
    getArticleDetailsRecommendationsIsLoading,
} from '../../model/selectors/recommendations';
import {
    fetchArticleRecommendations,
} from '../../model/services/fetchArticleRecommendations/fetchArticleRecommendations';
import { articleDetailsPageReducer } from '../../model/slice';
import { ArticelDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticelDetailsPageHeader';

interface ArticleDetailsPageProps {
    className?: string;
}

const reducers: ReducersList = {
    articleDetailsPageSchema: articleDetailsPageReducer,
};

const ArticleDetailsPage = memo((props: ArticleDetailsPageProps) => {
    const {
        className,
    } = props;
    const mods = {};
    const { t } = useTranslation('article');
    const comments = useSelector(getArticleComments.selectAll);
    const commentsIsLoading = useSelector(getArticleDetailsCommentsIsLoading);
    const recommendations = useSelector(getArticleRecommendations.selectAll);
    const recommendationsIsLoading = useSelector(getArticleDetailsRecommendationsIsLoading);
    const { articleId } = useParams<{ articleId: string }>();
    const dispatch = useAppDispatch();

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(articleId));
        dispatch(fetchArticleRecommendations());
    });

    const onSendComment = useCallback((text: string) => {
        dispatch(addCommentForArticle(text));
    }, [dispatch]);

    if (!articleId) {
        return (
            <Page className={classNames(cls.articleDetailsPage, mods, [className])}>
                {t('ArticleNotFound')}
            </Page>
        );
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <Page className={classNames(cls.articleDetailsPage, mods, [className])}>
                <ArticelDetailsPageHeader />
                <ArticleDetails articleId={articleId} />
                <Text
                    size={TextSize.L}
                    className={cls.recommendationsTitle}
                    title={t('Recommendations')}
                />
                <ArticleList
                    view={ArticleView.TILE}
                    articles={recommendations}
                    isLoading={recommendationsIsLoading}
                    target="_blank"
                />
                <Text
                    size={TextSize.L}
                    className={cls.commentTitle}
                    title={t('Comments')}
                />
                <AddCommentForm onSendComment={onSendComment} />
                <CommentList isLoading={commentsIsLoading} comments={comments} />
            </Page>
        </DynamicModuleLoader>
    );
});

export default ArticleDetailsPage;
