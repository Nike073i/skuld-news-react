import { StateSchema } from 'app/providers/StoreProvider';
import { ValidationProfileError } from 'entities/Profile';
import { getProfileValidationErrors } from './getProfileValidationErrors';

describe('getProfileValidationErrors.test', () => {
    test('should work with filled state', () => {
        const state: DeepPartial<StateSchema> = {
            profileSchema: {
                validationErrors: [
                    ValidationProfileError.SERVER_ERROR,
                    ValidationProfileError.INCORRECT_AGE,
                ],
            },
        };
        expect(getProfileValidationErrors(state as StateSchema)).toEqual([
            ValidationProfileError.SERVER_ERROR,
            ValidationProfileError.INCORRECT_AGE,
        ]);
    });
    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getProfileValidationErrors(state as StateSchema)).toEqual(undefined);
    });
});
