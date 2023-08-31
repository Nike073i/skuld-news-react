import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/shared/ui/redesigned/Card';
import { ArticleAdditionalInfo } from '@/widgets/ArticleAdditionalInfo';
import { getArticleDetailsData } from '@/entities/Article';
import cls from './AdditionalInfoContainer.module.scss';
import { getRouteArticleEdit } from '@/shared/consts/router';

export const AdditionalInfoContainer = memo(() => {
    const article = useSelector(getArticleDetailsData);
    const navigate = useNavigate();
    const onEditArticle = useCallback(() => {
        if (article) {
            navigate(getRouteArticleEdit(article.id));
        }
    }, [article, navigate]);
    if (!article) {
        return null;
    }
    const { user, createdAt, views } = article;
    return (
        <Card padding="24" border="partial" className={cls.card}>
            <ArticleAdditionalInfo
                onEdit={onEditArticle}
                author={user}
                createdAt={createdAt}
                views={views}
            />
        </Card>
    );
});
