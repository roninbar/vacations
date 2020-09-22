import { LOGOUT } from '../actions/user';
import { RECEIVE_ALL_VACATIONS, RECEIVE_ONE_VACATION, REQUEST_ALL_VACATIONS, SET_FOLLOWING, ERROR } from '../actions/vacations';
import { logout } from '../features/userSlice';

export function reduceVacations({ error, loading, vacations } = { error: false, loading: false, vacations: [] }, { type, payload }) {
    switch (type) {
        case REQUEST_ALL_VACATIONS:
            return { error: false, loading: true, vacations };
        case RECEIVE_ALL_VACATIONS:
            return { error: false, loading: false, vacations: payload };
        case RECEIVE_ONE_VACATION:
            return { error: false, loading: false, vacations: vacations.map(vacation => vacation.id === payload.id ? payload : vacation) };
        case SET_FOLLOWING:
            return {
                error: false,
                loading: false,
                vacations: vacations.map(({ id, isFollowing, ...rest }) => ({
                    id,
                    isFollowing: id === payload.id ? payload.isFollowing : isFollowing,
                    ...rest,
                })),
            };
        case ERROR:
            return { error: true, loading: false, vacations };
        case LOGOUT:
        case logout.type:
            return { error: false, loading: false, vacations: [] };
        default:
            return { error, loading, vacations };
    }
}

