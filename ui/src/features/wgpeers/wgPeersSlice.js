import {createSlice} from '@reduxjs/toolkit'
import {api} from "../auth/authSlice";

const wgPeersSlice = createSlice({
    name: 'wgpeers',
    initialState: {
        peers: [],
    },
    reducers: {
        setPeersSuccess: (state, action) => {
            if (action.payload !== undefined)
                state.peers = action.payload;
        }
    },
});

export const loadWGPeers = () => async (dispatch) => {
    const res = await api({url: '/api/wg/peers/'});
    console.warn('res', res);
    const data = res.data;
    console.warn('data', data);
    dispatch(setPeersSuccess(data));
}

export const setWGPeers = (data) => async (dispatch) => {
    dispatch(setPeersSuccess(data));
}


export const {
    setPeersSuccess,
} = wgPeersSlice.actions

export default wgPeersSlice.reducer
