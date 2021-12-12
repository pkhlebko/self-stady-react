import {combineReducers} from '@reduxjs/toolkit';
import {coursesReducer} from './courses.reducer';
import {usersReducer} from './users.reducer';

export const appReducer = combineReducers({
  coursesState: coursesReducer,
  usersState: usersReducer,
});
