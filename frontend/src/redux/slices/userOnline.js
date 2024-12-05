import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    users: [] // To store online user IDs
};

export const userOnline = createSlice({
    name: 'userOnline',
    initialState,
    reducers: {
        setUserOnline: (state, action) => {
            if (!state.users.includes(action.payload)) {
                state.users.push(action.payload);
            }
        },
        setUserOffline: (state, action) => {
            state.users = state.users.filter((id) => id !== action.payload);
        },
    },
});


// Action creators are generated for each case reducer function
export const {  setUserOnline , setUserOffline } = userOnline.actions

export default userOnline.reducer