import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
import { articleDetailsReducer } from '@/entities/Article/testing';
import { articleDetailsPageReducer } from '@/pages/ArticleDetailsPage/testing';
import { loginReducer } from '@/features/AuthByUsername/testing';
import { ReducersList } from '@/shared/lib/components/DynamicModuleLoader';
import { addCommentReducer } from '@/features/addComment/testing';
import { profileReducer } from '@/features/editableProfileCard/testing';

const defaultAsyncReducers: ReducersList = {
    loginSchema: loginReducer,
    profileSchema: profileReducer,
    articleDetailsSchema: articleDetailsReducer,
    articleDetailsPageSchema: articleDetailsPageReducer,
    addCommentSchema: addCommentReducer,
};

export const StoreDecorator =
    (state: DeepPartial<StateSchema>, asyncReducers?: ReducersList) =>
    (StoryComponent: any) => (
        <StoreProvider
            initialState={state}
            asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}
        >
            <StoryComponent />
        </StoreProvider>
    );
