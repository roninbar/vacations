import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { logout } from './userSlice';

export const loadAllAsync = createAsyncThunk(
    'vacations/load-all',
    request.bind(null, '/vacation/all')
);

export const loadOneAsync = createAsyncThunk(
    'vacations/load-one',
    async function (id) {
        return await request(`/vacation/${id}`);
    }
);

export const setFollowingAsync = createAsyncThunk(
    'vacations/follow',
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

const vacationsSlice = createSlice({
    name: 'vacations',
    initialState: {
        error: false,
        loading: false,
        vacations: [],
    },
    extraReducers: {
        [loadAllAsync.pending](state) {
            state.error = false;
            state.loading = true;
        },
        [loadAllAsync.fulfilled](state, { payload: vacations }) {
            state.error = false;
            state.loading = false;
            state.vacations = vacations;
        },
        [loadAllAsync.rejected](state, { payload: error }) {
            state.error = error;
            state.loading = false;
        },
        [loadOneAsync.pending](state) {
            state.error = false;
            state.loading = true;
        },
        [loadOneAsync.fulfilled](state, { payload: { id, ...rest } }) {
            state.error = false;
            state.loading = false;
            const vacation = state.vacations.find(v => v.id === id);
            if (vacation) {
                Object.assign(vacation, { ...rest });
            } else {
                state.vacations.push({ id, ...rest });
            }
        },
        [loadOneAsync.rejected](state, { payload: error }) {
            state.error = error;
            state.loading = false;
        },
        [setFollowingAsync.pending](state) {
            state.loading = true;
        },
        [setFollowingAsync.fulfilled](state, { payload: { id, isFollowing } }) {
            state.error = false;
            const vacation = state.vacations.find(v => v.id === id);
            if (vacation) {
                vacation.isFollowing = isFollowing;
            } else {
                state.error = new Error(`Vacation ID ${id} doesn't exist in the Redux store.`);
            }
        },
        [setFollowingAsync.rejected](state, { payload: error }) {
            state.error = error;
            state.loading = false;
        },
        [deleteAsync.pending](state) {
            state.loading = true;
        },
        [deleteAsync.fulfilled](state, { payload }) {
            state.loading = false;
            state.vacations = payload;
        },
        [deleteAsync.rejected](state, { payload }) {
            state.error = payload;
        },
        [logout](state) {
            state.vacations = [];
        },
    }
});

export default vacationsSlice.reducer;

