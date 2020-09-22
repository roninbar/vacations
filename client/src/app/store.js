import { configureStore } from '@reduxjs/toolkit';
import userReducer from 'features/userSlice';
import vacationsReducer from 'features/vacationsSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    vacations: vacationsReducer,
  },
});

