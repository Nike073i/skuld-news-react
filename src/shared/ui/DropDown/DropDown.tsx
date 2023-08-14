import {
    Fragment, ReactNode,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Menu } from '@headlessui/react';
import { DropDownDirection } from 'shared/types/ui';
import cls from './DropDown.module.scss';
import { AppLink } from '../AppLink/AppLink';

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

const mapDirectionClass: Record<DropDownDirection, string> = {
    'bottom left': cls.optionsBottomLeft,
    'bottom right': cls.optionsBottomRight,
    'top right': cls.optionsTopRight,
    'top left': cls.optionsTopLeft,
};

export const DropDown = (props: DropDownProps) => {
    const {
        className, trigger, items, direction = 'top left',
    } = props;
    const menuItems = items?.map((item) => {
        const content = ({ active }: { active: boolean }) => (
            <button
                type="button"
                disabled={item.disabled}
                onClick={item.onClick}
                className={classNames(cls.item, { [cls.active]: active })}
            >
                {item.content}
            </button>
        );

        if (item.href) {
            return (
                <Menu.Item as={AppLink} to={item.href} disabled={item.disabled}>
                    {content}
                </Menu.Item>
            );
        }

        return (
            <Menu.Item as={Fragment} disabled={item.disabled}>
                {content}
            </Menu.Item>
        );
    });
    const menuClasses = [mapDirectionClass[direction]];
    return (
        <Menu as="div" className={classNames(cls.dropDown, {}, [className])}>
            <Menu.Button className={cls.btn}>
                {trigger}
            </Menu.Button>
            <Menu.Items className={classNames(cls.menu, {}, menuClasses)}>
                {menuItems}
            </Menu.Items>
        </Menu>
    );
};
