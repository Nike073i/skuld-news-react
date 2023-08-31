import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { CountrySelect } from '@/entities/Country';
import { CurrencySelect } from '@/entities/Currency';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Card } from '@/shared/ui/redesigned/Card';
import { Input } from '@/shared/ui/redesigned/Input';
import { VStack, HStack } from '@/shared/ui/redesigned/Stack';
import { ProfileCardProps } from '../ProfileCard';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { Text } from '@/shared/ui/redesigned/Text';

export const ProfileCardRedesignedSkeleton = () => (
    <Card padding="24" fullWidth border="partial">
        <VStack gap="32">
            <HStack max justify="center">
                <Skeleton border="100%" width={128} height={128} />
            </HStack>
            <HStack gap="32" max>
                <VStack gap="16" max>
                    <Skeleton width="100%" height={38} />
                    <Skeleton width="100%" height={38} />
                    <Skeleton width="100%" height={38} />
                    <Skeleton width="100%" height={38} />
                </VStack>
                <VStack gap="16" max>
                    <Skeleton width="100%" height={38} />
                    <Skeleton width="100%" height={38} />
                    <Skeleton width="100%" height={38} />
                    <Skeleton width="100%" height={38} />
                </VStack>
            </HStack>
        </VStack>
    </Card>
);

export const ProfileCardRedesignedError = () => {
    const { t } = useTranslation('profile');
    return (
        <HStack justify="center" max>
            <Text
                variant="error"
                title={t('ErrorLoadProfile')}
                text={t('ErrorFixReload')}
                align="center"
            />
        </HStack>
    );
};

export const ProfileCardRedesigned = memo((props: ProfileCardProps) => {
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
    return (
        <Card fullWidth padding="24" className={className} border="partial">
            <VStack max gap="24">
                {data?.avatar && (
                    <HStack justify="center" max>
                        <Avatar size={120} src={data.avatar} />
                    </HStack>
                )}
                <HStack max gap="24">
                    <VStack gap="16" max>
                        <Input
                            value={data?.first}
                            label={t('FirstName')}
                            onChange={onChangeFirstname}
                            readOnly={readOnly}
                            data-testid="ProfileCard.FirstName"
                        />
                        <Input
                            value={data?.lastname}
                            label={t('LastName')}
                            onChange={onChangeLastname}
                            readOnly={readOnly}
                            data-testid="ProfileCard.LastName"
                        />
                        <Input
                            value={data?.age}
                            label={t('Age')}
                            onChange={onChangeAge}
                            readOnly={readOnly}
                        />
                        <Input
                            value={data?.city}
                            label={t('City')}
                            onChange={onChangeCity}
                            readOnly={readOnly}
                        />
                    </VStack>
                    <VStack gap="16" max>
                        <Input
                            value={data?.username}
                            label={t('Username')}
                            onChange={onChangeUsername}
                            readOnly={readOnly}
                        />
                        <Input
                            value={data?.avatar}
                            label={t('Avatar')}
                            onChange={onChangeAvatar}
                            readOnly={readOnly}
                        />
                        <CurrencySelect
                            value={data?.currency}
                            onChange={onChangeCurrency}
                            readOnly={readOnly}
                        />
                        <CountrySelect
                            value={data?.country}
                            onChange={onChangeCountry}
                            readOnly={readOnly}
                        />
                    </VStack>
                </HStack>
            </VStack>
        </Card>
    );
});
