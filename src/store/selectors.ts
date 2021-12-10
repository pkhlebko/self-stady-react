import {AppStateModel, CoursesPageDataType} from '../models';

export function getCoursesPageContent(state: AppStateModel): CoursesPageDataType {
  const {courses, coursesFound, searchString, currentPage, lastPage} = state;

  return {courses, coursesFound, searchString, currentPage, lastPage};
}

export function selectCoursesFound(state: AppStateModel) {
  return state.coursesFound;
}

export function selectCurrentUser(state: AppStateModel) {
  return state.currentUser;
}

export function selectSearchString(state: AppStateModel) {
  return state.searchString;
}
