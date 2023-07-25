import { ReducersMapObject, configureStore } from '@reduxjs/toolkit';
import { counterReducer } from 'entities/Counter';
import { userReducer } from 'entities/User';
import { loginReducer } from 'features/AuthByUsername';
import { StateSchema } from './StateSchema';

export function createReduxStore(initialState?: StateSchema) {
    const reducers: ReducersMapObject<StateSchema> = {
        counter: counterReducer,
        user: userReducer,
        loginSchema: loginReducer,
    };

    return configureStore<StateSchema>({
        reducer: reducers,
        devTools: __IS_DEV__,
        preloadedState: initialState,
    });
}
