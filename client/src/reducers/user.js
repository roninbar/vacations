export function reduceUser({ name } = { name: '' }, { type, payload }) {
  switch (type) {
    case 'LOGIN':
      return { name: payload };
    case 'LOGOUT':
      return { name: '' };
    default:
      return { name };
  }
}
