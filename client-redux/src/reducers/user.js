import { ERR_AUTH, ERR_UNKNOWN, LOGIN, LOGOUT } from '../actions/user';

export function reduceUser({ error, ...data } = { error: false }, { type, payload }) {
  switch (type) {
    case LOGIN:
      return { error: false, ...payload };
    case LOGOUT:
      return { error: false };
    case ERR_AUTH:
      return { error: true };
    case ERR_UNKNOWN:
      return { error: true, ...data }
    default:
      return { error, ...data };
  }
}

