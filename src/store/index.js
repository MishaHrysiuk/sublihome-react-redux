import { configureStore } from '@reduxjs/toolkit';
import filters from '../api/filtersSlice';
import {
    apiProductSlice,
    apiProductTypeSlice,
    apiAuthenticationSlice,
    apiCartSlice,
    apiOrderSlice,
    apiUserSlice
} from '../api/apiSlice';

const store = configureStore({
    reducer: {
        filters,
        [apiProductSlice.reducerPath]: apiProductSlice.reducer,
        [apiProductTypeSlice.reducerPath]: apiProductTypeSlice.reducer,
        [apiAuthenticationSlice.reducerPath]: apiAuthenticationSlice.reducer,
        [apiCartSlice.reducerPath]: apiCartSlice.reducer,
        [apiOrderSlice.reducerPath]: apiOrderSlice.reducer,
        [apiUserSlice.reducerPath]: apiUserSlice.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(
        apiProductSlice.middleware,
        apiProductTypeSlice.middleware,
        apiAuthenticationSlice.middleware,
        apiCartSlice.middleware,
        apiOrderSlice.middleware,
        apiUserSlice.middleware,
    ),
    devTools: process.env.NODE_ENV !== 'production'
})

export default store;