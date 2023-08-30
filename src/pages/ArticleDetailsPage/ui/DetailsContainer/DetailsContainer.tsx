import { memo } from 'react';
import { Card } from '@/shared/ui/redesigned/Card';
import { ArticleDetails } from '@/entities/Article';

interface DetailsContainerProps {
    className?: string;
    articleId: string;
}

export const DetailsContainer = memo((props: DetailsContainerProps) => {
    const { className, articleId } = props;
    return (
        <Card fullWidth className={className} padding="24" border="round">
            <ArticleDetails articleId={articleId} />
        </Card>
    );
});
