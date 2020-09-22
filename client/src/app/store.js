import { configureStore } from '@reduxjs/toolkit';
import counterReducer from 'features/counter/counterSlice';
import userReducer from 'features/userSlice';
import { reduceVacations } from 'reducers/vacations';

export default configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    vacations: reduceVacations,
  },
});
