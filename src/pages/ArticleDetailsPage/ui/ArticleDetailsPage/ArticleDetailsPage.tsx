import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { ArticleDetails } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader';
import { Page } from '@/widgets/Page';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { ArticleRecommendationsList } from '@/features/articleRecommendationsList';
import cls from './ArticleDetailsPage.module.scss';
import { articleDetailsPageReducer } from '../../model/slice';
import { ArticelDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticelDetailsPageHeader';
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';
import { ArticleRating } from '@/features/articleRating';
import { ToggleFeatures } from '@/shared/lib/features';
import { Card } from '@/shared/ui/deprecated/Card';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { DetailsContainer } from '../DetailsContainer/DetailsContainer';
import { AdditionalInfoContainer } from '../AdditionalInfoContainer/AdditionalInfoContainer';

interface ArticleDetailsPageProps {
    className?: string;
}

const reducers: ReducersList = {
    articleDetailsPageSchema: articleDetailsPageReducer,
};

const ArticleDetailsPage = memo((props: ArticleDetailsPageProps) => {
    const { className } = props;
    const mods = {};
    const { articleId } = useParams<{ articleId: string }>();

    if (!articleId) {
        return null;
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <ToggleFeatures
                feature="isAppRedesigned"
                off={
                    <Page
                        className={classNames(cls.articleDetailsPage, mods, [
                            className,
                        ])}
                    >
                        <VStack gap="16" max>
                            <ArticelDetailsPageHeader />
                            <ArticleDetails articleId={articleId} />
                            <ToggleFeatures
                                feature="isArticleRatingEnabled"
                                on={<ArticleRating articleId={articleId} />}
                                off={<Card>*****</Card>}
                            />
                            <ArticleRecommendationsList />
                            <ArticleDetailsComments articleId={articleId} />
                        </VStack>
                    </Page>
                }
                on={
                    <StickyContentLayout
                        content={
                            <Page
                                className={classNames(
                                    cls.articleDetailsPage,
                                    mods,
                                    [className],
                                )}
                            >
                                <VStack gap="16" max>
                                    <DetailsContainer articleId={articleId} />
                                    <ArticleRating articleId={articleId} />
                                    <ArticleRecommendationsList />
                                    <ArticleDetailsComments
                                        articleId={articleId}
                                    />
                                </VStack>
                            </Page>
                        }
                        right={<AdditionalInfoContainer />}
                    />
                }
            />
        </DynamicModuleLoader>
    );
});

export default ArticleDetailsPage;
