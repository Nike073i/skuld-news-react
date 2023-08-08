import { useTranslation } from 'react-i18next';
import { Page } from 'widgets/Page';

function MainPage() {
    const { t } = useTranslation('main');
    return (
        <Page>
            {t('MainPage')}
        </Page>
    );
}

export default MainPage;
