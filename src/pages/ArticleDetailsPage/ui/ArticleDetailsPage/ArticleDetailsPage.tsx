import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { ArticleDetails } from 'entities/Article';
import { useParams } from 'react-router-dom';
import cls from './ArticleDetailsPage.module.scss';

interface ArticleDetailsPageProps {
    className?: string;
}

const ArticleDetailsPage = memo((props: ArticleDetailsPageProps) => {
    const {
        className,
    } = props;
    const mods = {};
    const { t } = useTranslation('article');
    const { articleId } = useParams<{ articleId: string }>();

    if (!articleId) {
        return (
            <div className={classNames(cls.articleDetailsPage, mods, [className])}>
                {t('ArticleNotFound')}
            </div>
        );
    }
    return (
        <div className={classNames(cls.articleDetailsPage, mods, [className])}>
            <ArticleDetails articleId={articleId} />
        </div>
    );
});

export default ArticleDetailsPage;
