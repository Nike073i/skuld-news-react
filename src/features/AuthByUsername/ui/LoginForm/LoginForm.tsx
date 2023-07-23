import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import cls from './LoginForm.module.scss';

interface LoginFormProps {
    className?: string;
}

export const LoginForm = (props: LoginFormProps) => {
    const { t } = useTranslation();
    const {
        className,
    } = props;
    const mods = {};
    return (
        <div className={classNames(cls.loginForm, mods, [className])}>
            <Input type="text" className={cls.input} placeholder={t('InputUsername')} autoFocus />
            <Input type="text" className={cls.input} placeholder={t('InputPassword')} />
            <Button className={cls.loginBtn} theme={ButtonTheme.OUTLINE}>
                {t('LogIn')}
            </Button>
        </div>
    );
};
