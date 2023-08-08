import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'shared/ui/Page/Page';
import cls from './NotFoundPage.module.scss';

interface NotFoundPageProps {
    className?: string;
}

function NotFoundPage(props: NotFoundPageProps) {
    const { className } = props;
    const { t } = useTranslation();
    return (
        <Page className={classNames(cls.notFoundPage, {}, [className])}>
            {t('NotFoundPage')}
        </Page>
    );
}

export default NotFoundPage;
