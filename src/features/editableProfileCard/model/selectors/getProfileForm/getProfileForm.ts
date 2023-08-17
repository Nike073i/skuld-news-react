import { StateSchema } from '@/app/providers/StoreProvider';

export const getProfileForm = (state: StateSchema) => state?.profileSchema?.form;
