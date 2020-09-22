import { authError, error, login, logout } from 'features/userSlice';
import { truncate } from 'features/vacationsSlice';

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
            dispatch(error(response));
        }
    };
}

export function logOutAsync() {
    return async function (dispatch) {
        const { status, statusText } = await fetch('/user/logout', { method: 'POST' });
        if (200 <= status && status < 300) {
            return dispatch(truncate()) && dispatch(logout());
        } else {
            return dispatch(error({ status, statusText }));
        }
    };
}

