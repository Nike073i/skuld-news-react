import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { articleDetailsReducer } from 'entities/Article';
import { articleDetailsPageReducer } from 'pages/ArticleDetailsPage';
import { loginReducer } from 'features/AuthByUsername';
import { ReducersList } from 'shared/lib/components/DynamicModuleLoader';
import { addCommentReducer } from 'features/addComment';
import { profileReducer } from 'features/editableProfileCard/model/slices/profileSlice';

const defaultAsyncReducers: ReducersList = {
    loginSchema: loginReducer,
    profileSchema: profileReducer,
    articleDetailsSchema: articleDetailsReducer,
    articleDetailsPageSchema: articleDetailsPageReducer,
    addCommentSchema: addCommentReducer,
};

export const StoreDecorator = (
    state: DeepPartial<StateSchema>,
    asyncReducers?: ReducersList,
) => (StoryComponent: any) => (
    <StoreProvider
        initialState={state}
        asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}
    >
        <StoryComponent />
    </StoreProvider>
);
