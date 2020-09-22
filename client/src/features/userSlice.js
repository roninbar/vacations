import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        error: false,
        id: 0,
        name: '',
        role: '',
    },
    reducers: {
        login(user, { payload: { id, name, role } }) {
            user.error = false;
            user.id = id;
            user.name = name;
            user.role = role;
        },
        logout(user) {
            user.error = false;
            user.id = 0;
            user.name = '';
            user.role = '';
        },
        authError(user) {
            user.error = true;
        },
    }
});

export const { login, logout, authError } = userSlice.actions;

export default userSlice.reducer;

