import { useTranslation } from 'react-i18next'
import cls from './LangSwitcher.module.scss'
import { Button, ThemeButton } from 'shared/ui/Button';
import { classNames } from 'shared/lib/classNames/classNames';

interface LangSwitcherProps {
    className?: string
}

export function LangSwitcher({ className }: LangSwitcherProps) {
    const [t, i18n] = useTranslation();

    function toggle() {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru')
    }

    return (
        <Button className={classNames(cls.langSwitcher, {}, [className])}
            theme={ThemeButton.CLEAR}
            onClick={toggle}>
            {t("Language")}
        </Button>
    )
}
