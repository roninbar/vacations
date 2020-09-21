export const REQUEST_ALL_VACATIONS = 'REQUEST_ALL_VACATIONS';
export const RECEIVE_ALL_VACATIONS = 'RECEIVE_ALL_VACATIONS';
export const RECEIVE_ONE_VACATION = 'RECEIVE_ONE_VACATION';
export const SET_FOLLOWING = 'SET_FOLLOWING';
export const ERROR = 'ERROR';

function requestAllVacations() {
    return { type: REQUEST_ALL_VACATIONS };
}

function receiveAllVacations(payload) {
    return { type: RECEIVE_ALL_VACATIONS, payload };
}

function receiveOneVacation(payload) {
    return { type: RECEIVE_ONE_VACATION, payload };
}

function setFollowing(id, isFollowing) {
    return { type: SET_FOLLOWING, payload: { id, isFollowing } };
}

function error({ status, statusText }) {
    return { type: ERROR, payload: { status, statusText } };
}

export function loadVacationsAsync() {
    return async function (dispatch) {
        dispatch(requestAllVacations());
        const response = await fetch('/vacation/all');
        if (200 <= response.status && response.status < 300) {
            const vacations = await response.json();
            return dispatch(receiveAllVacations(vacations));
        }
        else {
            return dispatch(error(response));
        }
    };
}

export function setFollowingAsync(vacationId, isFollowing) {
    return async function (dispatch) {
        dispatch(setFollowing(vacationId, isFollowing));
        const response = await fetch(`/vacation/${vacationId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                isFollowing,
            }),
        });
        if (200 <= response.status && response.status < 300) {
            const vacation = await response.json();
            return dispatch(receiveOneVacation(vacation));
        } else {
            return dispatch(error(response));
        }
    };
}

