import { StateSchema } from '@/app/providers/StoreProvider';
import { getLoginPassword } from './getLoginPassword';

describe('getLoginPassword', () => {
    test('should return password', () => {
        const testPassword = 'password';
        const state: DeepPartial<StateSchema> = {
            loginSchema: {
                password: testPassword,
            },
        };
        expect(getLoginPassword(state as StateSchema)).toEqual(testPassword);
    });
    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getLoginPassword(state as StateSchema)).toEqual('');
    });
});
