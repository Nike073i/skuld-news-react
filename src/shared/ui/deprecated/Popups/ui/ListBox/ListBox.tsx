import { Fragment, ReactNode, memo, useMemo } from 'react';
import { Listbox as HuListBox } from '@headlessui/react';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import { DropDownDirection } from '@/shared/types/ui';
import popupCls from '../../styles/popup.module.scss';
import cls from './ListBox.module.scss';
import { Button } from '../../../Button/Button';
import { HStack } from '../../../Stack';
import { mapDirectionClass } from '../../styles/consts';

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

/**
 * Устарел, используем новые компоненты из redesigned
 * @deprecated
 */
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
    const options = useMemo(
        () =>
            items?.map((item) => (
                <HuListBox.Option
                    key={item.value}
                    value={item.value}
                    disabled={item.disabled}
                    as={Fragment}
                >
                    {({ active }) => {
                        const mods: Mods = {
                            [popupCls.active]: active,
                            [popupCls.disabled]: item.disabled,
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
                    <Button disabled={readOnly}>{value ?? defaultValue}</Button>
                </HuListBox.Button>
                <HuListBox.Options
                    className={classNames(cls.options, {}, optionsClasses)}
                >
                    {options}
                </HuListBox.Options>
            </HuListBox>
        </HStack>
    );
});
