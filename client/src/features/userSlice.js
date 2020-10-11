import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { requestJson } from './utils';

export const logInAsync = createAsyncThunk(
    'user/login',
    async function ({ username, password }) {
        const body = new URLSearchParams();
        body.set('username', username);
        body.set('password', password);
        return await requestJson('/user/login', {
            method: 'POST',
            body,
        });
    },
);

export const logOutAsync = createAsyncThunk(
    'user/logout',
    async function () {
        const { status, statusText } = await fetch('/user/logout', { method: 'POST' });
        if (200 <= status && status < 300) {
            return statusText;
        } else {
            throw new Error(`${status} ${statusText}`);
        }
    },
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        error: false,
        id: 0,
        name: '',
        role: '',
        firstName: '',
        lastName: '',
    },
    extraReducers: {
        [logInAsync.pending](user) {
            user.error = false;
            user.loading = true;
        },
        [logInAsync.fulfilled](user, { payload }) {
            user.loading = false;
            user.error = false;
            Object.assign(user, payload);
        },
        [logInAsync.rejected](user, { error }) {
            user.loading = false;
            user.error = error;
            reset(user);
        },
        [logOutAsync.pending](user) {
            user.error = false;
            user.loading = true;
        },
        [logOutAsync.fulfilled](user) {
            user.loading = false;
            user.error = false;
            reset(user);
        },
        [logOutAsync.rejected](user, { error }) {
            user.loading = false;
            user.error = error;
        },
    },
});

function reset(user) {
    user.id = 0;
    user.name = '';
    user.role = '';
    user.firstName = '';
    user.lastName = '';
}

export default userSlice.reducer;

