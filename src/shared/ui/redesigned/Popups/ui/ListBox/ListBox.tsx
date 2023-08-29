import { Fragment, ReactNode, useMemo } from 'react';
import { Listbox as HuListBox } from '@headlessui/react';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import { DropDownDirection } from '@/shared/types/ui';
import popupCls from '../../styles/popup.module.scss';
import cls from './ListBox.module.scss';
import { Button } from '../../../Button/Button';
import { HStack } from '../../../Stack';
import { mapDirectionClass } from '../../styles/consts';

export interface ListBoxItem<T extends string> {
    value: T;
    content: ReactNode;
    disabled?: boolean;
}

interface ListBoxProps<T extends string> {
    items?: ListBoxItem<T>[];
    className?: string;
    value?: T;
    defaultValue?: string;
    onChange?: (value: T) => void;
    readOnly?: boolean;
    direction?: DropDownDirection;
    label?: string;
}

export const ListBox = <T extends string>(props: ListBoxProps<T>) => {
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
    const optionsClasses = [mapDirectionClass[direction], popupCls.panel];
    const options = useMemo(
        () =>
            items?.map((item) => (
                <HuListBox.Option
                    key={item.value}
                    value={item.value}
                    disabled={item.disabled}
                    as={Fragment}
                >
                    {({ active, selected }) => {
                        const mods: Mods = {
                            [popupCls.active]: active,
                            [popupCls.disabled]: item.disabled,
                            [cls.selected]: selected,
                        };
                        return (
                            <li className={classNames(cls.item, mods)}>
                                {item.content}
                            </li>
                        );
                    }}
                </HuListBox.Option>
            )),
        [items],
    );
    const selectedItem = useMemo(
        () => items?.find((item) => item.value === value),
        [items, value],
    );
    return (
        <HStack gap="4">
            {label && (
                <span
                    className={classNames('', {
                        [popupCls.disabled]: readOnly,
                    })}
                >{`${label}>`}</span>
            )}
            <HuListBox
                disabled={readOnly}
                as="div"
                className={classNames('', {}, [className, popupCls.popup])}
                value={value}
                onChange={onChange}
            >
                <HuListBox.Button className={popupCls.trigger}>
                    <Button variant="filled" disabled={readOnly}>
                        {selectedItem?.content ?? defaultValue}
                    </Button>
                </HuListBox.Button>
                <HuListBox.Options
                    className={classNames(cls.options, {}, optionsClasses)}
                >
                    {options}
                </HuListBox.Options>
            </HuListBox>
        </HStack>
    );
};
