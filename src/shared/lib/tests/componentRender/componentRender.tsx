/* eslint-disable ulbi-tv-plugin/layer-imports */
import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { ReducersMapObject } from '@reduxjs/toolkit';
import i18nForTests from '@/shared/config/i18n/i18nForTests';
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
import { Theme } from '@/shared/consts/theme';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import '@/app/styles/index.scss';

export interface ComponentRenderOptions {
    route?: string;
    initialState?: DeepPartial<StateSchema>;
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
    theme?: Theme;
}

interface TestProviderProps {
    children: ReactNode;
    options?: ComponentRenderOptions;
}

export const TestProvider = (props: TestProviderProps) => {
    const { children, options = {} } = props;
    const {
        route = '/',
        initialState,
        asyncReducers,
        theme = Theme.LIGHT,
    } = options;
    return (
        <MemoryRouter initialEntries={[route]}>
            <StoreProvider initialState={initialState} asyncReducers={asyncReducers}>
                <I18nextProvider i18n={i18nForTests}>
                    <ThemeProvider initialTheme={theme}>
                        {children}
                    </ThemeProvider>
                </I18nextProvider>
            </StoreProvider>
        </MemoryRouter>
    );
};

export function ComponentRender(component: ReactNode, options: ComponentRenderOptions = {}) {
    return render(<TestProvider options={options}>{component}</TestProvider>);
}
