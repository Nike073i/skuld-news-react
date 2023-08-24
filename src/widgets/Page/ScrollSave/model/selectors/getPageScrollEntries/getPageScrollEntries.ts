import { StateSchema } from '@/app/providers/StoreProvider';

export const getPageScrollEntries = (state: StateSchema) =>
    state.pageScrollSchema.entries;
