import { useParams } from 'react-router-dom';
import { VStack } from '@/shared/ui/Stack';
import { EditableProfileCard } from '@/features/editableProfileCard';
import { Page } from '@/widgets/Page';

function ProfilePage() {
    const { profileId } = useParams<{ profileId: string }>();

    return (
        <Page>
            <VStack gap="16" max>
                <EditableProfileCard profileId={profileId} />
            </VStack>
        </Page>
    );
}

export default ProfilePage;
