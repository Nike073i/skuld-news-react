import { HTMLAttributeAnchorTarget, memo } from 'react';
import { ArticleView } from '../../model/consts/consts';
import { Article } from '../../model/types/article';
import { ToggleFeatures } from '@/shared/lib/features';
import { ArticleListItemDeprecated } from './ArticleListItedDeprecated/ArticleListItemDeprecated';
import { ArticleListItemRedesigned } from './ArticleListItemRedesigned/ArticleListItemRedesigned';

export interface ArticleListItemProps {
    className?: string;
    article: Article;
    view: ArticleView;
    target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem = memo((props: ArticleListItemProps) => (
    <ToggleFeatures
        feature="isAppRedesigned"
        off={<ArticleListItemDeprecated {...props} />}
        on={<ArticleListItemRedesigned {...props} />}
    />
));
