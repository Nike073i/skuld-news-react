import { Profile } from 'entities/Profile';
import { ValidationProfileError } from '../consts/consts';

export interface ProfileSchema {
    data?: Profile;
    form?: Profile;
    isLoading: boolean;
    error?: string;
    readonly: boolean;
    validationErrors?: ValidationProfileError[];
}
