import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';

interface ArticleEditPageProps {
    className?: string;
}

const ArticleEditPage = memo((props: ArticleEditPageProps) => {
    const {
        className,
    } = props;
    const mods = {};
    const { articleId } = useParams<{ articleId: string }>();
    const isEdit = Boolean(articleId);
    return (
        <Page className={classNames('', mods, [className])}>
            {isEdit ? `Edit - ${articleId}` : 'New'}
        </Page>
    );
});

export default ArticleEditPage;
