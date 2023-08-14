import { VStack } from 'shared/ui/Stack';
import { EditableProfileCard } from 'features/editableProfileCard';
import { useParams } from 'react-router-dom';
import { Page } from 'widgets/Page';
import { Text } from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';

function ProfilePage() {
    const { profileId } = useParams<{ profileId: string }>();
    const { t } = useTranslation('profile');
    if (!profileId) {
        return <Text text={t('ProfileNotFound')} />;
    }

    return (
        <Page>
            <VStack gap="16" max>
                <EditableProfileCard profileId={profileId} />
            </VStack>
        </Page>
    );
}

export default ProfilePage;
