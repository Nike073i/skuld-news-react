import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { getArticleDetailsData } from '@/entities/Article';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { getCanEditArticle } from '../../model/selectors/getCanEditArticle/getCanEditArticle';
import { getRouteArticleEdit, getRouteArticles } from '@/shared/consts/router';

interface ArticelDetailsPageHeaderProps {
    className?: string;
}

export const ArticelDetailsPageHeader = memo(
    (props: ArticelDetailsPageHeaderProps) => {
        const { className } = props;
        const mods = {};
        const { t } = useTranslation('article');
        const navigate = useNavigate();
        const canEditArticle = useSelector(getCanEditArticle);
        const article = useSelector(getArticleDetailsData);
        const onBackToList = useCallback(() => {
            navigate(getRouteArticles());
        }, [navigate]);
        const onEditArticle = useCallback(() => {
            if (article) {
                navigate(getRouteArticleEdit(article.id));
            }
        }, [article, navigate]);
        return (
            <HStack
                max
                justify="between"
                className={classNames('', mods, [className])}
            >
                <Button theme={ButtonTheme.OUTLINE} onClick={onBackToList}>
                    {t('BackToList')}
                </Button>
                {canEditArticle && (
                    <Button theme={ButtonTheme.OUTLINE} onClick={onEditArticle}>
                        {t('Edit')}
                    </Button>
                )}
            </HStack>
        );
    },
);
