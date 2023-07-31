import { Mods, classNames } from 'shared/lib/classNames/classNames';
import { ChangeEvent, memo, useMemo } from 'react';
import cls from './Select.module.scss';

export interface SelectOption {
    value: string;
    content: string;
}

interface SelectProps {
    className?: string;
    label?: string;
    options?: SelectOption[];
    value?: string;
    readOnly?: boolean;
    onChange?: (value: string) => void;
}

export const Select = memo((props: SelectProps) => {
    const {
        className,
        label,
        options,
        value,
        onChange,
        readOnly,
    } = props;
    const optionsList = useMemo(() => (
        options?.map((opt) => (
            <option
                className={cls.option}
                value={opt.value}
                key={opt.value}
            >
                {opt.content}
            </option>
        ))), [options]);
    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange?.(e.target.value);
    };
    const mods: Mods = {
        [cls.readOnly]: readOnly,
    };
    return (
        <div className={classNames(cls.wrapper, {}, [className])}>
            {label && (<span className={classNames(cls.label, mods, [])}>{`${label}>`}</span>)}
            <select
                disabled={readOnly}
                className={cls.select}
                value={value}
                onChange={onChangeHandler}
            >
                {optionsList}
            </select>
        </div>
    );
});
