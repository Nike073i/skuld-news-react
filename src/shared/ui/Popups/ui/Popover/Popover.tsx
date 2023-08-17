import { ReactNode } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { DropDownDirection } from 'shared/types/ui';
import { Popover as HuPopover } from '@headlessui/react';
import popupCls from '../../styles/popup.module.scss';
import cls from './Popover.module.scss';
import { mapDirectionClass } from '../../styles/consts';

interface PopoverProps {
    className?: string;
    direction?: DropDownDirection;
    trigger: ReactNode;
    children: ReactNode;
}

export const Popover = (props: PopoverProps) => {
    const {
        className,
        trigger,
        direction = 'bottom right',
        children,
    } = props;
    const menuClasses = [mapDirectionClass[direction]];
    const mods = {};
    return (
        <HuPopover className={classNames('', mods, [className, popupCls.popup])}>
            <HuPopover.Button className={popupCls.trigger}>
                {trigger}
            </HuPopover.Button>
            <HuPopover.Panel
                className={classNames(cls.panel, {}, menuClasses)}
            >
                {children}
            </HuPopover.Panel>
        </HuPopover>
    );
};
