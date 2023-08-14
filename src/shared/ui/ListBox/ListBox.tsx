import {
    Fragment, ReactNode, memo, useMemo,
} from 'react';
import { Mods, classNames } from 'shared/lib/classNames/classNames';
import { Listbox as HuListBox } from '@headlessui/react';
import { DropDownDirection } from 'shared/types/ui';
import cls from './ListBox.module.scss';
import { Button } from '../Button/Button';
import { HStack } from '../Stack';

export interface ListBoxItem {
    value: string;
    content: ReactNode;
    disabled?: boolean;
}

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
    'bottom left': cls.optionsBottomLeft,
    'bottom right': cls.optionsBottomRight,
    'top right': cls.optionsTopRight,
    'top left': cls.optionsTopLeft,
};

export const ListBox = memo((props: ListBoxProps) => {
    const {
        className,
        items,
        value,
        defaultValue,
        onChange,
        direction = 'bottom right',
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
});
