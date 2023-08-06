import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AddCommentSchema } from '../types/addComment';

const initialState: AddCommentSchema = { };

export const addCommentSlice = createSlice({
    name: 'addComment',
    initialState,
    reducers: {
        setText: (state, action: PayloadAction<string>) => {
            state.text = action.payload;
        },
        clearText: (state) => {
            state.text = '';
        },
    },
});

export const { reducer: addCommentReducer } = addCommentSlice;
export const { actions: addCommentActions } = addCommentSlice;
