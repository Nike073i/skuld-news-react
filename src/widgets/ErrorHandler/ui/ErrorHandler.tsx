import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import cls from './ErrorHandler.module.scss';

interface ErrorHandlerProps {
    className?: string;
}

export function ErrorHandler(props: ErrorHandlerProps) {
    const { className } = props;
    const { t } = useTranslation();
    const reloadPage = () => {
        // eslint-disable-next-line no-restricted-globals
        location.reload();
    };
    return (
        <div className={classNames(cls.errorHandler, {}, [className])}>
            <p>{t('SomethingError')}</p>
            <Button onClick={reloadPage}>{t('Reload page')}</Button>
        </div>
    );
}
