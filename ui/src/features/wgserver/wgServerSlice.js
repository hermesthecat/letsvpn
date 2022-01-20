import {createSlice} from '@reduxjs/toolkit'
import {api} from "../auth/authSlice";

const wgServerSlice = createSlice({
    name: 'wgservers',
    initialState: {
        servers: [],
    },
    reducers: {
        setWGServersSuccess: (state, action) => {
            if (action.payload !== undefined)
                state.servers = action.payload;
        }
    },
});

export const loadWGServers = () => async (dispatch) => {
    const res = await api({url: '/api/wg/servers/'});
    const data = res.data;
    console.warn('data', data);
    dispatch(setWGServersSuccess(data));
}

export const setWGServers = (data) => async (dispatch) => {
    dispatch(setWGServersSuccess(data));
}


export const {
    setWGServersSuccess,
} = wgServerSlice.actions

export default wgServerSlice.reducer
