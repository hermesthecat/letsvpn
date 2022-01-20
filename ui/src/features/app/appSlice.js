import {createSlice} from '@reduxjs/toolkit'

const appSlice = createSlice({
    name: 'app',
    initialState: {
        drawerOpen: window.innerWidth >= 900,
    },
    reducers: {
        setDrawerOpen: (state, action) => {
            state.drawerOpen = action.payload;
        },
    },
})


export const toggleDrawer = () => async (dispatch, getState) => {
    dispatch(setDrawerOpen(!getState().app.drawerOpen))
}

export const {
    setDrawerOpen,
} = appSlice.actions

export default appSlice.reducer
