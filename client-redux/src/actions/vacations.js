export const REQUEST_VACATIONS = 'REQUEST_VACATIONS';
export const RECEIVE_VACATIONS = 'RECEIVE_VACATIONS';
export const UNKNOWN_ERROR = 'UNKNOWN_ERROR';

function requestVacations() {
    return { type: REQUEST_VACATIONS };
}

function receiveVacations(payload) {
    return { type: RECEIVE_VACATIONS, payload };
}

function unknownError(status, message) {
    return { type: UNKNOWN_ERROR, payload: { status, message } };
}

export function requestVacationsAsync() {
    return async function (dispatch) {
        dispatch(requestVacations());
        const response = await fetch('/vacation/all');
        if (200 <= response.status && response.status < 300) {
            const vacations = await response.json();
            dispatch(receiveVacations(vacations.map(({ from, to, ...rest }) => ({
                from: new Date(from),
                to: new Date(to),
                ...rest,
            }))));
        }
        else {
            dispatch(unknownError(response.status, response.statusText));
        }
    };
}

