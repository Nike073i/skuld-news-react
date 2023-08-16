import AddCommentFormAsync from './ui/AddCommentForm/AddCommentForm.async';

export type { AddCommentSchema } from './model/types/addComment';
export { AddCommentFormAsync as AddCommentForm };
export { addCommentReducer } from './model/slice/addCommentSlice';
