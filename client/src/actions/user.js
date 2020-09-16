export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const ERR_AUTH = 'ERR_AUTH';
export const ERR_UNKNOWN = 'ERR_UNKNOWN';

function loginAction(username) {
    return { type: LOGIN, payload: username };
}

function logoutAction() {
    return { type: LOGOUT };
}

function authError() {
    return { type: ERR_AUTH };
}

function unknownError() {
    return { type: ERR_UNKNOWN };
}    

export function logInAsync(username, password) {
    return async function (dispatch) {
        const body = new URLSearchParams();
        body.set('username', username);
        body.set('password', password);
        const { status } = await fetch('/user/login', {
            method: 'POST',
            body,
        });
        if (200 <= status && status < 300) {
            dispatch(loginAction(username));
        } else if (400 <= status && status < 500) {
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

