import { configureStore } from '@reduxjs/toolkit';
import filters from '../api/filtersSlice';
import { apiProductSlice, apiProductTypeSlice } from '../api/apiSlice';

const stringMiddleware = () => (next) => (action) => {
    if (typeof action === 'string') {
        return next({
            type: action
        })
    } 
    return next(action);
}

const store = configureStore({
    reducer: {
        filters,
        [apiProductSlice.reducerPath]: apiProductSlice.reducer,
        [apiProductTypeSlice.reducerPath]: apiProductTypeSlice.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(
        stringMiddleware,
        apiProductTypeSlice.middleware,
        apiProductSlice.middleware
    ),
    devTools: process.env.NODE_ENV !== 'production'
})

export default store;