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

export function logInAsync(username, password) {
    return async function (dispatch) {
        const body = new URLSearchParams();
        body.set('username', username);
        body.set('password', password);
        const response = await fetch('/user/login', {
            method: 'POST',
            body,
        });
        if (200 <= response.status && response.status < 300) {
            dispatch(login(await response.json()));
        } else if (400 <= response.status && response.status < 500) {
            dispatch(authError());
        } else {
            const { status, statusText } = response;
            dispatch(error({ status, statusText }));
        }
    };
}

export function logOutAsync() {
    return async function (dispatch) {
        const { status, statusText } = await fetch('/user/logout', { method: 'POST' });
        if (200 <= status && status < 300) {
            return dispatch(logout());
        } else {
            return dispatch(error({ status, statusText }));
        }
    };
}

export const { login, logout, authError, error } = userSlice.actions;

export default userSlice.reducer;

