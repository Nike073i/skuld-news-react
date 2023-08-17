import {
    AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ArticleDetailsSchema } from '@/entities/Article';
import { CounterSchema } from '@/entities/Counter';
import { UserSchema } from '@/entities/User';
import { LoginSchema } from '@/features/AuthByUsername';
import { AddCommentSchema } from '@/features/addComment';
import { ProfileSchema } from '@/features/editableProfileCard';
import { ArticleDetailsPageSchema } from '@/pages/ArticleDetailsPage';
import { ArticlePageSchema } from '@/pages/ArticlePage';
import { rtkApi } from '@/shared/api/rtkApi';
import { PageScrollSchema } from '@/widgets/Page';

export interface StateSchema {
    counter: CounterSchema;
    user: UserSchema;
    pageScrollSchema: PageScrollSchema;
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>

    // async reducurs
    loginSchema?: LoginSchema;
    profileSchema?: ProfileSchema;
    articlePageSchema?: ArticlePageSchema;
    articleDetailsSchema?: ArticleDetailsSchema;
    articleDetailsPageSchema?: ArticleDetailsPageSchema;
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
