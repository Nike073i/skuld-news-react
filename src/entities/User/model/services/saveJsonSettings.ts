import { createAsyncThunk } from '@reduxjs/toolkit';
import { JsonSettings } from '../types/jsonSettings';
import { getUserAuthData } from '../selectors/getUserAuthData/getUserAuthData';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getJsonSettings } from '../selectors/jsonSettings/getJsonSettings';
import { setJsonSettingsMutation } from '../../api/userApi';

export const saveJsonSettings = createAsyncThunk<
    JsonSettings,
    JsonSettings,
    ThunkConfig<string>
>('user/saveJsonSettings', async (newJsonSettings, thunkApi) => {
    const { rejectWithValue, getState, dispatch } = thunkApi;
    const userData = getUserAuthData(getState());
    if (!userData) {
        return rejectWithValue('Пользователь не авторизован');
    }
    const currentSettings = getJsonSettings(getState());
    try {
        const response = await dispatch(
            setJsonSettingsMutation({
                userId: userData.id,
                jsonSettings: {
                    ...currentSettings,
                    ...newJsonSettings,
                },
            }),
        ).unwrap();
        if (!response.jsonSettings) {
            return rejectWithValue('Сервер не указал настройки пользователя');
        }
        return response.jsonSettings;
    } catch (e) {
        console.error(e);
        return rejectWithValue(
            'Ошибка во время сохранения настроек пользователя',
        );
    }
});
