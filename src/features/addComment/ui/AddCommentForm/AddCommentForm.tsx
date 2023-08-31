import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import {
    Button as ButtonDeprecated,
    ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader';
import { HStack } from '@/shared/ui/redesigned/Stack';
import cls from './AddCommentForm.module.scss';
import { getAddCommentText } from '../../model/selectors/getAddCommentText/getAddCommentText';
import {
    addCommentActions,
    addCommentReducer,
} from '../../model/slice/addCommentSlice';
import { ToggleFeatures } from '@/shared/lib/features';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';

interface AddCommentFormProps {
    className?: string;
    onSendComment: (text: string) => void;
}
const reducers: ReducersList = {
    addCommentSchema: addCommentReducer,
};

const AddCommentForm = memo((props: AddCommentFormProps) => {
    const { className, onSendComment } = props;
    const { t } = useTranslation('comment');
    const text = useSelector(getAddCommentText);
    const dispatch = useAppDispatch();

    const onChangeText = useCallback(
        (value: string) => {
            dispatch(addCommentActions.setText(value));
        },
        [dispatch],
    );

    const onSendHandler = useCallback(() => {
        onSendComment(text || '');
        dispatch(addCommentActions.clearText);
    }, [dispatch, onSendComment, text]);

    const mods = {};
    return (
        <DynamicModuleLoader reducers={reducers}>
            <ToggleFeatures
                feature="isAppRedesigned"
                off={
                    <HStack
                        data-testid="AddCommentForm"
                        justify="between"
                        max
                        className={classNames(cls.addCommentForm, mods, [
                            className,
                        ])}
                    >
                        <InputDeprecated
                            data-testid="AddCommentForm.Input"
                            className={cls.input}
                            placeholder={t('EnterCommentText')}
                            value={text}
                            onChange={onChangeText}
                        />
                        <ButtonDeprecated
                            data-testid="AddCommentForm.Button"
                            theme={ButtonTheme.OUTLINE}
                            onClick={onSendHandler}
                        >
                            {t('SendComment')}
                        </ButtonDeprecated>
                    </HStack>
                }
                on={
                    <Card padding="24" border="round" fullWidth>
                        <HStack
                            data-testid="AddCommentForm"
                            justify="between"
                            max
                            gap="16"
                            className={className}
                        >
                            <Input
                                data-testid="AddCommentForm.Input"
                                className={cls.input}
                                placeholder={t('EnterCommentText')}
                                value={text}
                                onChange={onChangeText}
                            />
                            <Button
                                data-testid="AddCommentForm.Button"
                                variant="outline"
                                onClick={onSendHandler}
                            >
                                {t('SendComment')}
                            </Button>
                        </HStack>
                    </Card>
                }
            />
        </DynamicModuleLoader>
    );
});

export default AddCommentForm;
