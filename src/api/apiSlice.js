import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://localhost:5001/api/Product' }),
    tagTypes: ['Products'],
    endpoints: builder => ({
        getHeroes: builder.query({
            query: () => '/GetAllProducts',
            providesTags: ['Products']
        }),
        createHero: builder.mutation({
            query: hero => ({
                url: '/CreateProduct',
                method: 'POST',
                body: hero
            }),
            invalidatesTags: ['Products']
        }),
        deleteHero: builder.mutation({
            query: id => ({
                url: `/DeleteProduct?productId=${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Products']
        })
    })
});

export const {
    useGetHeroesQuery,
    useCreateHeroMutation,
    useDeleteHeroMutation
} = apiSlice;