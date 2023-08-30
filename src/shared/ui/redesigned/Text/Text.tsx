import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Text.module.scss';

export type TextVariant = 'primary' | 'error' | 'accent';

export type TextAlign = 'right' | 'left' | 'center';

export type TextSize = 'size_s' | 'size_m' | 'size_l';

export type HeaderTagType = 'h1' | 'h2' | 'h3';

const sizeToHeaderTag: Record<TextSize, HeaderTagType> = {
    size_s: 'h1',
    size_m: 'h2',
    size_l: 'h3',
};

interface TextProps {
    className?: string;
    title?: string;
    text?: string;
    variant?: TextVariant;
    align?: TextAlign;
    size?: TextSize;
    bold?: boolean;
    'data-testid'?: string;
}

export const Text = memo((props: TextProps) => {
    const {
        className,
        title,
        text,
        variant = 'primary',
        align = 'left',
        size = 'size_m',
        bold,
        'data-testid': dataTestId = 'Text',
    } = props;
    const mods = {
        [cls.bold]: bold,
    };
    const HeaderTag = sizeToHeaderTag[size];
    return (
        <div
            className={classNames('', mods, [
                className,
                cls[variant],
                cls[align],
                cls[size],
            ])}
        >
            {title && (
                <HeaderTag
                    className={cls.title}
                    data-testid={`${dataTestId}.Header`}
                >
                    {title}
                </HeaderTag>
            )}
            {text && (
                <p className={cls.text} data-testid={`${dataTestId}.Paragraph`}>
                    {text}
                </p>
            )}
        </div>
    );
});
