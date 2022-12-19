import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const token = localStorage.getItem('user');

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://localhost:5001/api',
        prepareHeaders: (headers) => {
            headers.set('authorization', `Bearer ${token}`)
            return headers;
        }
    }),
    tagTypes: ['Product', 'Order', 'Cart', 'ProductType', 'User'],
    endpoints: builder => ({
        getAllProducts: builder.query({
            query: () => ({
                url: '/Product/GetAllProducts'
            }),
            providesTags: ['Product']
        }),
        getProduct: builder.query({
            query: id => `/Product/GetProduct?productId=${id}`,
            providesTags: ['Product']
        }),
        downloadPictureFromProduct: builder.query({
            query: id => `/Product/DownloadPictureFromProduct?productId=${id}`,
            providesTags: ['Product']
        }),
        createProduct: builder.mutation({
            query: product => ({
                url: '/Product/CreateProduct',
                method: 'POST',
                body: product
            }),
            invalidatesTags: ['Product']
        }),
        addPictureToProduct: builder.mutation({
            query: ({ id, file }) => ({
                url: `/Product/AddPictureToProduct?productId=${id}`,
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                body: file
            }),
            invalidatesTags: ['Product']
        }),
        deleteProduct: builder.mutation({
            query: id => ({
                url: `/Product/DeleteProduct?productId=${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Product']
        }),
        updateProduct: builder.mutation({
            query: product => ({
                url: '/Product/UpdateProduct',
                method: 'PUT',
                body: product
            }),
            invalidatesTags: ['Product']
        }),
        login: builder.mutation({
            query: body => ({
                url: '/Authentication/Login',
                method: 'POST',
                body: body
            })
        }),
        getItemsFromCart: builder.query({
            query: id => ({
                url: `/Cart/GetItemsFromCart?userId=${id}`
            }),
            providesTags: ['Cart', 'Order']
        }),
        updateCart: builder.mutation({
            query: cart => ({
                url: '/Cart/UpdateCart',
                method: 'POST',
                body: cart
            }),
            invalidatesTags: ['Cart']
        }),
        clearCart: builder.mutation({
            query: id => ({
                url: `/Cart/ClearCart?userId=${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Cart']
        }),
        getAllProductTypes: builder.query({
            query: () => '/ProductType/GetAllProductTypes',
            providesTags: ['ProductType']
        }),
        getProductType: builder.query({
            query: id => `/ProductType/GetProductType?productTypeId=${id}`,
            providesTags: ['ProductType']
        }),
        createProductType: builder.mutation({
            query: productType => ({
                url: '/ProductType/CreateProductType',
                method: 'POST',
                body: productType
            }),
            invalidatesTags: ['ProductType']
        }),
        deleteProductType: builder.mutation({
            query: id => ({
                url: `/ProductType/DeleteProductType?productTypeId=${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['ProductType']
        }),
        getAllOrders: builder.query({
            query: () => '/Order/GetAllOrders',
            providesTags: ['Order']
        }),
        getOrder: builder.mutation({
            query: id => `/Order/GetOrder?orderId=${id}`,
            providesTags: ['Order']
        }),
        getAllOrdersWithItems: builder.query({
            query: id => `/Order/GetAllOrdersWithItems?userId=${id}`,
            providesTags: ['Order']
        }),
        createNewOrder: builder.mutation({
            query: user => ({
                url: '/Order/CreateNewOrder',
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['Order']
        }),
        changeOrderStatus: builder.mutation({
            query: ({ orderId, orderStatus }) => ({
                url: `/Order/ChangeOrderStatus?orderId=${orderId}&orderStatus=${orderStatus}`,
                method: 'PUT'
            }),
            invalidatesTags: ['Order']
        }),
        getAllUsers: builder.query({
            query: () => '/User/GetAllUsers',
            providesTags: ['User']
        }),
        getUser1: builder.mutation({
            query: id => `/User/GetUser?userId=${id}`,
            providesTags: ['User']
        }),
        getUser: builder.query({
            query: id => `/User/GetUser?userId=${id}`,
            providesTags: ['User']
        }),
        createUser: builder.mutation({
            query: user => ({
                url: '/User/CreateUser',
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['User']
        }),
        deleteUser: builder.mutation({
            query: id => ({
                url: `/User/DeleteUser?userId=${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['User']
        }),
        updateUser: builder.mutation({
            query: user => ({
                url: '/User/UpdateUser',
                method: 'PUT',
                body: user
            }),
            invalidatesTags: ['User']
        }),
        updateUserPassword: builder.mutation({
            query: body => ({
                url: '/User/UpdateUserPassword',
                method: 'PUT',
                body: body
            })
        })
    })
});

export const {
    useGetAllUsersQuery,
    useGetUser1Mutation,
    useGetUserQuery,
    useCreateUserMutation,
    useDeleteUserMutation,
    useUpdateUserMutation,
    useUpdateUserPasswordMutation,
    useGetAllOrdersQuery,
    useGetAllOrdersWithItemsQuery,
    useGetOrderMutation,
    useCreateNewOrderMutation,
    useChangeOrderStatusMutation,
    useGetItemsFromCartQuery,
    useUpdateCartMutation,
    useClearCartMutation,
    useGetAllProductTypesQuery,
    useGetProductTypeQuery,
    useCreateProductTypeMutation,
    useDeleteProductTypeMutation,
    useGetAllProductsQuery,
    useGetProductQuery,
    useCreateProductMutation,
    useDeleteProductMutation,
    useAddPictureToProductMutation,
    useUpdateProductMutation,
    useLoginMutation
} = apiSlice;