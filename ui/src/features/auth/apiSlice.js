import { createApi, fetchBaseQuery  } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const wireguardApi = createApi({
    reducerPath: 'wireguardApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
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



