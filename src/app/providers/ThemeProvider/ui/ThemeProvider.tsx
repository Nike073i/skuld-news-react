import React, { useMemo, useState } from 'react';
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from '../lib/ThemeContext';

interface ThemeProviderProps {
    initialTheme?: Theme;
}

const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme || Theme.LIGHT;

function ThemeProvider(props: React.PropsWithChildren<ThemeProviderProps>) {
    const {
        initialTheme,
        children,
    } = props;
    const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme);
    const defaultProps = useMemo(() => ({
        theme,
        setTheme,
    }), [theme]);
    document.body.className = theme;
    return (
        <ThemeContext.Provider value={defaultProps}>
            {children}
        </ThemeContext.Provider>
    );
}

export default ThemeProvider;
