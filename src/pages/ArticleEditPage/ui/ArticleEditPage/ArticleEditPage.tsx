import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page';
import { useParams } from 'react-router-dom';

interface ArticleEditPageProps {
    className?: string;
}

const ArticleEditPage = memo((props: ArticleEditPageProps) => {
    const {
        className,
    } = props;
    const mods = {};
    const { id } = useParams<{ id: string }>();
    const isEdit = Boolean(id);
    return (
        <Page className={classNames('', mods, [className])}>
            {isEdit ? `Edit - ${id}` : 'New'}
        </Page>
    );
});

export default ArticleEditPage;
