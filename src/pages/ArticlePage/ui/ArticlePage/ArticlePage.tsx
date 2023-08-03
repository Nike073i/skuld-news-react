import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './ArticlePage.module.scss';

interface ArticlePageProps {
    className?: string;
}

const ArticlePage = memo((props: ArticlePageProps) => {
    const {
        className,
    } = props;
    const mods = {};
    const { t } = useTranslation('article');
    return (
        <div className={classNames(cls.articlePage, mods, [className])}>
            *
        </div>
    );
});

export default ArticlePage;
