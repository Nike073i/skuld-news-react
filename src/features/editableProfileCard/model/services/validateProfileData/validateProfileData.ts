import { Profile } from '@/entities/Profile';
import { ValidationProfileError } from '../../consts/consts';

export const validateProfileData = (profile?: Profile) => {
    if (!profile) return [ValidationProfileError.NO_DATA];

    const { age, first, lastname, country } = profile;

    const errors: ValidationProfileError[] = [];

    if (!age || !Number.isInteger(age)) {
        errors.push(ValidationProfileError.INCORRECT_AGE);
    }
    if (!first || !lastname) {
        errors.push(ValidationProfileError.INCORRECT_USER_DATA);
    }
    if (!country) {
        errors.push(ValidationProfileError.INCORRECT_COUNTRY);
    }
    return errors;
};
