import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import { reduceUser } from '../reducers/user';
import { reduceVacations } from '../reducers/vacations';

export default configureStore({
  reducer: {
    counter: counterReducer,
    user: reduceUser,
    vacations: reduceVacations,
  },
});
