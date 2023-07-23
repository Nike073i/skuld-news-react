import { classNames } from 'shared/lib/classNames/classNames';
import { Modal } from 'shared/ui/Modal/Modal';
import cls from './LoginModal.module.scss';
import { LoginForm } from '../LoginForm/LoginForm';

interface LoginModalProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
    portal: HTMLElement;
}

export const LoginModal = (props: LoginModalProps) => {
    const {
        className,
        isOpen,
        onClose,
        portal,
    } = props;
    const mods = {};
    return (
        <Modal
            className={classNames(cls.loginModal, mods, [className])}
            isOpen={isOpen}
            onClose={onClose}
            portal={portal}
            lazy
        >
            <LoginForm />
        </Modal>
    );
};
