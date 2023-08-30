import { useTranslation } from 'react-i18next';
import { memo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { getFeatureFlags, updateFeatureFlag } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUserAuthData } from '@/entities/User';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

interface UiDesignSwitcherProps {
    className?: string;
}

export const UiDesignSwitcher = memo((props: UiDesignSwitcherProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const isAppRedesigned = getFeatureFlags('isAppRedesigned');
    const [isLoading, setIsLoading] = useState(false);
    const items = [
        {
            content: t('NewDesign'),
            value: 'new',
        },
        {
            content: t('OldDesign'),
            value: 'old',
        },
    ];
    const authData = useSelector(getUserAuthData);
    const onChange = useCallback(
        async (value: string) => {
            if (authData) {
                setIsLoading(true);
                await dispatch(
                    updateFeatureFlag({
                        newFeatures: {
                            isAppRedesigned: value === 'new',
                        },
                        userId: authData.id,
                    }),
                ).unwrap();
                setIsLoading(false);
            }
        },
        [authData, dispatch],
    );
    return (
        <HStack>
            <Text text={t('Design')} />
            {isLoading ? (
                <Skeleton width={100} height={40} />
            ) : (
                <ListBox
                    onChange={onChange}
                    items={items}
                    value={isAppRedesigned ? items[0].value : items[1].value}
                    className={className}
                />
            )}
        </HStack>
    );
});
