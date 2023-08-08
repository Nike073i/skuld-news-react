import {
    AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ArticleDetailsSchema } from 'entities/Article';
import { CounterSchema } from 'entities/Counter';
import { ProfileSchema } from 'entities/Profile';
import { UserSchema } from 'entities/User';
import { LoginSchema } from 'features/AuthByUsername';
import { AddCommentSchema } from 'features/addComment';
import { ArticleDetailsCommentsSchema } from 'pages/ArticleDetailsPage';
import { ArticlePageSchema } from 'pages/ArticlePage';
import { PageScrollSchema } from 'widgets/Page';

export interface StateSchema {
    counter: CounterSchema;
    user: UserSchema;
    pageScrollSchema: PageScrollSchema;

    // async reducurs
    loginSchema?: LoginSchema;
    profileSchema?: ProfileSchema;
    articlePageSchema?: ArticlePageSchema;
    articleDetailsSchema?: ArticleDetailsSchema;
    articleDetailsCommentsSchema?: ArticleDetailsCommentsSchema;
    addCommentSchema?: AddCommentSchema;
}

export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}
