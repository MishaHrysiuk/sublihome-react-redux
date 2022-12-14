import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiProductSlice = createApi({
    reducerPath: 'api/Product',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://localhost:5001/api/Product' }),
    tagTypes: ['Product'],
    endpoints: builder => ({
        getAllProducts: builder.query({
            query: () => '/GetAllProducts',
            providesTags: ['Product']
        }),
        getProduct: builder.query({
            query: id => `/GetProduct?productId=${id}`
        }),
        createProduct: builder.mutation({
            query: product => ({
                url: '/CreateProduct',
                method: 'POST',
                body: product
            }),
            invalidatesTags: ['Product']
        }),
        deleteProduct: builder.mutation({
            query: id => ({
                url: `/DeleteProduct?productId=${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Product']
        })
    })
});

export const apiProductTypeSlice = createApi({
    reducerPath: 'api/ProductType',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://localhost:5001/api/ProductType' }),
    tagTypes: ['ProductType'],
    endpoints: builder => ({
        getAllProductTypes: builder.query({
            query: () => '/GetAllProductTypes',
            providesTags: ['ProductType']
        }),
        getProductType: builder.query({
            query: id => `/GetProductType?productTypeId=${id}`
        }),
        createProductType: builder.mutation({
            query: productType => ({
                url: '/CreateProductType',
                method: 'POST',
                body: productType
            }),
            invalidatesTags: ['ProductType']
        }),
        deleteProductType: builder.mutation({
            query: id => ({
                url: `/DeleteProductType?productTypeId=${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['ProductType']
        })
    })
});

export const {
    useGetAllProductsQuery,
    useGetProductQuery,
    useCreateProductMutation,
    useDeleteProductMutation
} = apiProductSlice;

export const {
    useGetAllProductTypesQuery,
    useGetProductTypeQuery,
    useCreateProductTypeMutation,
    useDeleteProductTypeMutation
} = apiProductTypeSlice;