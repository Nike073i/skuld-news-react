import { StateSchema } from '@/app/providers/StoreProvider';

export const getLoginPassword = (state: StateSchema) => state?.loginSchema?.password || '';
