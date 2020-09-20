export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const AUTH_ERROR = 'AUTH_ERROR';
export const UNKNOWN_ERROR = 'UNKNOWN_ERROR';

function loginAction(user) {
    return { type: LOGIN, payload: user };
}

function logoutAction() {
    return { type: LOGOUT };
}

function authError() {
    return { type: AUTH_ERROR };
}

function unknownError() {
    return { type: UNKNOWN_ERROR };
}    

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
            dispatch(loginAction(await response.json()));
        } else if (400 <= response.status && response.status < 500) {
            dispatch(authError());
        } else {
            dispatch(unknownError());
        }
    };
}

export function logOutAsync() {
    return async function(dispatch) {
        const { status } = await fetch('/user/logout', { method: 'POST' });
        if (200 <= status && status < 300) {
            return dispatch(logoutAction());
        } else {
            return dispatch(unknownError())
        }
    };
}

