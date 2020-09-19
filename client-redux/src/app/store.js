import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import { reduceUser } from '../reducers/user';

export default configureStore({
  reducer: {
    counter: counterReducer,
    user: reduceUser,
  },
});
