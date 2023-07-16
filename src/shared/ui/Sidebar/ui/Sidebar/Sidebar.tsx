import { classNames } from "shared/lib/classNames/classNames";
import cls from './Sidebar.module.scss'
import { useState } from "react";
import { ThemeSwitcher } from "widgets/ThemeSwitcher";
import { LangSwitcher } from "widgets/LangSwitcher";

interface SidebarProps {
    className?: string,
}

export const Sidebar = (props: SidebarProps) => {
    const { className } = props
    const [collapsed, setCollapsed] = useState(false)
    function onToggle() {
        setCollapsed(prev => !prev)
    }
    return (
        <div className={classNames(cls.sidebar, { [cls.collapsed]: collapsed }, [className])}>
            <button onClick={onToggle}>toggle</button>
            <div className={cls.switchers}>
                <ThemeSwitcher />
                <LangSwitcher className={cls.lang}/>
            </div>
        </div>
    )
}
