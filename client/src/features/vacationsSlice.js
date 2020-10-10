import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { logOutAsync } from './userSlice';
import { requestJson } from './utils';

export const loadAllAsync = createAsyncThunk(
    'vacations/loadAll',
    async function() {
        return await requestJson('/vacation/all');
    },
);

export const loadOneAsync = createAsyncThunk(
    'vacations/loadOne',
    async function (id) {
        return await requestJson(`/vacation/${id}`);
    },
);

export const addAsync = createAsyncThunk(
    'vacations/add',
    async function ({ destination, from, to, price, description, image }) {
        return await requestJsonWithBody('POST', '/vacation', { destination, from, to, price, description, image });
    },
);

export const changeAsync = createAsyncThunk(
    'vacations/change',
    async function ({ id, ...rest }) {
        return await requestJsonWithBody('PATCH', `/vacation/${id}`, rest);
    },
);

export const deleteAsync = createAsyncThunk(
    'vacations/delete',
    async function (id) {
        return await requestJson(`/vacation/${id}`, { method: 'DELETE' });
    },
);

async function requestJsonWithBody(method, url, rest) {
    return await requestJson(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(rest),
    });
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
            state.error = false;
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
            state.error = false;
            state.loading = true;
        },
        [loadOneAsync.fulfilled](state, { payload: vacation }) {
            updateVacation(state, vacation);
        },
        [loadOneAsync.rejected](state, { error }) {
            state.loading = false;
            state.error = error;
        },
        [addAsync.pending](state) {
            state.error = false;
            state.loading = true;
        },
        [addAsync.fulfilled](state, { payload: vacations }) {
            state.loading = false;
            state.error = false;
            state.vacations = vacations;
        },
        [addAsync.rejected](state, { error }) {
            state.loading = false;
            state.error = error;
        },
        [changeAsync.pending](state) {
            state.error = false;
            state.loading = true;
        },
        [changeAsync.fulfilled](state, { payload: vacation }) {
            updateVacation(state, vacation);
        },
        [changeAsync.rejected](state, { error, meta: { arg: { id, isFollowing } } }) {
            state.loading = false;
            state.error = error;
            if (typeof isFollowing === 'boolean') {
                state.vacations.find(v => v.id === id).isFollowing = !isFollowing;
            }
        },
        [deleteAsync.pending](state) {
            state.error = false;
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
        [logOutAsync.fulfilled](state) {
            state.error = false;
            state.vacations = [];
        },
    }
});

export const { setFollowing } = vacationsSlice.actions;

export default vacationsSlice.reducer;

