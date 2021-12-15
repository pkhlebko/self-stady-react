import {combineReducers} from '@reduxjs/toolkit';
import {getCoursesReducer} from './courses.reducer';
import {getUsersReducer} from './users.reducer';

export const appReducer = combineReducers({
  coursesState: getCoursesReducer(),
  usersState: getUsersReducer(),
});
