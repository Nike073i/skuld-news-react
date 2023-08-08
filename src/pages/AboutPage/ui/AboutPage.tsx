import { useTranslation } from 'react-i18next';
import { Page } from 'shared/ui/Page/Page';

function AboutPage() {
    const { t } = useTranslation('about');
    return (
        <Page>
            {t('AboutPage')}
        </Page>
    );
}

export default AboutPage;
