import React, { useEffect, useMemo, useState } from 'react';
import { Theme } from '@/shared/consts/theme';
import { ThemeContext } from '@/shared/lib/context/ThemeContext';
import { useJsonSettings } from '@/entities/User';

interface ThemeProviderProps {
    initialTheme?: Theme;
}

function ThemeProvider(props: React.PropsWithChildren<ThemeProviderProps>) {
    const { initialTheme, children } = props;
    const { theme: defaultTheme = Theme.LIGHT } = useJsonSettings();
    const [isThemeInited, setThemeInited] = useState(false);

    const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme);
    useEffect(() => {
        if (!isThemeInited) {
            setTheme(defaultTheme);
            setThemeInited(true);
        }
    }, [defaultTheme, initialTheme, isThemeInited]);
    const defaultProps = useMemo(
        () => ({
            theme,
            setTheme,
        }),
        [theme],
    );
    document.body.className = theme;
    return (
        <ThemeContext.Provider value={defaultProps}>
            {children}
        </ThemeContext.Provider>
    );
}

export default ThemeProvider;
