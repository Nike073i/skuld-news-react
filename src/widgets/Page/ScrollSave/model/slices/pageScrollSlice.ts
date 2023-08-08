import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PageScrollSchema } from '../types/pageScroll';

const initialState: PageScrollSchema = {
    entries: {},
};

export const pageScrollSlice = createSlice({
    name: 'pageScrollSlice',
    initialState,
    reducers: {
        setScrollPosition: (state, { payload }: PayloadAction<{ path: string; position: number }>) => {
            state.entries[payload.path] = payload.position;
        },
    },
});

export const { reducer: pageScrollReducer, actions: pageScrollActions } = pageScrollSlice;
