import { ArticleDetailsCommentsSchema } from './articleDetailsCommentsSchema';
import { ArticleDetailsRecommendationsSchema } from './articleDetailsRecommendationsSchema';

export interface ArticleDetailsPageSchema {
    comments: ArticleDetailsCommentsSchema;
    recommendations: ArticleDetailsRecommendationsSchema;
}
