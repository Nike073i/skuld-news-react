import { Fragment, ReactNode } from 'react';
import { Menu } from '@headlessui/react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DropDownDirection } from '@/shared/types/ui';
import cls from './DropDown.module.scss';
import popupCls from '../../styles/popup.module.scss';
import { AppLink } from '../../../AppLink/AppLink';
import { mapDirectionClass } from '../../styles/consts';

export interface DropDownItem {
    disabled?: boolean;
    content?: ReactNode;
    onClick?: () => void;
    href?: string;
}

interface DropDownProps {
    className?: string;
    items?: DropDownItem[];
    direction?: DropDownDirection;
    trigger: ReactNode;
}

export const DropDown = (props: DropDownProps) => {
    const { className, trigger, items, direction = 'top left' } = props;
    const menuItems = items?.map((item, index) => {
        const content = ({ active }: { active: boolean }) => (
            <button
                type="button"
                disabled={item.disabled}
                onClick={item.onClick}
                className={classNames(cls.item, { [popupCls.active]: active })}
            >
                {item.content}
            </button>
        );

        if (item.href) {
            return (
                <Menu.Item
                    as={AppLink}
                    to={item.href}
                    disabled={item.disabled}
                    key={`dropdown-key-${index}`}
                >
                    {content}
                </Menu.Item>
            );
        }

        return (
            <Menu.Item
                as={Fragment}
                disabled={item.disabled}
                key={`dropdown-key-${index}`}
            >
                {content}
            </Menu.Item>
        );
    });
    const menuClasses = [mapDirectionClass[direction], popupCls.panel];
    return (
        <Menu
            as="div"
            className={classNames('', {}, [className, popupCls.popup])}
        >
            <Menu.Button className={popupCls.trigger}>{trigger}</Menu.Button>
            <Menu.Items className={classNames(cls.menu, {}, menuClasses)}>
                {menuItems}
            </Menu.Items>
        </Menu>
    );
};
