import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { ArticleDetails } from 'entities/Article';
import { useParams } from 'react-router-dom';
import { CommentList } from 'entities/Comment';
import { Text } from 'shared/ui/Text/Text';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader';
import { useSelector } from 'react-redux';
import {
    fetchCommentsByArticleId,
} from 'pages/ArticleDetailsPage/model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitalEffect/useInitialEffect';
import cls from './ArticleDetailsPage.module.scss';
import { articleDetailsCommentsReducer, getArticleComments } from '../../model/slice/articleDetailsCommentsSlice';
import {
    getArticleDetailsCommentsIsLoading,
}
    from '../../model/selectors/comments/getArticleDetailsCommentsIsLoading/getArticleDetailsCommentsIsLoading';
import {
    getArticleDetailsCommentsError,
}
    from '../../model/selectors/comments/getArticleDetailsCommentsError/getArticleDetailsCommentsError';

interface ArticleDetailsPageProps {
    className?: string;
}

const reducers: ReducersList = {
    articleDetailsCommentsSchema: articleDetailsCommentsReducer,
};

const ArticleDetailsPage = memo((props: ArticleDetailsPageProps) => {
    const {
        className,
    } = props;
    const mods = {};
    const { t } = useTranslation('article');
    const comments = useSelector(getArticleComments.selectAll);
    const commentsIsLoading = useSelector(getArticleDetailsCommentsIsLoading);
    const commentsError = useSelector(getArticleDetailsCommentsError);
    const { articleId } = useParams<{ articleId: string }>();
    const dispatch = useAppDispatch();
    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(articleId));
    });

    if (!articleId) {
        return (
            <div className={classNames(cls.articleDetailsPage, mods, [className])}>
                {t('ArticleNotFound')}
            </div>
        );
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <div className={classNames(cls.articleDetailsPage, mods, [className])}>
                <ArticleDetails articleId={articleId} />
                <Text className={cls.commentTitle} title={t('Comments')} />
                <CommentList
                    isLoading={commentsIsLoading}
                    comments={comments}
                />
            </div>
        </DynamicModuleLoader>
    );
});

export default ArticleDetailsPage;
