import { createSlice } from '@reduxjs/toolkit'
import axios from "axios";
import jwt_decode from "jwt-decode";

const authSlice = createSlice({
    name: 'polls',
    initialState: {
        questions: [],
        current: {},
    },
    reducers: {
    },
});


export const {

} = authSlice.actions

export default authSlice.reducer
