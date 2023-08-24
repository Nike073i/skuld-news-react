import { StateSchema } from '@/app/providers/StoreProvider';

export const getAddCommentError = (state: StateSchema) =>
    state.addCommentSchema?.error;
