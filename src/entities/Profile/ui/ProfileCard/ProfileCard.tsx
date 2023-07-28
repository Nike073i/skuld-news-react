import { classNames } from 'shared/lib/classNames/classNames';
import { useSelector } from 'react-redux';
import { getProfileIsLoading }
    from 'entities/Profile/model/selectors/getProfileIsLoading/getProfileIsLoading';
import { getProfileError } from 'entities/Profile/model/selectors/getProfileError/getProfileError';
import { getProfileData } from 'entities/Profile/model/selectors/getProfileData/getProfileData';
import { useTranslation } from 'react-i18next';
import { Text } from 'shared/ui/Text/Text';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import cls from './ProfileCard.module.scss';

interface ProfileCardProps {
    className?: string;
}

export const ProfileCard = (props: ProfileCardProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('profile');
    const data = useSelector(getProfileData);
    const error = useSelector(getProfileError);
    const isLoading = useSelector(getProfileIsLoading);
    const mods = {};
    return (
        <div className={classNames(cls.profileCard, mods, [className])}>
            <div className={cls.title}>
                <Text title={t('ProfileTitle')} />
                <Button theme={ButtonTheme.OUTLINE} className={cls.editBtn}>
                    {t('EditProfile')}
                </Button>
            </div>
            <div className={cls.data}>
                <Input
                    value={data?.first}
                    placeholder={t('FirstName')}
                    className={cls.input}
                />
                <Input
                    value={data?.lastname}
                    placeholder={t('LastName')}
                    className={cls.input}
                />
            </div>
        </div>
    );
};
