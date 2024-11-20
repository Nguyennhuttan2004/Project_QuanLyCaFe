import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: [],
        status: 'idle',
        error: null
    },
    reducers: {
        setUsers(state, action) {
            state.users = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        }
    }
});

export const { setUsers, setStatus, setError } = userSlice.actions;
export default userSlice.reducer;