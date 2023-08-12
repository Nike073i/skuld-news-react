import {
    ProfileCard, fetchProfileData, profileReducer,
    getProfileIsLoading, getProfileError, getProfileForm, getProfileReadonly, getProfileValidationErrors,
    profileActions, ValidationProfileError,
}
    from 'entities/Profile';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import { useTranslation } from 'react-i18next';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { useParams } from 'react-router-dom';
import { useInitialEffect } from 'shared/lib/hooks/useInitalEffect/useInitialEffect';
import { Page } from 'widgets/Page';
import { VStack } from 'shared/ui/Stack';
import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader';

const reducers: ReducersList = {
    profileSchema: profileReducer,
};

function ProfilePage() {
    const dispatch = useAppDispatch();
    const form = useSelector(getProfileForm);
    const error = useSelector(getProfileError);
    const isLoading = useSelector(getProfileIsLoading);
    const readonly = useSelector(getProfileReadonly);
    const { t } = useTranslation('profile');
    const validationErrors = useSelector(getProfileValidationErrors);

    const validationErrorTranslates: Record<ValidationProfileError, string> = {
        [ValidationProfileError.INCORRECT_AGE]: t('IncorrectAge'),
        [ValidationProfileError.INCORRECT_USER_DATA]: t('IncorrectUserData'),
        [ValidationProfileError.INCORRECT_COUNTRY]: t('IncorrectCountry'),
        [ValidationProfileError.NO_DATA]: t('NoData'),
        [ValidationProfileError.SERVER_ERROR]: t('ServerError'),
    };
    const { profileId } = useParams<{ profileId: string }>();
    useInitialEffect(() => {
        dispatch(fetchProfileData(profileId));
    });
    const onChangeFirstname = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ first: value || '' }));
    }, [dispatch]);
    const onChangeLastname = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ lastname: value || '' }));
    }, [dispatch]);
    const onChangeAge = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ age: Number(value || 0) }));
    }, [dispatch]);
    const onChangeCity = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ city: value || '' }));
    }, [dispatch]);
    const onChangeAvatar = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ avatar: value || '' }));
    }, [dispatch]);
    const onChangeUsername = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ username: value || '' }));
    }, [dispatch]);
    const onChangeCurrency = useCallback((currency: Currency) => {
        dispatch(profileActions.updateProfile({ currency }));
    }, [dispatch]);
    const onChangeCountry = useCallback((country: Country) => {
        dispatch(profileActions.updateProfile({ country }));
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <Page>
                <VStack gap="16" max>
                    <ProfilePageHeader />
                    {validationErrors?.length && validationErrors.map(
                        (err) => (
                            <Text
                                key={err}
                                theme={TextTheme.ERROR}
                                text={validationErrorTranslates[err]}
                            />
                        ),
                    )}
                    <ProfileCard
                        data={form}
                        error={error}
                        isLoading={isLoading}
                        onChangeFirstname={onChangeFirstname}
                        onChangeLastname={onChangeLastname}
                        onChangeAge={onChangeAge}
                        onChangeCity={onChangeCity}
                        onChangeAvatar={onChangeAvatar}
                        onChangeUsername={onChangeUsername}
                        onChangeCurrency={onChangeCurrency}
                        onChangeCountry={onChangeCountry}
                        readOnly={readonly}
                    />
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
}

export default ProfilePage;
