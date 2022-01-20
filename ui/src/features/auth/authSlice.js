import {createSlice} from '@reduxjs/toolkit'
import axios from "axios";
import jwt_decode from "jwt-decode";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";

const guestUser = {
    id: 0,
    name: 'Guest',
}


export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState()).auth.access?.isAuthenticated;
            // If we have a token set in state, let's assume that we should be passing it.
            //if (token)
            //   headers.set('authorization', `Bearer ${token}`);
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


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        access: null,
        refresh: null,
        user: null,
        profiles: [],
        errors: {},
    },
    reducers: {
        logoutSuccess: (state, action) => {
            state.isAuthenticated = false;
            state.access = null;
            state.refresh = null;
            state.user = guestUser;
        },
        setOriginalImageSuccess: (state, action) => {
            state.originalURL = action.payload;
            state.fileURL = action.payload;
        },
        loginSuccess: (state, action) => {
            state.access = {
                token: action.payload.access,
                ...jwt_decode(action.payload.access),
            }
            state.refresh = {
                token: action.payload.refresh,
                ...jwt_decode(action.payload.refresh),
            }
        },
        refreshSuccess: (state, action) => {
            state.access = {
                token: action.payload.access,
                ...jwt_decode(action.payload.access),
            }
            state.refresh = {
                token: action.payload.refresh,
                ...jwt_decode(action.payload.refresh),
            }
        },
        setUserSuccess: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
    },
});

const refreshToken = async (token) => {
    const res = await axios({
        method: 'POST',
        url: '/api/auth/token/refresh/',
        headers: {'Content-Type': 'application/json'},
        data: {refresh: token},
    }).catch(err => {
        console.error('Error refreshing token', err);
        throw err;
    });
    return res.data;
}

export const newAPI = async (options = {headers: {}}) => {
    api(options).then(data => {
        if (data === undefined)
            api(options).then(data => {
                return data;
            }).catch(e => {
                console.error('Fatal error in new API', e);
                throw e;
            })
        return data;
    }).catch(e => {
        console.error('Error in new API', e);
    })
}


export const api = (options = {headers: {}}) => async (dispatch, getState) => {
    let state = getState().auth;
    if (!options.headers)
        options.headers = {}

    // Do authenticated API request
    if (state.isAuthenticated) {
        // Check if access token is expired or expiring in <10 seconds
        if (Date.now() >= state.access.exp * 1000 - 10) {
            const new_token = await refreshToken(state.refresh.token);
            dispatch(refreshSuccess(new_token));
            dispatch(api(options))

        }

        // Do request if not expired
        const res = await axios({
            ...options,
            headers: {
                ...options.headers,
                Authorization: `Bearer ${state.access.token}`,
            }
        }).catch(err => {
            console.error(err);
            throw err;
        });
        return res.data;
    }
    // Do unauthenticated API request
    else {
        const res = await axios(options).catch(err => {
            console.error(err);
            throw err;
        });
        return res.data
    }
}


export const login = (auth) => async (dispatch) => {
    dispatch(loginSuccess(auth));
    dispatch(getUserInfo());
}

export const logout = () => async (dispatch) => {
    dispatch(logoutSuccess())
}

export const getUserInfo = () => async (dispatch, getState) => {
    console.log('getting user info')
    if (!getState().auth.access.token)
        throw {detail: 'Unable to fetch user data:  Not logged in.'}

    //const user = dispatch(api({url: '/api/user/me/'}))
    // Do request if not expired
    const res = await axios({
        url: '/api/user/me/',
        headers: {Authorization: `Bearer ${getState().auth.access.token}`}
    }).catch(err => {
        console.error('Error fetching user info', err);
        throw err;
    });
    const user = res.data;
    //const user = await api({url: '/api/user/me/'});
    console.log('api user', user);
    dispatch(setUserSuccess(user));
    return user;
}

export const {
    logoutSuccess,
    loginSuccess,
    refreshSuccess,
    setUserSuccess,
} = authSlice.actions

export default authSlice.reducer
