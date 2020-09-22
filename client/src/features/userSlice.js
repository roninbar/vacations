import { createSlice } from '@reduxjs/toolkit';

function reset(user) {
    user.id = 0;
    user.name = '';
    user.role = '';
}

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
            reset(user);
        },
        authError(user) {
            user.error = true;
            reset(user);
        },
        error(user, { payload: { status, statusText } }) {
            user.error = { status, statusText };
            reset(user);
        },
    },
});

export const { login, logout, authError, error } = userSlice.actions;

export default userSlice.reducer;

