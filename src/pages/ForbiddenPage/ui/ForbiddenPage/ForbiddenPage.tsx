import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Page } from 'widgets/Page';
import { Text, TextTheme } from 'shared/ui/Text/Text';

interface ForbiddenPageProps {
    className?: string;
}

const ForbiddenPage = memo((props: ForbiddenPageProps) => {
    const { className } = props;
    const { t } = useTranslation();

    return (
        <Page className={classNames('', {}, [className])}>
            <Text theme={TextTheme.ERROR} title={t('PageAccessDenied')} />
        </Page>
    );
});

export default ForbiddenPage;
