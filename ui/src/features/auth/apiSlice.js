import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {logout, refreshSuccess} from "./authSlice";
import axios from "axios";


const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    if (result.error && result.error.status === 401) {
        // try to get a new token
        const auth = JSON.parse(JSON.parse(localStorage.getItem('persist:letsvpn')).auth);
        const token = auth.refresh.token;
        const refreshResult = await baseQuery({
            url: '/auth/token/refresh/',
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: {refresh: token}
        }, api, extraOptions);
        if (refreshResult.data) {
            // store the new token
            api.dispatch(refreshSuccess(refreshResult.data));
            // retry the initial query
            result = await baseQuery(args, api, extraOptions);
        } else {
            logout();
        }
    }
    return result;
}

const baseQuery = fetchBaseQuery({
    baseUrl: '/api/',
    prepareHeaders: (headers, { getState }) => {
        const auth = (getState()).auth;
        let token = auth.access?.token;
        // If we have a token set in state, let's assume that we should be passing it.
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        console.log(headers);
        return headers;
    },
})

// Define a service using a base URL and expected endpoints
export const wireguardApi = createApi({
    reducerPath: 'wireguardApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        getAllPeers: builder.query({
            query: () => `wg/peers/`,
        }),
        getPeerByID: builder.query({
            query: (id) => `wg/peers/${id}`,
        }),
        togglePeer: builder.query({
            query: (id) => `wg/peers/${id}/toggle/`,
        }),
        getServerByID: builder.query({
            query: (id) => `wg/servers/${id}/`,
        }),
        getAllServers: builder.query({
            query: () => `wg/servers/`,
        }),
        getServerStatus: builder.query({
            query: (id) => `wg/servers/${id}/status/`,
        }),
        startServer: builder.query({
            query: (id) => `wg/servers/${id}/start/`,
        }),
        stopServer: builder.query({
            query: (id) => `wg/servers/${id}/stop/`,
        }),
        restartServer: builder.query({
            query: (id) => `wg/servers/${id}/restart/`,
        }),
        toggleServer: builder.query({
            query: (id) => `wg/servers/${id}/toggle/`,
        }),
        rebuildServer: builder.query({
            query: (id) => `wg/servers/${id}/rebuild/`,
        }),
        obtainRefreshToken: builder.mutation({
            query: (formData) => ({
                url: `auth/token/obtain/`,
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: formData,
            }),
        }),
        refreshAccessToken: builder.mutation({
            query: (formData) => ({
                url: `auth/token/refresh/`,
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
    useGetServerByIDQuery, useGetAllServersQuery, useGetServerStatusQuery, useStartServerQuery, useStopServerQuery, useRestartServerQuery, useToggleServerQuery, useRebuildServerQuery,
    useGetPeerByIDQuery, useGetAllPeersQuery, useGetPeerStatusQuery, useStartPeerQuery, useStopPeerQuery, useRestartPeerQuery, useTogglePeerQuery, useRebuildPeerQuery,
    useObtainRefreshTokenLazyQuery,
    useObtainRefreshTokenMutation,
} = wireguardApi



