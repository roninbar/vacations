import { LOGOUT } from '../actions/user';
import { RECEIVE_VACATIONS, REQUEST_VACATIONS, UNKNOWN_ERROR } from '../actions/vacations';

export function reduceVacations({ error, loading, vacations } = { error: false, loading: false, vacations: [] }, { type, payload }) {
    switch (type) {
        case REQUEST_VACATIONS:
            return { error: false, loading: true, vacations };
        case RECEIVE_VACATIONS:
            return { error: false, loading: false, vacations: payload };
        case UNKNOWN_ERROR:
            return { error: true, loading: false, vacations };
        case LOGOUT:
            return { error: false, loading: false, vacations: [] };
        default:
            return { error, loading, vacations };
    }
}

