import { AUTH_ERROR, UNKNOWN_ERROR, LOGIN, LOGOUT } from 'actions/user';

export function reduceUser({ error, ...data } = { error: false }, { type, payload }) {
  switch (type) {
    case LOGIN:
      return { error: false, ...payload };
    case LOGOUT:
      return { error: false };
    case AUTH_ERROR:
      return { error: true };
    case UNKNOWN_ERROR:
      return { error: true, ...data }
    default:
      return { error, ...data };
  }
}

