import { createSlice } from '@reduxjs/toolkit';

const vacationsSlice = createSlice({
    name: 'vacations',
    initialState: {
        error: false,
        loading: false,
        vacations: [],
    },
    reducers: {
        requestAllVacations(state) {
            state.error = false;
            state.loading = true;
        },
        receiveAllVacations(state, { payload: vacations }) {
            state.error = false;
            state.loading = false;
            state.vacations = vacations;
        },
        receiveOneVacation(state, { payload: { id, ...rest } }) {
            state.error = false;
            state.loading = false;
            const vacation = state.vacations.find(v => v.id === id);
            if (vacation) {
                Object.assign(vacation, { ...rest });
            } else {
                state.vacations.push({ id, ...rest });
            }
        },
        setFollowing(state, { payload: { id, isFollowing } }) {
            state.error = false;
            const vacation = state.vacations.find(v => v.id === id);
            if (vacation) {
                vacation.isFollowing = isFollowing;
            } else {
                state.error = { status: 404, statusText: 'Not Found' };
            }
        },
        truncate(state) {
            state.error = false;
            state.vacations = [];
        },
        error(state, { payload: { status, statusText } }) {
            state.error = { status, statusText };
        },
    },
});

export function loadVacationsAsync() {
    return async function (dispatch) {
        dispatch(requestAllVacations());
        const response = await fetch('/vacation/all');
        if (200 <= response.status && response.status < 300) {
            const vacations = await response.json();
            return dispatch(receiveAllVacations(vacations));
        }
        else {
            const { status, statusText } = response;
            dispatch(error({ status, statusText }));
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
            const { status, statusText } = response;
            dispatch(error({ status, statusText }));
        }
    };
}

export const { requestAllVacations, receiveAllVacations, receiveOneVacation, setFollowing, truncate, error } = vacationsSlice.actions;

export default vacationsSlice.reducer;

