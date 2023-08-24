import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { CommentList } from '@/entities/Comment';
import { AddCommentForm } from '@/features/addComment';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text, TextSize } from '@/shared/ui/Text';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitalEffect/useInitialEffect';
import { VStack } from '@/shared/ui/Stack';
import { getArticleComments } from '../../model/slice/articleDetailsCommentsSlice';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import { getArticleDetailsCommentsIsLoading } from '../../model/selectors/comments';
import { fetchArticleRecommendations } from '../../model/services/fetchArticleRecommendations/fetchArticleRecommendations';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';

interface ArticleDetailsCommentsProps {
    className?: string;
    articleId?: string;
}

export const ArticleDetailsComments = memo(
    (props: ArticleDetailsCommentsProps) => {
        const { className, articleId } = props;

        const dispatch = useAppDispatch();
        const { t } = useTranslation('article');
        const comments = useSelector(getArticleComments.selectAll);
        const commentsIsLoading = useSelector(
            getArticleDetailsCommentsIsLoading,
        );

        useInitialEffect(() => {
            dispatch(fetchCommentsByArticleId(articleId));
            dispatch(fetchArticleRecommendations());
        });

        const onSendComment = useCallback(
            (text: string) => {
                dispatch(addCommentForArticle(text));
            },
            [dispatch],
        );

        const mods = {};
        return (
            <VStack gap="16" max className={classNames('', mods, [className])}>
                <Text size={TextSize.L} title={t('Comments')} />
                <AddCommentForm onSendComment={onSendComment} />
                <CommentList
                    isLoading={commentsIsLoading}
                    comments={comments}
                />
            </VStack>
        );
    },
);
