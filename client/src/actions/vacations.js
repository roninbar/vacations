export const REQUEST_VACATIONS = 'REQUEST_VACATIONS';
export const RECEIVE_VACATIONS = 'RECEIVE_VACATIONS';
export const SET_FOLLOWING = 'SET_FOLLOWING';
export const UNKNOWN_ERROR = 'UNKNOWN_ERROR';

function requestVacations() {
    return { type: REQUEST_VACATIONS };
}

function receiveVacations(payload) {
    return { type: RECEIVE_VACATIONS, payload };
}

function setFollowing(id, isFollowing) {
    return { type: SET_FOLLOWING, payload: { id, isFollowing } };
}

function unknownError(status, message) {
    return { type: UNKNOWN_ERROR, payload: { status, message } };
}

export function loadVacations() {
    return async function (dispatch) {
        dispatch(requestVacations());
        const response = await fetch('/vacation/all');
        if (200 <= response.status && response.status < 300) {
            const vacations = await response.json();
            return dispatch(receiveVacations(vacations));
        }
        else {
            const { status, statusText } = response;
            return dispatch(unknownError(status, statusText));
        }
    };
}

export function setFollowingAsync(vacationId, isFollowing) {
    return async function (dispatch) {
        return dispatch(setFollowing(vacationId, isFollowing));
    };
}

