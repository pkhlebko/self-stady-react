import {actionTypes} from '../actions';
import {ActionModel, CoursesStateModel} from '../../models';
import {createReducer} from '../utils';

const coursesIntitalState: CoursesStateModel = {
  courses: [],
  currentPage: 0,
  lastPage: false,
};

function setCourses(state: CoursesStateModel, action: ActionModel): CoursesStateModel {
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
}

function setSearchString(state: CoursesStateModel, action: ActionModel): CoursesStateModel {
  return {...state, searchString: action.payload.searchString};
}

function setCoursesFound(state: CoursesStateModel, action: ActionModel): CoursesStateModel {
  return {...state, coursesFound: action.payload.coursesFound};
}

function updateCourse(state: CoursesStateModel, action: ActionModel): CoursesStateModel {
  const {updatedCourse} = action.payload;
  const courses = state.courses.map((course) => course.id === updatedCourse.id ? updatedCourse : course);

  return {...state, courses};
}

export function getCoursesReducer() {
  return createReducer(coursesIntitalState, {
    [actionTypes.SET_COURSES]: setCourses,
    [actionTypes.SET_SEARCHSTRING]: setSearchString,
    [actionTypes.SET_COURSES_FOUND]: setCoursesFound,
    [actionTypes.UPDATE_COURSE]: updateCourse,
  });
}
