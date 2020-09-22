import { error, receiveAllVacations, receiveOneVacation, requestAllVacations, setFollowing } from 'features/vacationsSlice';

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

export function setFollowingAsync(id, isFollowing) {
    return async function (dispatch) {
        dispatch(setFollowing({ id, isFollowing }));
        const response = await fetch(`/vacation/${id}`, {
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

