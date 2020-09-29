import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { logout } from './userSlice';

export const deleteAsync = createAsyncThunk(
    'vacations/delete',
    async function (id) {
        const response = await fetch(`/vacation/${id}`, { method: 'DELETE' });
        const { status, statusText } = response;
        if (200 <= status && status < 300) {
            return await response.json();
        }
        else {
            throw new Error(`${status} ${statusText}`);
        }
    }
);

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
        error(state, { payload: { status, statusText } }) {
            state.error = { status, statusText };
        },
    },
    extraReducers: {
        [deleteAsync.pending](state) {
            state.loading = true;
        },
        [deleteAsync.fulfilled](state, { payload }) {
            state.loading = false;
            state.vacations = payload;
        },
        [logout](state) {
            state.vacations = [];
        },
    }
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

export const { requestAllVacations, receiveAllVacations, receiveOneVacation, setFollowing, deleteOne, error } = vacationsSlice.actions;

export default vacationsSlice.reducer;

