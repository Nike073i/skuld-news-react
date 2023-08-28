import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import {
    Button as ButtonDeprecated,
    ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { Button } from '@/shared/ui/redesigned/Button';

interface LangSwitcherProps {
    className?: string;
    short?: boolean;
}

export const LangSwitcher = memo((props: LangSwitcherProps) => {
    const { className, short } = props;
    const [t, i18n] = useTranslation();
    const toggle = () => {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
    };

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <Button
                    className={classNames('', {}, [className])}
                    variant="clear"
                    onClick={toggle}
                >
                    {t(short ? 'AbrLanguage' : 'Language')}
                </Button>
            }
            off={
                <ButtonDeprecated
                    className={classNames('', {}, [className])}
                    theme={ButtonTheme.CLEAR}
                    onClick={toggle}
                >
                    {t(short ? 'AbrLanguage' : 'Language')}
                </ButtonDeprecated>
            }
        />
    );
});
