import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';
import { getPageScrollEntries } from '../getPageScrollEntries/getPageScrollEntries';

export const getPageScrollByPath = createSelector(
    getPageScrollEntries,
    (state: StateSchema, path: string) => path,
    (entries, path) => entries[path] || 0,
);
