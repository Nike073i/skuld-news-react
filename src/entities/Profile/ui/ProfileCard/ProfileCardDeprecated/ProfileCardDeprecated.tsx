import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ProfileCardDeprecated.module.scss';
import { ProfileCardProps } from '../ProfileCard';
import { CountrySelect } from '@/entities/Country';
import { CurrencySelect } from '@/entities/Currency';
import { VStack, HStack } from '@/shared/ui/redesigned/Stack';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { Input } from '@/shared/ui/deprecated/Input';
import { Loader } from '@/shared/ui/deprecated/Loader';
import { Text, TextAlign, TextTheme } from '@/shared/ui/deprecated/Text';

export const ProfileCardDeprecatedSkeleton = () => (
    <HStack
        justify="center"
        max
        className={classNames(cls.profileCard, {}, [cls.loading])}
    >
        <Loader />
    </HStack>
);

export const ProfileCardDeprecatedError = () => {
    const { t } = useTranslation('profile');
    return (
        <HStack
            justify="center"
            max
            className={classNames(cls.profileCard, {}, [cls.error])}
        >
            <Text
                theme={TextTheme.ERROR}
                title={t('ErrorLoadProfile')}
                text={t('ErrorFixReload')}
                align={TextAlign.CENTER}
            />
        </HStack>
    );
};

export const ProfileCardDeprecated = memo((props: ProfileCardProps) => {
    const {
        className,
        data,
        error,
        isLoading,
        readOnly,
        onChangeFirstname,
        onChangeLastname,
        onChangeAge,
        onChangeCity,
        onChangeAvatar,
        onChangeUsername,
        onChangeCurrency,
        onChangeCountry,
    } = props;
    const { t } = useTranslation('profile');
    const mods = {
        [cls.editing]: !readOnly,
    };
    return (
        <VStack
            gap="16"
            max
            className={classNames(cls.profileCard, mods, [className])}
        >
            {data?.avatar && (
                <HStack justify="center" max>
                    <Avatar src={data.avatar} />
                </HStack>
            )}
            <Input
                value={data?.first}
                placeholder={t('FirstName')}
                className={cls.input}
                onChange={onChangeFirstname}
                readOnly={readOnly}
                data-testid="ProfileCard.FirstName"
            />
            <Input
                value={data?.lastname}
                placeholder={t('LastName')}
                className={cls.input}
                onChange={onChangeLastname}
                readOnly={readOnly}
                data-testid="ProfileCard.LastName"
            />
            <Input
                value={data?.age}
                placeholder={t('Age')}
                className={cls.input}
                onChange={onChangeAge}
                readOnly={readOnly}
            />
            <Input
                value={data?.city}
                placeholder={t('City')}
                className={cls.input}
                onChange={onChangeCity}
                readOnly={readOnly}
            />
            <Input
                value={data?.username}
                placeholder={t('Username')}
                className={cls.input}
                onChange={onChangeUsername}
                readOnly={readOnly}
            />
            <Input
                value={data?.avatar}
                placeholder={t('Avatar')}
                className={cls.input}
                onChange={onChangeAvatar}
                readOnly={readOnly}
            />
            <CurrencySelect
                value={data?.currency}
                onChange={onChangeCurrency}
                className={cls.input}
                readOnly={readOnly}
            />
            <CountrySelect
                value={data?.country}
                onChange={onChangeCountry}
                className={cls.input}
                readOnly={readOnly}
            />
        </VStack>
    );
});
