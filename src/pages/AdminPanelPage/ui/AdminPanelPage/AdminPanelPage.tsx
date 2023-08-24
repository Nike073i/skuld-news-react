import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';

interface AdminPanelPageProps {
    className?: string;
}

const AdminPanelPage = memo((props: AdminPanelPageProps) => {
    const { className } = props;

    return (
        <Page
            data-testid="AdminPanelPage"
            className={classNames('', {}, [className])}
            // eslint-disable-next-line i18next/no-literal-string
        >
            ADMIN_PAGE
        </Page>
    );
});

export default AdminPanelPage;
