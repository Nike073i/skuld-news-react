import { StateSchema } from '@/app/providers/StoreProvider';

export const getProfileValidationErrors = (state: StateSchema) => state?.profileSchema?.validationErrors;
