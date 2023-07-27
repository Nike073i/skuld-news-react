import { profileReducer } from 'entities/Profile';
import { useTranslation } from 'react-i18next';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader';

const reducers: ReducersList = {
    profileSchema: profileReducer,
};

function ProfilePage() {
    const { t } = useTranslation('main');
    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <div>
                {t('ProfilePage')}
            </div>
        </DynamicModuleLoader>
    );
}

export default ProfilePage;
