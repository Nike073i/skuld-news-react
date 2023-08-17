import { StateSchema } from '@/app/providers/StoreProvider';

export const getLoginIsLoading = (state: StateSchema) => state?.loginSchema?.isLoading || false;
