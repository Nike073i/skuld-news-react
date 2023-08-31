import { useJsonSettings } from '@/entities/User';
import ThemeProvider from '../ui/ThemeProvider';

export const withTheme = (Component: React.ComponentType) => () => {
    const { theme: defaultTheme } = useJsonSettings();
    return (
        <ThemeProvider initialTheme={defaultTheme}>
            <Component />
        </ThemeProvider>
    );
};
