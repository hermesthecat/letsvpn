import { createApi, fetchBaseQuery  } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const wireguardApi = createApi({
    reducerPath: 'wireguardApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState()).auth.access?.token;
            console.log('preparing token', token);
            // If we have a token set in state, let's assume that we should be passing it.
            if (token) {
                console.log('setting header', `Bearer ${token}`);
                headers.set('authorization', `Bearer ${token}`);
                //headers.authorization = `Bearer ${token}`;
            }
            console.log(headers);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getServerByID: builder.query({
            query: (id) => `wg/servers/${id}/`,
        }),
        getAllServers: builder.query({
            query: () => `wg/servers/`,
        }),
        getAllPeers: builder.query({
            query: () => `wg/peers/`,
        }),
        obtainRefreshToken: builder.mutation({
            query: (formData) => ({
                url: `auth/token/obtain/`,
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: formData,
            }),
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useGetServerByIDQuery, useGetAllServersQuery,
    useGetAllPeersQuery,
    useObtainRefreshTokenLazyQuery,
    useObtainRefreshTokenMutation,
} = wireguardApi



