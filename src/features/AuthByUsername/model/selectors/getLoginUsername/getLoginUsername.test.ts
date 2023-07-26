import { DeepPartial } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { getLoginUsername } from './getLoginUsername';

describe('getLoginUsername', () => {
    test('should return username', () => {
        const testUsername = 'username';
        const state: DeepPartial<StateSchema> = {
            loginSchema: {
                username: testUsername,
            },
        };
        expect(getLoginUsername(state as StateSchema)).toEqual(testUsername);
    });
    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getLoginUsername(state as StateSchema)).toEqual('');
    });
});
