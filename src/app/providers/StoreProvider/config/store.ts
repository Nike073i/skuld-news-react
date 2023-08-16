import {
    CombinedState, Reducer, ReducersMapObject, configureStore,
} from '@reduxjs/toolkit';
import { userReducer } from 'entities/User';
import { $api } from 'shared/api/api';
import { pageScrollReducer } from 'widgets/Page';
import { rtkApi } from 'shared/api/rtkApi';
import { counterReducer } from 'entities/Counter/model/slice/counterSlice';
import { StateSchema, ThunkExtraArg } from './StateSchema';
import { createReducerManager } from './reducerManager';

export function createReduxStore(
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>,
) {
    const reducers: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        counter: counterReducer,
        user: userReducer,
        pageScrollSchema: pageScrollReducer,
        [rtkApi.reducerPath]: rtkApi.reducer,
    };

    const extraArg: ThunkExtraArg = {
        api: $api,
    };

    const reducerManager = createReducerManager(reducers);
    const store = configureStore({
        reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
        devTools: __IS_DEV__,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            thunk: {
                extraArgument: extraArg,
            },
        }).concat(rtkApi.middleware),
    });
    // @ts-ignore
    store.reducerManager = reducerManager;

    return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
