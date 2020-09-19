export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const ERR_AUTH = 'ERR_AUTH';
export const ERR_UNKNOWN = 'ERR_UNKNOWN';

function loginAction(user) {
    return { type: LOGIN, payload: user };
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

