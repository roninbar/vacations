import { ERR_AUTH, LOGIN, LOGOUT } from '../actions/login';

export function reduceUser({ name, error } = { name: '', error: false }, { type, payload }) {
  switch (type) {
    case LOGIN:
      return { name: payload, error: false };
    case LOGOUT:
      return { name: '', error: false };
    case ERR_AUTH:
      return { name, error: true }
    default:
      return { name, error };
  }
}
