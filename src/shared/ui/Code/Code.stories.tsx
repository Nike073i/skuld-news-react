import type { Meta, StoryObj } from '@storybook/react';
import { Code } from './Code';

const meta = {
    title: 'shared/Code',
    component: Code,
} satisfies Meta<typeof Code>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        text:
            "import { ReactNode, memo } from 'react';\n"
            + "import { classNames } from 'shared/lib/classNames/classNames';\n"
            + "import cls from './Code.module.scss';\n"
            + '\n'
            + 'interface CodeProps {\n'
            + '    className?: string;\n'
            + '    children: ReactNode,\n'
            + '}\n'
            + '\n'
            + 'export const Code = memo((props: CodeProps) => {\n'
            + '    const {\n'
            + '        className,\n'
            + '        children,\n'
            + '    } = props;\n'
            + '     const mods = {};\n'
            + '    return (\n'
            + '        <code className={classNames(cls.code, mods, [className])}>\n'
            + '            {children}\n'
            + '        </code>\n'
            + '    );\n'
            + '});\n',
    },
};
