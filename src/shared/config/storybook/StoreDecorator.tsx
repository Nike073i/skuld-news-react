import { DeepPartial } from '@reduxjs/toolkit';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';

export const StoreDecorator = (state: DeepPartial<StateSchema>) => (StoryComponent: any) => (
    <StoreProvider initialState={state}>
        <StoryComponent />
    </StoreProvider>
);
