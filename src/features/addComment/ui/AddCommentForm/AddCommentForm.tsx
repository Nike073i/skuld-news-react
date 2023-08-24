import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Input } from '@/shared/ui/Input';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader';
import { HStack } from '@/shared/ui/Stack';
import cls from './AddCommentForm.module.scss';
import { getAddCommentText } from '../../model/selectors/getAddCommentText/getAddCommentText';
import {
    addCommentActions,
    addCommentReducer,
} from '../../model/slice/addCommentSlice';

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
            <HStack
                data-testid="AddCommentForm"
                justify="between"
                max
                className={classNames(cls.addCommentForm, mods, [className])}
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
                    theme={ButtonTheme.OUTLINE}
                    onClick={onSendHandler}
                >
                    {t('SendComment')}
                </Button>
            </HStack>
        </DynamicModuleLoader>
    );
});

export default AddCommentForm;
