import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Profile } from '@/entities/Profile';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';
import { validateProfileData } from '../validateProfileData/validateProfileData';
import { ValidationProfileError } from '../../consts/consts';

export const updateProfileData = createAsyncThunk<
    Profile, void, ThunkConfig<ValidationProfileError[]>
>('profile/updateProfileData', async (_, thunkApi) => {
    const {
        extra,
        rejectWithValue,
        getState,
    } = thunkApi;
    const formData = getProfileForm(getState());
    const errors = validateProfileData(formData);
    if (errors.length > 0) {
        return rejectWithValue(errors);
    }
    try {
        const response = await extra.api.put<Profile>(`/profiles/${formData?.id}`, formData);
        if (!response.data) {
            throw new Error();
        }
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue([ValidationProfileError.SERVER_ERROR]);
    }
});
