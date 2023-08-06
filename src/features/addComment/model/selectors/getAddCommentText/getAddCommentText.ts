import { StateSchema } from 'app/providers/StoreProvider';

export const getAddCommentText = (state: StateSchema) => state.addCommentSchema?.text;
