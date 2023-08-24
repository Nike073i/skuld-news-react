import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Profile } from '@/entities/Profile';

export const fetchProfileData = createAsyncThunk<
    Profile,
    string | undefined,
    ThunkConfig<string>
>('profile/fetchProfileData', async (profileId, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;
    try {
        if (!profileId) {
            return rejectWithValue('error');
        }
        const response = await extra.api.get<Profile>(`/profiles/${profileId}`);

        if (!response.data) {
            throw new Error();
        }
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
