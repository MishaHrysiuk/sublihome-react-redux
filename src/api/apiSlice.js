import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const token = localStorage.getItem('user');

export const apiAuthenticationSlice = createApi({
    reducerPath: 'api/Authentication',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://localhost:5001/api/Authentication' }),
    endpoints: builder => ({
        login: builder.mutation({
            query: body => ({
                url: '/Login',
                method: 'POST',
                body: body
            })
        })
    })
});

export const apiProductSlice = createApi({
    reducerPath: 'api/Product',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://localhost:5001/api/Product',
        prepareHeaders: (headers) => {
            headers.set('authorization', `Bearer ${token}`)
            return headers;
        }
    }),
    tagTypes: ['Product'],
    endpoints: builder => ({
        getAllProducts: builder.query({
            query: () => ({
                url: '/GetAllProducts'
            }),
            providesTags: ['Product']
        }),
        getProduct: builder.query({
            query: id => `/GetProduct?productId=${id}`
        }),
        downloadPictureFromProduct: builder.query({
            query: id => `/DownloadPictureFromProduct?productId=${id}`
        }),
        createProduct: builder.mutation({
            query: product => ({
                url: '/CreateProduct',
                method: 'POST',
                body: product
            }),
            invalidatesTags: ['Product']
        }),
        addPictureToProduct: builder.mutation({
            query: (id, file) => ({
                url: `/AddPictureToProduct?productId=${id}`,
                method: 'POST',
                body: file
            }),
            invalidatesTags: ['Product']
        }),
        deleteProduct: builder.mutation({
            query: id => ({
                url: `/DeleteProduct?productId=${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Product']
        }),
        updateProduct: builder.mutation({
            query: product => ({
                url: '/UpdateProduct',
                method: 'PUT',
                body: product
            }),
            invalidatesTags: ['Product']
        })
    })
});

export const apiCartSlice = createApi({
    reducerPath: 'api/Cart',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://localhost:5001/api/Cart',
        prepareHeaders: (headers) => {
            headers.set('authorization', `Bearer ${token}`)
            return headers;
        }
    }),
    tagTypes: ['Cart'],
    endpoints: builder => ({
        getItemsFromCart: builder.query({
            query: id => ({
                url: `/GetItemsFromCart?userId=${id}`
            }),
            providesTags: ['Cart']
        }),
        updateCart: builder.mutation({
            query: cart => ({
                url: '/UpdateCart',
                method: 'POST',
                body: cart
            }),
            invalidatesTags: ['Cart']
        }),
        clearCart: builder.mutation({
            query: id => ({
                url: `/ClearCart?userId=${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Cart']
        })
    })
});

export const apiProductTypeSlice = createApi({
    reducerPath: 'api/ProductType',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://localhost:5001/api/ProductType',
        prepareHeaders: (headers) => {
            headers.set('authorization', `Bearer ${token}`)
            return headers;
        }
    }),
    tagTypes: ['ProductType'],
    endpoints: builder => ({
        getAllProductTypes: builder.query({
            query: () => '/GetAllProductTypes',
            providesTags: ['ProductType']
        }),
        getProductType: builder.query({
            query: id => `/GetProductType?productTypeId=${id}`,
            providesTags: ['ProductType']
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

export const apiOrderSlice = createApi({
    reducerPath: 'api/Order',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://localhost:5001/api/Order',
        prepareHeaders: (headers) => {
            headers.set('authorization', `Bearer ${token}`)
            return headers;
        }
    }),
    tagTypes: ['Order'],
    endpoints: builder => ({
        getAllOrders: builder.query({
            query: () => '/GetAllOrders',
            providesTags: ['Order']
        }),
        getOrder: builder.query({
            query: id => `/GetOrder?orderId=${id}`,
            providesTags: ['Order']
        }),
        getAllOrdersWithItems: builder.query({
            query: id => `/GetAllOrdersWithItems?userId=${id}`,
            providesTags: ['Order']
        }),
        createNewOrder: builder.mutation({
            query: user => ({
                url: '/CreateNewOrder',
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['Order']
        }),
        changeOrderStatus: builder.mutation({
            query: (orderId, orderStatus) => ({
                url: `/ChangeOrderStatus?orderId=${orderId}&orderStatus=${orderStatus}`,
                method: 'PUT'
            }),
            invalidatesTags: ['Order']
        })
    })
});

export const apiUserSlice = createApi({
    reducerPath: 'api/User',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://localhost:5001/api/User',
        prepareHeaders: (headers) => {
            headers.set('authorization', `Bearer ${token}`)
            return headers;
        }
    }),
    tagTypes: ['User'],
    endpoints: builder => ({
        getAllUsers: builder.query({
            query: () => '/GetAllUsers',
            providesTags: ['User']
        }),
        getUser: builder.query({
            query: id => `/GetUser?userId=${id}`
        }),
        createUser: builder.mutation({
            query: user => ({
                url: '/CreateUser',
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['User']
        }),
        deleteUser: builder.mutation({
            query: id => ({
                url: `/DeleteUser?userId=${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['User']
        }),
        updateUser: builder.mutation({
            query: user => ({
                url: '/UpdateUser',
                method: 'PUT',
                body: user
            }),
            invalidatesTags: ['User']
        }),
        updateUserPassword: builder.mutation({
            query: body => ({
                url: '/UpdateUserPassword',
                method: 'PUT',
                body: body
            })
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

export const { useLoginMutation } = apiAuthenticationSlice;

export const { 
    useGetItemsFromCartQuery,
    useUpdateCartMutation,
    useClearCartMutation
} = apiCartSlice;

export const {
    useGetAllOrdersQuery,
    useGetAllOrdersWithItemsQuery,
    useGetOrderQuery,
    useCreateNewOrderMutation,
    useChangeOrderStatusMutation
} = apiOrderSlice;

export const {
    useGetAllUsersQuery,
    useGetUserQuery,
    useCreateUserMutation,
    useDeleteUserMutation,
    useUpdateUserMutation,
    useUpdateUserPasswordMutation
} = apiUserSlice;