import {ActionModel, AppStateModel} from '../models';
import {actionTypes} from './actions';

const initialState: AppStateModel = {
  courses: [],
  currentPage: 0,
  currentUser: undefined,
  lastPage: false,
};

export const rootReducer = (state = initialState, action: ActionModel) => {
  switch (action.type) {
    case actionTypes.SET_COURSES:
      const {newPage, newCourses} = action.payload;
      const courses = [...state.courses, ...newCourses];
      let {currentPage, lastPage} = state;

      if (newCourses.length === 0) {
        lastPage = true;
      } else if (newCourses.length < 10) {
        currentPage = newPage;
        lastPage = true;
      } else {
        currentPage = newPage;
        lastPage = false;
      }

      return {...state, currentPage, courses, lastPage};
    case actionTypes.SET_CURRENT_USER:
      return {...state, currentUser: action.payload.user};
    case actionTypes.SET_SEARCHSTRING:
        return {...state, searchString: action.payload.searchString};
    case actionTypes.SET_COURSES_FOUND:
        return {...state, coursesFound: action.payload.coursesFound};

    default:
      return state;
  }
};
