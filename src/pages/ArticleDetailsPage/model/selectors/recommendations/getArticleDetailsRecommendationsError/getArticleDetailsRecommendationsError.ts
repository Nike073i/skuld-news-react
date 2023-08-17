import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticleDetailsRecommendationsError = (state: StateSchema) => state
    .articleDetailsPageSchema?.recommendations?.error;
