import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { User } from '../types/user';
import {
    LOCAL_STORAGE_LAST_DESIGN_KEY,
    USER_LOCALSTORAGE_KEY,
} from '@/shared/consts/localstorage';
import { getUserDataByIdQuery } from '../../api/userApi';

export const initAuthData = createAsyncThunk<User, void, ThunkConfig<string>>(
    'user/initAuthData',
    async (_, thunkApi) => {
        const { rejectWithValue, dispatch } = thunkApi;
        const userId = JSON.parse(
            localStorage.getItem(USER_LOCALSTORAGE_KEY) || '',
        );
        if (!userId) {
            return rejectWithValue('Пользователь не авторизован');
        }
        try {
            const response = await dispatch(
                getUserDataByIdQuery(userId),
            ).unwrap();
            localStorage.setItem(
                LOCAL_STORAGE_LAST_DESIGN_KEY,
                response.features?.isAppRedesigned ? 'new' : 'old',
            );
            return response;
        } catch (e) {
            console.error(e);
            return rejectWithValue(
                'Ошибка во время получения данных пользователя',
            );
        }
    },
);
