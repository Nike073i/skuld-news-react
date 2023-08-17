import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { validateProfileData } from './validateProfileData';
import { ValidationProfileError } from '../../consts/consts';

const data = {
    username: 'admin',
    age: 21,
    country: Country.Kazakhstan,
    lastname: 'Filippov',
    first: 'Nikita',
    city: 'Ulyanovsk',
    currency: Currency.RUB,
};

describe('validateProfileData.test', () => {
    test('success', () => {
        const result = validateProfileData(data);

        expect(result).toEqual([]);
    });

    test('without first and last name', async () => {
        const result = validateProfileData({ ...data, first: '', lastname: '' });

        expect(result).toEqual([
            ValidationProfileError.INCORRECT_USER_DATA,
        ]);
    });

    test('incorrect age', () => {
        const result = validateProfileData({ ...data, age: undefined });

        expect(result).toEqual([
            ValidationProfileError.INCORRECT_AGE,
        ]);
    });

    test('incorrect country', () => {
        const result = validateProfileData({ ...data, country: undefined });

        expect(result).toEqual([
            ValidationProfileError.INCORRECT_COUNTRY,
        ]);
    });

    test('incorrect all', () => {
        const result = validateProfileData({});

        expect(result).toEqual([
            ValidationProfileError.INCORRECT_AGE,
            ValidationProfileError.INCORRECT_USER_DATA,
            ValidationProfileError.INCORRECT_COUNTRY,
        ]);
    });
});
