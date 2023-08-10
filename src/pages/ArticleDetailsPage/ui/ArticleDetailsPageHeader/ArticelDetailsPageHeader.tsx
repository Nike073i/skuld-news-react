import { memo, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'app/providers/router';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getArticleDetailsData } from 'entities/Article';
import cls from './ArticelDetailsPageHeader.module.scss';
import { getCanEditArticle } from '../../model/selectors/getCanEditArticle/getCanEditArticle';

interface ArticelDetailsPageHeaderProps {
    className?: string;
}

export const ArticelDetailsPageHeader = memo((props: ArticelDetailsPageHeaderProps) => {
    const {
        className,
    } = props;
    const mods = {};
    const { t } = useTranslation('article');
    const navigate = useNavigate();
    const canEditArticle = useSelector(getCanEditArticle);
    const article = useSelector(getArticleDetailsData);
    const onBackToList = useCallback(() => {
        navigate(RoutePath.articles);
    }, [navigate]);
    const onEditArticle = useCallback(() => {
        navigate(`${RoutePath.article}${article?.id}/edit`);
    }, [article?.id, navigate]);
    return (
        <div className={classNames(cls.articelDetailsPageHeader, mods, [className])}>
            <Button theme={ButtonTheme.OUTLINE} onClick={onBackToList}>{t('BackToList')}</Button>
            {canEditArticle && (
                <Button
                    className={cls.editBtn}
                    theme={ButtonTheme.OUTLINE}
                    onClick={onEditArticle}
                >
                    {t('Edit')}
                </Button>
            )}
        </div>
    );
});
