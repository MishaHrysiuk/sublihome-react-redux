import { configureStore } from '@reduxjs/toolkit';
import filters from '../api/filtersSlice';
import {
    apiSlice
} from '../api/apiSlice';

const store = configureStore({
    reducer: {
        filters,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(
        apiSlice.middleware
    ),
    devTools: process.env.NODE_ENV !== 'production'
})

export default store;