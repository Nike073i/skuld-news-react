import {
    Fragment, ReactNode, useMemo, useState,
} from 'react';
import { Mods, classNames } from 'shared/lib/classNames/classNames';
import { Listbox as HuListBox } from '@headlessui/react';
import cls from './ListBox.module.scss';
import { Button } from '../Button/Button';
import { HStack } from '../Stack';

export interface ListBoxItem {
    value: string;
    content: ReactNode;
    disabled?: boolean;
}

type DropDownDirection = 'top' | 'bottom';

interface ListBoxProps {
    items?: ListBoxItem[];
    className?: string;
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    readOnly?: boolean;
    direction?: DropDownDirection;
    label?: string;
}

const mapDirectionClass: Record<DropDownDirection, string> = {
    top: cls.optionsTop,
    bottom: cls.optionsBottom,
};

export const ListBox = (props: ListBoxProps) => {
    const {
        className,
        items,
        value,
        defaultValue,
        onChange,
        direction = 'bottom',
        label,
        readOnly,
    } = props;
    const optionsClasses = [mapDirectionClass[direction]];
    const options = useMemo(() => items?.map((item) => (
        <HuListBox.Option
            key={item.value}
            value={item.value}
            disabled={item.disabled}
            as={Fragment}
        >
            {({ active }) => {
                const mods: Mods = {
                    [cls.active]: active,
                    [cls.disabled]: item.disabled,
                };
                return (
                    <li
                        className={classNames(cls.item, mods)}
                    >
                        {item.content}
                    </li>
                );
            }}
        </HuListBox.Option>
    )), [items]);
    return (
        <HStack gap="4">
            {label && <span className={classNames('', { [cls.disabled]: readOnly })}>{`${label}>`}</span>}
            <HuListBox
                disabled={readOnly}
                as="div"
                className={classNames(cls.listBox, {}, [className])}
                value={value}
                onChange={onChange}
            >
                <HuListBox.Button className={cls.trigger}>
                    <Button disabled={readOnly}>
                        {value ?? defaultValue}
                    </Button>
                </HuListBox.Button>
                <HuListBox.Options className={classNames(cls.options, {}, optionsClasses)}>{options}</HuListBox.Options>
            </HuListBox>
        </HStack>
    );
};
