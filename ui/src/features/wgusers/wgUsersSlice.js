import { createSlice } from '@reduxjs/toolkit'
import {api} from "../auth/authSlice";

const wgUsersSlice = createSlice({
    name: 'wgusers',
    initialState: {
        users: [],
    },
    reducers: {
        setUsersSuccess: (state, action) => {
            state.users = action.payload;
        }
    },
});

export const loadWGUsers = () => async (dispatch) => {
    const res = await api({url: '/api/wg/users/'});
    console.warn('res', res);
    const data = res.data;
    console.warn('data', data);
    dispatch(setUsersSuccess(data));
}

export const setWGUsers = (data) => async (dispatch) => {
    dispatch(setUsersSuccess(data));
}


export const {
    setUsersSuccess
} = wgUsersSlice.actions

export default wgUsersSlice.reducer
