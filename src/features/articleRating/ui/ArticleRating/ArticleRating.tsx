import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RatingCard } from '@/entities/Rating';
import {
    useGetArticleRating,
    useRateArticle,
} from '../../api/articleRatingApi';
import { getUserAuthData } from '@/entities/User';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';

export interface ArticleRatingProps {
    className?: string;
    articleId: string;
}

const ArticleRating = memo((props: ArticleRatingProps) => {
    const { className, articleId } = props;
    const { t } = useTranslation('article');
    const authData = useSelector(getUserAuthData);

    const { data, isLoading, isError } = useGetArticleRating({
        articleId,
        userId: authData?.id ?? '',
    });
    const [rateArticleMutation] = useRateArticle();

    const handleRateArticle = useCallback(
        (rate: number, feedback?: string) => {
            try {
                rateArticleMutation({
                    articleId,
                    userId: authData?.id ?? '',
                    rate,
                    feedback,
                });
            } catch (e) {
                console.log(e);
            }
        },
        [articleId, authData?.id, rateArticleMutation],
    );

    const onAccept = useCallback(
        (starsCount: number, feedback?: string) => {
            handleRateArticle(starsCount, feedback);
        },
        [handleRateArticle],
    );

    const onCancel = useCallback(
        (starsCount: number) => {
            handleRateArticle(starsCount);
        },
        [handleRateArticle],
    );

    if (isLoading) {
        return <Skeleton width="100%" height={120} />;
    }
    const rating = data?.[0];

    return (
        <RatingCard
            onAccept={onAccept}
            onCancel={onCancel}
            rate={rating?.rate}
            className={className}
            title={t('RateTheArticle')}
            feedbackTitle={t('RateFeedback')}
            hasFeedback
        />
    );
});

export default ArticleRating;
