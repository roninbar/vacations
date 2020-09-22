import { configureStore } from '@reduxjs/toolkit';
import counterReducer from 'features/counter/counterSlice';
import userReducer from 'features/userSlice';
import vacationsReducer from 'features/vacationsSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    vacations: vacationsReducer,
  },
});

