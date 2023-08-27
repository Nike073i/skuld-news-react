import { Suspense } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Modal } from '@/shared/ui/deprecated/Modal';
import { Loader } from '@/shared/ui/deprecated/Loader';
import cls from './LoginModal.module.scss';
import LoginFormAsync from '../LoginForm/LoginForm.async';

interface LoginModalProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
    portal: HTMLElement;
}

export const LoginModal = (props: LoginModalProps) => {
    const { className, isOpen, onClose, portal } = props;
    const mods = {};
    return (
        <Modal
            className={classNames(cls.loginModal, mods, [className])}
            isOpen={isOpen}
            onClose={onClose}
            portal={portal}
            lazy
        >
            <Suspense fallback={<Loader />}>
                <LoginFormAsync onSuccess={onClose} />
            </Suspense>
        </Modal>
    );
};
