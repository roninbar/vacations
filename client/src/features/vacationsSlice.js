import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { logout } from './userSlice';

export const loadAllAsync = createAsyncThunk(
    'vacations/loadAll',
    request.bind(null, '/vacation/all')
);

export const loadOneAsync = createAsyncThunk(
    'vacations/loadOne',
    async function (id) {
        return await request(`/vacation/${id}`);
    }
);

export const setFollowingAsync = createAsyncThunk(
    'vacations/setFollowing',
    async function ({ id, isFollowing }) {
        return await request(`/vacation/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                isFollowing,
            }),
        });
    }
);

export const deleteAsync = createAsyncThunk(
    'vacations/delete',
    async function (id) {
        return await request(`/vacation/${id}`, { method: 'DELETE' });
    }
);

async function request(url, options) {
    const response = await fetch(url, options);
    const { status, statusText } = response;
    if (200 <= status && status < 300) {
        return await response.json();
    }
    else {
        throw new Error(`${status} ${statusText}`);
    }
}

function updateVacation(state, { id, ...rest }) {
    state.loading = false;
    state.error = false;
    const vacation = state.vacations.find(v => v.id === id);
    if (vacation) {
        Object.assign(vacation, { ...rest });
    } else {
        state.vacations.push({ id, ...rest });
    }
}

const vacationsSlice = createSlice({
    name: 'vacations',
    initialState: {
        error: false,
        loading: false,
        vacations: [],
    },
    reducers: {
        /**
         * This function is needed to give users immediate feedback when they press the 'Follow' button.
         */
        setFollowing(state, { payload: { id, isFollowing } }) {
            state.error = false;
            const vacation = state.vacations.find(v => v.id === id);
            if (vacation) {
                vacation.isFollowing = isFollowing;
            } else {
                state.error = new Error(`Vacation ID ${id} doesn't exist in the Redux store.`);
            }
        },
    },
    extraReducers: {
        [loadAllAsync.pending](state) {
            state.loading = true;
        },
        [loadAllAsync.fulfilled](state, { payload: vacations }) {
            state.loading = false;
            state.error = false;
            state.vacations = vacations;
        },
        [loadAllAsync.rejected](state, { error }) {
            state.loading = false;
            state.error = error;
        },
        [loadOneAsync.pending](state) {
            state.loading = true;
        },
        [loadOneAsync.fulfilled](state, { payload }) {
            updateVacation(state, payload);
        },
        [loadOneAsync.rejected](state, { error }) {
            state.loading = false;
            state.error = error;
        },
        [setFollowingAsync.pending](state) {
            state.loading = true;
        },
        [setFollowingAsync.fulfilled](state, { payload }) {
            updateVacation(state, payload);
        },
        [setFollowingAsync.rejected](state, { error }) {
            state.loading = false;
            state.error = error;
        },
        [deleteAsync.pending](state) {
            state.loading = true;
        },
        [deleteAsync.fulfilled](state, { payload: vacations }) {
            state.loading = false;
            state.error = false;
            state.vacations = vacations;
        },
        [deleteAsync.rejected](state, { error }) {
            state.loading = false;
            state.error = error;
        },
        [logout](state) {
            state.vacations = [];
        },
    }
});

export const { setFollowing } = vacationsSlice.actions;

export default vacationsSlice.reducer;

